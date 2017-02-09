/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

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

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "054635e7784ff7617022"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

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

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

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

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

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

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

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

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

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

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

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

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

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

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

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

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

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

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

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

	var _master_sorter_two_info_screen = __webpack_require__(95);

	var _master_sorter_two_info_screen2 = _interopRequireDefault(_master_sorter_two_info_screen);

	var _master_sorter_level_two_screen = __webpack_require__(96);

	var _master_sorter_level_two_screen2 = _interopRequireDefault(_master_sorter_level_two_screen);

	var _master_sorter_three_info_screen = __webpack_require__(97);

	var _master_sorter_three_info_screen2 = _interopRequireDefault(_master_sorter_three_info_screen);

	var _master_sorter_level_three_screen = __webpack_require__(98);

	var _master_sorter_level_three_screen2 = _interopRequireDefault(_master_sorter_level_three_screen);

	var _master_sorter_four_info_screen = __webpack_require__(99);

	var _master_sorter_four_info_screen2 = _interopRequireDefault(_master_sorter_four_info_screen);

	var _master_sorter_level_four_screen = __webpack_require__(100);

	var _master_sorter_level_four_screen2 = _interopRequireDefault(_master_sorter_level_four_screen);

	var _master_sorter_five_info_screen = __webpack_require__(101);

	var _master_sorter_five_info_screen2 = _interopRequireDefault(_master_sorter_five_info_screen);

	var _master_sorter_level_five_screen = __webpack_require__(102);

	var _master_sorter_level_five_screen2 = _interopRequireDefault(_master_sorter_level_five_screen);

	var _now_a_member_screen = __webpack_require__(103);

	var _now_a_member_screen2 = _interopRequireDefault(_now_a_member_screen);

	var _quit_screen = __webpack_require__(104);

	var _quit_screen2 = _interopRequireDefault(_quit_screen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _hi_there_screen2.default, _key_is_sorting_screen2.default, _lights_screen2.default, _five_ways_screen2.default, (0, _level_screen_component2.default)(1.0), _recycling_champion_one_info_screen2.default, _recycling_champion_level_one_screen2.default, (0, _level_screen_component2.default)(1.1), _recycling_champion_two_info_screen2.default, _recycling_champion_level_two_screen2.default, (0, _level_screen_component2.default)(1.2), _recycling_champion_three_info_screen2.default, _recycling_champion_level_three_screen2.default, (0, _level_screen_component2.default)(1.3), _recycling_champion_four_info_screen2.default, _recycling_champion_level_four_screen2.default, (0, _level_screen_component2.default)(1.4), _recycling_champion_five_info_screen2.default, _recycling_champion_level_five_screen2.default, (0, _level_screen_component2.default)(1.5), (0, _level_complete_screen_component2.default)(1), (0, _level_screen_component2.default)(2.0), _priceless_pourer_one_info_screen2.default, _priceless_pourer_level_one_screen2.default, (0, _level_screen_component2.default)(2.1), _priceless_pourer_two_info_screen2.default, _priceless_pourer_level_two_screen2.default, (0, _level_screen_component2.default)(2.2), _priceless_pourer_three_info_screen2.default, _priceless_pourer_level_three_screen2.default, (0, _level_screen_component2.default)(2.3), _priceless_pourer_four_info_screen2.default, _priceless_pourer_level_four_screen2.default, (0, _level_screen_component2.default)(2.4), _priceless_pourer_five_info_screen2.default, _priceless_pourer_level_five_screen2.default, (0, _level_screen_component2.default)(2.5), (0, _level_complete_screen_component2.default)(2), (0, _level_screen_component2.default)(3.0), _fantastic_food_sharer_one_info_screen2.default, _fantastic_food_sharer_level_one_screen2.default, (0, _level_screen_component2.default)(3.1), _fantastic_food_sharer_two_info_screen2.default, _fantastic_food_sharer_level_two_screen2.default, (0, _level_screen_component2.default)(3.2), _fantastic_food_sharer_three_info_screen2.default, _fantastic_food_sharer_level_three_screen2.default, (0, _level_screen_component2.default)(3.3), _fantastic_food_sharer_four_info_screen2.default, _fantastic_food_sharer_level_four_screen2.default, (0, _level_screen_component2.default)(3.4), _fantastic_food_sharer_five_info_screen2.default, _fantastic_food_sharer_level_five_screen2.default, (0, _level_screen_component2.default)(3.5), (0, _level_complete_screen_component2.default)(3), (0, _level_screen_component2.default)(4.0), _dynamic_diverter_one_info_screen2.default, _dynamic_diverter_level_one_screen2.default, (0, _level_screen_component2.default)(4.1), _dynamic_diverter_two_info_screen2.default, _dynamic_diverter_level_two_screen2.default, (0, _level_screen_component2.default)(4.2), _dynamic_diverter_three_info_screen2.default, _dynamic_diverter_level_three_screen2.default, (0, _level_screen_component2.default)(4.3), _dynamic_diverter_four_info_screen2.default, _dynamic_diverter_level_four_screen2.default, (0, _level_screen_component2.default)(4.4), _dynamic_diverter_five_info_screen2.default, _dynamic_diverter_level_five_screen2.default, (0, _level_screen_component2.default)(4.5), (0, _level_complete_screen_component2.default)(4), _want_to_stack_screen2.default, _video_screen2.default, (0, _level_screen_component2.default)(5.0), _master_sorter_one_info_screen2.default, _master_sorter_level_one_screen2.default, (0, _level_screen_component2.default)(5.1), _master_sorter_two_info_screen2.default, _master_sorter_level_two_screen2.default, (0, _level_screen_component2.default)(5.2), _master_sorter_three_info_screen2.default, _master_sorter_level_three_screen2.default, (0, _level_screen_component2.default)(5.3), _master_sorter_four_info_screen2.default, _master_sorter_level_four_screen2.default, (0, _level_screen_component2.default)(5.4), _master_sorter_five_info_screen2.default, _master_sorter_level_five_screen2.default, (0, _level_screen_component2.default)(5.5), (0, _level_complete_screen_component2.default)(5), _now_a_member_screen2.default, (0, _level_complete_screen_component2.default)(6)],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_recycle.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_liquids.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_landfill.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_foodshare.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_compost.json' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_recycle.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_liquids.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_landfill.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_foodshare.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_compost.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'purple.ribbon.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'luggage.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.star.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.01.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.02.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'transition.frame.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.mainnav.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'titlescrnbg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.01.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.02.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.03.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.04.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.transition.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.recycle.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.landfill.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.compost.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'quit.background.jpg' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'button', src: CMWN.MEDIA.EFFECT + 'ButtonClick.mp3' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'screen-complete', src: MEDIA.EFFECT + 'NextAppear.mp3' }), React.createElement(skoash.Audio, { ref: 'BKGtitle', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKGtitle.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG1', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG2', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG3', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG4', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG5', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG5.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG6', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG6.mp3', loop: true }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg1' }), React.createElement('div', { className: 'background bkg2' }), React.createElement('div', { className: 'background bkg3' }), React.createElement('div', { className: 'background bkg4' }), React.createElement('div', { className: 'background trash' }), React.createElement('div', { className: 'background transition' }), React.createElement('div', { className: 'background quit' })]
	}));

		if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "green-team-challenge",
		"version": 1,
		"skoash": "1.1.3",
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
	            backgroundAudio: 'BKGtitle'
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
	                size: Math.random() + 0.5,
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
	                            size: Math.random() + 1.5,
	                            fill: color,
	                            vx: Math.random() * 5 - 2.5,
	                            vy: Math.random() * -5 + 1.5,
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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	var names = ['aluminum-foil', 'Aluminum-food-can-1', 'Aluminum-food-can-2', 'Aluminum-food-can-3', 'aluminum-food-can-5', 'aluminum-pan', 'bagel-package', 'cardboard-box', 'empty-aluminum-can-1', 'empty-aluminum-can-2', 'empty-aluminum-can-3', 'empty-aluminum-can-4', 'box-of-cookies-3', 'empty-chocolate-milk-carton-2', 'empty-chocolate-milk-carton-4', 'empty-chocolate-milk-carton-5', 'empty-chocolate-milk-carton-6', 'empty-chocolate-milk-carton', 'empty-cookie-box-1', 'empty-cookie-box-2', 'empty-milk-carton-12', 'empty-milk-carton-13', 'empty-milk-carton-14', 'empty-plastic-bottle-1', 'empty-plastic-bottle-2', 'empty-plastic-bottle-3', 'empty-yogurt-container-2', 'empty-yogurt-container-3', 'empty-yogurt-container-5', 'empty-yogurt-container-6', 'empty-yogurt-container-7', 'empty-yogurt-container-8', 'empty-yogurt-container-9', 'empty-yogurt-container-10', 'orange-soda-can', 'paper-folder', 'paper-packaging-1', 'paper-packaging-8', 'paper-packaging', 'plastic-cup-1', 'plastic-cup-2', 'plastic-cup-3', 'plastic-cup-4', 'plastic-cup-5', 'plastic-cup-6', 'plastic-cup-7', 'plastic-lids-1', 'plastic-packaging-2', 'plastic-packaging-4', 'plastic-packaging-5', 'plastic-packaging-6', 'plastic-packaging-7', 'wrapping-paper'];

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
	            media: mediaCollectionList
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
	    compost: 'GetPouring', // needs to be replaced
	    'food-share': 'GetPouring' };

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

	var imageSrcs = [CMWN.MEDIA.IMAGE + 'lights.png', CMWN.MEDIA.SPRITE + 'sprite.bins.png', CMWN.MEDIA.SPRITE + 'sprite.btn.png'];

	var audioRefs = _.uniq(_.map(_items_landfill2.default, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	var names = ['applesauce-pouch-1', 'applesauce-pouch-2', 'applesauce-pouch-3', 'applesauce-pouch-4', 'bag-of-wrappers', 'bubble-wrap', 'burrito-wrapper-1', 'burrito-wrapper-2', 'burrito-wrapper-3', 'burrito-wrapper-4', 'cereal-lid-wrapper-1', 'cereal-lid-wrapper-2', 'cereal-lid-wrapper-3', 'cereal-lid-wrapper-4', 'cereal-lid-wrapper-5', 'empty-chip-bag', 'empty-chip-bag', 'empty-cracker-wrapper-1', 'empty-cracker-wrapper-2', 'empty-cracker-wrapper-3', 'empty-cracker-wrapper-4', 'Empty-fruit-juice-plastic-1', 'Empty-fruit-juice-plastic-2', 'Empty-fruit-juice-plastic-3', 'Empty-fruit-juice-plastic-4', 'empty-lemonade-box-5', 'empty-lemonade-box', 'empty-potato-chip-bag-2', 'empty-potato-chip-bag-3', 'empty-potato-chip-bag', 'energy-bar-wrapper-2', 'energy-bar-wrapper', 'fruit-drink-empty-pouch', 'fruit-snack-wrapper-2', 'fruit-snack-wrapper-3', 'gift-ribbons', 'graham-cookie-wrapper-1', 'graham-cookie-wrapper', 'paper-juice-box-1', 'paper-juice-box-2', 'paper-juice-box-3', 'plastic fork', 'plastic-baggie-2', 'plastic-baggie', 'plastic-knife', 'plastic-spoon', 'plastic-straws', 'red-gift-bow', 'styrofoam-container-1', 'styrofoam-container-2', 'styrofoam-container-3', 'styrofoam-container-5', 'styrofoam-soup-cup'];

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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	var names = ['apple-core', 'banana-peel', 'carrot-sticks', 'celery-stick', 'chicken-leg', 'coffee-cup-2', 'coffee-cup', 'coffee-grounds', 'dirty-paper-food-container', 'empty-raisin-box-1', 'empty-raisin-box-2', 'empty-raisin-box-3', 'empty-raisin-box-4', 'food-soiled-paper plate', 'ham-sandwich', 'orange-slice', 'pencil-shavings-1', 'pencil-shavings-2', 'pencil-shavings-3', 'pencil-shavings', 'pizza-crust', 'teabag', 'unused-paper-tray-1', 'unused-paper-tray-2', 'unused-paper-tray-3', 'unused-paper-tray-4', 'used-napkins', 'used-paper-food-container', 'used-paper-sandwich-wrapper-1', 'used-paper-sandwich-wrapper-2', 'used-paper-sandwich-wrapper-4', 'used-takeout-containers', 'used-white-napkin', 'white-paper-towel-sheet'];

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
	                    src: CMWN.MEDIA.EFFECT + 'LevelComplete.mp3'
	                }), React.createElement(skoash.Audio, {
	                    playTarget: 'appear',
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'LevelAppear.mp3'
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
	        scoreToWin: 100
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
	        return null;
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
	        opts.playAudio = play ? play : drop && !opts.truckClassName ? 'drop' : pickUp ? 'pickUp' : opts.next ? 'next' : opts.pour ? 'pour' : opts.next ? 'correct' : revealOpen === 'resort' ? 'resort' : opts.itemNew ? _.upperFirst(_.camelCase(opts.itemName)) : dropClass === 'TRAY-STACKING' && _.includes(opts.itemName, 'tray') ? 'tray' : opts.itemName ? 'select' : null;

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
	                    bin: catchablesArray
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
	                    pause: caught,
	                    resume: drop || itemRef,
	                    collideFraction: opts.collideFraction,
	                    assets: []
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

	    function Catch() {
	        _classCallCheck(this, Catch);

	        var _this = _possibleConstructorReturn(this, (Catch.__proto__ || Object.getPrototypeOf(Catch)).call(this));

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

	var _4 = __webpack_require__(26);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ITEM = 'items-';
	var DROPPED = 'DROPPED';

	var Dropper = function (_skoash$Component) {
	    _inherits(Dropper, _skoash$Component);

	    function Dropper() {
	        _classCallCheck(this, Dropper);

	        var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));

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
	                _this3.updateScreenData({
	                    key: _this3.props.refsTarget,
	                    data: {
	                        refs: _.filter(_this3.refs, function (v, k) {
	                            return !k.indexOf(ITEM);
	                        }),
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
	    bin: React.createElement(_3.default, {
	        bin: [React.createElement(_5.default, null)]
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

	var _2 = __webpack_require__(26);

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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	    scoreToWin: 100,
	    maxHits: 5,
	    dropperAmount: 3,
	    pointsPerItem: 50,
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
	                        key: 'play',
	                        data: 'timer'
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
	var names = ['bag-of-potato-chips-2', 'bag-of-potato-chips-3', 'box-of-cheddar-crackers', 'box-of-cookies', 'dinner-roll', 'fresh-fruit-cup', 'fresh-unopened-sandwich', 'fresh-vegetable-cup', 'ketchup-packet', 'lollipop-1', 'lollipop-2', 'lollipop-3', 'lollipop-4', 'lollipop-5', 'mayo-packet', 'mustard-packet', 'Sealed-apple-sauce', 'sealed-bag-of-carrots', 'sealed-chocolate-milk', 'sealed-fruit-drink-1', 'sealed-fruit-drink-2', 'sealed-fruit-drink-3', 'sealed-milk-1', 'sealed-milk-2', 'sealed-milk-3', 'sealed-orange-juice', 'single-serve-cereal-2', 'single-serve-cereal-3', 'single-serve-cereal', 'single-serve-cookies', 'uneaten-pretzel', 'unopened-box-of-raisins', 'unopened-cookies-package', 'unopened-crackers-1', 'unopened-crackers-2', 'unopened-crackers-3', 'unopened-energy-bar', 'unopened-graham-cookies-1', 'unopened-graham-cookies-2', 'unopened-graham-cookies-3', 'unopened-granola-bar', 'Unopened-grape-juice-1', 'unopened-grape-juice-2', 'unopened-grape-juice-3', 'unopened-pack-of-grapes', 'unopened-peanut-butter-cups', 'whole-apple', 'whole-banana', 'whole-orange', 'yogurt-cup-1', 'yogurt-cup-2'];

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
	var names = ['full-plastic-water-bottle-1', 'full-plastic-water-bottle-2', 'full-plastic-water-bottle-3', 'full-plastic-water-bottle-4', 'half-full-chocolate-milk-carton', 'half-full-chocolate-milk', 'half-full-energy-drink-bottle', 'half-full-lemonade-box-1', 'half-full-lemonade-box-4', 'half-full-milk-carton-1', 'half-full-milk-carton-2', 'half-full-milk-carton-3', 'half-full-milk-carton-4', 'half-full-milk-carton-5', 'half-full-milk-carton-6', 'half-full-milk-carton-7', 'half-full-milk-carton-8', 'half-full-orange-juice-2'];

	var becomes = [{
	    name: 'empty-plastic-water-bottle-1',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-2',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-3',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-4',
	    bin: 'recycle'
	}, {
	    name: 'empty-chocolate-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-chocolate-milk',
	    bin: 'recycle'
	}, {
	    name: 'empty-energy-drink-bottle',
	    bin: 'recycle'
	}, {
	    name: 'empty-lemonade-box-1',
	    bin: 'landfill'
	}, {
	    name: 'empty-lemonade-box-4',
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
	        scoreToWin: 150
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
	        scoreToWin: 200
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
	        scoreToWin: 250
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
	        scoreToWin: 300
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
	        null,
	        'Level ',
	        levelNumberWord,
	        ' Complete!'
	    );
	    return React.createElement(
	        'div',
	        { className: 'header' },
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

	var _2 = __webpack_require__(26);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['liquids', 'recycle', 'landfill', 'compost'];

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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	        vo: '', // this vo is missing
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

	var _2 = __webpack_require__(26);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	        return null;
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
	            opts.playAudio = play ? play : revealOpen === 'resort' ? 'resort' : _.upperFirst(_.camelCase(itemName));

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
	                        complete: true
	                    })
	                )
	            };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	};

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

	    function Selectable() {
	        _classCallCheck(this, Selectable);

	        var _this = _possibleConstructorReturn(this, (Selectable.__proto__ || Object.getPrototypeOf(Selectable)).call(this));

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

	            var list = this.props.list || this.state.list;
	            return list.map(function (li, key) {
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
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
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

	    function Draggable() {
	        _classCallCheck(this, Draggable);

	        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	                        hits: opts.hits + 1
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

	var _2 = __webpack_require__(26);

	var _3 = _interopRequireDefault(_2);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint max-lines: ["error", {"max": 600}] */
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

	var traysArray = [{
	    name: 'tray',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['full-plastic-water-bottle-1', 'half-full-chocolate-milk-carton', 'half-full-energy-drink-bottle', 'half-full-lemonade-box-1', 'half-full-orange-juice-2'])
	    })]
	}, {
	    name: 'tray',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['plastic-cup-1', 'apple-core', 'empty-cracker-wrapper-2', 'full-plastic-water-bottle-2', 'whole-banana'])
	    })]
	}, {
	    name: 'tray-pink',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['empty-yogurt-container-10'])
	    })]
	}, {
	    name: 'tray-blue',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['empty-yogurt-container-10'])
	    })]
	}];

	var catchablesArray = _.map(traysArray, function (v) {
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
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
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
	        return catchablesArray;
	    }
		}, _default_game_opts2.default);

/***/ },
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
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
/* 102 */
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
/* 103 */
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
/* 104 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDU0NjM1ZTc3ODRmZjc2MTcwMjIiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbmZpZy5qc29uIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZmlyZXdvcmtzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaW5mb19zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2xhbmRmaWxsLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2NvbXBvc3QuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9nYW1lX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc190b19zb3J0LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfZm9vZF9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2xpcXVpZHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3dhbnRfdG9fc3RhY2tfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9ub3dfYV9tZW1iZXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xuIFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0fVxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0fSBjYXRjaChlKSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdH1cblxuXG4gXHQvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iZWY0NWIwL3NyYy9zaGFyZWQvdXRpbHMvY2FuRGVmaW5lUHJvcGVydHkuanNcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuIFx0dHJ5IHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge1xuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxuIFx0XHR9KTtcbiBcdFx0Y2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuIFx0fSBjYXRjaCh4KSB7XG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjA1NDYzNWU3Nzg0ZmY3NjE3MDIyXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgKGZ1bmN0aW9uKG5hbWUpIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBlbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobnVsbCwgZm4pO1xuIFx0XHRcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR9XG5cbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0dmFsdWU6IGVuc3VyZVxuIFx0XHRcdH0pO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGZuLmUgPSBlbnN1cmU7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm51bWJlclwiKVxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RDYWxsYmFjaztcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSwgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGZhbHNlO1xuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRob3REb3dubG9hZE1hbmlmZXN0KGZ1bmN0aW9uKGVyciwgdXBkYXRlKSB7XG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0XHRpZighdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XG4gXHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0fVxuXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwW3VwZGF0ZS5jW2ldXSA9IHRydWU7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XG4gXHRcdGlmKCFjYWxsYmFjaykgcmV0dXJuO1xuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuIFx0XHRcdG9wdGlvbnMgPSB7fTtcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZSkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XG4gXHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0dmFyIHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXN1bHQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHRbMF0pO1xuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgY2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDU0NjM1ZTc3ODRmZjc2MTcwMjIiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIiwiKGZ1bmN0aW9uIChnYW1lTmFtZSkge1xuICAgIC8vIHJlbW92ZSB3aW5kb3cuTUVESUEgb25jZSBubyBnYW1lcyByZWZlcmVuY2UgaXRcbiAgICB2YXIgTUVESUEgPSB3aW5kb3cuTUVESUEgPSB7XG4gICAgICAgIEJBU0U6IEVOVklST05NRU5ULk1FRElBXG4gICAgfTtcblxuICAgIGNvbnN0IEdBTUUgPSAnZ2FtZXMvJztcbiAgICBjb25zdCBFRkZFQ1QgPSAnc291bmQtYXNzZXRzL2VmZmVjdHMvJztcbiAgICBjb25zdCBWTyA9ICdzb3VuZC1hc3NldHMvdm9zLyc7XG4gICAgY29uc3QgSU1BR0UgPSAnaW1hZ2UtYXNzZXRzLyc7XG4gICAgY29uc3QgU1BSSVRFID0gJ3Nwcml0ZXMtYW5pbWF0aW9ucy8nO1xuICAgIGNvbnN0IEZSQU1FID0gJ2ZyYW1lcy8nO1xuICAgIGNvbnN0IEZPTlQgPSAnZm9udHMvJztcbiAgICBjb25zdCBTSEFSRUQgPSAnc2hhcmVkLyc7XG4gICAgY29uc3QgTU9DS19HQU1FID0gJ21vY2stZ2FtZS8nO1xuXG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkJBU0UgKyBGT05UO1xuICAgIE1FRElBLlNIQVJFRCA9IE1FRElBLkJBU0UgKyBHQU1FICsgU0hBUkVEO1xuXG4gICAgTUVESUEuR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgZ2FtZU5hbWUgKyAnLyc7XG4gICAgTUVESUEuRUZGRUNUID0gTUVESUEuR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5WTyA9IE1FRElBLkdBTUUgKyBWTztcbiAgICBNRURJQS5JTUFHRSA9IE1FRElBLkdBTUUgKyBJTUFHRTtcbiAgICBNRURJQS5TUFJJVEUgPSBNRURJQS5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLkZSQU1FID0gTUVESUEuR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLkZPTlQgPSBNRURJQS5HQU1FICsgRk9OVDtcblxuICAgIE1FRElBLk1PQ0sgPSB7fTtcbiAgICBNRURJQS5NT0NLLkdBTUUgPSBNRURJQS5CQVNFICsgR0FNRSArIE1PQ0tfR0FNRTtcbiAgICBNRURJQS5NT0NLLkVGRkVDVCA9IE1FRElBLk1PQ0suR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5NT0NLLlZPID0gTUVESUEuTU9DSy5HQU1FICsgVk87XG4gICAgTUVESUEuTU9DSy5JTUFHRSA9IE1FRElBLk1PQ0suR0FNRSArIElNQUdFO1xuICAgIE1FRElBLk1PQ0suU1BSSVRFID0gTUVESUEuTU9DSy5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLk1PQ0suRlJBTUUgPSBNRURJQS5NT0NLLkdBTUUgKyBGUkFNRTtcbiAgICBNRURJQS5NT0NLLkZPTlQgPSBNRURJQS5NT0NLLkdBTUUgKyBGT05UO1xuXG4gICAgd2luZG93LkNNV04uTUVESUEgPSBNRURJQTtcbn0od2luZG93LkNNV04uZ2FtZUZvbGRlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5pbXBvcnQgTG9hZGVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEnO1xuXG5pbXBvcnQgaU9TU2NyZWVuIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2lvc19zcGxhc2hfc2NyZWVuLzAuMSc7XG5cbmltcG9ydCBUaXRsZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuJztcbmltcG9ydCBIaVRoZXJlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9oaV90aGVyZV9zY3JlZW4nO1xuaW1wb3J0IEtleUlzU29ydGluZ1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMva2V5X2lzX3NvcnRpbmdfc2NyZWVuJztcbmltcG9ydCBMaWdodHNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xpZ2h0c19zY3JlZW4nO1xuaW1wb3J0IEZpdmVXYXlzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuJztcbmltcG9ydCBMZXZlbFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfc2NyZWVuX2NvbXBvbmVudCc7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24xSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24xU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24ySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24yU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24zSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNEluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb241SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBMZXZlbENvbXBsZXRlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF9jb21wbGV0ZV9zY3JlZW5fY29tcG9uZW50JztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIxSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMkluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyNEluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyNUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyNVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBXYW50VG9TdGFja1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4nO1xuaW1wb3J0IFZpZGVvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy92aWRlb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBOb3dBTWVtYmVyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9ub3dfYV9tZW1iZXJfc2NyZWVuJztcbmltcG9ydCBRdWl0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9xdWl0X3NjcmVlbic7XG5cbnNrb2FzaC5zdGFydChcbiAgICA8c2tvYXNoLkdhbWVcbiAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgIGxvYWRlcj17PExvYWRlciAvPn1cbiAgICAgICAgc2NyZWVucz17W1xuICAgICAgICAgICAgaU9TU2NyZWVuLFxuICAgICAgICAgICAgVGl0bGVTY3JlZW4sXG4gICAgICAgICAgICBIaVRoZXJlU2NyZWVuLFxuICAgICAgICAgICAgS2V5SXNTb3J0aW5nU2NyZWVuLFxuICAgICAgICAgICAgTGlnaHRzU2NyZWVuLFxuICAgICAgICAgICAgRml2ZVdheXNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjApLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24xSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMSksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24yU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4yKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjMpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb240SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuNCksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb241U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oMSksXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjApLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMUluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIxU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4xKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMlNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMiksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIzSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjMpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNEluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI0U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi40KSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuNSksXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDIpLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy4wKSxcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIxU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy4xKSxcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy4yKSxcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIzSW5mb1NjcmVlbixcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy4zKSxcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXI0U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy40KSxcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIEZhbnRhc3RpY0Zvb2RTaGFyZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMy41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oMyksXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjApLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMUluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIxU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4xKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMlNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMiksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIzSW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjMpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNEluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI0U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC40KSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuNSksXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDQpLFxuICAgICAgICAgICAgV2FudFRvU3RhY2tTY3JlZW4sXG4gICAgICAgICAgICBWaWRlb1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMCksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjEpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4yKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMyksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjQpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oNSksXG4gICAgICAgICAgICBOb3dBTWVtYmVyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbig2KSxcbiAgICAgICAgXX1cbiAgICAgICAgbWVudXM9e3tcbiAgICAgICAgICAgIHF1aXQ6IFF1aXRTY3JlZW4sXG4gICAgICAgIH19XG4gICAgICAgIGFzc2V0cz17W1xuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X3JlY3ljbGUuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xpcXVpZHMuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xhbmRmaWxsLmpzb25gfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSlNPTiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9mb29kc2hhcmUuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2NvbXBvc3QuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9yZWN5Y2xlLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9saXF1aWRzLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9sYW5kZmlsbC5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fZm9vZHNoYXJlLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9jb21wb3N0LnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cHVycGxlLnJpYmJvbi5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWx1Z2dhZ2UucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9c3ByaXRlLnN0YXIucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX1mcmFtZS4wMS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfWZyYW1lLjAyLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9dHJhbnNpdGlvbi5mcmFtZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUubWFpbm5hdi5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXRpdGxlc2NybmJnLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wMS5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDIuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjAzLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wNC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhbnNpdGlvbi5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhc2gucmVjeWNsZS5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhc2gubGFuZGZpbGwuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLnRyYXNoLmNvbXBvc3QuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1xdWl0LmJhY2tncm91bmQuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJzZnhcIiByZWY9XCJidXR0b25cIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJ1dHRvbkNsaWNrLm1wM2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgcmVmPVwic2NyZWVuLWNvbXBsZXRlXCIgc3JjPXtgJHtNRURJQS5FRkZFQ1R9TmV4dEFwcGVhci5tcDNgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHdGl0bGVcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHdGl0bGUubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHMVwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0cxLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzJcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHMi5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0czXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzMubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHNFwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0c0Lm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzVcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHNS5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0c2XCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzYubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0aXRsZVwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzFcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2cyXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnM1wiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzRcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0cmFzaFwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIHRyYW5zaXRpb25cIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBxdWl0XCIgLz4sXG4gICAgICAgIF19XG4gICAgLz5cbik7XG5cbmlmIChtb2R1bGUuaG90KSBtb2R1bGUuaG90LmFjY2VwdCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJpZFwiOiBcImdyZWVuLXRlYW0tY2hhbGxlbmdlXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS4zXCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCJcIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbmZpZy5qc29uXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIExvYWRlciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsb2FkZXJcIiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5Mb2FkaW5nITwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lciBhbmltYXRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cImlvcy1zcGxhc2hcIlxuICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICBjb21wbGV0ZURlbGF5PXs2MDAwfVxuICAgICAgICAgICAgbmV4dERlbGF5PXszMDAwfVxuICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICAgICAgICBoaWRlUHJldlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TSEFSRUR9aW9zLXN0YXJ0LWJhbGwucG5nYH0gLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC1hbmltLmdpZmB9IC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwiaW1wb3J0ICdzaGFyZWQvZWZmZWN0cy9pbmRleCc7XG5cbmNvbnN0IEZJUkVXT1JLUyA9ICdmaXJld29ya3MnO1xuXG5sZXQgb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVmZmVjdCA9IHdpbmRvdy5DTVdOLm1ha2VFZmZlY3QoJ2ZpcmV3b3JrcycsIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCB7XG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmltYWdlKSxcbiAgICB9KTtcbn07XG5cbmxldCBvblN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgXy5pbnZva2UodGhpcy5lZmZlY3QsICdkZXN0cm95Jyk7XG4gICAgZGVsZXRlIHRoaXMuZWZmZWN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ0aXRsZVwiXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89XCJCS0d0aXRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxoMyBjb250ZW50PVwiR3JlZW4gVGVhbSBDaGFsbGVuZ2VcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWdyYWRpZW50LXRleHR1cmUuanBnYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJhc2hcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXRyYXNoY2FuLnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNoYXJhY3RlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWdyZWVudGVhbWNoYXJhYy5wbmdgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cmF5XCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGV0cmF5LnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e0ZJUkVXT1JLU31cbiAgICAgICAgICAgICAgICByZWY9e0ZJUkVXT1JLU31cbiAgICAgICAgICAgICAgICBvblN0YXJ0PXtvblN0YXJ0fVxuICAgICAgICAgICAgICAgIG9uU3RvcD17b25TdG9wfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGVzY3JuYmcuanBnYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuLmpzIiwiaW1wb3J0IGVmZmVjdHMgZnJvbSAnLi9lZmZlY3RzJztcblxubGV0IG1ha2VFZmZlY3QgPSBmdW5jdGlvbiAoZWZmZWN0TmFtZSwgbm9kZSwgb3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIF8uaW52b2tlKGVmZmVjdHMsIGVmZmVjdE5hbWUsIG5vZGUsIG9wdHMpO1xufTtcblxuaWYgKCF3aW5kb3cuQ01XTikgd2luZG93LkNNV04gPSB7fTtcbmlmICghd2luZG93LkNNV04ubWFrZUVmZmVjdCkgd2luZG93LkNNV04ubWFrZUVmZmVjdCA9IG1ha2VFZmZlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9pbmRleC5qcyIsImltcG9ydCBmaXJld29ya3MgZnJvbSAnLi9maXJld29ya3MnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZmlyZXdvcmtzXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZWZmZWN0cy5qcyIsIi8vIGNvZGUgdGFrZW4gZnJvbSBodHRwOi8vY29kZXBlbi5pby9oYWlkYW5nL3Blbi9lQm9xeXdcblxuY2xhc3MgRmlyZXdvcmtzIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBvcHRzKSB7XG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDQU5WQVMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5vZGUub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGxldCBwYXQgPSAnIzAwMCc7XG5cbiAgICAgICAgaWYgKG9wdHMuYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICBsZXQgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgbGV0IHRDdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHRDdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgIG9wdHMuYmFja2dyb3VuZEltYWdlLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBvcHRzLmJhY2tncm91bmRJbWFnZS5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kSW1hZ2UubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGVtcENhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0ID0gY3R4LmNyZWF0ZVBhdHRlcm4odGVtcENhbnZhcywgJ3JlcGVhdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICBwYXQgPSBvcHRzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2l6ZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBub2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGN0eC5yZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0O1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gICAgICAgIC8vIGluaXRcbiAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgLy8gb2JqZWN0c1xuICAgICAgICBsZXQgbGlzdEZpcmUgPSBbXTtcbiAgICAgICAgbGV0IGxpc3RGaXJld29yayA9IFtdO1xuICAgICAgICBsZXQgZmlyZU51bWJlciA9IDEwO1xuICAgICAgICBsZXQgY2VudGVyID0geyB4OiBjYW52YXMud2lkdGggLyAyLCB5OiBjYW52YXMuaGVpZ2h0IC8gMiB9O1xuICAgICAgICBsZXQgcmFuZ2UgPSAxMDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyZU51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZSA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLyAyIC0gcmFuZ2UgLyA0ICsgY2VudGVyLngsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yYW5kb20oKSAqIHJhbmdlICogMiArIGNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc2l6ZTogTWF0aC5yYW5kb20oKSArIDAuNSxcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2ZkMScsXG4gICAgICAgICAgICAgICAgdng6IE1hdGgucmFuZG9tKCkgLSAwLjUsXG4gICAgICAgICAgICAgICAgdnk6IC0oTWF0aC5yYW5kb20oKSArIDQpLFxuICAgICAgICAgICAgICAgIGF4OiBNYXRoLnJhbmRvbSgpICogMC4wMiAtIDAuMDEsXG4gICAgICAgICAgICAgICAgZmFyOiBNYXRoLnJhbmRvbSgpICogcmFuZ2UgKyAoY2VudGVyLnkgLSByYW5nZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlLmJhc2UgPSB7XG4gICAgICAgICAgICAgICAgeDogZmlyZS54LFxuICAgICAgICAgICAgICAgIHk6IGZpcmUueSxcbiAgICAgICAgICAgICAgICB2eDogZmlyZS52eFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGlzdEZpcmUucHVzaChmaXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcC5iaW5kKHRoaXMsIG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKTtcblxuICAgICAgICB0aGlzLmxvb3AoKTtcblxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBsb29wKG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgICAgICAgdGhpcy51cGRhdGUob3B0cywgbGlzdEZpcmUsIGxpc3RGaXJld29yaywgZmlyZU51bWJlciwgcmFuZ2UpO1xuICAgICAgICB0aGlzLmRyYXcob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yayk7XG4gICAgfVxuXG4gICAgcmFuZENvbG9yKCkge1xuICAgICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgIGxldCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgbGV0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gICAgfVxuXG4gICAgdXBkYXRlKG9wdHMsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdEZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaXJlID0gbGlzdEZpcmVbaV07XG5cbiAgICAgICAgICAgIGlmIChmaXJlLnkgPD0gZmlyZS5mYXIpIHtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGFkZCBmaXJld29ya1xuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucmFuZENvbG9yKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmaXJlTnVtYmVyICogNTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJld29yayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGZpcmUueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGZpcmUueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKyAxLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ4OiBNYXRoLnJhbmRvbSgpICogNSAtIDIuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5OiBNYXRoLnJhbmRvbSgpICogLTUgKyAxLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBheTogMC4wNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcmFuZ2UgLyAyKSArIHJhbmdlIC8gMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaXJld29yay5iYXNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogZmlyZXdvcmsubGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IGZpcmV3b3JrLnNpemVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEZpcmV3b3JrLnB1c2goZmlyZXdvcmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgIGZpcmUueSA9IGZpcmUuYmFzZS55O1xuICAgICAgICAgICAgICAgIGZpcmUueCA9IGZpcmUuYmFzZS54O1xuICAgICAgICAgICAgICAgIGZpcmUudnggPSBmaXJlLmJhc2Uudng7XG4gICAgICAgICAgICAgICAgZmlyZS5heCA9IE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZS54ICs9IGZpcmUudng7XG4gICAgICAgICAgICBmaXJlLnkgKz0gZmlyZS52eTtcbiAgICAgICAgICAgIGZpcmUudnggKz0gZmlyZS5heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBsaXN0RmlyZXdvcmsubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBmaXJld29yayA9IGxpc3RGaXJld29ya1tpXTtcbiAgICAgICAgICAgIGlmIChmaXJld29yaykge1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnggKz0gZmlyZXdvcmsudng7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsueSArPSBmaXJld29yay52eTtcbiAgICAgICAgICAgICAgICBmaXJld29yay52eSArPSBmaXJld29yay5heTtcbiAgICAgICAgICAgICAgICBmaXJld29yay5hbHBoYSA9IGZpcmV3b3JrLmxpZmUgLyBmaXJld29yay5iYXNlLmxpZmU7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsuc2l6ZSA9IGZpcmV3b3JrLmFscGhhICogZmlyZXdvcmsuYmFzZS5zaXplO1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLmFscGhhID0gZmlyZXdvcmsuYWxwaGEgPiAwLjYgPyAxIDogZmlyZXdvcmsuYWxwaGE7XG5cbiAgICAgICAgICAgICAgICBmaXJld29yay5saWZlLS07XG4gICAgICAgICAgICAgICAgaWYgKGZpcmV3b3JrLmxpZmUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0RmlyZXdvcmsuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yaykge1xuICAgICAgICAvLyBjbGVhclxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xODtcbiAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAvLyByZS1kcmF3XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc2NyZWVuJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0RmlyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSBsaXN0RmlyZVtpXTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZmlyZS54LCBmaXJlLnksIGZpcmUuc2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpcmUuZmlsbDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJld29yay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmV3b3JrID0gbGlzdEZpcmV3b3JrW2ldO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gZmlyZXdvcmsuYWxwaGE7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKGZpcmV3b3JrLngsIGZpcmV3b3JrLnksIGZpcmV3b3JrLnNpemUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaXJld29yay5maWxsO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub2RlLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBGaXJld29ya3Mobm9kZSwgb3B0cyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9maXJld29ya3MuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdoaS10aGVyZScsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhpIHRoZXJlITxici8+XG4gICAgICAgICAgICAgICAgSSdtIGhlcmUgdG88YnIvPlxuICAgICAgICAgICAgICAgIHRlYWNoIHlvdSBhYm91dDxici8+XG4gICAgICAgICAgICAgICAgc29ydGluZyB3YXN0ZSBhdDxici8+XG4gICAgICAgICAgICAgICAgeW91ciBzY2hvb2whXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlUaGVyZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2hpX3RoZXJlX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBDSEFSQUNURVIgPSBgJHtDTVdOLk1FRElBLklNQUdFfWdyZWVudGVhbWNoYXJhYy5wbmdgO1xuY29uc3QgRlJBTUUgPSBgJHtDTVdOLk1FRElBLkZSQU1FfWZyYW1lLjAxLnBuZ2A7XG5cbmxldCByZW5kZXJWTyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKCFvcHRzLnZvKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlZPfSR7b3B0cy52b30ubXAzYH1cbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IHJlbmRlclNGWCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKCFvcHRzLnNmeCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgIHJlZj1cInN0YXJ0XCJcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9JHtvcHRzLnNmeH0ubXAzYH1cbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IHJlbmRlckltYWdlID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAob3B0cy5yZW5kZXJJbWFnZSA9PT0gZmFsc2UpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJjaGFyYWN0ZXJcIiBzcmM9e29wdHMuaW1hZ2UgfHwgQ0hBUkFDVEVSfSAvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPXtvcHRzLmlkfVxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtvcHRzLmJhY2tncm91bmRBdWRpb31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnaW5mbycsIG9wdHMuY2xhc3NOYW1lKX1cbiAgICAgICAgPlxuICAgICAgICAgICAge3JlbmRlclZPKG9wdHMpfVxuICAgICAgICAgICAge3JlbmRlclNGWChvcHRzKX1cbiAgICAgICAgICAgIHtyZW5kZXJJbWFnZShvcHRzKX1cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtGUkFNRX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICB7b3B0cy5jb250ZW50fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvZW50XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e1tdLmNvbmNhdChvcHRzLmV4dHJhcyB8fCBbXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaW5mb19zY3JlZW5fY29tcG9uZW50LmpzIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuaW1wb3J0IGl0ZW1zUmVjeWNsZSBmcm9tICcuL2l0ZW1zX3JlY3ljbGUnO1xuXG52YXIgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zUmVjeWNsZSwgdiA9PlxuICAgIF8udXBwZXJGaXJzdChfLmNhbWVsQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKSlcbik7XG5cbnZhciBhcnJheU9mQXVkaW8gPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PlxuICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj17dn1cbiAgICAgICAga2V5PXtrfVxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgfVxuICAgICAgICBjb21wbGV0ZVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAna2V5LWlzLXNvcnRpbmcnLFxuICAgICAgICBjbGFzc05hbWU6ICdyaWdodCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoZSBrZXkgaXMgU09SVElORyE8YnIvPlxuICAgICAgICAgICAgICAgIFRoZXJlIGFyZSA1IFdBWVM8YnIvPlxuICAgICAgICAgICAgICAgIHlvdSBjYW4gc29ydDxici8+XG4gICAgICAgICAgICAgICAgdGhlIGZvb2Qgd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgIGF0IHlvdXIgc2Nob29sLi4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVGhlS2V5JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c2JyxcbiAgICAgICAgZXh0cmFzOiBhcnJheU9mQXVkaW8sXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2tleV9pc19zb3J0aW5nX3NjcmVlbi5qcyIsImxldCBiaW4gPSAncmVjeWNsZSc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2FsdW1pbnVtLWZvaWwnLFxuICAgICdBbHVtaW51bS1mb29kLWNhbi0xJyxcbiAgICAnQWx1bWludW0tZm9vZC1jYW4tMicsXG4gICAgJ0FsdW1pbnVtLWZvb2QtY2FuLTMnLFxuICAgICdhbHVtaW51bS1mb29kLWNhbi01JyxcbiAgICAnYWx1bWludW0tcGFuJyxcbiAgICAnYmFnZWwtcGFja2FnZScsXG4gICAgJ2NhcmRib2FyZC1ib3gnLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tMScsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi0yJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTMnLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tNCcsXG4gICAgJ2JveC1vZi1jb29raWVzLTMnLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24tMicsXG4gICAgJ2VtcHR5LWNob2NvbGF0ZS1taWxrLWNhcnRvbi00JyxcbiAgICAnZW1wdHktY2hvY29sYXRlLW1pbGstY2FydG9uLTUnLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24tNicsXG4gICAgJ2VtcHR5LWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMScsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTEyJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMTMnLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0xNCcsXG4gICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTEnLFxuICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZS0yJyxcbiAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMycsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItMicsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItMycsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItNScsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItNicsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItNycsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItOCcsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItOScsXG4gICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItMTAnLFxuICAgICdvcmFuZ2Utc29kYS1jYW4nLFxuICAgICdwYXBlci1mb2xkZXInLFxuICAgICdwYXBlci1wYWNrYWdpbmctMScsXG4gICAgJ3BhcGVyLXBhY2thZ2luZy04JyxcbiAgICAncGFwZXItcGFja2FnaW5nJyxcbiAgICAncGxhc3RpYy1jdXAtMScsXG4gICAgJ3BsYXN0aWMtY3VwLTInLFxuICAgICdwbGFzdGljLWN1cC0zJyxcbiAgICAncGxhc3RpYy1jdXAtNCcsXG4gICAgJ3BsYXN0aWMtY3VwLTUnLFxuICAgICdwbGFzdGljLWN1cC02JyxcbiAgICAncGxhc3RpYy1jdXAtNycsXG4gICAgJ3BsYXN0aWMtbGlkcy0xJyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctMicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTQnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy01JyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTcnLFxuICAgICd3cmFwcGluZy1wYXBlcicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwiaW1wb3J0IGl0ZW1MYW5kZmlsbCBmcm9tICcuL2l0ZW1zX2xhbmRmaWxsJztcblxubGV0IGJpbk5hbWVzID0gW1xuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdsaXF1aWRzJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ2Zvb2Qtc2hhcmUnLFxuXTtcblxubGV0IHJldmVhbENvbnRlbnQgPSB7XG4gICAgcmVjeWNsZTogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIFJFQ1lDTElORyBpdGVtcyBhcmUgdGhvc2U8YnIvPlxuICAgICAgICAgICAgdGhhdCBjYW4gYmUgcmVwcm9jZXNzZWQgYW5kPGJyLz5cbiAgICAgICAgICAgIG1hZGUgaW50byBuZXcgcHJvZHVjdHMuPGJyLz5cbiAgICAgICAgICAgIFBhcGVyLCBtZXRhbCwgYW5kIHBsYXN0aWMgYXJlPGJyLz5cbiAgICAgICAgICAgIGNvbW1vbiByZWN5Y2xhYmxlIG1hdGVyaWFscy5cbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgbGFuZGZpbGw6IChcbiAgICAgICAgPHA+XG4gICAgICAgICAgICBMQU5ERklMTCBpdGVtcyBhcmUgdGhpbmdzIHRoYXQ8YnIvPlxuICAgICAgICAgICAganVzdCBjYW4ndCBiZSByZXVzZWQgaW4gYW55IHdheS48YnIvPlxuICAgICAgICAgICAgUHV0IHlvdXIgdGhpbmtpbmcgY2FwIG9uITxici8+XG4gICAgICAgICAgICBMb29rIGZvciB3YXlzIHRvIG1ha2U8YnIvPlxuICAgICAgICAgICAgZGlmZmVyZW50IGNob2ljZXMgdGhhdDxici8+XG4gICAgICAgICAgICByZWR1Y2UgbGFuZGZpbGwgd2FzdGUuXG4gICAgICAgIDwvcD5cbiAgICApLFxuICAgIGxpcXVpZHM6IChcbiAgICAgICAgPHA+XG4gICAgICAgICAgICBMSVFVSURTIG11c3QgYmUgc2VwYXJhdGVkPGJyLz5cbiAgICAgICAgICAgIGZyb20gdGhlaXIgY29udGFpbmVycyE8YnIvPlxuICAgICAgICAgICAgVGhpcyBhbGxvd3MgZm9yIHRoZSBjb250YWluZXJzPGJyLz5cbiAgICAgICAgICAgIHRvIGJlIHByb3Blcmx5IHByb2Nlc3NlZC48YnIvPlxuICAgICAgICAgICAgR2V0IHBvdXJpbmchXG4gICAgICAgIDwvcD5cbiAgICApLFxuICAgIGNvbXBvc3Q6IChcbiAgICAgICAgPHA+XG4gICAgICAgICAgICBDT01QT1NUSU5HIGlzPGJyLz5cbiAgICAgICAgICAgIGZlcnRpbGl6ZXIgaW4gdGhlIG1ha2luZyE8YnIvPlxuICAgICAgICAgICAgSXQncyBtYWRlIGZyb20gZm9vZCBzY3JhcHM8YnIvPlxuICAgICAgICAgICAgYW5kIG9yZ2FuaWMgbWF0ZXJpYWxzPGJyLz5cbiAgICAgICAgICAgIHRoYXQgZGVjYXkgYW5kIGJlY29tZTxici8+XG4gICAgICAgICAgICBmb29kIGZvciBwbGFudHMhXG4gICAgICAgIDwvcD5cbiAgICApLFxuICAgICdmb29kLXNoYXJlJzogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIEZPT0QgU0hBUklORyBpczxici8+XG4gICAgICAgICAgICBhIGdyZWF0IHdheSB0byBrZWVwPGJyLz5cbiAgICAgICAgICAgIGZyb20gd2FzdGluZyBmb29kITxici8+XG4gICAgICAgICAgICBMZWF2ZSBpdGVtcyB0aGF0IG90aGVyczxici8+XG4gICAgICAgICAgICBjYW4gbWFrZSBpbnRvIGEgc25hY2shXG4gICAgICAgIDwvcD5cbiAgICApLFxufTtcblxubGV0IHJldmVhbFZPcyA9IHtcbiAgICByZWN5Y2xlOiAnUmVjeWNsaW5nTWF0ZXJpYWxzJyxcbiAgICBsYW5kZmlsbDogJ1RoaW5raW5nQ2FwJyxcbiAgICBsaXF1aWRzOiAnR2V0UG91cmluZycsXG4gICAgY29tcG9zdDogJ0dldFBvdXJpbmcnLCAvLyBuZWVkcyB0byBiZSByZXBsYWNlZFxuICAgICdmb29kLXNoYXJlJzogJ0dldFBvdXJpbmcnLCAvLyBuZWVkcyB0byBiZSByZXBsYWNlZFxufTtcblxubGV0IGJpbkNvbXBvbmVudHMgPSBfLm1hcChiaW5OYW1lcywgYmluID0+XG4gICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPXtiaW59IG1lc3NhZ2U9e2Jpbn0gLz5cbik7XG5cbmxldCByZXZlYWxMaXN0ID0gXy5tYXAocmV2ZWFsQ29udGVudCwgKGNvbnRlbnQsIHJlZikgPT5cbiAgICA8c2tvYXNoLkNvbXBvbmVudCByZWY9e3JlZn0+XG4gICAgICAgIHtjb250ZW50fVxuICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbik7XG5cbmxldCBtZWRpYUNvbGxlY3Rpb25MaXN0ID0gXy5tYXAocmV2ZWFsVk9zLCAoY29udGVudCwgcmVmKSA9PlxuICAgIDxza29hc2guQXVkaW8gdHlwZT1cInZvaWNlT3ZlclwiIHJlZj17cmVmfSBzcmM9e2Ake0NNV04uTUVESUEuVk8gKyBjb250ZW50fS5tcDNgfSAvPlxuKTtcblxubGV0IGltYWdlU3JjcyA9IFtcbiAgICBgJHtDTVdOLk1FRElBLklNQUdFfWxpZ2h0cy5wbmdgLFxuICAgIGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5iaW5zLnBuZ2AsXG4gICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9c3ByaXRlLmJ0bi5wbmdgLFxuXTtcblxubGV0IGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtTGFuZGZpbGwsIHYgPT5cbiAgICBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSkpXG4pO1xuXG5sZXQgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJsaWdodHNcIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNlwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guUmVwZWF0ZXJcbiAgICAgICAgICAgICAgICBhbW91bnQ9e2ltYWdlU3Jjcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgaXRlbT17PHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiAvPn1cbiAgICAgICAgICAgICAgICBwcm9wcz17aW1hZ2VTcmNzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlnaHRzXCJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtza29hc2gubWl4aW5zLlNlbGVjdGFibGVSZXZlYWwocHJvcHMsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlczogYmluQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICByZXZlYWxzOiByZXZlYWxMaXN0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYUNvbGxlY3Rpb25MaXN0LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLnRhcmdldCcpICYmICdjbGljayd9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImNsaWNrXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1DbGlja1JlY0J1dHRvbi5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SW5mb0ZyYW1lTW92ZTEubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb2VudFxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtbXS5jb25jYXQoYXJyYXlPZkF1ZGlvIHx8IFtdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9saWdodHNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdsYW5kZmlsbCc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMScsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMicsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMycsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtNCcsXG4gICAgJ2JhZy1vZi13cmFwcGVycycsXG4gICAgJ2J1YmJsZS13cmFwJyxcbiAgICAnYnVycml0by13cmFwcGVyLTEnLFxuICAgICdidXJyaXRvLXdyYXBwZXItMicsXG4gICAgJ2J1cnJpdG8td3JhcHBlci0zJyxcbiAgICAnYnVycml0by13cmFwcGVyLTQnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItMScsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci0yJyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTMnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItNCcsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci01JyxcbiAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci0xJyxcbiAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyLTInLFxuICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXItMycsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci00JyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0xJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0yJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0zJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy00JyxcbiAgICAnZW1wdHktbGVtb25hZGUtYm94LTUnLFxuICAgICdlbXB0eS1sZW1vbmFkZS1ib3gnLFxuICAgICdlbXB0eS1wb3RhdG8tY2hpcC1iYWctMicsXG4gICAgJ2VtcHR5LXBvdGF0by1jaGlwLWJhZy0zJyxcbiAgICAnZW1wdHktcG90YXRvLWNoaXAtYmFnJyxcbiAgICAnZW5lcmd5LWJhci13cmFwcGVyLTInLFxuICAgICdlbmVyZ3ktYmFyLXdyYXBwZXInLFxuICAgICdmcnVpdC1kcmluay1lbXB0eS1wb3VjaCcsXG4gICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXItMicsXG4gICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXItMycsXG4gICAgJ2dpZnQtcmliYm9ucycsXG4gICAgJ2dyYWhhbS1jb29raWUtd3JhcHBlci0xJyxcbiAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyJyxcbiAgICAncGFwZXItanVpY2UtYm94LTEnLFxuICAgICdwYXBlci1qdWljZS1ib3gtMicsXG4gICAgJ3BhcGVyLWp1aWNlLWJveC0zJyxcbiAgICAncGxhc3RpYyBmb3JrJyxcbiAgICAncGxhc3RpYy1iYWdnaWUtMicsXG4gICAgJ3BsYXN0aWMtYmFnZ2llJyxcbiAgICAncGxhc3RpYy1rbmlmZScsXG4gICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICdwbGFzdGljLXN0cmF3cycsXG4gICAgJ3JlZC1naWZ0LWJvdycsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMScsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMicsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMycsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItNScsXG4gICAgJ3N0eXJvZm9hbS1zb3VwLWN1cCcsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuXG52YXIgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zQ29tcG9zdCwgdiA9PlxuICAgIF8udXBwZXJGaXJzdChfLmNhbWVsQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKSlcbik7XG5cbnZhciBhcnJheU9mQXVkaW8gPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PlxuICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj17dn1cbiAgICAgICAga2V5PXtrfVxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgfVxuICAgICAgICBjb21wbGV0ZVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZml2ZS13YXlzJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXaXRoIDUgd2F5czxici8+XG4gICAgICAgICAgICAgICAgdG8gc29ydCBsZXQncyB0ZXN0PGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIGtub3dsZWRnZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICc1V2F5cycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgICAgIGV4dHJhczogYXJyYXlPZkF1ZGlvLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdjb21wb3N0JztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGUtY29yZScsXG4gICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgJ2NlbGVyeS1zdGljaycsXG4gICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAnY29mZmVlLWN1cC0yJyxcbiAgICAnY29mZmVlLWN1cCcsXG4gICAgJ2NvZmZlZS1ncm91bmRzJyxcbiAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTEnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTMnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTQnLFxuICAgICdmb29kLXNvaWxlZC1wYXBlciBwbGF0ZScsXG4gICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgJ29yYW5nZS1zbGljZScsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncy0xJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzLTInLFxuICAgICdwZW5jaWwtc2hhdmluZ3MtMycsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncycsXG4gICAgJ3BpenphLWNydXN0JyxcbiAgICAndGVhYmFnJyxcbiAgICAndW51c2VkLXBhcGVyLXRyYXktMScsXG4gICAgJ3VudXNlZC1wYXBlci10cmF5LTInLFxuICAgICd1bnVzZWQtcGFwZXItdHJheS0zJyxcbiAgICAndW51c2VkLXBhcGVyLXRyYXktNCcsXG4gICAgJ3VzZWQtbmFwa2lucycsXG4gICAgJ3VzZWQtcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXItMScsXG4gICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlci0yJyxcbiAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyLTQnLFxuICAgICd1c2VkLXRha2VvdXQtY29udGFpbmVycycsXG4gICAgJ3VzZWQtd2hpdGUtbmFwa2luJyxcbiAgICAnd2hpdGUtcGFwZXItdG93ZWwtc2hlZXQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfY29tcG9zdC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5sZXQgbGV2ZWxLZXlzID0gW1xuICAgICdyZWN5Y2xpbmdDaGFtcGlvbicsXG4gICAgJ3ByaWNlbGVzc1BvdXJlcicsXG4gICAgJ2ZhbnRhc3RpY0Zvb2RTaGFyZXInLFxuICAgICdkeW5hbWljRGl2ZXJ0ZXInLFxuICAgICdtYXN0ZXJTb3J0ZXInLFxuXTtcblxubGV0IGxldmVsTmFtZXMgPSBbXG4gICAgPHA+UmVjeWNsaW5nPGJyLz5DaGFtcGlvbjwvcD4sXG4gICAgPHA+UHJpY2VsZXNzPGJyLz5Qb3VyZXI8L3A+LFxuICAgIDxwPkZhbnRhc3RpYzxici8+Rm9vZCBTaGFyZXI8L3A+LFxuICAgIDxwPkR5bmFtaWM8YnIvPkRpdmVydGVyPC9wPixcbiAgICA8cD5NYXN0ZXI8YnIvPlNvcnRlcjwvcD4sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobGV2ZWxOdW1iZXIpIHtcbiAgICBsZXQgbGV2ZWxJbnQgPSBfLmZsb29yKGxldmVsTnVtYmVyKTtcbiAgICBsZXQgbGV2ZWxLZXkgPSBsZXZlbEtleXNbbGV2ZWxJbnQgLSAxXTtcbiAgICBsZXQgbGV2ZWxOYW1lID0gbGV2ZWxOYW1lc1tsZXZlbEludCAtIDFdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgICAgICBsZXQgbGV2ZWxEYXRhID0gXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS4ke2xldmVsS2V5fS5sZXZlbHNgLCB7fSk7XG4gICAgICAgIGxldCByZXBlYXRlclByb3BzID0gXy5tYXAoXy5nZXQocHJvcHMsICdkYXRhLmVhcm5lZCcpLCAobGV2ZWwsIGluZGV4KSA9PlxuICAgICAgICAgICAgKHtjbGFzc05hbWU6IGxldmVsLnBsYXlpbmcgJiYgXy5nZXQobGV2ZWxEYXRhLCBgJHtpbmRleH0uY29tcGxldGVgKSA/ICdlYXJuZWQnIDogJyd9KVxuICAgICAgICApO1xuICAgICAgICBsZXQgYWxsRWFybmVkID0gcmVwZWF0ZXJQcm9wcy5sZW5ndGggPT09IDUgJiYgXy5ldmVyeShyZXBlYXRlclByb3BzLCB2ID0+IHYuY2xhc3NOYW1lKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2BwcmUtbGV2ZWwtJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7bGV2ZWxJbnR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0cy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgQUxMX0VBUk5FRDogYWxsRWFybmVkLFxuICAgICAgICAgICAgICAgICAgICBBUFBFQVI6IF8uZ2V0KHByb3BzLCAnZGF0YS5hcHBlYXIucGxheWluZycpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxDb21wbGV0ZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVRhcmdldD1cImFwcGVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MZXZlbEFwcGVhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgXy5tYXAobGV2ZWxEYXRhLCAoZGF0YSwgbGV2ZWwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PXtbJ2Vhcm5lZCcsIGxldmVsXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9R2V0U3Rhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU9e2RhdGEuY29tcGxldGUgPyAxIDogMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cHVycGxlLnJpYmJvbi5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWx1Z2dhZ2UucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9ZmxpcHMucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJlcGVhdGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXJzXCJcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXs1fVxuICAgICAgICAgICAgICAgICAgICBwcm9wcz17cmVwZWF0ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkxldmVsIHtsZXZlbEludH08L2gzPlxuICAgICAgICAgICAgICAgICAgICB7bGV2ZWxOYW1lfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdzbWFsbCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExldCdzIHN0YXJ0IHdpdGggc2ltcGxlIHNvcnRpbmc8YnIvPlxuICAgICAgICAgICAgICAgIG9mIFJlY3ljbGFibGVzLCBDb21wb3N0YWJsZXM8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCBMYW5kZmlsbCBpdGVtcy48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgUHVzaCB0aGUgY29ycmVjdCBidXR0b24gdG8gbGFuZDxici8+XG4gICAgICAgICAgICAgICAgaXRlbXMgaW4gdGhlIGJpbiB0aGV5IGJlbG9uZyB0by5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdMZXRzU3RhcnQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQnO1xuaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcblxuY29uc3QgUFRTID0gJ3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIGlmIChNYXRoLmFicyhwcm9wcy5nYW1lU3RhdGUuY3VycmVudFNjcmVlbkluZGV4IC0gcGFyc2VJbnQoa2V5LCAxMCkpID4gMikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2NyZWVuUHJvcHM7XG4gICAgICAgIGxldCB0aW1lclByb3BzO1xuICAgICAgICBsZXQgcmV2ZWFsUHJvcHM7XG4gICAgICAgIGxldCBzZWxlY3RhYmxlUHJvcHM7XG4gICAgICAgIGxldCBkcm9wcGVyUHJvcHM7XG4gICAgICAgIGxldCBjYXRjaGVyUHJvcHM7XG4gICAgICAgIGxldCBsaWZlUHJvcHM7XG4gICAgICAgIGxldCBleHRyYUNvbXBvbmVudHM7XG5cbiAgICAgICAgY29uc3QgTEVWRUxfUEFUSCA9IGBnYW1lU3RhdGUuZGF0YS4ke18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpfS5sZXZlbHMuJHtvcHRzLmxldmVsfWA7XG5cbiAgICAgICAgbGV0IGNhdGNoYWJsZXNBcnJheSA9IG9wdHMuZ2V0Q2F0Y2hhYmxlc0FycmF5KCk7XG5cbiAgICAgICAgbGV0IGJpbkNvbXBvbmVudHMgPSBfLm1hcChvcHRzLmJpbk5hbWVzLCBuYW1lID0+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9e25hbWV9IG1lc3NhZ2U9e25hbWV9IC8+XG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHNjYWxlID0gXy5nZXQocHJvcHMsICdnYW1lU3RhdGUuc2NhbGUnLCAxKTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LnN0YXJ0YCwgZmFsc2UpO1xuICAgICAgICBsZXQgZ2FtZUNvbXBsZXRlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmNvbXBsZXRlYCwgZmFsc2UpO1xuICAgICAgICBsZXQgZHJvcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5kcm9wJywgZmFsc2UpO1xuICAgICAgICBsZXQgZHJvcENsYXNzID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLmRyb3BDbGFzcycpO1xuICAgICAgICBsZXQgcGlja1VwID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLnBpY2tVcCcsIGZhbHNlKTtcbiAgICAgICAgbGV0IG9uUGlja1VwID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLm9uUGlja1VwJyk7XG4gICAgICAgIGxldCBzZWxlY3RJdGVtID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLnNlbGVjdEl0ZW0nKTtcbiAgICAgICAgbGV0IGNhdGNoYWJsZVJlZnMgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIucmVmcycsIFtdKTtcbiAgICAgICAgbGV0IGl0ZW1SZWYgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5yZWYnKTtcbiAgICAgICAgbGV0IHJlbW92ZUl0ZW1DbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5yZW1vdmVDbGFzc05hbWUnKTtcbiAgICAgICAgbGV0IGl0ZW1Ub3AgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS50b3AnLCAwKSAvIHNjYWxlO1xuICAgICAgICBsZXQgaXRlbUxlZnQgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5sZWZ0JywgMCkgLyBzY2FsZSB8fCAnYXV0byc7XG4gICAgICAgIGxldCBjYXVnaHQgPSBfLmdldChwcm9wcywgJ2RhdGEuY2F0Y2hlci5jYXVnaHQnLCAnJyk7XG4gICAgICAgIGxldCByZXZlYWxPcGVuID0gXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgZmFsc2UpO1xuICAgICAgICBsZXQgcmV2ZWFsQ2xvc2UgPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLmNsb3NlJywgZmFsc2UpO1xuICAgICAgICBsZXQgcGxheSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5wbGF5JywgbnVsbCk7XG5cbiAgICAgICAgbGV0IGF1ZGlvQXJyYXkgPSBvcHRzLmdldEF1ZGlvQXJyYXkoKTtcblxuICAgICAgICBpZiAoaXRlbVJlZikgY2F0Y2hhYmxlUmVmcyA9IFtpdGVtUmVmXTtcblxuICAgICAgICBvcHRzLm5leHQgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIubmV4dCcsIGZhbHNlKTtcbiAgICAgICAgb3B0cy5pdGVtUmVmID0gaXRlbVJlZjtcbiAgICAgICAgb3B0cy5pdGVtTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLm5hbWUnLCAnJyk7XG4gICAgICAgIG9wdHMuaXRlbU5ldyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLm5ldycsIGZhbHNlKTtcbiAgICAgICAgb3B0cy5pdGVtQ2xhc3NOYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0uY2xhc3NOYW1lJyk7XG4gICAgICAgIG9wdHMuaXRlbUFtb3VudCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLmFtb3VudCcsIDApO1xuICAgICAgICBvcHRzLnBvdXIgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5wb3VyJywgZmFsc2UpO1xuICAgICAgICBvcHRzLnNjb3JlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LnNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMuaGlnaFNjb3JlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmhpZ2hTY29yZWAsIDApO1xuICAgICAgICBvcHRzLmxlZnQgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIubGVmdCcsIDApO1xuICAgICAgICBvcHRzLmhpdHMgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGl0c2AsIDApO1xuICAgICAgICBvcHRzLnRydWNrQ2xhc3NOYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLnRydWNrQ2xhc3NOYW1lJywgJycpO1xuICAgICAgICBvcHRzLnNlbGVjdGFibGVNZXNzYWdlID0gXy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUubWVzc2FnZScsICcnKTtcbiAgICAgICAgb3B0cy5tb3ZlQ2xhdyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tb3ZlQ2xhdycsIGZhbHNlKTtcbiAgICAgICAgb3B0cy5wbGF5QXVkaW8gPSAoXG4gICAgICAgICAgICBwbGF5ID8gcGxheSA6XG4gICAgICAgICAgICBkcm9wICYmICFvcHRzLnRydWNrQ2xhc3NOYW1lID8gJ2Ryb3AnIDpcbiAgICAgICAgICAgIHBpY2tVcCA/ICdwaWNrVXAnIDpcbiAgICAgICAgICAgIG9wdHMubmV4dCA/ICduZXh0JyA6XG4gICAgICAgICAgICBvcHRzLnBvdXIgPyAncG91cicgOlxuICAgICAgICAgICAgb3B0cy5uZXh0ID8gJ2NvcnJlY3QnIDpcbiAgICAgICAgICAgIHJldmVhbE9wZW4gPT09ICdyZXNvcnQnID8gJ3Jlc29ydCcgOlxuICAgICAgICAgICAgb3B0cy5pdGVtTmV3ID8gXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKG9wdHMuaXRlbU5hbWUpKSA6XG4gICAgICAgICAgICBkcm9wQ2xhc3MgPT09ICdUUkFZLVNUQUNLSU5HJyAmJiBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICd0cmF5JykgPyAndHJheScgOlxuICAgICAgICAgICAgb3B0cy5pdGVtTmFtZSA/ICdzZWxlY3QnIDogbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNjcmVlblByb3BzID0gb3B0cy5nZXRTY3JlZW5Qcm9wcyhvcHRzKTtcbiAgICAgICAgdGltZXJQcm9wcyA9IG9wdHMuZ2V0VGltZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgcmV2ZWFsUHJvcHMgPSBvcHRzLmdldFJldmVhbFByb3BzKG9wdHMpO1xuICAgICAgICBzZWxlY3RhYmxlUHJvcHMgPSBvcHRzLmdldFNlbGVjdGFibGVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHBlclByb3BzID0gb3B0cy5nZXREcm9wcGVyUHJvcHMob3B0cyk7XG4gICAgICAgIGNhdGNoZXJQcm9wcyA9IG9wdHMuZ2V0Q2F0Y2hlclByb3BzKG9wdHMpO1xuICAgICAgICBsaWZlUHJvcHMgPSBvcHRzLmdldExpZmVQcm9wcyhvcHRzKTtcbiAgICAgICAgZXh0cmFDb21wb25lbnRzID0gb3B0cy5nZXRFeHRyYUNvbXBvbmVudHMob3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9eyFnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICB7Li4uc2NyZWVuUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5zY29yZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7UFRTfVxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5UaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJtbTpzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9eyFyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGltZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpdGVtLW5hbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBQ1RJVkU6IG9wdHMuaXRlbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBpdGVtVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogaXRlbUxlZnQsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuaXRlbU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PXswfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3Q9e29wdHMubWF4SGl0c31cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5oaXRzfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxpZmVQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxNYW51YWxEcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXtvcHRzLmRyb3BwZXJBbW91bnR9XG4gICAgICAgICAgICAgICAgICAgIGRyb3A9e2Ryb3B9XG4gICAgICAgICAgICAgICAgICAgIHBpY2tVcD17cGlja1VwfVxuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcD17b25QaWNrVXB9XG4gICAgICAgICAgICAgICAgICAgIG5leHQ9e29wdHMubmV4dH1cbiAgICAgICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17Y2F0Y2hhYmxlc0FycmF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke29wdHMubGVmdH1weClgXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNhdWdodD17Y2F1Z2h0fVxuICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M9e2Ryb3BDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZj17aXRlbVJlZn1cbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzTmFtZT17b3B0cy5pdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVJdGVtQ2xhc3NOYW1lPXtyZW1vdmVJdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtPXtzZWxlY3RJdGVtfVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdiaW5zJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgRElTQUJMRUQ6ICFvcHRzLml0ZW1OYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENhdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWNrZXQ9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGFibGVSZWZzPXtjYXRjaGFibGVSZWZzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e2NhdWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17ZHJvcCB8fCBpdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZUZyYWN0aW9uPXtvcHRzLmNvbGxpZGVGcmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0cz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5jYXRjaGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdGFibGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIHtleHRyYUNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtyZXZlYWxDbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ucmV2ZWFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVzb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBwbGF5PXtvcHRzLnBsYXlBdWRpb31cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2F1ZGlvQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25QbGF5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3BsYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsImltcG9ydCBDYXRjaCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEnO1xuXG5jbGFzcyBDYXRjaGVyIGV4dGVuZHMgQ2F0Y2gge1xuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc2tvYXNoLkNvbXBvbmVudC5wcm90b3R5cGUuYm9vdHN0cmFwLmNhbGwodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZXMgPSBfLnJlZHVjZSh0aGlzLnJlZnMsIChhLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoay5pbmRleE9mKCdidWNrZXRzLScpKSByZXR1cm4gYTtcbiAgICAgICAgICAgIGFba10gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh2KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBzdGF0ZS5zY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NvbGxpc2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgICAgIF8uZWFjaCh0aGlzLmJ1Y2tldE5vZGVzLCAoYnVja2V0Tm9kZSwgYnVja2V0UmVmS2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgYnVja2V0UmVjdCA9IGJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5wcm9wcy5jYXRjaGFibGVSZWZzLCBjYXRjaGFibGVSZWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIGNhdGNoYWJsZVJlZi5ET01Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYnVja2V0UmVmS2V5XSwgY2F0Y2hhYmxlUmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciB4Q2VudGVyID0gY2F0Y2hSZWN0LmxlZnQgKyAoY2F0Y2hSZWN0LnJpZ2h0IC0gY2F0Y2hSZWN0LmxlZnQpIC8gMjtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSAoYnVja2V0UmVjdC5ib3R0b20gLSBidWNrZXRSZWN0LnRvcCkgKiB0aGlzLnByb3BzLmNvbGxpZGVGcmFjdGlvbjtcbiAgICAgICAgcmV0dXJuIChidWNrZXRSZWN0LnRvcCAtIHlPZmZzZXQgPCBjYXRjaFJlY3QuYm90dG9tICYmIGJ1Y2tldFJlY3QudG9wICsgeU9mZnNldCA+IGNhdGNoUmVjdC50b3AgJiZcbiAgICAgICAgICAgIHhDZW50ZXIgPiBidWNrZXRSZWN0LmxlZnQgJiYgeENlbnRlciA8IGJ1Y2tldFJlY3QucmlnaHQpO1xuICAgIH1cblxuICAgIHNlbGVjdENhdGNoYWJsZShidWNrZXRSZWYsIGNhdGNoYWJsZVJlZikge1xuICAgICAgICB2YXIgY2F0Y2hhYmxlUmVmS2V5O1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fFxuICAgICAgICAgICAgIXRoaXMuc3RhdGUuY2FuQ2F0Y2ggfHwgIWNhdGNoYWJsZVJlZi5jYW5DYXRjaCgpKSByZXR1cm47XG4gICAgICAgIGNhdGNoYWJsZVJlZktleSA9IGNhdGNoYWJsZVJlZi5wcm9wc1snZGF0YS1yZWYnXTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleXM6IFt0aGlzLnByb3BzLmNhdWdodFRhcmdldCwgJ2NhdWdodCddLFxuICAgICAgICAgICAgZGF0YTogY2F0Y2hhYmxlUmVmS2V5LFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNhdGNoYWJsZVJlZi5wcm9wcy5tZXNzYWdlID09PSBidWNrZXRSZWYucHJvcHMubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcnJlY3QoYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvcnJlY3QuY2FsbCh0aGlzLCBidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgfVxuXG4gICAgaW5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkluY29ycmVjdC5jYWxsKHRoaXMsIGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5wYXVzZSAmJiBwcm9wcy5wYXVzZSAhPT0gdGhpcy5wcm9wcy5wYXVzZSkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLnJlc3VtZSAmJiBwcm9wcy5yZXN1bWUgIT09IHRoaXMucHJvcHMucmVzdW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQnVja2V0KCkge1xuICAgICAgICByZXR1cm4gXy5tYXAoW10uY29uY2F0KHRoaXMucHJvcHMuYnVja2V0KSwgKGJ1Y2tldCwga2V5KSA9PlxuICAgICAgICAgICAgPGJ1Y2tldC50eXBlXG4gICAgICAgICAgICAgICAgey4uLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eydidWNrZXRzLScgKyBrZXl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgnYXNzZXRzJyl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQnVja2V0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhdGNoZXIuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgY2F1Z2h0VGFyZ2V0OiAnY2F0Y2hlcicsXG4gICAgY29sbGlkZUZyYWN0aW9uOiAxIC8gNixcbn0sIENhdGNoLmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGNoZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuNC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5jbGFzcyBDYXRjaCBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucyA9IHRoaXMuY2hlY2tDb2xsaXNpb25zLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcblxuICAgICAgICB0aGlzLmJ1Y2tldE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYnVja2V0KTtcbiAgICAgICAgdGhpcy5jYXRjaGFibGVOb2RlcyA9IF8ubWFwKHRoaXMucHJvcHMuY2F0Y2hhYmxlcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF0pO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBfLmZvckVhY2godGhpcy5jYXRjaGFibGVOb2RlcywgZnVuY3Rpb24gKG5vZGUsIGtleSkge1xuICAgICAgICAgICAgdmFyIGNhdGNoYWJsZVJlZiA9IHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25pdGVyYXRpb24nLCBjYXRjaGFibGVSZWYucmVzZXQsIGZhbHNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgdmFyIGNhdGNoUmVmID0gdGhpcy5yZWZzWydjYXRjaC1jb21wb25lbnQnXTtcbiAgICAgICAgaWYgKGNhdGNoUmVmKSB7XG4gICAgICAgICAgICBjYXRjaFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vdXNlWDogZS5wYWdlWFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICAgICAgICB2YXIgem9vbSA9IHN0YXRlLnNjYWxlO1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gdGhpcy5nZXRFZGdlcyh0aGlzLmJ1Y2tldE5vZGUpO1xuICAgICAgICAgICAgdmFyIGJ1Y2tldFdpZHRoID0gZWRnZXMucmlnaHQgLSBlZGdlcy5sZWZ0O1xuICAgICAgICAgICAgdmFyIGxlZnRCb3VuZCA9IHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQgP1xuICAgICAgICAgICAgICAgIHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQub2Zmc2V0V2lkdGggLSBidWNrZXRXaWR0aCA6IDA7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1Y2tldFRvcDogZWRnZXMudG9wLFxuICAgICAgICAgICAgICAgIGJ1Y2tldEJvdHRvbTogZWRnZXMuYm90dG9tLFxuICAgICAgICAgICAgICAgIGJ1Y2tldFdpZHRoLFxuICAgICAgICAgICAgICAgIGxlZnRCb3VuZCxcbiAgICAgICAgICAgICAgICB6b29tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICAgICAgdGhpcy5ib290c3RyYXAoKTtcbiAgICB9XG5cbiAgICByZXN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucygpO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdXNlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bWUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiBmYWxzZVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdENhdGNoYWJsZShjYXRjaGFibGVOb2RlLCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHwgIXRoaXMuc3RhdGUuY2FuQ2F0Y2ggfHxcbiAgICAgICAgICAgICFjYXRjaGFibGVOb2RlLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgY2F0Y2hhYmxlTm9kZS5tYXJrQ2F1Z2h0KCk7XG4gICAgICAgIGlmIChjYXRjaGFibGVOb2RlLnByb3BzLmlzQ29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChjYXRjaGFibGVOb2RlLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGNhdGNoYWJsZSwga2V5KTtcbiAgICB9XG5cbiAgICBpbmNvcnJlY3QoY2F0Y2hhYmxlLCBrZXkpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2luY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgdmFyIGJ1Y2tldFJlY3QgPSB0aGlzLmJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIHZhbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciB4Q2VudGVyID0gY2F0Y2hSZWN0LmxlZnQgKyAoY2F0Y2hSZWN0LnJpZ2h0IC0gY2F0Y2hSZWN0LmxlZnQpIC8gMjtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSAoY2F0Y2hSZWN0LmJvdHRvbSAtIGNhdGNoUmVjdC50b3ApIC8gNjtcbiAgICAgICAgcmV0dXJuIChidWNrZXRSZWN0LnRvcCA8IGNhdGNoUmVjdC5ib3R0b20gLSB5T2Zmc2V0ICYmIGJ1Y2tldFJlY3QudG9wID4gY2F0Y2hSZWN0LnRvcCArIHlPZmZzZXQgJiZcbiAgICAgICAgICAgIHhDZW50ZXIgPiBidWNrZXRSZWN0LmxlZnQgJiYgeENlbnRlciA8IGJ1Y2tldFJlY3QucmlnaHQpO1xuICAgIH1cblxuICAgIGdldEVkZ2VzKGVsKSB7XG4gICAgICAgIHZhciB0b3A7XG4gICAgICAgIHZhciBsZWZ0O1xuICAgICAgICB2YXIgd2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQ7XG5cbiAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgIHRvcCA9IDA7XG4gICAgICAgIHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc05hbWUgJiYgZWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NjcmVlbicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZWZ0ICs9IGVsLm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIHRvcCArPSBlbC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgIGJvdHRvbTogdG9wICsgaGVpZ2h0LFxuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgdmFyIGxlZnQgPSAodGhpcy5zdGF0ZS5tb3VzZVggLyB0aGlzLnN0YXRlLnpvb20pIC0gKHRoaXMuc3RhdGUuYnVja2V0V2lkdGggLyAyKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYnVja2V0SW5Cb3VuZHMpIHtcbiAgICAgICAgICAgIGxlZnQgPSBsZWZ0IDwgMSA/IDEgOiBsZWZ0O1xuICAgICAgICAgICAgbGVmdCA9IGxlZnQgPj0gdGhpcy5zdGF0ZS5sZWZ0Qm91bmQgPyB0aGlzLnN0YXRlLmxlZnRCb3VuZCAtIDEgOiBsZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGAke2xlZnR9cHhgXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyQnVja2V0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYnVja2V0LnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5idWNrZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYnVja2V0XCJcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDYXRjaGFibGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaGFibGVzLm1hcCgoaXRlbSwga2V5KSA9PlxuICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIHJlZj17YCR7a2V5fS1jYXRjaGFibGVgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2F0Y2gnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPVwiY2F0Y2gtY29tcG9uZW50XCIgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhdGNoYWJsZXMoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1Y2tldCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59XG5cbkNhdGNoLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNhdGNoYWJsZXM6IFtdLFxuICAgIGJ1Y2tldEluQm91bmRzOiB0cnVlLFxuICAgIGJ1Y2tldDogPHNrb2FzaC5Db21wb25lbnQgLz4sXG4gICAgb25Db3JyZWN0OiBfLm5vb3AsXG4gICAgb25JbmNvcnJlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2g7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2F0Y2hhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2FuQ2F0Y2g6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShvcHRzLCBjYikge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShvcHRzLCBjYik7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgfVxuXG4gICAgbWFya0NhdWdodCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NhbkNhdGNoOiBmYWxzZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2F1Z2h0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgY2FuQ2F0Y2goKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnN0YXRlLmNhbkNhdGNoO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICAgICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhbkNhdGNoXG4gICAgICAgIH0sIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlYWR5ICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMucHJvcHMucmVDYXRjaGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NhbkNhdGNoOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkNhdGNoYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgaXNDb3JyZWN0OiB0cnVlLFxuICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgIG9uQ2F1Z2h0OiBfLm5vb3AsXG4gICAgdHlwZTogJ2xpJyxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgUmFuZG9taXplciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMSc7XG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5jb25zdCBJVEVNID0gJ2l0ZW1zLSc7XG5jb25zdCBEUk9QUEVEID0gJ0RST1BQRUQnO1xuXG5jbGFzcyBEcm9wcGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLml0ZW1Db3VudCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5leHQodGhpcy5wcm9wcy5hbW91bnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzW0lURU0gKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICB9XG5cbiAgICBkcm9wKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleTogW3Byb3BzLnJlZnNUYXJnZXQsICdkcm9wJ10sXG4gICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcHMub25Ecm9wLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgcGlja1VwKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUNsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG4gICAgICAgIGl0ZW1SZWYucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAga2V5OiBbcHJvcHMucmVmc1RhcmdldCwgJ3BpY2tVcCddLFxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLm9uUGlja1VwLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgbmV4dChhbW91bnQgPSAxLCBzaGlmdCA9IHRydWUpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcblxuICAgICAgICBfLmVhY2godGhpcy5yZWZzLmJpbi5nZXQoYW1vdW50KSwgdiA9PiB7XG4gICAgICAgICAgICBpdGVtc1t0aGlzLml0ZW1Db3VudCsrXSA9IChcbiAgICAgICAgICAgICAgICA8di50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi52LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvblJlYWR5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzaGlmdCkgZGVsZXRlIGl0ZW1zW3RoaXMuZmlyc3RJdGVtSW5kZXgrK107XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleTogdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmczogXy5maWx0ZXIodGhpcy5yZWZzLCAodiwgaykgPT4gIWsuaW5kZXhPZihJVEVNKSksXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uTmV4dC5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXVnaHQoY2F0Y2hhYmxlUmVmS2V5KSB7XG4gICAgICAgIF8uaW52b2tlKHRoaXMucmVmc1tjYXRjaGFibGVSZWZLZXldLCAnbWFya0NhdWdodCcpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLm5leHQgPT09IHRydWUgJiYgcHJvcHMubmV4dCAhPT0gdGhpcy5wcm9wcy5uZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5kcm9wID09PSB0cnVlICYmIHByb3BzLmRyb3AgIT09IHRoaXMucHJvcHMuZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wKHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5waWNrVXAgPT09IHRydWUgJiYgcHJvcHMucGlja1VwICE9PSB0aGlzLnByb3BzLnBpY2tVcCkge1xuICAgICAgICAgICAgdGhpcy5waWNrVXAocHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmNhdWdodCAmJiBwcm9wcy5jYXVnaHQgIT09IHRoaXMucHJvcHMuY2F1Z2h0KSB7XG4gICAgICAgICAgICB0aGlzLmNhdWdodChwcm9wcy5jYXVnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ21hbnVhbC1kcm9wcGVyJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHNob3J0aWQgaXMgaW50ZW50aW9uYWxseSBub3QgdXNlZCBmb3Iga2V5IGhlcmUgYmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZVxuICAgICAqIHRoYXQgdGhlIGVsZW1lbnQgaXMgdHJhbnNpdGlvbmVkIGFuZCBub3QgcmVwbGFjZWQuXG4gICAgICovXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnN0YXRlLml0ZW1zLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmID0gSVRFTSArIGtleTtcbiAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17aXRlbS5wcm9wcy5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmJpbi50eXBlXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYmluLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj1cImJpblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e3RoaXMucHJvcHMub25UcmFuc2l0aW9uRW5kLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyb3BwZXIuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgZHJvcENsYXNzOiBEUk9QUEVELFxuICAgIGFtb3VudDogMSxcbiAgICBiaW46IChcbiAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgIDxDYXRjaGFibGUgLz4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICksXG4gICAgcmVmc1RhcmdldDogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICBvbkRyb3A6IF8ubm9vcCxcbiAgICBvblBpY2tVcDogXy5ub29wLFxuICAgIG9uTmV4dDogXy5ub29wLFxuICAgIG5leHQ6IGZhbHNlLFxuICAgIGRyb3A6IGZhbHNlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wcGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xLmpzIiwiLy8gQXMgb2Ygc2tvYXNoIDEuMS4yIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guUmFuZG9taXplclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuY29uc29sZS53YXJuKCdBcyBvZiBza29hc2ggMS4xLjIgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5SYW5kb21pemVyJyk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFJhbmRvbWl6ZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBnZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiBfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pO1xuICAgIH1cblxuICAgIGdldChhbW91bnQgPSAxKSB7XG4gICAgICAgIHZhciBpdGVtcztcbiAgICAgICAgdmFyIGJpbiA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlbWFpbiAmJiB0aGlzLnN0YXRlLmJpbikge1xuICAgICAgICAgICAgYmluID0gdGhpcy5zdGF0ZS5iaW47XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoYmluLmxlbmd0aCA8IGFtb3VudCkge1xuICAgICAgICAgICAgYmluID0gYmluLmNvbmNhdChfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zID0gYmluLnNwbGljZSgwLCBhbW91bnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlbWFpbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YmlufSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3JhbmRvbWl6ZXInLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMuYmluLCAobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZiA9IGxpLnJlZiB8fCAobGkucHJvcHMgJiYgbGkucHJvcHNbJ2RhdGEtcmVmJ10pIHx8IGtleTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SYW5kb21pemVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGJpbjogW10sXG4gICAgcmVtYWluOiBmYWxzZSxcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICgpID0+IGZhbHNlLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBSYW5kb21pemVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEuanMiLCJpbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0Jyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAncmVjeWNsaW5nLWNoYW1waW9uJyxcbiAgICBnYW1lTnVtYmVyOiAxLFxuICAgIGJpbk5hbWVzLFxuICAgIGl0ZW1zVG9Tb3J0LFxuICAgIGV4dHJhQ29tcG9uZW50czogW1xuICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNjcj17YCR7Q01XTi5NRURJQS5JTUFHRX1waXBlMDEucG5nYH0gLz4sXG4gICAgXSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJpbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxubGV0IGJpbk5hbWVzID0gW1xuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0Jyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IGNhdGNoYWJsZXNBcnJheSA9IF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+ICh7XG4gICAgdHlwZTogQ2F0Y2hhYmxlLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgICAgIGJlY29tZXM6IHYuYmVjb21lcyxcbiAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHYpLFxuICAgIH0sXG59KSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSkpXG4pO1xuXG5sZXQgYXVkaW9BcnJheSA9IF8ubWFwKGF1ZGlvUmVmcywgKHYsIGspID0+ICh7XG4gICAgdHlwZTogc2tvYXNoLkF1ZGlvLFxuICAgIHJlZjogdixcbiAgICBrZXk6IGssXG4gICAgcHJvcHM6IHtcbiAgICAgICAgdHlwZTogJ3ZvaWNlT3ZlcicsXG4gICAgICAgIHNyYzogYCR7Q01XTi5NRURJQS5HQU1FICsgJ3NvdW5kLWFzc2V0cy9fdm9zaXRlbXMvJyArIHZ9Lm1wM2AsXG4gICAgICAgIG9uUGxheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICBrZXlzOiBbJ2l0ZW0nLCAnbmV3J10sXG4gICAgICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59KSk7XG5cbmF1ZGlvQXJyYXkgPSBhdWRpb0FycmF5LmNvbmNhdChbXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJkcm9wXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVsZWFzZUl0ZW0xLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvcnJlY3RTZWxlY3QubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnYW1lTmFtZTogJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgZ2FtZU51bWJlcjogMSxcbiAgICBsZXZlbDogMSxcbiAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIG1heEhpdHM6IDUsXG4gICAgZHJvcHBlckFtb3VudDogMyxcbiAgICBwb2ludHNQZXJJdGVtOiA1MCxcbiAgICBjb2xsaWRlRnJhY3Rpb246IDAsXG4gICAgZ2V0U2NyZWVuUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFRpbWVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNjb3JlID49IG9wdHMuc2NvcmVUb1dpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hTY29yZTogTWF0aC5tYXgob3B0cy5zY29yZSwgb3B0cy5oaWdoU2NvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmV0cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25JbmNyZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kc0xlZnQgPSAodGhpcy5wcm9wcy50aW1lb3V0IC0gdGhpcy5zdGF0ZS50aW1lKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZHNMZWZ0ID09PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAncGxheScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAndGltZXInLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UmV2ZWFsUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25PcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzdGFydCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAocHJldk1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghcHJldk1lc3NhZ2UgfHwgcHJldk1lc3NhZ2UgPT09ICdyZXNvcnQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2UgPT09ICdyZXRyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaGl0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tiaW5SZWZLZXldKS5vZmZzZXRMZWZ0IC0gNzg1O1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmxlZnQgPT09IGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnZHJvcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbGVmdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuRE9NTm9kZSAhPT0gZS50YXJnZXQgfHwgb3B0cy5sZWZ0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdkcm9wJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKF8ucmVwbGFjZSh0aGlzLmdldEZpcnN0SXRlbSgpLnByb3BzLmNsYXNzTmFtZSwgL1xcZCsvZywgJycpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogWydtYW51YWwtZHJvcHBlcicsICdkcm9wQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0cyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdwaWNrVXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tVcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1Z2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMaWZlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNjb3JlID49IG9wdHMuc2NvcmVUb1dpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hTY29yZTogTWF0aC5tYXgob3B0cy5zY29yZSwgb3B0cy5oaWdoU2NvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmV0cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RXh0cmFDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG4gICAgYmluTmFtZXMsXG4gICAgaXRlbXNUb1NvcnQsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2dhbWVfb3B0cy5qcyIsImltcG9ydCBpdGVtc0NvbXBvc3QgZnJvbSAnLi9pdGVtc19jb21wb3N0JztcbmltcG9ydCBpdGVtc0Zvb2RTaGFyZSBmcm9tICcuL2l0ZW1zX2Zvb2Rfc2hhcmUnO1xuaW1wb3J0IGl0ZW1zTGFuZGZpbGwgZnJvbSAnLi9pdGVtc19sYW5kZmlsbCc7XG5pbXBvcnQgaXRlbXNMaXF1aWRzIGZyb20gJy4vaXRlbXNfbGlxdWlkcyc7XG5pbXBvcnQgaXRlbXNSZWN5Y2xlIGZyb20gJy4vaXRlbXNfcmVjeWNsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFtdXG4gICAgLmNvbmNhdChpdGVtc0NvbXBvc3QpXG4gICAgLmNvbmNhdChpdGVtc0Zvb2RTaGFyZSlcbiAgICAuY29uY2F0KGl0ZW1zTGFuZGZpbGwpXG4gICAgLmNvbmNhdChpdGVtc0xpcXVpZHMpXG4gICAgLmNvbmNhdChpdGVtc1JlY3ljbGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc190b19zb3J0LmpzIiwibGV0IGJpbiA9ICdmb29kLXNoYXJlJztcbmxldCBuYW1lcyA9IFtcbiAgICAnYmFnLW9mLXBvdGF0by1jaGlwcy0yJyxcbiAgICAnYmFnLW9mLXBvdGF0by1jaGlwcy0zJyxcbiAgICAnYm94LW9mLWNoZWRkYXItY3JhY2tlcnMnLFxuICAgICdib3gtb2YtY29va2llcycsXG4gICAgJ2Rpbm5lci1yb2xsJyxcbiAgICAnZnJlc2gtZnJ1aXQtY3VwJyxcbiAgICAnZnJlc2gtdW5vcGVuZWQtc2FuZHdpY2gnLFxuICAgICdmcmVzaC12ZWdldGFibGUtY3VwJyxcbiAgICAna2V0Y2h1cC1wYWNrZXQnLFxuICAgICdsb2xsaXBvcC0xJyxcbiAgICAnbG9sbGlwb3AtMicsXG4gICAgJ2xvbGxpcG9wLTMnLFxuICAgICdsb2xsaXBvcC00JyxcbiAgICAnbG9sbGlwb3AtNScsXG4gICAgJ21heW8tcGFja2V0JyxcbiAgICAnbXVzdGFyZC1wYWNrZXQnLFxuICAgICdTZWFsZWQtYXBwbGUtc2F1Y2UnLFxuICAgICdzZWFsZWQtYmFnLW9mLWNhcnJvdHMnLFxuICAgICdzZWFsZWQtY2hvY29sYXRlLW1pbGsnLFxuICAgICdzZWFsZWQtZnJ1aXQtZHJpbmstMScsXG4gICAgJ3NlYWxlZC1mcnVpdC1kcmluay0yJyxcbiAgICAnc2VhbGVkLWZydWl0LWRyaW5rLTMnLFxuICAgICdzZWFsZWQtbWlsay0xJyxcbiAgICAnc2VhbGVkLW1pbGstMicsXG4gICAgJ3NlYWxlZC1taWxrLTMnLFxuICAgICdzZWFsZWQtb3JhbmdlLWp1aWNlJyxcbiAgICAnc2luZ2xlLXNlcnZlLWNlcmVhbC0yJyxcbiAgICAnc2luZ2xlLXNlcnZlLWNlcmVhbC0zJyxcbiAgICAnc2luZ2xlLXNlcnZlLWNlcmVhbCcsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jb29raWVzJyxcbiAgICAndW5lYXRlbi1wcmV0emVsJyxcbiAgICAndW5vcGVuZWQtYm94LW9mLXJhaXNpbnMnLFxuICAgICd1bm9wZW5lZC1jb29raWVzLXBhY2thZ2UnLFxuICAgICd1bm9wZW5lZC1jcmFja2Vycy0xJyxcbiAgICAndW5vcGVuZWQtY3JhY2tlcnMtMicsXG4gICAgJ3Vub3BlbmVkLWNyYWNrZXJzLTMnLFxuICAgICd1bm9wZW5lZC1lbmVyZ3ktYmFyJyxcbiAgICAndW5vcGVuZWQtZ3JhaGFtLWNvb2tpZXMtMScsXG4gICAgJ3Vub3BlbmVkLWdyYWhhbS1jb29raWVzLTInLFxuICAgICd1bm9wZW5lZC1ncmFoYW0tY29va2llcy0zJyxcbiAgICAndW5vcGVuZWQtZ3Jhbm9sYS1iYXInLFxuICAgICdVbm9wZW5lZC1ncmFwZS1qdWljZS0xJyxcbiAgICAndW5vcGVuZWQtZ3JhcGUtanVpY2UtMicsXG4gICAgJ3Vub3BlbmVkLWdyYXBlLWp1aWNlLTMnLFxuICAgICd1bm9wZW5lZC1wYWNrLW9mLWdyYXBlcycsXG4gICAgJ3Vub3BlbmVkLXBlYW51dC1idXR0ZXItY3VwcycsXG4gICAgJ3dob2xlLWFwcGxlJyxcbiAgICAnd2hvbGUtYmFuYW5hJyxcbiAgICAnd2hvbGUtb3JhbmdlJyxcbiAgICAneW9ndXJ0LWN1cC0xJyxcbiAgICAneW9ndXJ0LWN1cC0yJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKG5hbWVzLCAobmFtZSwgZnJhbWUpID0+ICh7XG4gICAgbmFtZSxcbiAgICBiaW4sXG4gICAgZnJhbWUsXG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2Zvb2Rfc2hhcmUuanMiLCJsZXQgYmluID0gJ2xpcXVpZHMnO1xubGV0IG5hbWVzID0gW1xuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTEnLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTInLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTMnLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTQnLFxuICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrJyxcbiAgICAnaGFsZi1mdWxsLWVuZXJneS1kcmluay1ib3R0bGUnLFxuICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTEnLFxuICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTQnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tMScsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi0yJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTMnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNCcsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi01JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTYnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNycsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi04JyxcbiAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZS0yJyxcbl07XG5cbmxldCBiZWNvbWVzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtd2F0ZXItYm90dGxlLTEnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtd2F0ZXItYm90dGxlLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtd2F0ZXItYm90dGxlLTMnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtd2F0ZXItYm90dGxlLTQnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktY2hvY29sYXRlLW1pbGsnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWVuZXJneS1kcmluay1ib3R0bGUnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWxlbW9uYWRlLWJveC0xJyxcbiAgICAgICAgYmluOiAnbGFuZGZpbGwnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbGVtb25hZGUtYm94LTQnLFxuICAgICAgICBiaW46ICdsYW5kZmlsbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi0xJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi0yJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi0zJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi00JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi01JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi02JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi03JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbi04JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1vcmFuZ2UtanVpY2UtMicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxuICAgIGJlY29tZXM6IGJlY29tZXNbZnJhbWVdLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19saXF1aWRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91ciBTb3J0aW5nIFNraWxsczxici8+XG4gICAgICAgICAgICAgICAgYXJlIG5lZWRlZCBmb3I8YnIvPlxuICAgICAgICAgICAgICAgIHRoaXMgbmV4dCByb3VuZC48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgR2V0IFJlYWR5LVNldC1HbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdSZWFkeVNldEdvJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBOb3cgdGhhdCB5b3UgaGF2ZTxici8+XG4gICAgICAgICAgICAgICAgdGhlIGhhbmcgb2YgdGhpcyBsZXQnczxici8+XG4gICAgICAgICAgICAgICAgYWRkIHNvbWUgc3BlZWQuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdvb2QgbHVjazxici8+XG4gICAgICAgICAgICAgICAgU3BlZWQgU29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTcGVlZFNvcnRpbmcnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoYXQgd2FzIHNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQ8YnIvPlxuICAgICAgICAgICAgICAgIGludG8gaGlnaCBkcml2ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIaWdoRHJpdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBNYXN0ZXIgdGhpcyBsZXZlbDxici8+XG4gICAgICAgICAgICAgICAgYW5kIHdpbiB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIFJlY3ljbGUgQ2hhbXBpb24gRmxpcCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgQWNjdXJhY3kgaXMgaW1wb3J0YW50Li4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnQ2hhbXBpb25GbGlwJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxubGV0IGZsaXBLZXlzID0gW1xuICAgICdyZWN5Y2xpbmctY2hhbXBpb24nLFxuICAgICdwcmljZWxlc3MtcG91cmVyJyxcbiAgICAnZmFudGFzdGljLWZvb2Qtc2hhcmVyJyxcbiAgICAnZHluYW1pYy1kaXZlcnRlcicsXG4gICAgJ21hc3Rlci1zb3J0ZXInLFxuICAgICdncmVlbi10ZWFtLWNoYWxsZW5nZScsXG5dO1xuXG5sZXQgbGV2ZWxOYW1lcyA9IFtcbiAgICAnUmVjeWNsaW5nIENoYW1waW9uJyxcbiAgICAnUHJpY2VsZXNzIFBvdXJlcicsXG4gICAgJ0ZhbnRhc3RpYyBGb29kIFNoYXJlcicsXG4gICAgJ0R5bmFtaWMgRGl2ZXJ0ZXInLFxuICAgICdNYXN0ZXIgU29ydGVyJyxcbl07XG5cbmxldCBudW1iZXJXb3JkcyA9IFtcbiAgICAnT25lJyxcbiAgICAnVHdvJyxcbiAgICAnVGhyZWUnLFxuICAgICdGb3VyJyxcbiAgICAnRml2ZScsXG5dO1xuXG5sZXQgZ2V0TGV2ZWxIZWFkZXIgPSBsZXZlbE51bWJlcldvcmQgPT4ge1xuICAgIGlmIChsZXZlbE51bWJlcldvcmQpIHJldHVybiA8aDM+TGV2ZWwge2xldmVsTnVtYmVyV29yZH0gQ29tcGxldGUhPC9oMz47XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMz5DT05HUkFUVUxBVElPTlMhPC9oMz5cbiAgICAgICAgICAgIDxoND5Zb3UgYXJlIGEgbWVtYmVyIG9mIEdyZWVuIFRlYW0hPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmxldCBsaXN0TGV2ZWxzID0gbGV2ZWxOdW1iZXIgPT5cbiAgICBfLm1hcChsZXZlbE5hbWVzLCAobmFtZSwgbnVtYmVyKSA9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bGV2ZWxOdW1iZXIgPiBudW1iZXIgPyAnY29tcGxldGUnIDogJyd9PlxuICAgICAgICAgICAgPHA+TGV2ZWwge251bWJlciArIDF9PC9wPlxuICAgICAgICAgICAgPHA+e25hbWV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobGV2ZWxOdW1iZXIpIHtcbiAgICBsZXQgbGV2ZWxOdW1iZXJXb3JkID0gbnVtYmVyV29yZHNbbGV2ZWxOdW1iZXIgLSAxXTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgcG9zdC1sZXZlbC0ke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKG9wdHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIEFQUEVBUjogXy5nZXQocHJvcHMsICdkYXRhLmFwcGVhci5wbGF5aW5nJyksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGVtaXRPbkNvbXBsZXRlPXt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJyxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogZmxpcEtleXNbbGV2ZWxOdW1iZXIgLSAxXVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9dHJhbnNpdGlvbi5mcmFtZS5wbmdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5sZXZlbHMucG5nYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxldmVsQXdhcmQubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUZsaXBIb3Zlci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJhcHBlYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1GbGlwRHJvcEJvdW5jZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0TGV2ZWxIZWFkZXIobGV2ZWxOdW1iZXJXb3JkKX1cbiAgICAgICAgICAgICAgICAgICAge2xpc3RMZXZlbHMobGV2ZWxOdW1iZXIpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFJlY3ljbGUgQ2hhbXBpb24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIE5leHQgdXDigJRpdCdzIExpcXVpZHMhPGJyLz5cbiAgICAgICAgICAgICAgICBQb3VyIHRoZSBsaXF1aWRzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgdGhlbiBzb3J0IHRoZSBjb250YWluZXJzLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVJlY3ljbGVDaGFtcGlvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdsaXF1aWRzJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNsaWNrUmVjQnV0dG9uLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvbnZleW9yQmVsdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBvdXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MaXF1aWRQb3VyLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidGltZXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1TZWNvbmRUaW1lci5tcDNgfSAvPixcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ3ByaWNlbGVzcy1wb3VyZXInLFxuICAgIGdhbWVOdW1iZXI6IDIsXG4gICAgZHJvcHBlckFtb3VudDogNCxcbiAgICBiaW5OYW1lcyxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6IF8udG9VcHBlcihvcHRzLmJpbk5hbWVzW2JpblJlZktleV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICBsZXQgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0RHJvcHBlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25UcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzWydpdGVtcy0nICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICBsZXQgRE9NTm9kZTtcbiAgICAgICAgICAgIGxldCBvbkFuaW1hdGlvbkVuZDtcblxuICAgICAgICAgICAgaWYgKGUucHJvcGVydHlOYW1lICE9PSAnbGVmdCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRyb3BDbGFzcyAhPT0gJ0xJUVVJRFMnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0cyA9IG9wdHMuaGl0cyArIDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAncGlja1VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcblxuICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIG9uQW5pbWF0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja1VwKF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlyc3RJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gaXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByb3BzLm1lc3NhZ2UgPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMucHJvcHMpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUgfHwgaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUuaW5kZXhPZignUE9VUicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIERPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbJ2l0ZW0nLCAncG91ciddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGRlZmF1bHRHYW1lT3B0cy5nZXRDYXRjaGVyUHJvcHMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgICBwcm9wcy5vbkNvcnJlY3QgPSBmdW5jdGlvbiAoYnVja2V0UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChidWNrZXRSZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICduZXh0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cyhvcHRzKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdtaWxrJztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnQ2hvY29sYXRlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnY2hvY29sYXRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnT3JhbmdlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnRnJ1aXQnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdmcnVpdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMS5jb252ZXlvci5iZWx0YH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezI1MH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgaXRlbXNUb1NvcnQsXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBnZXRDYXRjaGFibGVzQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBjYXRjaGFibGVzQXJyYXk7XG4gICAgfSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEl0J3MgdGltZSB0byBkdWFsITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBEdWFsIHNvcnRpbmcgaXM8YnIvPlxuICAgICAgICAgICAgICAgIGltcG9ydGFudCBmb3IgYWNjdXJhY3kuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFNob3cgd2hhdCB5b3Uga25vdyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdJdHNUaW1lVG9EdWFsJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFN1Y2Nlc3MgaXMgdHdpY2UgYXMgbmljZTxici8+XG4gICAgICAgICAgICAgICAgd2hlbiBkdWFsIHNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQgdXAgYSBub3RjaC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdLaWNrSXR1cEFOb3RjaCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgU3VwZXIgU29ydGVyITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGluZ3MgYXJlIGFib3V0PGJyLz5cbiAgICAgICAgICAgICAgICB0byBnZXQgY3JhenkuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEkgaG9wZSB5b3UncmUgcmVhZHkhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnJywgLy8gdGhpcyB2byBpcyBtaXNzaW5nXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTGV0J3MgdGFrZSB0aGlzPGJyLz5cbiAgICAgICAgICAgICAgICB0byB0aGUgbmV4dCBsZXZlbCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgWW91IGFyZSBhYm91dCB0bzxici8+XG4gICAgICAgICAgICAgICAgYmVjb21lIGE8YnIvPlxuICAgICAgICAgICAgICAgIFByaWNlbGVzcyBQb3VyZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVGFrZUl0VG90aGVOZXh0TGV2ZWwnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2hhcmluZyBzbmFja3MgaXMganVzdCBhPGJyLz5cbiAgICAgICAgICAgICAgICBraW5kIHRoaW5nIHRvIGRvIGZvciBvdGhlcnMuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIElkZW50aWZ5IHRob3NlIGl0ZW1zIHRoYXQ8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSByZWFkeSB0byBlYXQtbm90IHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBhcyBGb29kIFNoYXJlIGl0ZW1zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1NoYXJuaW5nU25hY2tzJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMSc7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxuY29uc3QgUElDS1VQID0gJ1BJQ0tVUCc7XG5jb25zdCBEUk9QUEVEID0gJ0RST1BQRUQnO1xuY29uc3QgVElMVCA9ICdUSUxUJztcbmNvbnN0IElURU1TID0gJ2l0ZW1zLSc7XG5cbmNvbnN0IEJFTFRfU1JDID0gQ01XTi5NRURJQS5TUFJJVEUgKyAnbGV2ZWwuMy5jb252ZXlvci5iZWx0JztcbmNvbnN0IENMQVdfU1JDID0gQ01XTi5NRURJQS5TUFJJVEUgKyAnbGV2ZWwzcm9ib3Rhcm0nO1xuY29uc3QgRlVOTkVMX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2Zyb250LmJhY2suZnVubmVsJztcblxuY29uc3QgYmluTmFtZXMgPSBbXG4gICAgJ2Zvb2Qtc2hhcmUnLFxuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0JyxcbiAgICAnbGlxdWlkcycsXG5dO1xuXG5jb25zdCBvblRydWNrVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChvcHRzLCBlKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVNjcmVlbkRhdGEnLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICBkcm9wOiBfLmluY2x1ZGVzKGUudGFyZ2V0LmNsYXNzTmFtZSwgVElMVCksXG4gICAgICAgICAgICAgICAgZHJvcENsYXNzOiBfLnRvVXBwZXIoXy5zbmFrZUNhc2Uob3B0cy5zZWxlY3RhYmxlTWVzc2FnZSkpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdzZWxlY3RhYmxlJzoge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmNvbnN0IG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoaXRlbVJlZikge1xuICAgIGlmIChfLmluY2x1ZGVzKGl0ZW1SZWYuc3RhdGUuY2xhc3NOYW1lLCBQSUNLVVApKSB7XG4gICAgICAgIGl0ZW1SZWYucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU2NyZWVuRGF0YScsIHtcbiAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgIGRhdGE6ICcnLFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJkcm9wXCIgc2lsZW50T25TdGFydD5cbiAgICAgICAgPHNrb2FzaC5BdWRpbyBkZWxheT17NDYwMH0gdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZ1bm5lbC5tcDNgfSAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVRydWNrRHVtcC5tcDNgfSAvPlxuICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvbnZleW9yQmVsdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBvdXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MaXF1aWRQb3VyLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidGltZXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1TZWNvbmRUaW1lci5tcDNgfSAvPixcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ2ZhbnRhc3RpYy1mb29kLXNoYXJlcicsXG4gICAgZ2FtZU51bWJlcjogMyxcbiAgICBiaW5OYW1lcyxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKGRhdGFSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5wcm9wcy5saXN0W2RhdGFSZWZdLnByb3BzLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ2xhdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUucHJvcGVydHlOYW1lID09PSAndG9wJyAmJiBfLmluY2x1ZGVzKGUudGFyZ2V0LmNsYXNzTmFtZSwgRFJPUFBFRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1SZWYgPSB0aGlzLnJlZnNbSVRFTVMgKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IERPTU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvbkFuaW1hdGlvbkVuZDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndHJ1Y2tDbGFzc05hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogVElMVCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgIT09ICdsaXF1aWRzJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtUmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdwaWNrVXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tVcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1Z2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChET01Ob2RlICE9PSBlLnRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIG9uQW5pbWF0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXAoXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdEl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gaXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMubWVzc2FnZSA9IGl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHNbJ2RhdGEtbWVzc2FnZSddID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXN9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZpcnN0SXRlbSgpLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW3RoaXMucHJvcHMucmVmc1RhcmdldCwgJ3JlZnMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBfLmZpbHRlcih0aGlzLnJlZnMsICh2LCBrKSA9PiAhay5pbmRleE9mKElURU1TKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVwbGFjZShpdGVtLnByb3BzLmJlY29tZXMubmFtZSwgL1xcZCsvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvdXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1Y2tDbGFzc05hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5wcm9wcykpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUgfHwgaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUuaW5kZXhPZignUE9VUicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZSgnUE9VUicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFsnaXRlbScsICdwb3VyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uUGlja1VwOiBmdW5jdGlvbiAoaXRlbVJlZikge1xuICAgICAgICAgICAgICAgIGl0ZW1SZWYucmVtb3ZlQWxsQ2xhc3NOYW1lcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbVJlZi5ET01Ob2RlKSBpdGVtUmVmLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZi5ET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1QaWNrVXBUcmFuc2l0aW9uRW5kLmJpbmQobnVsbCwgaXRlbVJlZilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZi5hZGRDbGFzc05hbWUoUElDS1VQKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHRoaXMuZ2V0Rmlyc3RJdGVtKCkucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVja0NsYXNzTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgdmFyIHByb3BzID0gZGVmYXVsdEdhbWVPcHRzLmdldENhdGNoZXJQcm9wcy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgIHByb3BzLm9uQ29ycmVjdCA9IGZ1bmN0aW9uIChidWNrZXRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGJ1Y2tldFJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sXG4gICAgZ2V0RXh0cmFDb21wb25lbnRzKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ21pbGsnO1xuXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdDaG9jb2xhdGUnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdjaG9jb2xhdGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdPcmFuZ2UnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdGcnVpdCcpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2ZydWl0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImV4dHJhc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xhd1wiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Q0xBV19TUkN9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5tb3ZlQ2xhd31cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDIwMCwgMjAwLCAyMDAsIDUwMCwgMTAwLCAzMDAwLCAyMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21vdmVDbGF3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17QkVMVF9TUkN9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezUwMH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2Nob2NvbGF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLmNob2NvbGF0ZS5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnZnJ1aXQnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5mcnVpdC5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ21pbGsnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnb3JhbmdlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjMub3JhbmdlLmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmdW5uZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtGVU5ORUxfU1JDfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZyb250XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17RlVOTkVMX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygndHJ1Y2snLCBvcHRzLnRydWNrQ2xhc3NOYW1lLCBvcHRzLnNlbGVjdGFibGVNZXNzYWdlKX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRydWNrVHJhbnNpdGlvbkVuZC5iaW5kKG51bGwsIG9wdHMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVjay1zdGFuZFwiIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTaGFyZSBTb21lIE1vcmUhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFlvdXIgc29ydGluZyBza2lsbHMgYXJlPGJyLz5cbiAgICAgICAgICAgICAgICBhY3Rpb25zIG9mIGtpbmRuZXNzLjxici8+XG4gICAgICAgICAgICAgICAgU2hhcmUgdGhlIGxvdmUhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU2hhcmVUaGVMb3ZlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNoYXJlITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBHZXQgcmVhZHkgZm9yIGE8YnIvPlxuICAgICAgICAgICAgICAgIHJ1c2ggb2Yga2luZG5lc3MhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU3BlZWRzaGFyZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgU3VwZXIgU2hhcmVyITxici8+XG4gICAgICAgICAgICAgICAgS2luZG5lc3MganVzdDxici8+XG4gICAgICAgICAgICAgICAgc2t5cm9ja2V0ZWQgaW48YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBsdW5jaHJvb20hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGRvIHRoaXMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGV5U3VwZXJTaGFyZXJTa3lyb2NrZXRlZCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgVGhlIHRpdGxlIG9mPGJyLz5cbiAgICAgICAgICAgICAgICBGYW50YXN0aWMgRm9vZC1TaGFyZXI8YnIvPlxuICAgICAgICAgICAgICAgIGlzIG9uIHRoZSBob3Jpem9uITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBtYWtlIHRoaXMgaGFwcGVuLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ09uVGhlSG9yaXpvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdleGhhdXN0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEp1c3QgYmVjYXVzZSBpdCdzIGluIHRoZSBiaW4tPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgZG9lc24ndCBtZWFuIGl0IHNob3VsZCBiZS48YnIvPlxuICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICBEcmFnIGl0ZW1zIHRvIHRoZSB2ZW50PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgdGhhdCBzaG91bGQgbm90IGJlIGluPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgdGhlIGJpbiB0byBiZSByZXNvcnRlZC5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdGB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnRHJhZ1RvQmluJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICAgICAgaW1hZ2U6IGAke0NNV04uTUVESUEuSU1BR0V9ZXhoYXVzdC5wbmdgLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBNYW51YWxEcm9wcGVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL21hbnVhbF9kcm9wcGVyLzAuMSc7XG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQnO1xuaW1wb3J0IERyYWdnYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40JztcblxuY29uc3QgUFRTID0gJ3B0cyc7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKE1hdGguYWJzKHByb3BzLmdhbWVTdGF0ZS5jdXJyZW50U2NyZWVuSW5kZXggLSBwYXJzZUludChrZXksIDEwKSkgPiAyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzY3JlZW5Qcm9wcztcbiAgICAgICAgbGV0IHRpbWVyUHJvcHM7XG4gICAgICAgIGxldCBkcm9wcGVyUHJvcHM7XG4gICAgICAgIGxldCByZXZlYWxQcm9wcztcbiAgICAgICAgbGV0IGxpZmVQcm9wcztcbiAgICAgICAgbGV0IGRyYWdnYWJsZVByb3BzO1xuICAgICAgICBsZXQgZHJvcHpvbmVQcm9wcztcblxuICAgICAgICBsZXQgYmluQ29tcG9uZW50cztcblxuICAgICAgICBjb25zdCBMRVZFTF9QQVRIID0gYGdhbWVTdGF0ZS5kYXRhLiR7Xy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSl9LmxldmVscy4ke29wdHMubGV2ZWx9YDtcblxuICAgICAgICBsZXQgc3RhcnQgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc3RhcnRgLCBmYWxzZSk7XG4gICAgICAgIGxldCBnYW1lQ29tcGxldGUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uY29tcGxldGVgLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wcGVkID0gXy5nZXQocHJvcHMsICdkYXRhLmRyYWdnYWJsZS5kcm9wcGVkJyk7XG4gICAgICAgIGxldCBkcmFnZ2luZyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJhZ2dpbmcnKTtcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gXy5zdGFydENhc2UoXG4gICAgICAgICAgICBfLnJlcGxhY2UoXy5nZXQoZHJhZ2dpbmcsICdwcm9wcy5jbGFzc05hbWUnLCAnJyksIC9cXGQrL2csICcnKVxuICAgICAgICApO1xuICAgICAgICBsZXQgYmluTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5iaW5OYW1lJywgJycpO1xuICAgICAgICBsZXQgcmV2ZWFsT3BlbiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIGZhbHNlKTtcbiAgICAgICAgbGV0IHJldmVhbENsb3NlID0gXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5jbG9zZScsIGZhbHNlKTtcbiAgICAgICAgbGV0IGNhcm91c2VsTmV4dCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5uZXh0JywgZmFsc2UpO1xuICAgICAgICBsZXQgcGxheSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5wbGF5JywgbnVsbCk7XG5cbiAgICAgICAgbGV0IGFuc3dlcnMgPSBfLmZpbHRlcihvcHRzLmJpbk5hbWVzLCBuYW1lID0+IG5hbWUgIT09IGJpbk5hbWUpO1xuXG4gICAgICAgIGxldCBhdWRpb0FycmF5ID0gb3B0cy5nZXRBdWRpb0FycmF5KCk7XG5cbiAgICAgICAgb3B0cy5zY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5zY29yZWAsIDApO1xuICAgICAgICBvcHRzLmhpZ2hTY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaWdoU2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaXRzID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmhpdHNgLCAwKTtcbiAgICAgICAgb3B0cy5zZWxlY3RhYmxlTWVzc2FnZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLm1lc3NhZ2UnLCAnJyk7XG4gICAgICAgIG9wdHMucGxheUF1ZGlvID0gKFxuICAgICAgICAgICAgcGxheSA/IHBsYXkgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3Jlc29ydCcgPyAncmVzb3J0JyA6XG4gICAgICAgICAgICBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2UoaXRlbU5hbWUpKSA6IG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzY3JlZW5Qcm9wcyA9IG9wdHMuZ2V0U2NyZWVuUHJvcHMob3B0cyk7XG4gICAgICAgIHRpbWVyUHJvcHMgPSBvcHRzLmdldFRpbWVyUHJvcHMob3B0cyk7XG4gICAgICAgIGRyb3BwZXJQcm9wcyA9IG9wdHMuZ2V0RHJvcHBlclByb3BzKG9wdHMpO1xuICAgICAgICByZXZlYWxQcm9wcyA9IG9wdHMuZ2V0UmV2ZWFsUHJvcHMob3B0cyk7XG4gICAgICAgIGxpZmVQcm9wcyA9IG9wdHMuZ2V0TGlmZVByb3BzKG9wdHMpO1xuICAgICAgICBkcmFnZ2FibGVQcm9wcyA9IG9wdHMuZ2V0RHJhZ2dhYmxlUHJvcHMob3B0cyk7XG4gICAgICAgIGRyb3B6b25lUHJvcHMgPSBvcHRzLmdldERyb3B6b25lUHJvcHMob3B0cyk7XG5cbiAgICAgICAgYmluQ29tcG9uZW50cyA9IF8ubWFwKG9wdHMuYmluSXRlbXMsIGJpbiA9PiAoe1xuICAgICAgICAgICAgdHlwZTogQ2Fyb3VzZWwsXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogYmluLm5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYmluLm5hbWUsXG4gICAgICAgICAgICAgICAgc2hvd051bTogMjAsXG4gICAgICAgICAgICAgICAgbmV4dE9uU3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJpbjoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBza29hc2guUmFuZG9taXplcixcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXy5tYXAoYmluLm9iamVjdHMsIHYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBEcmFnZ2FibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlY29tZXM6IHYuYmVjb21lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRyYWdnYWJsZVByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17IWdhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgICAgIHsuLi5zY3JlZW5Qcm9wc31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZXZlbC1zY29yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLnNjb3JlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtQVFN9XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLlNjb3JlPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cIm1tOnNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e29wdHMudGltZW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZT17cmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17IXJldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0YXJ0PXtzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aW1lclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtLW5hbWVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmluLW5hbWVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YmluTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpZmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9ezB9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdD17b3B0cy5tYXhIaXRzfVxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLmhpdHN9XG4gICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGlmZVByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPERyb3B6b25lXG4gICAgICAgICAgICAgICAgICAgIGRyb3BwZWQ9e2Ryb3BwZWR9XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnaW5nPXtkcmFnZ2luZ31cbiAgICAgICAgICAgICAgICAgICAgey4uLmRyb3B6b25lUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdE9uT3V0T2ZCb3VuZHM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZXM9e1s8c2tvYXNoLkNvbXBvbmVudCBhbnN3ZXJzPXthbnN3ZXJzfSAvPl19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8TWFudWFsRHJvcHBlclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiaW5zXCJcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXtvcHRzLmRyb3BwZXJBbW91bnR9XG4gICAgICAgICAgICAgICAgICAgIG5leHQ9e2Nhcm91c2VsTmV4dH1cbiAgICAgICAgICAgICAgICAgICAgYmluPXs8c2tvYXNoLlJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpblxuICAgICAgICAgICAgICAgICAgICAgICAgYmluPXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgICAgICAgICAvPn1cbiAgICAgICAgICAgICAgICAgICAgey4uLmRyb3BwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guUmV2ZWFsXG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYXJnZXQ9XCJyZXZlYWxcIlxuICAgICAgICAgICAgICAgICAgICBvcGVuUmV2ZWFsPXtyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICBjbG9zZVJldmVhbD17cmV2ZWFsQ2xvc2V9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5yZXZlYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXNvcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmV0cnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIHBsYXk9e29wdHMucGxheUF1ZGlvfVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17YXVkaW9BcnJheX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcblxuaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEnO1xuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIFNlbGVjdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk7XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5zZWxlY3RlZCAmJiBuZXh0UHJvcHMuc2VsZWN0ZWQgIT09IHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLm5leHQgJiYgbmV4dFByb3BzLm5leHQgIT09IHRoaXMucHJvcHMubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubmV4dE9uU3RhcnQpIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLnJlZnMuYmluLmdldCgxKVswXTtcbiAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KFxuICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWtleSc6IHNob3J0aWQuZ2VuZXJhdGUoKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGNsYXNzZXNbMF0gPSAnJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5wcm9wcy5lbmFibGVkO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgIGxpc3QsXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXNbMF0gPSAnTEVBVkUnO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5wYXVzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgIC8vIHNrb2FzaC5Db21wb25lbnQgaXMgbm90IHRoZSBzdXBlciBoZXJlLCBidXQgdGhpcyBpcyB3aGF0IHdlIHdhbnRcbiAgICAgICAgc2tvYXNoLkNvbXBvbmVudC5wcm90b3R5cGUuYm9vdHN0cmFwLmNhbGwodGhpcyk7XG5cbiAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4gPyB0aGlzLnJlZnMuYmluLmdldCh0aGlzLnByb3BzLnNob3dOdW0gKyAxKSA6IHRoaXMucHJvcHMubGlzdDtcblxuICAgICAgICBfLmVhY2gobGlzdCwgaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1rZXknOiBzaG9ydGlkLmdlbmVyYXRlKClcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsaXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdEhlbHBlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnN0YXRlLmxpc3RbdGhpcy5wcm9wcy50YXJnZXRJbmRleF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLnN0YXRlLmxpc3RbdGhpcy5wcm9wcy50YXJnZXRJbmRleF0pO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXJvdXNlbCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgKiB0aGF0IHRoZSBlbGVtZW50IGlzIHRyYW5zaXRpb25lZCBhbmQgbm90IHJlcGxhY2VkLlxuICAgICAqL1xuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5zdGF0ZS5saXN0IHx8IHRoaXMucHJvcHMubGlzdDtcbiAgICAgICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmO1xuICAgICAgICAgICAgdmFyIG9uVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgICAgIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQgPSBrZXkgPT09IDAgPyB0aGlzLm5leHQgOiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhrZXksIGxpKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXtsaS5wcm9wcy5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZH1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICBkYXRhLWtleT17c2hvcnRpZChrZXkpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBvbkNsaWNrID0gdGhpcy5wcm9wcy5jbGlja2FibGUgPyB0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcykgOiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhcm91c2VsLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIHNob3dOdW06IDMsXG4gICAgdGFyZ2V0SW5kZXg6IDEsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBuZXh0T25TdGFydDogdHJ1ZSxcbiAgICBwYXVzZTogNTAwLFxuICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIFNlbGVjdGFibGUuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGVuY29kZSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTQ1OTcwNzYwNjUxODtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA2O1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCB2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgc2Vjb25kcyk7XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21CeXRlID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcblxuZnVuY3Rpb24gZW5jb2RlKGxvb2t1cCwgbnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBsb29rdXAoICggKG51bWJlciA+PiAoNCAqIGxvb3BDb3VudGVyKSkgJiAweDBmICkgfCByYW5kb21CeXRlKCkgKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxuZnVuY3Rpb24gcmFuZG9tQnl0ZSgpIHtcbiAgICBpZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSAmIDB4MzA7XG4gICAgfVxuICAgIHZhciBkZXN0ID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhkZXN0KTtcbiAgICByZXR1cm4gZGVzdFswXSAmIDB4MzA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLyoqXG4gKiBEZWNvZGUgdGhlIGlkIHRvIGdldCB0aGUgdmVyc2lvbiBhbmQgd29ya2VyXG4gKiBNYWlubHkgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZy5cbiAqIEBwYXJhbSBpZCAtIHRoZSBzaG9ydGlkLWdlbmVyYXRlZCBpZC5cbiAqL1xuZnVuY3Rpb24gZGVjb2RlKGlkKSB7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5zaHVmZmxlZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnNpb246IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMCwgMSkpICYgMHgwZixcbiAgICAgICAgd29ya2VyOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDEsIDEpKSAmIDB4MGZcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5jaGFyYWN0ZXJzKCk7XG4gICAgdmFyIGxlbiA9IGlkLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuO2krKykge1xuICAgICAgICBpZiAoY2hhcmFjdGVycy5pbmRleE9mKGlkW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TZWxlY3RhYmxlXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5jb25zb2xlLndhcm4oJ0FzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGUnKTtcbi8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiB7fSxcbiAgICAgICAgICAgIHNlbGVjdEZ1bmN0aW9uOiB0aGlzLnNlbGVjdCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdmFyIHNlbGVjdENsYXNzO1xuICAgICAgICB2YXIgc2VsZWN0RnVuY3Rpb247XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZWN0Q2xhc3MgPSB0aGlzLnByb3BzLnNlbGVjdENsYXNzIHx8IHRoaXMuc3RhdGUuc2VsZWN0Q2xhc3MgfHwgJ1NFTEVDVEVEJztcbiAgICAgICAgc2VsZWN0RnVuY3Rpb24gPSBzZWxlY3RDbGFzcyA9PT0gJ0hJR0hMSUdIVEVEJyA/IHRoaXMuaGlnaGxpZ2h0IDogdGhpcy5zZWxlY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0T25TdGFydCkge1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnRdID0gc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHRydWUsXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb24sXG4gICAgICAgICAgICBzZWxlY3RDbGFzcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgICAgICBpZiAodGhpcy5yZWZzLmJpbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgbGlzdDogdGhpcy5yZWZzLmJpbi5nZXRBbGwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcykge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICB2YXIgZGF0YVJlZjtcbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB2YXIgaXNDb3JyZWN0O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YVJlZiA9IGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdMSScpO1xuXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBkYXRhUmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZiA9IHNlbGYucmVmc1tkYXRhUmVmXTtcblxuICAgICAgICBpc0NvcnJlY3QgPSAocmVmICYmIHJlZi5wcm9wcyAmJiByZWYucHJvcHMuY29ycmVjdCkgfHxcbiAgICAgICAgICAgICghc2VsZi5wcm9wcy5hbnN3ZXJzIHx8ICFzZWxmLnByb3BzLmFuc3dlcnMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9wcy5hbnN3ZXJzLmluZGV4T2YoZGF0YVJlZikgIT09IC0xKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5hbGxvd0Rlc2VsZWN0ICYmIGNsYXNzZXNbZGF0YVJlZl0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGFzc2VzW2RhdGFSZWZdO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgICAgICAgY2xhc3Nlc1tkYXRhUmVmXSA9IHNlbGYuc3RhdGUuc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucHJvcHMuc2VsZWN0UmVzcG9uZC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuICAgICAgICBzZWxmLnByb3BzLm9uU2VsZWN0LmNhbGwoc2VsZiwgZGF0YVJlZik7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuY2hvb3NlT25lKSBzZWxmLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHNlbGYucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogcmVmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jb21wbGV0ZUxpc3RPbkNsaWNrKSB7XG4gICAgICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBpZCkgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoayA9PT0gZGF0YVJlZikgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzcyhrZXksIGxpKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgICAgICAgbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEtcmVmJ11dLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLWtleSddXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdzZWxlY3RhYmxlJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5zZWxlY3QgJiYgcHJvcHMuc2VsZWN0ICE9PSB0aGlzLnByb3BzLnNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5jYWxsKHRoaXMsIHByb3BzLnNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdCB8fCB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGRhdGFSZWYgPSBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzLmlkIHx8IGRhdGFSZWY7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGxpLnByb3BzLm1lc3NhZ2UgfHwgJycgKyBrZXk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtkYXRhUmVmfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IG9uQ2xpY2s9e3RoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TZWxlY3RhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGxpc3Q6IFtcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+XG4gICAgXSxcbiAgICBzZWxlY3RDbGFzczogJ1NFTEVDVEVEJyxcbiAgICBjb21wbGV0ZUxpc3RPbkNsaWNrOiB0cnVlLFxuICAgIHNlbGVjdFJlc3BvbmQ6IF8ubm9vcCxcbiAgICBvblNlbGVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBzdGFydCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZHJvcHpvbmU7XG4gICAgICAgIHZhciBkcmFnZ2FibGU7XG5cbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICBzZWxmLmRyb3B6b25lQ29ybmVycyA9IF8ubWFwKHNlbGYucHJvcHMuZHJvcHpvbmVzLCAodmFsdWUsIGtleSkgPT5cbiAgICAgICAgICAgIHNlbGYuZ2V0Q29ybmVycyhSZWFjdERPTS5maW5kRE9NTm9kZShzZWxmLnJlZnNbYGRyb3B6b25lLSR7a2V5fWBdKSlcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc2VsZi5sb2FkRGF0YSAmJiB0eXBlb2Ygc2VsZi5sb2FkRGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5sb2FkRGF0YSwgKHJlZjEsIGtleTEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVmMS5yZWYgJiYgcmVmMS5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlZnNba2V5MV0gJiYgcmVmMi5wcm9wcy5tZXNzYWdlID09PSByZWYxLnJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lID0gc2VsZi5yZWZzW2tleTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSA9IHJlZjI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUuc2V0U3RhdGUoe2NvbnRlbnQ6IGRyYWdnYWJsZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5zZXRTdGF0ZShyZWYxLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcnJlY3QoZHJhZ2dhYmxlLCBrZXkxLnJlcGxhY2UoJ2Ryb3B6b25lLScsICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5sb2FkRGF0YSwgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVmc1trZXkyXS5zZXRTdGF0ZSh7Y29udGVudDogW119KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMywga2V5MykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkzLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pbmNsdWRlcyhyZWYyLCByZWYzLnByb3BzLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVmc1trZXkyXS5zdGF0ZS5jb250ZW50LnB1c2gocmVmMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjMubWFya0NvcnJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkRHJhZ05Ecm9wRGF0YSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZHJvcHpvbmU7XG4gICAgICAgIHZhciBkcmFnZ2FibGU7XG4gICAgICAgIF8uZm9ySW4oc2VsZi5sb2FkRGF0YSwgKHJlZjEsIGtleTEpID0+IHtcbiAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWZzW2tleTFdICYmIHJlZjIucHJvcHMubWVzc2FnZSA9PT0gcmVmMS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSA9IHJlZjI7XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBkcmFnZ2FibGV9KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLnNldFN0YXRlKHJlZjEuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcnJlY3QoZHJhZ2dhYmxlLCBrZXkxLnJlcGxhY2UoJ2Ryb3B6b25lLScsICcnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRNdWx0aUFzbndlckRhdGEoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBbXX0pO1xuICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleTIuaW5kZXhPZignZHJhZ2dhYmxlLScpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRyYWdnYWJsZSA9IHJlZjI7XG4gICAgICAgICAgICAgICAgaWYgKF8uaW5jbHVkZXMocmVmMSwgZHJhZ2dhYmxlLnByb3BzLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLnN0YXRlLmNvbnRlbnQucHVzaChkcmFnZ2FibGUpO1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUubWFya0NvcnJlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q29ybmVycyhlbCkge1xuICAgICAgICB2YXIgb2Zmc2V0O1xuICAgICAgICB2YXIgY29ybmVycyA9IFtdO1xuXG4gICAgICAgIG9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBjb3JuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IG9mZnNldC5sZWZ0ICsgb2Zmc2V0LndpZHRoICogKGkgPT09IDEgfHwgaSA9PT0gMiA/IDEgOiAwKSxcbiAgICAgICAgICAgICAgICB5OiBvZmZzZXQudG9wICsgb2Zmc2V0LmhlaWdodCAqIChpID4gMSA/IDEgOiAwKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcm5lcnM7XG4gICAgfVxuXG4gICAgb25Ecm9wKGRyb3BwZWQpIHtcbiAgICAgICAgdmFyIGRyb3BwZWRET007XG4gICAgICAgIHZhciBjb3JuZXJzO1xuICAgICAgICB2YXIgZHJvcHpvbmVSZWY7XG5cbiAgICAgICAgZHJvcHBlZERPTSA9IGRyb3BwZWQuRE9NTm9kZSB8fCBSZWFjdERPTS5maW5kRE9NTm9kZShkcm9wcGVkKTtcbiAgICAgICAgY29ybmVycyA9IHRoaXMuZ2V0Q29ybmVycyhkcm9wcGVkRE9NKTtcblxuICAgICAgICBkcm9wem9uZVJlZiA9IF8ucmVkdWNlKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAoYSwgdiwgaykgPT4ge1xuICAgICAgICAgICAgaWYgKHNrb2FzaC51dGlsLmRvSW50ZXJzZWN0KGNvcm5lcnMsIHRoaXMuZHJvcHpvbmVDb3JuZXJzW2tdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYGRyb3B6b25lLSR7a31gXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKGRyb3B6b25lUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmluQm91bmRzKGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3V0T2ZCb3VuZHMoZHJvcHBlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLm9uRHJvcC5jYWxsKHRoaXMsIGRyb3BwZWQpO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2luZykge1xuICAgICAgICBfLmVhY2godGhpcy5wcm9wcy5kcm9wem9uZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICB2YXIgZHJvcHpvbmVSZWY7XG4gICAgICAgICAgICB2YXIgY29udGFpbnM7XG4gICAgICAgICAgICBkcm9wem9uZVJlZiA9IHRoaXMucmVmc1tgZHJvcHpvbmUtJHtrZXl9YF07XG4gICAgICAgICAgICBjb250YWlucyA9IGRyb3B6b25lUmVmLmNvbnRhaW5zIHx8IFtdO1xuICAgICAgICAgICAgaW5kZXggPSBjb250YWlucy5pbmRleE9mKGRyYWdnaW5nKTtcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIGNvbnRhaW5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBkcm9wem9uZVJlZi5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRHJhZy5jYWxsKHRoaXMsIGRyYWdnaW5nKTtcbiAgICB9XG5cbiAgICBpbkJvdW5kcyhkcm9wcGVkLCBkcm9wem9uZVJlZikge1xuICAgICAgICBpZiAoIWRyb3B6b25lUmVmLnByb3BzLmFuc3dlcnMgfHwgZHJvcHpvbmVSZWYucHJvcHMuYW5zd2Vycy5pbmRleE9mKGRyb3BwZWQucHJvcHMubWVzc2FnZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3V0T2ZCb3VuZHMoZHJvcHBlZCkge1xuICAgICAgICAvLyByZXNwb25kIHRvIGFuIG91dCBvZiBib3VuZHMgZHJvcFxuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnb3V0Jyk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmluY29ycmVjdE9uT3V0T2ZCb3VuZHMpIHRoaXMuaW5jb3JyZWN0KGRyb3BwZWQpO1xuICAgIH1cblxuICAgIGNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgLy8gcmVzcG9uZCB0byBjb3JyZWN0IGRyb3BcbiAgICAgICAgZHJvcHBlZC5tYXJrQ29ycmVjdCgpO1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuXG4gICAgICAgIGRyb3B6b25lUmVmLmNvbnRhaW5zID0gKGRyb3B6b25lUmVmLmNvbnRhaW5zIHx8IFtdKS5jb25jYXQoZHJvcHBlZCk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvcnJlY3QuY2FsbCh0aGlzLCBkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgfVxuXG4gICAgaW5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgICAgIC8vIHJlc3BvbmQgdG8gaW5jb3JyZWN0IGRyb3BcbiAgICAgICAgZHJvcHBlZC5tYXJrSW5jb3JyZWN0KCk7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkluY29ycmVjdC5jYWxsKHRoaXMsIGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5kcm9wcGVkICYmIHByb3BzLmRyb3BwZWQgIT09IHRoaXMucHJvcHMuZHJvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5vbkRyb3AocHJvcHMuZHJvcHBlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZHJhZ2dpbmcgJiYgcHJvcHMuZHJhZ2dpbmcgIT09IHRoaXMucHJvcHMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25EcmFnKHByb3BzLmRyYWdnaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRyb3B6b25lcygpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAoY29tcG9uZW50LCBrZXkpID0+XG4gICAgICAgICAgICA8Y29tcG9uZW50LnR5cGVcbiAgICAgICAgICAgICAgICB7Li4uY29tcG9uZW50LnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YGRyb3B6b25lLSR7a2V5fWB9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdkcm9wem9uZXMnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCdhc3NldHMnKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJEcm9wem9uZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRHJvcHpvbmUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgZHJvcHpvbmVzOiBbPHNrb2FzaC5Db21wb25lbnQgLz5dLFxuICAgIG9uQ29ycmVjdDogXy5ub29wLFxuICAgIG9uSW5jb3JyZWN0OiBfLm5vb3AsXG4gICAgb25EcmFnOiBfLm5vb3AsXG4gICAgb25Ecm9wOiBfLm5vb3AsXG4gICAgaW5jb3JyZWN0T25PdXRPZkJvdW5kczogdHJ1ZSxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHpvbmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVuZFg6IDAsXG4gICAgICAgICAgICBlbmRZOiAwLFxuICAgICAgICAgICAgem9vbTogMSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vdXNlRG93biA9IHRoaXMubW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW91c2VVcCA9IHRoaXMubW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5tb3ZlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLnRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50b3VjaEVuZCA9IHRoaXMudG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnNldFpvb20gPSB0aGlzLnNldFpvb20uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG91bGREcmFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG91bGREcmFnLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgbWFya0NvcnJlY3QoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFya0luY29ycmVjdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0OiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV0dXJuT25JbmNvcnJlY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9TdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRFdmVudChlLCBjYikge1xuICAgICAgICB2YXIgcmVjdDtcbiAgICAgICAgdmFyIHN0YXJ0WDtcbiAgICAgICAgdmFyIHN0YXJ0WTtcbiAgICAgICAgdmFyIGVuZFg7XG4gICAgICAgIHZhciBlbmRZO1xuICAgICAgICB2YXIgZ3JhYlg7XG4gICAgICAgIHZhciBncmFiWTtcblxuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMuRE9NTm9kZSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRHJhZygpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgICAgICAgIHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGUgPSBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICAgICAgICBlLm9mZnNldFggPSBlLnBhZ2VYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgZS5vZmZzZXRZID0gZS5wYWdlWSAtIHJlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhYlggPSBlLm9mZnNldFggLyB0aGlzLnN0YXRlLnpvb207XG4gICAgICAgIGdyYWJZID0gZS5vZmZzZXRZIC8gdGhpcy5zdGF0ZS56b29tO1xuXG4gICAgICAgIHN0YXJ0WCA9IGVuZFggPSAoZS5wYWdlWCAvIHRoaXMuc3RhdGUuem9vbSAtIGdyYWJYKTtcbiAgICAgICAgc3RhcnRZID0gZW5kWSA9IChlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tIC0gZ3JhYlkpO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZXR1cm4pIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWCkgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnRYICsgdGhpcy5zdGF0ZS5ncmFiWCAtIGdyYWJYIDpcbiAgICAgICAgICAgICAgICBzdGFydFg7XG4gICAgICAgICAgICBzdGFydFkgPSBfLmlzRmluaXRlKHRoaXMuc3RhdGUuZ3JhYlkpID9cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WSArIHRoaXMuc3RhdGUuZ3JhYlkgLSBncmFiWSA6XG4gICAgICAgICAgICAgICAgc3RhcnRZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkcmFnZ2luZzogdHJ1ZSxcbiAgICAgICAgICAgIHJldHVybjogZmFsc2UsXG4gICAgICAgICAgICBzdGFydFgsXG4gICAgICAgICAgICBzdGFydFksXG4gICAgICAgICAgICBncmFiWCxcbiAgICAgICAgICAgIGdyYWJZLFxuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZHJhZ2dhYmxlVGFyZ2V0LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiB0aGlzLFxuICAgICAgICAgICAgICAgIGRyb3BwZWQ6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25EcmFnLmNhbGwodGhpcywgdGhpcyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIH1cblxuICAgIGF0dGFjaFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBtb3VzZURvd24oZSkge1xuICAgICAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hTdGFydChlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaFRvdWNoRXZlbnRzKTtcbiAgICB9XG5cbiAgICBtb3ZlRXZlbnQoZSkge1xuICAgICAgICBlID0gZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSA/IGUudGFyZ2V0VG91Y2hlc1swXSA6IGU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlbmRYOiAoZS5wYWdlWCAvIHRoaXMuc3RhdGUuem9vbSAtIHRoaXMuc3RhdGUuZ3JhYlgpLFxuICAgICAgICAgICAgZW5kWTogKGUucGFnZVkgLyB0aGlzLnN0YXRlLnpvb20gLSB0aGlzLnN0YXRlLmdyYWJZKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kRXZlbnQoY2IpIHtcbiAgICAgICAgdGhpcy5vbkRyb3AoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXR1cm4pIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9TdGFydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYi5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEVuZChlbmRYLCBlbmRZKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuVG9TdGFydCgpIHtcbiAgICAgICAgdmFyIGVuZFg7XG4gICAgICAgIHZhciBlbmRZO1xuICAgICAgICB2YXIgZG9SZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RheU9uQ29ycmVjdCAmJiB0aGlzLnN0YXRlLmNvcnJlY3QpIHtcbiAgICAgICAgICAgIGVuZFggPSB0aGlzLnN0YXRlLmVuZFg7XG4gICAgICAgICAgICBlbmRZID0gdGhpcy5zdGF0ZS5lbmRZO1xuICAgICAgICAgICAgZG9SZXR1cm4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuZFggPSB0aGlzLnN0YXRlLnN0YXJ0WDtcbiAgICAgICAgICAgIGVuZFkgPSB0aGlzLnN0YXRlLnN0YXJ0WTtcbiAgICAgICAgICAgIGRvUmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmV0dXJuOiBkb1JldHVybixcbiAgICAgICAgICAgIGVuZFgsXG4gICAgICAgICAgICBlbmRZLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIH1cblxuICAgIGRldGFjaFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBtb3VzZVVwKCkge1xuICAgICAgICB0aGlzLmVuZEV2ZW50KHRoaXMuZGV0YWNoTW91c2VFdmVudHMpO1xuICAgIH1cblxuICAgIHRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLmVuZEV2ZW50KHRoaXMuZGV0YWNoVG91Y2hFdmVudHMpO1xuICAgIH1cblxuICAgIG9uRHJvcCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgZHJvcHBlZDogdGhpc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIHRoaXMuc2V0Wm9vbSgpO1xuXG4gICAgICAgIHRoaXMuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgICAgIHRoaXMuRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRab29tKTtcbiAgICB9XG5cbiAgICBzZXRab29tKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb206IHN0YXRlLnNjYWxlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICBsZXQgeCA9IHRoaXMuc3RhdGUuZW5kWCAtIHRoaXMuc3RhdGUuc3RhcnRYIHx8IDA7XG4gICAgICAgIGxldCB5ID0gdGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkgfHwgMDtcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5zdGF0ZS5zY2FsZSB8fCAxO1xuICAgICAgICBsZXQgcm90YXRlID0gdGhpcy5zdGF0ZS5yb3RhdGUgfHwgMDtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eH1weCkgdHJhbnNsYXRlWSgke3l9cHgpIHNjYWxlKCR7c2NhbGV9KSByb3RhdGUoJHtyb3RhdGV9ZGVnKWA7XG5cbiAgICAgICAgcmV0dXJuIF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgdHJhbnNmb3JtLFxuICAgICAgICAgICAgV2Via2l0VHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgIH0sIHRoaXMuc3RhdGUuc3R5bGUsIHRoaXMucHJvcHMuc3R5bGUpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgICAgICAgIERSQUdHSU5HOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgICAgICAgUkVUVVJOOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgICAgICAgIENPUlJFQ1Q6IHRoaXMuc3RhdGUuY29ycmVjdCxcbiAgICAgICAgfSwgJ2RyYWdnYWJsZScsIHRoaXMuc3RhdGUuY2xhc3Nlcywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e3RoaXMucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyYWdnYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkcmFnZ2FibGVUYXJnZXQ6ICdkcmFnZ2FibGUnLFxuICAgIHNob3VsZERyYWc6ICgpID0+IHRydWUsXG4gICAgcmV0dXJuOiBmYWxzZSxcbiAgICByZXR1cm5PbkluY29ycmVjdDogZmFsc2UsXG4gICAgc3RheU9uQ29ycmVjdDogdHJ1ZSxcbiAgICBvbkRyb3A6IF8ubm9vcCxcbiAgICBvbkRyYWc6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgRHJhZ2dhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNC5qcyIsImltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5cbmltcG9ydCBpdGVtc0NvbXBvc3QgZnJvbSAnLi9pdGVtc19jb21wb3N0JztcbmltcG9ydCBpdGVtc0xhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuaW1wb3J0IGl0ZW1zUmVjeWNsZSBmcm9tICcuL2l0ZW1zX3JlY3ljbGUnO1xuXG5sZXQgc2h1ZmZsZWRJdGVtc0NvbXBvc3QgPSBfLnNodWZmbGUoaXRlbXNDb21wb3N0KTtcbmxldCBzaHVmZmxlZEl0ZW1zTGFuZGZpbGwgPSBfLnNodWZmbGUoaXRlbXNMYW5kZmlsbCk7XG5sZXQgc2h1ZmZsZWRJdGVtc1JlY3ljbGUgPSBfLnNodWZmbGUoaXRlbXNSZWN5Y2xlKTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gW10uY29uY2F0KGl0ZW1zQ29tcG9zdCkuY29uY2F0KGl0ZW1zTGFuZGZpbGwpLmNvbmNhdChpdGVtc1JlY3ljbGUpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdkeW5hbWljLWRpdmVydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA0LFxuICAgIHBvaW50c1BlckJpbjogNDAwLFxuICAgIHNjb3JlVG9XaW46IDEyMDAsXG4gICAgZHJvcHBlckFtb3VudDogMixcbiAgICBnZXREcm9wcGVyUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Jpbk5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5pdGVtc1t0aGlzLmZpcnN0SXRlbUluZGV4XS5wcm9wcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyYWdnYWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBfLnJhbmRvbSgzMCwgNzApICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogXy5yYW5kb20oMzAsIDcwKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IF8ucmFuZG9tKDEsIDEuNSksXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogXy5yYW5kb20oLTMwLCAzMCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHpvbmVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICgoc2NvcmUgJSBvcHRzLnBvaW50c1BlckJpbikgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoZHJhZ2dhYmxlLCBkcm9wem9uZUFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkcm9wem9uZUFycmF5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbmRYOiBkcmFnZ2FibGUuc3RhdGUuZW5kWCArIDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kWTogZHJhZ2dhYmxlLnN0YXRlLmVuZFkgKyAyMDAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IG9wdHMuaGl0cyArIDEsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NldHM6IFtcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0U2VsZWN0Lm1wM2B9IC8+LFxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiaW5jb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9V3JvbmdTZWxlY3QubXAzYH0gLz4sXG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJkcmFnXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RHJhZy5tcDNgfSAvPixcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1WYWN1dW0ubXAzYH0gLz4sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb25EcmFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2RyYWcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZWRpYSgnZHJvcCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgYmluSXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3JlY3ljbGUnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgMikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgNikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbGFuZGZpbGwnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgNikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgMikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY29tcG9zdCcsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDYpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCAyKSksXG4gICAgICAgIH0sXG4gICAgXVxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2VuZCBtaXNwbGFjZWQgaXRlbXM8YnIvPlxuICAgICAgICAgICAgICAgIGJhY2sgdG8gYmUgc29ydGVkITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBIZWxwIG90aGVycyBieSBpZGVudGlmeWluZzxici8+XG4gICAgICAgICAgICAgICAgaXRlbXMgaW4gdGhlIHdyb25nIGJpbi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdNaXNwbGFjZWRJdGVtcycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNCcsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiAxNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2F5IHRvIFNvcnQhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoaXMgbmV4dCBsZXZlbCB0YWtlczxici8+XG4gICAgICAgICAgICAgICAgU3VwZXIgU29ydGluZyBTa2lsbHMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2F5VG9Tb3J0JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdCdzIGdldHRpbmcgbWVzc3kgaW4gaGVyZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhlc2UgYmlucyBhcmUgZnVsbDxici8+XG4gICAgICAgICAgICAgICAgb2YgdGhpbmdzIHRoYXQgc2hvdWxkbid0PGJyLz5cbiAgICAgICAgICAgICAgICBoYXZlIGxhbmRlZCBoZXJlLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBnZXQgc29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdHZXR0aW5nTWVzc3knLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXYXN0ZSBEaXZlcnNpb24gaXMgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBuYW1lIG9mIHRoZSBnYW1lLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGUgdGl0bGUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIER5bmFtaWMgRGl2ZXJ0ZXIgaXM8YnIvPlxuICAgICAgICAgICAgICAgIGp1c3QgYXJvdW5kIHRoZSBjb3JuZXIuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2FzdGVEaXZlcnNpb24nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnd2FudC10by1zdGFjaycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2h5IHdvdWxkIHlvdTxici8+XG4gICAgICAgICAgICAgICAgd2FudCB0byBzdGFjazxici8+XG4gICAgICAgICAgICAgICAgeW91ciB0cmF5P1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1doeVN0YWNrJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJjb25zdCBTUkMgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vY2hhbmdlbXl3b3JsZG5vdy92aWRlby91cGxvYWQvJyArXG4gICAgJ3YxNDg2NTA3ODczL2JhZF9zdGFja2luZ19jb21wcmVzc2VkX24zZ3Jwdy5tcDQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInZpZGVvXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz1cIkJLRzVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLlZpZGVvIHNyYz17U1JDfSAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFByb3BlciB0cmF5IHN0YWNraW5nPGJyLz5cbiAgICAgICAgICAgICAgICBpcyBhIGdhbWUgb2Ygc3BhY2UuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEhvdyBtdWNoIHNwYWNlPGJyLz5cbiAgICAgICAgICAgICAgICBjYW4geW91IHNhdmU/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnR2FtZU9mU3BhY2UnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCIvKiBlc2xpbnQgbWF4LWxpbmVzOiBbXCJlcnJvclwiLCB7XCJtYXhcIjogNjAwfV0gKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5sZXQgb25TZWxlY3QgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgbGV0IHJlZiA9IHRoaXMucmVmc1trZXldO1xuICAgIGxldCByZWN0ID0gUmVhY3RET00uZmluZERPTU5vZGUocmVmKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHJlZi5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICBuZXc6IHRydWUsXG4gICAgICAgICAgICByZWYsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgcmVzb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ2xpcXVpZHMnLFxuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ3RyYXktc3RhY2tpbmcnLFxuICAgICdob21lJyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IG1hcEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1OYW1lcykge1xuICAgIGxldCBpdGVtcyA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoaXRlbU5hbWVzLCBpdGVtLm5hbWUpKTtcblxuICAgIHJldHVybiBfLm1hcChpdGVtcywgaXRlbSA9PlxuICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICBjbGFzc05hbWU9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgIG1lc3NhZ2U9e2l0ZW0uYmlufVxuICAgICAgICAgICAgcmVDYXRjaGFibGU9e3RydWV9XG4gICAgICAgICAgICBiZWNvbWVzPXtpdGVtLmJlY29tZXN9XG4gICAgICAgICAgICBjaGlsZHJlbj17Z2V0Q2hpbGRyZW4oaXRlbSl9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCB0cmF5c0FycmF5ID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTEnLFxuICAgICAgICAgICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgICAgICAgICAgICAgICdoYWxmLWZ1bGwtZW5lcmd5LWRyaW5rLWJvdHRsZScsXG4gICAgICAgICAgICAgICAgICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTEnLFxuICAgICAgICAgICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZS0yJyxcbiAgICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdwbGFzdGljLWN1cC0xJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FwcGxlLWNvcmUnLFxuICAgICAgICAgICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyLTInLFxuICAgICAgICAgICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0yJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dob2xlLWJhbmFuYScsXG4gICAgICAgICAgICAgICAgXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5LXBpbmsnLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTEwJyxcbiAgICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXktYmx1ZScsXG4gICAgICAgIGJpbjogJ3RyYXktc3RhY2tpbmcnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgPHNrb2FzaC5TZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgICAgICAgIGxpc3Q9e21hcEl0ZW1zKFtcbiAgICAgICAgICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItMTAnLFxuICAgICAgICAgICAgICAgIF0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgXVxuICAgIH0sXG5dO1xuXG5sZXQgY2F0Y2hhYmxlc0FycmF5ID0gXy5tYXAodHJheXNBcnJheSwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwibmV4dFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUx1bmNoYm94U2xpZGUubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29udmV5b3JCZWx0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicG91clwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxpcXVpZFBvdXIubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0cmF5XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9VHJheVN0YWNrZXJSYWNrLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwic2VsZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbVNlbGVjdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdtYXN0ZXItc29ydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA1LFxuICAgIGRyb3BwZXJBbW91bnQ6IDIsXG4gICAgYmluTmFtZXMsXG4gICAgY29sbGlkZUZyYWN0aW9uOiAuNCxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHJvcENsYXNzID0gXy50b1VwcGVyKG9wdHMuYmluTmFtZXNbYmluUmVmS2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ2NsYXNzTmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZHJvcENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYXkgPSB0aGlzLmdldEZpcnN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2YodHJheS5yZWZzWydjaGlsZHJlbi0wJ10uc3RhdGUuY2xhc3NlcywgJ1NFTEVDVEVEJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1SZWYgPSAhb3B0cy5pdGVtUmVmID8gdHJheSA6IHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgRE9NTm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgIT09ICd0b3AnIHx8XG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmluY2x1ZGVzKG9wdHMuaXRlbUNsYXNzTmFtZSwgJ0xJUVVJRFMnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIV8uaW5jbHVkZXModGhpcy5wcm9wcy5kcm9wQ2xhc3MsICdMSVFVSURTJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdEl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gaXRlbS5wcm9wcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGFibGUucHJvcHMubGlzdFtpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLnByb3BzLm1lc3NhZ2UgPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2luZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogb3B0cy5pdGVtQW1vdW50IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnNldFN0YXRlKHtjbGFzc2VzOiB7fX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghXy5pbmNsdWRlcyhvcHRzLml0ZW1DbGFzc05hbWUsICdQT1VSJykpIHtcbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFsnaXRlbScsICdwb3VyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtUmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLml0ZW1DbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gdGhpcy5yZWZzWydpdGVtcy0nICsgdGhpcy5maXJzdEl0ZW1JbmRleF0ucmVmc1snY2hpbGRyZW4tMCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JbmRleCA9IF8uaW5kZXhPZihzZWxlY3RhYmxlLnN0YXRlLmNsYXNzZXMsIHNlbGVjdGFibGUucHJvcHMuc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxlY3RhYmxlLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzc05hbWUobmV4dFByb3BzLml0ZW1DbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5yZW1vdmVJdGVtQ2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMucmVtb3ZlSXRlbUNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5pdGVtQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdLnJlZnNbJ2NoaWxkcmVuLTAnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2Yoc2VsZWN0YWJsZS5zdGF0ZS5jbGFzc2VzLCBzZWxlY3RhYmxlLnByb3BzLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0YWJsZS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0SXRlbSAmJlxuICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMuc2VsZWN0SXRlbSAhPT0gdGhpcy5wcm9wcy5zZWxlY3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmF5ID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJheS5wcm9wcy5tZXNzYWdlID09PSAnaG9tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkuYWRkQ2xhc3NOYW1lKCdIT01FJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRyYXkpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodHJheS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSAqIC44IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3AgPSByZWN0LnRvcCArIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSAqIC44IC8gMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogXy5yZWR1Y2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5yZWZzWydjaGlsZHJlbi0wJ10ucmVmcywgKGEsIHJlZikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSArIChyZWYucHJvcHMubWVzc2FnZSA9PT0gJ2xpcXVpZHMnID8gMiA6IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SXRlbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29ycmVjdDogZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgICAgIGxldCBhbW91bnQgPSBvcHRzLml0ZW1BbW91bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ0FVR0hUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbWFudWFsLWRyb3BwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5nZXQoYnVja2V0UmVmLCAncHJvcHMubWVzc2FnZScpICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJheS1zdGFja2luZy10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYXkgU3RhY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdjaG9jb2xhdGUnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5jaG9jb2xhdGUubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2ZydWl0J30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuZnJ1aXQuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdtaWxrJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ29yYW5nZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm9yYW5nZS5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTm90IGFsbCBsdW5jaGVzIGFyZTxici8+XG4gICAgICAgICAgICAgICAgY3JlYXRlZCBlcXVhbGx5Ljxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBTb21lIGx1bmNoZXMgY29tZSBmcm9tPGJyLz5cbiAgICAgICAgICAgICAgICBob21lIGFuZCB0aGVyZSBpczxici8+XG4gICAgICAgICAgICAgICAgbm8gdHJheSBzdGFja2luZyBuZWVkZWQhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnTHVuY2hlc0NyZWF0ZWRFcXVhbGx5JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEl0ZW1zIGZyb20gaG9tZTxici8+XG4gICAgICAgICAgICAgICAgY2FuIGJlIHRyaWNreSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhleSBhcmUgdW5pcXVlIGFuZCB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSBvbiB5b3VyIG93biB0byBzb3J0ITxici8+XG4gICAgICAgICAgICAgICAgQXNrIGZvciBoZWxwIGlmIHlvdTxici8+XG4gICAgICAgICAgICAgICAgYXJlIHVuc3VyZSBvZiBpdGVtcy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdJdGVtc0Zyb21Ib21lJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiAyMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgYSB0b3VnaDxici8+XG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlIGJ1dCBJIHNlZTxici8+XG4gICAgICAgICAgICAgICAgeW91ciBuZXcgRmxpcDxici8+XG4gICAgICAgICAgICAgICAgb24gdGhlIGhvcml6b24hPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBHbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUb3VnaENoYWxsZW5nZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91IGFyZSBhYm91dCB0byBXaW48YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBoaWdoZXN0IGhvbm9yIGZvciB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIEdyZWVuIFRlYW0gQ2hhbGxlbmdlITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBXaW4gdGhpcyBsZXZlbCB0byBiZWNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIGEgTWFzdGVyIFNvcnRlciFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIaWdoZXN0SG9ub3InLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdub3ctYS1tZW1iZXInLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIG5vdyBhIG1lbWJlcjxici8+XG4gICAgICAgICAgICAgICAgb2YgdGhlIEdyZWVuIFRlYW0hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEl0J3MgdGltZSB0byBzaGFyZTxici8+XG4gICAgICAgICAgICAgICAgaXQgd2l0aCB5b3VyPGJyLz5cbiAgICAgICAgICAgICAgICBmYW1pbHkgYW5kIGNvbW11bml0eSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdNZW1iZXJPZkdyZWVuVGVhbScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4uanMiLCJjbGFzcyBRdWl0U2NyZWVuIGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gICAgb2theSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3F1aXQnKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ21lbnVDbG9zZScsIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJBc3NldHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2V0cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYXNzZXRzLm1hcCgoYXNzZXQsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5hc3NldC5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YXNzZXQucmVmIHx8IGFzc2V0LnByb3BzWydkYXRhLXJlZiddIHx8ICgnYXNzZXQtJyArIGtleSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHNjcmVlbiAke3RoaXMuZ2V0Q2xhc3NOYW1lcygpfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXNzZXRzKCl9XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+QXJlIHlvdSBzdXJlPGJyLz55b3Ugd2FudCB0byBxdWl0PzwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicXVpdC15ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub2theS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJxdWl0LW5vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChcbiAgICA8UXVpdFNjcmVlblxuICAgICAgICBpZD1cInF1aXRcIlxuICAgICAgICBhc3NldHM9e1tcbiAgICAgICAgXX1cbiAgICAvPlxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4uanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9qQkE7QUNDQTtBQURBOzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBRENBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNDQTtBRENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUVwQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBRkVBO0FBQ0E7QUFDQTtBQWlHQTtBQUNBO0FBREE7QUFHQTtBQXZHQTtBQUNBO0FBdUpBOzs7Ozs7QUc3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBRkE7QUFEQTtBQVdBOzs7O0FBZEE7QUFDQTtBSmdCQTs7Ozs7Ozs7Ozs7Ozs7QUtqQkE7QUxDQTtBQUNBO0FBQUE7QUtFQTtBTENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBWkE7QUFlQTs7Ozs7Ozs7Ozs7Ozs7QU1GQTtBTkNBO0FBQ0E7QUFBQTtBTUVBO0FOQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUF4QkE7QUFxQ0E7QUFDQTtBQXZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FPWkE7QUFDQTs7Ozs7QUFDQTtBUEFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBUU5BO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7OztBQzJMQTtBVENBO0FBQ0E7QUFDQTs7O0FBaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBU0NBO0FUQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBVXhMQTtBVkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBV21DQTtBWEFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QVdFQTtBWENBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBZkE7QUFzQkE7QUFDQTtBQTdEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7O0FZbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdCQTtBYkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckNBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FjUkE7QUFDQTtBQUNBO0FkdURBO0FBQUE7QUFDQTtBQUNBO0FjQ0E7QWRIQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBZTZDQTtBZkNBO0FBQ0E7QUFBQTtBZUVBO0FmQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FlQ0E7QWZDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBZURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBZkZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFQQTtBQUhBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUF6Q0E7QUFnREE7QUFDQTtBQXpKQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQXhDQTtBQUNBO0FBaURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FnQjVGQTtBQUNBO0FBQ0E7QWhCdURBO0FBQUE7QUFDQTtBQUNBO0FnQkNBO0FoQkhBO0FBQUE7Ozs7Ozs7Ozs7OztBaUJ2Q0E7QWpCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTs7Ozs7Ozs7Ozs7QWtCUkE7QUFDQTtBQUNBO0FsQm9DQTtBQUFBO0FBQ0E7QUFDQTtBa0JDQTtBbEJIQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBbUJwQkE7QUFDQTtBQUNBO0FuQkNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FtQkNBO0FuQkNBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFXQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVpBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBekNBO0FBK0NBO0FBQ0E7QUFDQTtBQWhGQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7O0FvQmJBO0FwQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUJFQTtBckJDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBc0JLQTtBdEJBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FzQkNBO0F0QkNBO0FBQ0E7QXNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBdEJDQTtBQUNBO0FzQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBdEJDQTtBQUNBO0FBQ0E7QXNCQ0E7QXRCQ0E7QXNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBdEJDQTtBQUNBO0FzQkNBO0F0QkNBO0FzQkNBO0FBQ0E7QUFDQTtBQUNBO0F0QllBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBc0JFQTtBdEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVkE7QUFxQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWEE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQkE7QUF3QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBYUE7QUFFQTtBQUZBO0FBbEJBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWhCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBVkE7QUE1SEE7QUEwSUE7QUFDQTtBQUNBO0FBbk9BO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBdUJMQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QXZCQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVFBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBd0IvR0E7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0F4QkNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBaE5BO0FBQ0E7QUFtTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7O0F5QmhPQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBekJBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUF0Q0E7QUFDQTtBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBMEJuREE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QTFCQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFIQTtBQU1BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QTBCQUE7QUFDQTtBMUJGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVRBO0FBY0E7Ozs7QUFsS0E7QUFDQTtBQW9LQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQUNBO0FBa0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QTJCM0xBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0EzQkNBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTs7OztBQWxEQTtBQUNBO0FBb0RBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7Ozs7Ozs7O0E0QmxFQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFLQTtBNUJBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBNUJDQTtBQUxBOzs7Ozs7Ozs7Ozs7QTZCWEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBS0E7QTdCQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBaEJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUE3QkE7QUErQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBeEJBO0FBMEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBMUJBO0FBNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFSQTtBQURBO0FBY0E7QUFDQTtBQXBCQTtBQXNCQTtBQXREQTtBQXdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBcEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBNkJDQTtBN0J2T0E7Ozs7Ozs7Ozs7OztBOEIvREE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QS9CcURBO0FBQUE7QUFDQTtBQUNBO0ErQkNBO0EvQkhBO0FBQUE7Ozs7Ozs7Ozs7O0FnQ3ZEQTtBQUNBO0FBQ0E7QWhDb0JBO0FBRUE7QUFDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFDQTtBQUtBO0FoQ0FBO0FBQ0E7QUFDQTtBZ0NDQTtBaENDQTtBQUpBO0FBQUE7Ozs7Ozs7Ozs7OztBaUMvRkE7QWpDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWtDRUE7QWxDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FtQ0FBO0FuQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW9DRUE7QXBDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FxQ0FBO0FyQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzQ0VBO0F0Q0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBdUNBQTtBdkNDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBd0NFQTtBeENDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBeUMyQ0E7QUFDQTtBQUNBO0FBQ0E7QXpDQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBeUNDQTtBekNDQTtBQURBO0FBR0E7QXlDQ0E7QUFDQTtBekNDQTtBeUNGQTtBQVRBO0FBY0E7QUFDQTtBQUNBO0F6Q0ZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQVRBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBeUNGQTtBQXJDQTtBQTJDQTtBQUNBO0FBQ0E7QUEvRkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0F6Q1FBO0FBQ0E7QUFPQTtBQUNBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQURBO0FBREE7Ozs7Ozs7Ozs7OztBMENuQ0E7QTFDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTJDRUE7QTNDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTRDRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBTUE7QTVDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTRDQ0E7QTVDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUF0QkE7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQTdDQTtBQTBEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzTkE7Ozs7Ozs7Ozs7OztBNkNsRUE7QTdDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QThDRUE7QTlDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErQ0FBO0EvQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdERUE7QWhEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpREFBO0FqRENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUNBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrREVBO0FsRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbURBQTtBbkRDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvREVBO0FwRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcURBQTtBckRDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzREVBO0F0RENBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QXVERkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0F2RENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0F1RENBO0F2RENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFBQTtBQUNBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBUkE7QUFKQTtBQUFBO0FBQ0E7QUFlQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUdBO0FBUEE7QUFEQTtBQVdBO0FBYkE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFKQTtBQU1BO0FBQ0E7QUFEQTtBQUdBO0FBVkE7QUFEQTtBQWNBO0FBQ0E7QUEvQkE7QUFpQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUExR0E7QUFDQTtBQURBO0FBMkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0F1RENBO0FBQ0E7QUFDQTtBdkRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQVJBO0FBREE7QUFZQTtBQXRJQTtBQXdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQWZBO0FBaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUEE7QUFjQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBN0ZBO0FBZ0dBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFTQTs7Ozs7Ozs7Ozs7O0F3RHZHQTtBeERDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBeURFQTtBekRDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTBEQUE7QTFEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBbEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBMkRFQTtBM0RDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTREQUE7QTVEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBNkRFQTtBN0RDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QThEQUE7QTlEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QStERUE7QS9EQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FnRUFBO0FoRUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQVRBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUF0QkE7QUF3QkE7QUFDQTtBQTVCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWlFRUE7QWpFQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBa0VpQkE7QWxFQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrRUNBO0FBQ0E7QWxFR0E7QWtFQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FsRUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBa0VDQTtBQUNBO0FsRUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBa0VDQTtBbEVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWtFQ0E7QWxFQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFBQTtBQUZBO0FBRkE7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQXdCQTtBQUFBO0FBQ0E7QUFBQTtBa0VFQTtBbEVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVkE7QUFxQkE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFIQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBZEE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBMUZBO0FBREE7QUF6RUE7QUFDQTtBQURBO0FBNEtBO0FBQ0E7QUFDQTtBQXBNQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBbUVqQkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QW5FQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUhBO0FBSUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBOzs7Ozs7QW9FdkpBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0E3RUNBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7O0FBN0tBO0FBQ0E7QUErS0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFDQTtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBOEVwTUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0E5RUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBSEE7QUFEQTtBQU9BOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Ozs7QUFwTUE7QUFDQTtBQXNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTs7Ozs7Ozs7Ozs7Ozs7OztBK0VsTkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0EvRUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqQkE7QUFrQkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTs7OztBQTNQQTtBQUNBO0FBNlBBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBOzs7Ozs7Ozs7Ozs7QWdGMVFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QWhGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFOQTtBQVFBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBREE7QUFRQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0RBO0FBaUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQVFBO0FBQ0E7QUFGQTtBQVFBO0FBQ0E7QUFGQTtBQW5IQTs7Ozs7Ozs7Ozs7O0FpRm5DQTtBakZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBa0ZFQTtBbEZDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW1GQUE7QW5GQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBbEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBb0ZFQTtBcEZDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXFGQUE7QXJGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzRkVBO0F0RkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBdUZBQTtBdkZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0F3RkVBO0F4RkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBeUZBQTtBekZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFNQTtBQVZBO0FBWUE7QUFDQTtBQWhCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBMEZFQTtBMUZDQTtBQUNBO0FBQUE7QTBGRUE7QTFGQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQVBBO0FBVUE7QUFDQTtBQWhCQTs7Ozs7Ozs7Ozs7O0EyRkVBO0EzRkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0RkVBO0E1RkNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E2RkRBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBTkE7QUFPQTtBN0ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFVQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBNkZDQTtBN0ZGQTtBQUpBO0FBaUJBO0FBQ0E7QUFDQTtBQUVBO0E2RkNBO0E3RkZBO0FBSkE7QUFpQkE7QUFDQTtBQUNBO0FBRUE7QTZGQ0E7QTdGRkE7QUFKQTtBQWFBO0FBQ0E7QUFDQTtBQUVBO0E2RkNBO0E3RkZBO0FBSkE7QUFDQTtBQWFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFBQTtBQUNBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBUkE7QUFKQTtBQUFBO0FBQ0E7QUFlQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQWxCQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFTQTtBQWxCQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUNBO0FBREE7QUFOQTtBQURBO0FBWUE7QUE1TEE7QUE4TEE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBakJBO0FBbUJBO0FBMUJBO0FBQ0E7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFKQTtBQURBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEdBO0FBa0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQXZDQTtBQW9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFZQTs7Ozs7Ozs7Ozs7O0E4RnhMQTtBOUZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErRkVBO0EvRkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBZ0dBQTtBaEdDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBaUdFQTtBakdDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWtHQUE7QWxHQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbUdFQTtBbkdDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW9HQUE7QXBHQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUdFQTtBckdDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXNHQUE7QXRHQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0F1R0RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QXZHQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFOQTtBQUxBO0FBa0JBOzs7O0FBakRBO0FBQ0E7QUFvREE7QUFDQTtBQUNBO0FBRkE7OzsiLCJzb3VyY2VSb290IjoiIn0=