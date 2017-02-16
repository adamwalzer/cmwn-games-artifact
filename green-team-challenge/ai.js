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
/******/ 	var hotCurrentHash = "843a32f34f2926c0cc72"; // eslint-disable-line no-unused-vars
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
	            return catchRect.width && catchRect.height && bucketRect.top - yOffset < catchRect.bottom && bucketRect.top + yOffset > catchRect.top && xCenter > bucketRect.left && xCenter < bucketRect.right;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQzYTMyZjM0ZjI5MjZjMGNjNzIiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbmZpZy5qc29uIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZmlyZXdvcmtzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaW5mb19zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2xhbmRmaWxsLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2NvbXBvc3QuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2dhbWVfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3RvX3NvcnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfbGlxdWlkcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfY29tcGxldGVfc2NyZWVuX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy92aWRlb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdHJheXNfYXJyYXkuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbm93X2FfbWVtYmVyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3F1aXRfc2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSAxMDAwMDtcbiBcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGVycik7XG4gXHRcdH1cbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRpZihyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdGNhbGxiYWNrKCk7XG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xuIFx0XHRcdFx0XHRjYWxsYmFjayhlKTtcbiBcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgdXBkYXRlKTtcbiBcdFx0XHR9XG4gXHRcdH07XG4gXHR9XG5cblxuIFx0Ly8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYmVmNDViMC9zcmMvc2hhcmVkL3V0aWxzL2NhbkRlZmluZVByb3BlcnR5LmpzXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbiBcdHRyeSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJ4XCIsIHtcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cbiBcdFx0fSk7XG4gXHRcdGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiBcdH0gY2F0Y2goeCkge1xuIFx0XHQvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI4NDNhMzJmMzRmMjkyNmMwY2M3MlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9IGVsc2UgaG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XG4gXHRcdFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xuIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIChmdW5jdGlvbihuYW1lKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9KG5hbWUpKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gZW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG51bGwsIGZuKTtcbiBcdFx0XHRcdH0gZmluYWxseSB7XG4gXHRcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0fVxuXG4gXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdHZhbHVlOiBlbnN1cmVcbiBcdFx0XHR9KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRmbi5lID0gZW5zdXJlO1xuIFx0XHR9XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjaztcbiBcdFx0XHRcdGVsc2VcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJudW1iZXJcIilcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2VcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90Q2FsbGJhY2s7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHksIGNhbGxiYWNrKSB7XG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2YgYXBwbHkgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBmYWxzZTtcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fVxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0aG90RG93bmxvYWRNYW5pZmVzdChmdW5jdGlvbihlcnIsIHVwZGF0ZSkge1xuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xuIFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdH1cblxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdXBkYXRlLmMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcFt1cGRhdGUuY1tpXV0gPSB0cnVlO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcbiBcdFx0aG90Q2FsbGJhY2sgPSBudWxsO1xuIFx0XHRpZighY2FsbGJhY2spIHJldHVybjtcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUsIGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucywgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdGNhbGxiYWNrID0gb3B0aW9ucztcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGUpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIG1vZHVsZUlkICsgXCIgaW4gXCIgKyBwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiBbb3V0ZGF0ZWRNb2R1bGVzLCBvdXRkYXRlZERlcGVuZGVuY2llc107XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdHZhciByZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcbiBcdFx0XHRcdFx0aWYob3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzdWx0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0WzBdKTtcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XG4gXHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRbMV0sIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdFsxXVttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHR2YXIgaWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGNiKG91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSBpZighZXJyb3IpXG4gXHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg0M2EzMmYzNGYyOTI2YzBjYzcyIiwid2luZG93LkVOVklST05NRU5UID0ge1xuICAgIE1FRElBOiAnaHR0cHM6Ly9tZWRpYS1zdGFnaW5nLmNoYW5nZW15d29ybGRub3cuY29tL2YvJ1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9qcy9kZXYtdmFyaWFibGVzLmpzIiwidW5kZWZpbmVkXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICIsIihmdW5jdGlvbiAoZ2FtZU5hbWUpIHtcbiAgICAvLyByZW1vdmUgd2luZG93Lk1FRElBIG9uY2Ugbm8gZ2FtZXMgcmVmZXJlbmNlIGl0XG4gICAgdmFyIE1FRElBID0gd2luZG93Lk1FRElBID0ge1xuICAgICAgICBCQVNFOiBFTlZJUk9OTUVOVC5NRURJQVxuICAgIH07XG5cbiAgICBjb25zdCBHQU1FID0gJ2dhbWVzLyc7XG4gICAgY29uc3QgRUZGRUNUID0gJ3NvdW5kLWFzc2V0cy9lZmZlY3RzLyc7XG4gICAgY29uc3QgVk8gPSAnc291bmQtYXNzZXRzL3Zvcy8nO1xuICAgIGNvbnN0IElNQUdFID0gJ2ltYWdlLWFzc2V0cy8nO1xuICAgIGNvbnN0IFNQUklURSA9ICdzcHJpdGVzLWFuaW1hdGlvbnMvJztcbiAgICBjb25zdCBGUkFNRSA9ICdmcmFtZXMvJztcbiAgICBjb25zdCBGT05UID0gJ2ZvbnRzLyc7XG4gICAgY29uc3QgU0hBUkVEID0gJ3NoYXJlZC8nO1xuICAgIGNvbnN0IE1PQ0tfR0FNRSA9ICdtb2NrLWdhbWUvJztcblxuICAgIE1FRElBLkZPTlQgPSBNRURJQS5CQVNFICsgRk9OVDtcbiAgICBNRURJQS5TSEFSRUQgPSBNRURJQS5CQVNFICsgR0FNRSArIFNIQVJFRDtcblxuICAgIE1FRElBLkdBTUUgPSBNRURJQS5CQVNFICsgR0FNRSArIGdhbWVOYW1lICsgJy8nO1xuICAgIE1FRElBLkVGRkVDVCA9IE1FRElBLkdBTUUgKyBFRkZFQ1Q7XG4gICAgTUVESUEuVk8gPSBNRURJQS5HQU1FICsgVk87XG4gICAgTUVESUEuSU1BR0UgPSBNRURJQS5HQU1FICsgSU1BR0U7XG4gICAgTUVESUEuU1BSSVRFID0gTUVESUEuR0FNRSArIFNQUklURTtcbiAgICBNRURJQS5GUkFNRSA9IE1FRElBLkdBTUUgKyBGUkFNRTtcbiAgICBNRURJQS5GT05UID0gTUVESUEuR0FNRSArIEZPTlQ7XG5cbiAgICBNRURJQS5NT0NLID0ge307XG4gICAgTUVESUEuTU9DSy5HQU1FID0gTUVESUEuQkFTRSArIEdBTUUgKyBNT0NLX0dBTUU7XG4gICAgTUVESUEuTU9DSy5FRkZFQ1QgPSBNRURJQS5NT0NLLkdBTUUgKyBFRkZFQ1Q7XG4gICAgTUVESUEuTU9DSy5WTyA9IE1FRElBLk1PQ0suR0FNRSArIFZPO1xuICAgIE1FRElBLk1PQ0suSU1BR0UgPSBNRURJQS5NT0NLLkdBTUUgKyBJTUFHRTtcbiAgICBNRURJQS5NT0NLLlNQUklURSA9IE1FRElBLk1PQ0suR0FNRSArIFNQUklURTtcbiAgICBNRURJQS5NT0NLLkZSQU1FID0gTUVESUEuTU9DSy5HQU1FICsgRlJBTUU7XG4gICAgTUVESUEuTU9DSy5GT05UID0gTUVESUEuTU9DSy5HQU1FICsgRk9OVDtcblxuICAgIHdpbmRvdy5DTVdOLk1FRElBID0gTUVESUE7XG59KHdpbmRvdy5DTVdOLmdhbWVGb2xkZXIpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9qcy9tYWtlX21lZGlhX2dsb2JhbHMuanMiLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuaW1wb3J0IExvYWRlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xJztcblxuaW1wb3J0IGlPU1NjcmVlbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEnO1xuXG5pbXBvcnQgVGl0bGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3RpdGxlX3NjcmVlbic7XG5pbXBvcnQgSGlUaGVyZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuJztcbmltcG9ydCBLZXlJc1NvcnRpbmdTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2tleV9pc19zb3J0aW5nX3NjcmVlbic7XG5pbXBvcnQgTGlnaHRzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9saWdodHNfc2NyZWVuJztcbmltcG9ydCBGaXZlV2F5c1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbic7XG5pbXBvcnQgTGV2ZWxTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX3NjcmVlbl9jb21wb25lbnQnO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uMkluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb24zU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb240U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgTGV2ZWxDb21wbGV0ZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfY29tcGxldGVfc2NyZWVuX2NvbXBvbmVudCc7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIxSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMkluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyNEluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyNUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyNVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIxSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMkluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyNEluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyNUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyNVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgV2FudFRvU3RhY2tTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3dhbnRfdG9fc3RhY2tfc2NyZWVuJztcbmltcG9ydCBWaWRlb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIxSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMkluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyNEluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyNUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyNVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgTm93QU1lbWJlclNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbm93X2FfbWVtYmVyX3NjcmVlbic7XG5pbXBvcnQgUXVpdFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4nO1xuXG5za29hc2guc3RhcnQoXG4gICAgPHNrb2FzaC5HYW1lXG4gICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICBsb2FkZXI9ezxMb2FkZXIgLz59XG4gICAgICAgIHNjcmVlbnM9e1tcbiAgICAgICAgICAgIGlPU1NjcmVlbixcbiAgICAgICAgICAgIFRpdGxlU2NyZWVuLFxuICAgICAgICAgICAgSGlUaGVyZVNjcmVlbixcbiAgICAgICAgICAgIEtleUlzU29ydGluZ1NjcmVlbixcbiAgICAgICAgICAgIExpZ2h0c1NjcmVlbixcbiAgICAgICAgICAgIEZpdmVXYXlzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4wKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMUluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjEpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24ySW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMlNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMiksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24zU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4zKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNEluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjQpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb241SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuNSksXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDEpLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4wKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMSksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjIpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4zKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuNCksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigyKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuMCksXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyMUluZm9TY3JlZW4sXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuMSksXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyMlNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuMiksXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuMyksXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyNEluZm9TY3JlZW4sXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuNCksXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBGYW50YXN0aWNGb29kU2hhcmVyNVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDMuNSksXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDMpLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4wKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMSksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjIpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4zKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuNCksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbig0KSxcbiAgICAgICAgICAgIFdhbnRUb1N0YWNrU2NyZWVuLFxuICAgICAgICAgICAgVmlkZW9TY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjApLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMUluZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIxU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4xKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMlNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMiksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIzSW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjMpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNEluZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI0U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS40KSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuNSksXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDUpLFxuICAgICAgICAgICAgTm93QU1lbWJlclNjcmVlbixcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oNiksXG4gICAgICAgIF19XG4gICAgICAgIG1lbnVzPXt7XG4gICAgICAgICAgICBxdWl0OiBRdWl0U2NyZWVuLFxuICAgICAgICB9fVxuICAgICAgICBhc3NldHM9e1tcbiAgICAgICAgICAgIDxza29hc2guSlNPTiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9yZWN5Y2xlLmpzb25gfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSlNPTiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9saXF1aWRzLmpzb25gfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSlNPTiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9sYW5kZmlsbC5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fZm9vZHNoYXJlLmpzb25gfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSlNPTiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9jb21wb3N0Lmpzb25gfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fcmVjeWNsZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGlxdWlkcy5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGFuZGZpbGwucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2Zvb2RzaGFyZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdC5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXB1cnBsZS5yaWJib24ucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1sdWdnYWdlLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5zdGFyLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDEucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX1mcmFtZS4wMi5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfXRyYW5zaXRpb24uZnJhbWUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9c3ByaXRlLm1haW5uYXYucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXNjcm5iZy5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDEuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjAyLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wMy5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDQuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLnRyYW5zaXRpb24uanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLnRyYXNoLnJlY3ljbGUuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLnRyYXNoLmxhbmRmaWxsLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5jb21wb3N0LmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cXVpdC5iYWNrZ3JvdW5kLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgcmVmPVwiYnV0dG9uXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CdXR0b25DbGljay5tcDNgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gdHlwZT1cInNmeFwiIHJlZj1cInNjcmVlbi1jb21wbGV0ZVwiIHNyYz17YCR7TUVESUEuRUZGRUNUfU5leHRBcHBlYXIubXAzYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzBcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9dGl0bGVzY3JlZW4ubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHMVwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0cxLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzJcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHMi5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0czXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzMubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHNFwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0c0Lm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzVcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHNS5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0c2XCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzYubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0aXRsZVwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzFcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2cyXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnM1wiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzRcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0cmFzaFwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIHRyYW5zaXRpb25cIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBxdWl0XCIgLz4sXG4gICAgICAgIF19XG4gICAgLz5cbik7XG5cbmlmIChtb2R1bGUuaG90KSBtb2R1bGUuaG90LmFjY2VwdCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJpZFwiOiBcImdyZWVuLXRlYW0tY2hhbGxlbmdlXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS40XCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCJcIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbmZpZy5qc29uXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIExvYWRlciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsb2FkZXJcIiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5Mb2FkaW5nITwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lciBhbmltYXRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cImlvcy1zcGxhc2hcIlxuICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICBjb21wbGV0ZURlbGF5PXs2MDAwfVxuICAgICAgICAgICAgbmV4dERlbGF5PXszMDAwfVxuICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICAgICAgICBoaWRlUHJldlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TSEFSRUR9aW9zLXN0YXJ0LWJhbGwucG5nYH0gLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC1hbmltLmdpZmB9IC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwiaW1wb3J0ICdzaGFyZWQvZWZmZWN0cy9pbmRleCc7XG5cbmNvbnN0IEZJUkVXT1JLUyA9ICdmaXJld29ya3MnO1xuXG5sZXQgb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVmZmVjdCA9IHdpbmRvdy5DTVdOLm1ha2VFZmZlY3QoJ2ZpcmV3b3JrcycsIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCB7XG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmltYWdlKSxcbiAgICB9KTtcbn07XG5cbmxldCBvblN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgXy5pbnZva2UodGhpcy5lZmZlY3QsICdkZXN0cm95Jyk7XG4gICAgZGVsZXRlIHRoaXMuZWZmZWN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ0aXRsZVwiXG4gICAgICAgICAgICBzaWxlbnRDb21wbGV0ZVxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHMFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxoMyBjb250ZW50PVwiR3JlZW4gVGVhbSBDaGFsbGVuZ2VcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWdyYWRpZW50LXRleHR1cmUuanBnYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJhc2hcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXRyYXNoY2FuLnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNoYXJhY3RlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWdyZWVudGVhbWNoYXJhYy5wbmdgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cmF5XCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGV0cmF5LnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e0ZJUkVXT1JLU31cbiAgICAgICAgICAgICAgICByZWY9e0ZJUkVXT1JLU31cbiAgICAgICAgICAgICAgICBvblN0YXJ0PXtvblN0YXJ0fVxuICAgICAgICAgICAgICAgIG9uU3RvcD17b25TdG9wfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGVzY3JuYmcuanBnYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuLmpzIiwiaW1wb3J0IGVmZmVjdHMgZnJvbSAnLi9lZmZlY3RzJztcblxubGV0IG1ha2VFZmZlY3QgPSBmdW5jdGlvbiAoZWZmZWN0TmFtZSwgbm9kZSwgb3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIF8uaW52b2tlKGVmZmVjdHMsIGVmZmVjdE5hbWUsIG5vZGUsIG9wdHMpO1xufTtcblxuaWYgKCF3aW5kb3cuQ01XTikgd2luZG93LkNNV04gPSB7fTtcbmlmICghd2luZG93LkNNV04ubWFrZUVmZmVjdCkgd2luZG93LkNNV04ubWFrZUVmZmVjdCA9IG1ha2VFZmZlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9pbmRleC5qcyIsImltcG9ydCBmaXJld29ya3MgZnJvbSAnLi9maXJld29ya3MnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZmlyZXdvcmtzXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZWZmZWN0cy5qcyIsIi8vIGNvZGUgdGFrZW4gZnJvbSBodHRwOi8vY29kZXBlbi5pby9oYWlkYW5nL3Blbi9lQm9xeXdcblxuY2xhc3MgRmlyZXdvcmtzIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBvcHRzKSB7XG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDQU5WQVMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5vZGUub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGxldCBwYXQgPSAnIzAwMCc7XG5cbiAgICAgICAgaWYgKG9wdHMuYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICBsZXQgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgbGV0IHRDdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHRDdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgIG9wdHMuYmFja2dyb3VuZEltYWdlLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBvcHRzLmJhY2tncm91bmRJbWFnZS5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kSW1hZ2UubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGVtcENhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0ID0gY3R4LmNyZWF0ZVBhdHRlcm4odGVtcENhbnZhcywgJ3JlcGVhdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICBwYXQgPSBvcHRzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2l6ZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBub2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGN0eC5yZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0O1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gICAgICAgIC8vIGluaXRcbiAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgLy8gb2JqZWN0c1xuICAgICAgICBsZXQgbGlzdEZpcmUgPSBbXTtcbiAgICAgICAgbGV0IGxpc3RGaXJld29yayA9IFtdO1xuICAgICAgICBsZXQgZmlyZU51bWJlciA9IDEwO1xuICAgICAgICBsZXQgY2VudGVyID0geyB4OiBjYW52YXMud2lkdGggLyAyLCB5OiBjYW52YXMuaGVpZ2h0IC8gMiB9O1xuICAgICAgICBsZXQgcmFuZ2UgPSAxMDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyZU51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZSA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLyAyIC0gcmFuZ2UgLyA0ICsgY2VudGVyLngsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yYW5kb20oKSAqIHJhbmdlICogMiArIGNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc2l6ZTogTWF0aC5yYW5kb20oKSArIDQuNSxcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2ZkMScsXG4gICAgICAgICAgICAgICAgdng6IE1hdGgucmFuZG9tKCkgLSAwLjUsXG4gICAgICAgICAgICAgICAgdnk6IC0oTWF0aC5yYW5kb20oKSArIDQpLFxuICAgICAgICAgICAgICAgIGF4OiBNYXRoLnJhbmRvbSgpICogMC4wMiAtIDAuMDEsXG4gICAgICAgICAgICAgICAgZmFyOiBNYXRoLnJhbmRvbSgpICogcmFuZ2UgKyAoY2VudGVyLnkgLSByYW5nZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlLmJhc2UgPSB7XG4gICAgICAgICAgICAgICAgeDogZmlyZS54LFxuICAgICAgICAgICAgICAgIHk6IGZpcmUueSxcbiAgICAgICAgICAgICAgICB2eDogZmlyZS52eFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGlzdEZpcmUucHVzaChmaXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcC5iaW5kKHRoaXMsIG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKTtcblxuICAgICAgICB0aGlzLmxvb3AoKTtcblxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBsb29wKG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgICAgICAgdGhpcy51cGRhdGUob3B0cywgbGlzdEZpcmUsIGxpc3RGaXJld29yaywgZmlyZU51bWJlciwgcmFuZ2UpO1xuICAgICAgICB0aGlzLmRyYXcob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yayk7XG4gICAgfVxuXG4gICAgcmFuZENvbG9yKCkge1xuICAgICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgIGxldCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgbGV0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gICAgfVxuXG4gICAgdXBkYXRlKG9wdHMsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdEZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaXJlID0gbGlzdEZpcmVbaV07XG5cbiAgICAgICAgICAgIGlmIChmaXJlLnkgPD0gZmlyZS5mYXIpIHtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGFkZCBmaXJld29ya1xuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucmFuZENvbG9yKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmaXJlTnVtYmVyICogNTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJld29yayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGZpcmUueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGZpcmUueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKyA0LjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ4OiBNYXRoLnJhbmRvbSgpICogMTUgLSA3LjUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2eTogTWF0aC5yYW5kb20oKSAqIC0xNSArIDQuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF5OiAwLjA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWZlOiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiByYW5nZSAvIDIpICsgcmFuZ2UgLyAyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGZpcmV3b3JrLmJhc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWZlOiBmaXJld29yay5saWZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogZmlyZXdvcmsuc2l6ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsaXN0RmlyZXdvcmsucHVzaChmaXJld29yayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlc2V0XG4gICAgICAgICAgICAgICAgZmlyZS55ID0gZmlyZS5iYXNlLnk7XG4gICAgICAgICAgICAgICAgZmlyZS54ID0gZmlyZS5iYXNlLng7XG4gICAgICAgICAgICAgICAgZmlyZS52eCA9IGZpcmUuYmFzZS52eDtcbiAgICAgICAgICAgICAgICBmaXJlLmF4ID0gTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJlLnggKz0gZmlyZS52eDtcbiAgICAgICAgICAgIGZpcmUueSArPSBmaXJlLnZ5O1xuICAgICAgICAgICAgZmlyZS52eCArPSBmaXJlLmF4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGxpc3RGaXJld29yay5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IGZpcmV3b3JrID0gbGlzdEZpcmV3b3JrW2ldO1xuICAgICAgICAgICAgaWYgKGZpcmV3b3JrKSB7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsueCArPSBmaXJld29yay52eDtcbiAgICAgICAgICAgICAgICBmaXJld29yay55ICs9IGZpcmV3b3JrLnZ5O1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnZ5ICs9IGZpcmV3b3JrLmF5O1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLmFscGhhID0gZmlyZXdvcmsubGlmZSAvIGZpcmV3b3JrLmJhc2UubGlmZTtcbiAgICAgICAgICAgICAgICBmaXJld29yay5zaXplID0gZmlyZXdvcmsuYWxwaGEgKiBmaXJld29yay5iYXNlLnNpemU7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsuYWxwaGEgPSBmaXJld29yay5hbHBoYSA+IDAuNiA/IDEgOiBmaXJld29yay5hbHBoYTtcblxuICAgICAgICAgICAgICAgIGZpcmV3b3JrLmxpZmUtLTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyZXdvcmsubGlmZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RGaXJld29yay5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrKSB7XG4gICAgICAgIC8vIGNsZWFyXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE4O1xuICAgICAgICBjdHgucmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0O1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIC8vIHJlLWRyYXdcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzY3JlZW4nO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZSA9IGxpc3RGaXJlW2ldO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhmaXJlLngsIGZpcmUueSwgZmlyZS5zaXplLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmlyZS5maWxsO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdEZpcmV3b3JrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZXdvcmsgPSBsaXN0RmlyZXdvcmtbaV07XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBmaXJld29yay5hbHBoYTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZmlyZXdvcmsueCwgZmlyZXdvcmsueSwgZmlyZXdvcmsuc2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpcmV3b3JrLmZpbGw7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5vZGUsIG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IEZpcmV3b3Jrcyhub2RlLCBvcHRzKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2ZpcmV3b3Jrcy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2hpLXRoZXJlJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGkgdGhlcmUhPGJyLz5cbiAgICAgICAgICAgICAgICBJJ20gaGVyZSB0bzxici8+XG4gICAgICAgICAgICAgICAgdGVhY2ggeW91IGFib3V0PGJyLz5cbiAgICAgICAgICAgICAgICBzb3J0aW5nIHdhc3RlIGF0PGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIHNjaG9vbCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIaVRoZXJlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c2JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IENIQVJBQ1RFUiA9IGAke0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2A7XG5jb25zdCBGUkFNRSA9IGAke0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDEucG5nYDtcblxubGV0IHJlbmRlclZPID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMudm8pIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLnZvfS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVyU0ZYID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMuc2Z4KSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgcmVmPVwic3RhcnRcIlxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH0ke29wdHMuc2Z4fS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVySW1hZ2UgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmIChvcHRzLnJlbmRlckltYWdlID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImNoYXJhY3RlclwiIHNyYz17b3B0cy5pbWFnZSB8fCBDSEFSQUNURVJ9IC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9e29wdHMuaWR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e29wdHMuYmFja2dyb3VuZEF1ZGlvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpbmZvJywgb3B0cy5jbGFzc05hbWUpfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cmVuZGVyVk8ob3B0cyl9XG4gICAgICAgICAgICB7cmVuZGVyU0ZYKG9wdHMpfVxuICAgICAgICAgICAge3JlbmRlckltYWdlKG9wdHMpfVxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e0ZSQU1FfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgIHtvcHRzLmNvbnRlbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9lbnRcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17W10uY29uY2F0KG9wdHMuZXh0cmFzIHx8IFtdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pbmZvX3NjcmVlbl9jb21wb25lbnQuanMiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5pbXBvcnQgaXRlbXNSZWN5Y2xlIGZyb20gJy4vaXRlbXNfcmVjeWNsZSc7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNSZWN5Y2xlLCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbnZhciBhcnJheU9mQXVkaW8gPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PlxuICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj17dn1cbiAgICAgICAga2V5PXtrfVxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgfVxuICAgICAgICBjb21wbGV0ZVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAna2V5LWlzLXNvcnRpbmcnLFxuICAgICAgICBjbGFzc05hbWU6ICdyaWdodCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoZSBrZXkgaXMgU09SVElORyE8YnIvPlxuICAgICAgICAgICAgICAgIFRoZXJlIGFyZSA1IFdBWVM8YnIvPlxuICAgICAgICAgICAgICAgIHlvdSBjYW4gc29ydDxici8+XG4gICAgICAgICAgICAgICAgdGhlIGZvb2Qgd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgIGF0IHlvdXIgc2Nob29sLi4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVGhlS2V5JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c2JyxcbiAgICAgICAgZXh0cmFzOiBhcnJheU9mQXVkaW8sXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2tleV9pc19zb3J0aW5nX3NjcmVlbi5qcyIsImxldCBiaW4gPSAncmVjeWNsZSc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2FsdW1pbnVtLWJldmVyYWdlLWNhbicsXG4gICAgJ2FsdW1pbnVtLXBhbicsXG4gICAgJ2NhcmRib2FyZC1ib3gnLFxuICAgICdjbGVhbi1hbHVtaW51bS1mb2lsJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTEnLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tMicsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi0zJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTQnLFxuICAgICdlbXB0eS1ib3gtb2YtY3JhY2tlcnMtMycsXG4gICAgJ2VtcHR5LWNob2NvbGF0ZS1taWxrLWNhcnRvbi00JyxcbiAgICAnZW1wdHktY29va2llLWJveC0xJyxcbiAgICAnZW1wdHktY29va2llLWJveC0yJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24nLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0yJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tNScsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTYnLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0xMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTEzJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMTQnLFxuICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZS0xJyxcbiAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMicsXG4gICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTMnLFxuICAgICdlbXB0eS1wbGFzdGljLXBhY2thZ2UnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTInLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTMnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTUnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTYnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTcnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTgnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTknLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTEwJyxcbiAgICAnbWV0YWwtZm9vZC1jYW4tMScsXG4gICAgJ21ldGFsLWZvb2QtY2FuLTInLFxuICAgICdtZXRhbC1mb29kLWNhbi0zJyxcbiAgICAnbWV0YWwtZm9vZC1jYW4tNScsXG4gICAgJ3BhcGVyLWZvbGRlcicsXG4gICAgJ3BhcGVyLXBhY2thZ2luZycsXG4gICAgJ3BhcGVyLXBhY2thZ2luZy0xJyxcbiAgICAncGFwZXItcGFja2FnaW5nLTgnLFxuICAgICdwbGFzdGljLWN1cC0xJyxcbiAgICAncGxhc3RpYy1jdXAtMicsXG4gICAgJ3BsYXN0aWMtY3VwLTMnLFxuICAgICdwbGFzdGljLWN1cC00JyxcbiAgICAncGxhc3RpYy1jdXAtNScsXG4gICAgJ3BsYXN0aWMtY3VwLTYnLFxuICAgICdwbGFzdGljLWN1cC03JyxcbiAgICAncGxhc3RpYy1saWRzLTEnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy0yJyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNCcsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTUnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy02JyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNycsXG4gICAgJ3dyYXBwaW5nLXBhcGVyJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKG5hbWVzLCAobmFtZSwgZnJhbWUpID0+ICh7XG4gICAgbmFtZSxcbiAgICBiaW4sXG4gICAgZnJhbWUsXG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3JlY3ljbGUuanMiLCJpbXBvcnQgaXRlbUxhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2xpcXVpZHMnLFxuICAgICdjb21wb3N0JyxcbiAgICAnZm9vZC1zaGFyZScsXG5dO1xuXG5sZXQgcmV2ZWFsQ29udGVudCA9IHtcbiAgICByZWN5Y2xlOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgUkVDWUNMSU5HIGl0ZW1zIGFyZSB0aG9zZTxici8+XG4gICAgICAgICAgICB0aGF0IGNhbiBiZSByZXByb2Nlc3NlZCBhbmQ8YnIvPlxuICAgICAgICAgICAgbWFkZSBpbnRvIG5ldyBwcm9kdWN0cy48YnIvPlxuICAgICAgICAgICAgUGFwZXIsIG1ldGFsLCBhbmQgcGxhc3RpYyBhcmU8YnIvPlxuICAgICAgICAgICAgY29tbW9uIHJlY3ljbGFibGUgbWF0ZXJpYWxzLlxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICBsYW5kZmlsbDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExBTkRGSUxMIGl0ZW1zIGFyZSB0aGluZ3MgdGhhdDxici8+XG4gICAgICAgICAgICBqdXN0IGNhbid0IGJlIHJldXNlZCBpbiBhbnkgd2F5Ljxici8+XG4gICAgICAgICAgICBQdXQgeW91ciB0aGlua2luZyBjYXAgb24hPGJyLz5cbiAgICAgICAgICAgIExvb2sgZm9yIHdheXMgdG8gbWFrZTxici8+XG4gICAgICAgICAgICBkaWZmZXJlbnQgY2hvaWNlcyB0aGF0PGJyLz5cbiAgICAgICAgICAgIHJlZHVjZSBsYW5kZmlsbCB3YXN0ZS5cbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgbGlxdWlkczogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExJUVVJRFMgbXVzdCBiZSBzZXBhcmF0ZWQ8YnIvPlxuICAgICAgICAgICAgZnJvbSB0aGVpciBjb250YWluZXJzITxici8+XG4gICAgICAgICAgICBUaGlzIGFsbG93cyBmb3IgdGhlIGNvbnRhaW5lcnM8YnIvPlxuICAgICAgICAgICAgdG8gYmUgcHJvcGVybHkgcHJvY2Vzc2VkLjxici8+XG4gICAgICAgICAgICBHZXQgcG91cmluZyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgY29tcG9zdDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIENPTVBPU1RJTkcgaXM8YnIvPlxuICAgICAgICAgICAgZmVydGlsaXplciBpbiB0aGUgbWFraW5nITxici8+XG4gICAgICAgICAgICBJdCdzIG1hZGUgZnJvbSBmb29kIHNjcmFwczxici8+XG4gICAgICAgICAgICBhbmQgb3JnYW5pYyBtYXRlcmlhbHM8YnIvPlxuICAgICAgICAgICAgdGhhdCBkZWNheSBhbmQgYmVjb21lPGJyLz5cbiAgICAgICAgICAgIGZvb2QgZm9yIHBsYW50cyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgJ2Zvb2Qtc2hhcmUnOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgRk9PRCBTSEFSSU5HIGlzPGJyLz5cbiAgICAgICAgICAgIGEgZ3JlYXQgd2F5IHRvIGtlZXA8YnIvPlxuICAgICAgICAgICAgZnJvbSB3YXN0aW5nIGZvb2QhPGJyLz5cbiAgICAgICAgICAgIExlYXZlIGl0ZW1zIHRoYXQgb3RoZXJzPGJyLz5cbiAgICAgICAgICAgIGNhbiBtYWtlIGludG8gYSBzbmFjayFcbiAgICAgICAgPC9wPlxuICAgICksXG59O1xuXG5sZXQgcmV2ZWFsVk9zID0ge1xuICAgIHJlY3ljbGU6ICdSZWN5Y2xpbmdNYXRlcmlhbHMnLFxuICAgIGxhbmRmaWxsOiAnVGhpbmtpbmdDYXAnLFxuICAgIGxpcXVpZHM6ICdHZXRQb3VyaW5nJyxcbiAgICBjb21wb3N0OiAnQ29tcG9zdGluZ0V4cGxhaW4nLFxuICAgICdmb29kLXNoYXJlJzogJ0Zvb2RTaGFyaW5nRXhwbGFpbicsXG59O1xuXG5sZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKGJpbk5hbWVzLCBiaW4gPT5cbiAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9e2Jpbn0gbWVzc2FnZT17YmlufSAvPlxuKTtcblxubGV0IHJldmVhbExpc3QgPSBfLm1hcChyZXZlYWxDb250ZW50LCAoY29udGVudCwgcmVmKSA9PlxuICAgIDxza29hc2guQ29tcG9uZW50IHJlZj17cmVmfT5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgPC9za29hc2guQ29tcG9uZW50PlxuKTtcblxubGV0IG1lZGlhQ29sbGVjdGlvbkxpc3QgPSBfLm1hcChyZXZlYWxWT3MsIChjb250ZW50LCByZWYpID0+XG4gICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwidm9pY2VPdmVyXCIgcmVmPXtyZWZ9IHNyYz17YCR7Q01XTi5NRURJQS5WTyArIGNvbnRlbnR9Lm1wM2B9IC8+XG4pO1xuXG5sZXQgaW1hZ2VTcmNzID0gW1xuICAgIHtzcmM6IGAke0NNV04uTUVESUEuSU1BR0V9bGlnaHRzLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5iaW5zLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5idG4ucG5nYH0sXG5dO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1MYW5kZmlsbCwgdiA9PlxuICAgIF8ua2ViYWJDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpXG4pO1xuXG5sZXQgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJsaWdodHNcIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNlwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guUmVwZWF0ZXJcbiAgICAgICAgICAgICAgICBhbW91bnQ9e2ltYWdlU3Jjcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgaXRlbT17PHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiAvPn1cbiAgICAgICAgICAgICAgICBwcm9wcz17aW1hZ2VTcmNzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlnaHRzXCJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtza29hc2gubWl4aW5zLlNlbGVjdGFibGVSZXZlYWwocHJvcHMsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlczogYmluQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICByZXZlYWxzOiByZXZlYWxMaXN0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYUNvbGxlY3Rpb25MaXN0LFxuICAgICAgICAgICAgICAgIFNlbGVjdGFibGVQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogJ0hJR0hMSUdIVEVEJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUudGFyZ2V0JykgJiYgJ2NsaWNrJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiY2xpY2tcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNsaWNrUmVjQnV0dG9uLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JbmZvRnJhbWVNb3ZlMS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYUNvbGxlY3Rpb24+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvZW50XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e1tdLmNvbmNhdChhcnJheU9mQXVkaW8gfHwgW10pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xpZ2h0c19zY3JlZW4uanMiLCJsZXQgYmluID0gJ2xhbmRmaWxsJztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGVzYXVjZS1wb3VjaC0xJyxcbiAgICAnYXBwbGVzYXVjZS1wb3VjaC0yJyxcbiAgICAnYXBwbGVzYXVjZS1wb3VjaC0zJyxcbiAgICAnYXBwbGVzYXVjZS1wb3VjaC00JyxcbiAgICAnYmFnLW9mLXdyYXBwZXJzJyxcbiAgICAnYnViYmxlLXdyYXAnLFxuICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXItMScsXG4gICAgJ2J1cnJpdG8td3JhcHBlci0xJyxcbiAgICAnYnVycml0by13cmFwcGVyLTInLFxuICAgICdidXJyaXRvLXdyYXBwZXItMycsXG4gICAgJ2J1cnJpdG8td3JhcHBlci00JyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTEnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItMicsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci0zJyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTQnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItNScsXG4gICAgJ2VtcHR5LWJhZy1vZi1jaGlwcycsXG4gICAgJ2VtcHR5LWNoaXAtYmFnJyxcbiAgICAnZW1wdHktY2hpcC1iYWctMicsXG4gICAgJ2VtcHR5LWNoaXAtYmFnLTMnLFxuICAgICdlbXB0eS1jaGlwLWJhZy00JyxcbiAgICAnZW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0xJyxcbiAgICAnZW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0yJyxcbiAgICAnZW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0zJyxcbiAgICAnZW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy00JyxcbiAgICAnZW1wdHktc25hY2std3JhcHBlci0xJyxcbiAgICAnZW1wdHktc25hY2std3JhcHBlci0yJyxcbiAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyLTMnLFxuICAgICdlbmVyZ3ktYmFyLXdyYXBwZXInLFxuICAgICdlbmVyZ3ktYmFyLXdyYXBwZXItMicsXG4gICAgJ2ZydWl0LWRyaW5rLWVtcHR5LXBvdWNoJyxcbiAgICAnZnJ1aXQtc25hY2std3JhcHBlci0yJyxcbiAgICAnZnJ1aXQtc25hY2std3JhcHBlci0zJyxcbiAgICAnZ2lmdC1yaWJib25zJyxcbiAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyJyxcbiAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyLTInLFxuICAgICdqdWljZS1ib3gnLFxuICAgICdqdWljZS1ib3gtMicsXG4gICAgJ2p1aWNlLWJveC0zJyxcbiAgICAnanVpY2UtYm94LTQnLFxuICAgICdqdWljZS1ib3gtNScsXG4gICAgJ3BsYXN0aWMtYmFnZ2llJyxcbiAgICAncGxhc3RpYy1iYWdnaWUtMicsXG4gICAgJ3BsYXN0aWMtZm9yaycsXG4gICAgJ3BsYXN0aWMta25pZmUnLFxuICAgICdwbGFzdGljLXNwb29uJyxcbiAgICAncGxhc3RpYy1zcG9yaycsXG4gICAgJ3BsYXN0aWMtc3RyYXdzJyxcbiAgICAncmVkLWdpZnQtYm93JyxcbiAgICAnc3R5cm9mb2FtLWNvbnRhaW5lci0xJyxcbiAgICAnc3R5cm9mb2FtLWNvbnRhaW5lci0yJyxcbiAgICAnc3R5cm9mb2FtLWNvbnRhaW5lci0zJyxcbiAgICAnc3R5cm9mb2FtLWNvbnRhaW5lci01JyxcbiAgICAnc3R5cm9mb2FtLXNvdXAtY3VwJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKG5hbWVzLCAobmFtZSwgZnJhbWUpID0+ICh7XG4gICAgbmFtZSxcbiAgICBiaW4sXG4gICAgZnJhbWUsXG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2xhbmRmaWxsLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5pbXBvcnQgaXRlbXNDb21wb3N0IGZyb20gJy4vaXRlbXNfY29tcG9zdCc7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNDb21wb3N0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbnZhciBhcnJheU9mQXVkaW8gPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PlxuICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj17dn1cbiAgICAgICAga2V5PXtrfVxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgfVxuICAgICAgICBjb21wbGV0ZVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZml2ZS13YXlzJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXaXRoIDUgd2F5czxici8+XG4gICAgICAgICAgICAgICAgdG8gc29ydCBsZXQncyB0ZXN0PGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIGtub3dsZWRnZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICc1V2F5cycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgICAgIGV4dHJhczogYXJyYXlPZkF1ZGlvLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdjb21wb3N0JztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGUtY29yZScsXG4gICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgJ2NlbGVyeS1zdGljaycsXG4gICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAnY29mZmVlLWN1cC0yJyxcbiAgICAnY29mZmVlLWN1cCcsXG4gICAgJ2NvZmZlZS1ncm91bmRzJyxcbiAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTEnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTMnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTQnLFxuICAgICdmb29kLXNvaWxlZC1wYXBlci1wbGF0ZScsXG4gICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgJ25hcGtpbi0xJyxcbiAgICAnbmFwa2luLTInLFxuICAgICduYXBraW4tMycsXG4gICAgJ25hcGtpbi00JyxcbiAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzLTEnLFxuICAgICdwZW5jaWwtc2hhdmluZ3MtMicsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncy0zJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzJyxcbiAgICAncGl6emEtY3J1c3QnLFxuICAgICdzb2lsZWQtcGFwZXItdHJheS0xJyxcbiAgICAnc29pbGVkLXBhcGVyLXRyYXktMicsXG4gICAgJ3NvaWxlZC1wYXBlci10cmF5LTMnLFxuICAgICdzb2xpZWQtcGFwZXItdHJheS00JyxcbiAgICAndGVhYmFnJyxcbiAgICAndXNlZC1wYXBlci1mb29kLWNvbnRhaW5lcicsXG4gICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlci0xJyxcbiAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyLTInLFxuICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXItNCcsXG4gICAgJ3VzZWQtdGFrZW91dC1jb250YWluZXJzJyxcbiAgICAnd2hpdGUtcGFwZXItdG93ZWwtc2hlZXQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfY29tcG9zdC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5sZXQgbGV2ZWxLZXlzID0gW1xuICAgICdyZWN5Y2xpbmdDaGFtcGlvbicsXG4gICAgJ3ByaWNlbGVzc1BvdXJlcicsXG4gICAgJ2ZhbnRhc3RpY0Zvb2RTaGFyZXInLFxuICAgICdkeW5hbWljRGl2ZXJ0ZXInLFxuICAgICdtYXN0ZXJTb3J0ZXInLFxuXTtcblxubGV0IGxldmVsTmFtZXMgPSBbXG4gICAgPHA+UmVjeWNsaW5nPGJyLz5DaGFtcGlvbjwvcD4sXG4gICAgPHA+UHJpY2VsZXNzPGJyLz5Qb3VyZXI8L3A+LFxuICAgIDxwPkZhbnRhc3RpYzxici8+Rm9vZCBTaGFyZXI8L3A+LFxuICAgIDxwPkR5bmFtaWM8YnIvPkRpdmVydGVyPC9wPixcbiAgICA8cD5NYXN0ZXI8YnIvPlNvcnRlcjwvcD4sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobGV2ZWxOdW1iZXIpIHtcbiAgICBsZXQgbGV2ZWxJbnQgPSBfLmZsb29yKGxldmVsTnVtYmVyKTtcbiAgICBsZXQgbGV2ZWxLZXkgPSBsZXZlbEtleXNbbGV2ZWxJbnQgLSAxXTtcbiAgICBsZXQgbGV2ZWxOYW1lID0gbGV2ZWxOYW1lc1tsZXZlbEludCAtIDFdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgICAgICBsZXQgbGV2ZWxEYXRhID0gXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS4ke2xldmVsS2V5fS5sZXZlbHNgLCB7fSk7XG4gICAgICAgIGxldCByZXBlYXRlclByb3BzID0gXy5tYXAoXy5nZXQocHJvcHMsICdkYXRhLmVhcm5lZCcpLCAobGV2ZWwsIGluZGV4KSA9PlxuICAgICAgICAgICAgKHtjbGFzc05hbWU6IGxldmVsLnBsYXlpbmcgJiYgXy5nZXQobGV2ZWxEYXRhLCBgJHtpbmRleH0uY29tcGxldGVgKSA/ICdlYXJuZWQnIDogJyd9KVxuICAgICAgICApO1xuICAgICAgICBsZXQgYWxsRWFybmVkID0gcmVwZWF0ZXJQcm9wcy5sZW5ndGggPT09IDUgJiYgXy5ldmVyeShyZXBlYXRlclByb3BzLCB2ID0+IHYuY2xhc3NOYW1lKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2BwcmUtbGV2ZWwtJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7bGV2ZWxJbnR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0cy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgQUxMX0VBUk5FRDogYWxsRWFybmVkLFxuICAgICAgICAgICAgICAgICAgICBBUFBFQVI6IF8uZ2V0KHByb3BzLCAnZGF0YS5hcHBlYXIucGxheWluZycpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJhcHBlYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxBcHBlYXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxDb21wbGV0ZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgXy5tYXAobGV2ZWxEYXRhLCAoZGF0YSwgbGV2ZWwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PXtbJ2Vhcm5lZCcsIGxldmVsXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9R2V0U3Rhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU9e2RhdGEuY29tcGxldGUgPyAxIDogMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cHVycGxlLnJpYmJvbi5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWx1Z2dhZ2UucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9ZmxpcHMucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJlcGVhdGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXJzXCJcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXs1fVxuICAgICAgICAgICAgICAgICAgICBwcm9wcz17cmVwZWF0ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkxldmVsIHtsZXZlbEludH08L2gzPlxuICAgICAgICAgICAgICAgICAgICB7bGV2ZWxOYW1lfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdzbWFsbCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExldCdzIHN0YXJ0IHdpdGggc2ltcGxlIHNvcnRpbmc8YnIvPlxuICAgICAgICAgICAgICAgIG9mIFJlY3ljbGFibGVzLCBDb21wb3N0YWJsZXM8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCBMYW5kZmlsbCBpdGVtcy48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgUHVzaCB0aGUgY29ycmVjdCBidXR0b24gdG8gbGFuZDxici8+XG4gICAgICAgICAgICAgICAgaXRlbXMgaW4gdGhlIGJpbiB0aGV5IGJlbG9uZyB0by5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdMZXRzU3RhcnQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiA2NjUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQnO1xuaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcblxuY29uc3QgUFRTID0gJ3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIGlmIChNYXRoLmFicyhwcm9wcy5nYW1lU3RhdGUuY3VycmVudFNjcmVlbkluZGV4IC0gcGFyc2VJbnQoa2V5LCAxMCkpID4gMikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzY3JlZW5Qcm9wcztcbiAgICAgICAgbGV0IHRpbWVyUHJvcHM7XG4gICAgICAgIGxldCByZXZlYWxQcm9wcztcbiAgICAgICAgbGV0IHNlbGVjdGFibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3BwZXJQcm9wcztcbiAgICAgICAgbGV0IGNhdGNoZXJQcm9wcztcbiAgICAgICAgbGV0IGxpZmVQcm9wcztcbiAgICAgICAgbGV0IGV4dHJhQ29tcG9uZW50cztcblxuICAgICAgICBjb25zdCBMRVZFTF9QQVRIID0gYGdhbWVTdGF0ZS5kYXRhLiR7Xy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSl9LmxldmVscy4ke29wdHMubGV2ZWx9YDtcblxuICAgICAgICBsZXQgY2F0Y2hhYmxlc0FycmF5ID0gb3B0cy5nZXRDYXRjaGFibGVzQXJyYXkoKTtcblxuICAgICAgICBsZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKG9wdHMuYmluTmFtZXMsIG5hbWUgPT5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT17bmFtZX0gbWVzc2FnZT17bmFtZX0gLz5cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgc2NhbGUgPSBfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5zY2FsZScsIDEpO1xuICAgICAgICBsZXQgc3RhcnQgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc3RhcnRgLCBmYWxzZSk7XG4gICAgICAgIGxldCBnYW1lQ29tcGxldGUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uY29tcGxldGVgLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLmRyb3AnLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wQ2xhc3MgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuZHJvcENsYXNzJyk7XG4gICAgICAgIGxldCBwaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIucGlja1VwJywgZmFsc2UpO1xuICAgICAgICBsZXQgb25QaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIub25QaWNrVXAnKTtcbiAgICAgICAgbGV0IHNlbGVjdEl0ZW0gPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuc2VsZWN0SXRlbScpO1xuICAgICAgICBsZXQgY2F0Y2hhYmxlUmVmcyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5yZWZzJywgW10pO1xuICAgICAgICBsZXQgaXRlbVJlZiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlZicpO1xuICAgICAgICBsZXQgcmVtb3ZlSXRlbUNsYXNzTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlbW92ZUNsYXNzTmFtZScpO1xuICAgICAgICBsZXQgaXRlbVRvcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnRvcCcsIDApIC8gc2NhbGU7XG4gICAgICAgIGxldCBpdGVtTGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLmxlZnQnLCAwKSAvIHNjYWxlIHx8ICdhdXRvJztcbiAgICAgICAgbGV0IGNhdWdodCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5jYXRjaGVyLmNhdWdodCcsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBwbGF5ID0gXy5nZXQocHJvcHMsICdkYXRhLnBsYXknLCBudWxsKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIGlmIChpdGVtUmVmKSBjYXRjaGFibGVSZWZzID0gW2l0ZW1SZWZdO1xuXG4gICAgICAgIG9wdHMubmV4dCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5uZXh0JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1SZWYgPSBpdGVtUmVmO1xuICAgICAgICBvcHRzLml0ZW1OYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmFtZScsICcnKTtcbiAgICAgICAgb3B0cy5pdGVtTmV3ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmV3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1DbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5jbGFzc05hbWUnKTtcbiAgICAgICAgb3B0cy5pdGVtQW1vdW50ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0uYW1vdW50JywgMCk7XG4gICAgICAgIG9wdHMucG91ciA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnBvdXInLCBmYWxzZSk7XG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMubGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5sZWZ0JywgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMudHJ1Y2tDbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEudHJ1Y2tDbGFzc05hbWUnLCAnJyk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLm1vdmVDbGF3ID0gXy5nZXQocHJvcHMsICdkYXRhLm1vdmVDbGF3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIGRyb3AgJiYgIW9wdHMudHJ1Y2tDbGFzc05hbWUgPyAnZHJvcCcgOlxuICAgICAgICAgICAgcGlja1VwID8gJ3BpY2tVcCcgOlxuICAgICAgICAgICAgb3B0cy5uZXh0ID8gJ25leHQnIDpcbiAgICAgICAgICAgIG9wdHMucG91ciA/ICdwb3VyJyA6XG4gICAgICAgICAgICBvcHRzLm5leHQgPyAnY29ycmVjdCcgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3Jlc29ydCcgPyAncmVzb3J0JyA6XG4gICAgICAgICAgICBvcHRzLml0ZW1OZXcgPyBfLmtlYmFiQ2FzZShvcHRzLml0ZW1OYW1lKSA6XG4gICAgICAgICAgICBkcm9wQ2xhc3MgPT09ICdUUkFZLVNUQUNLSU5HJyAmJiBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICd0cmF5JykgPyAndHJheScgOlxuICAgICAgICAgICAgb3B0cy5pdGVtTmFtZSA/ICdzZWxlY3QnIDogbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNjcmVlblByb3BzID0gb3B0cy5nZXRTY3JlZW5Qcm9wcyhvcHRzKTtcbiAgICAgICAgdGltZXJQcm9wcyA9IG9wdHMuZ2V0VGltZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgcmV2ZWFsUHJvcHMgPSBvcHRzLmdldFJldmVhbFByb3BzKG9wdHMpO1xuICAgICAgICBzZWxlY3RhYmxlUHJvcHMgPSBvcHRzLmdldFNlbGVjdGFibGVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHBlclByb3BzID0gb3B0cy5nZXREcm9wcGVyUHJvcHMob3B0cyk7XG4gICAgICAgIGNhdGNoZXJQcm9wcyA9IG9wdHMuZ2V0Q2F0Y2hlclByb3BzKG9wdHMpO1xuICAgICAgICBsaWZlUHJvcHMgPSBvcHRzLmdldExpZmVQcm9wcyhvcHRzKTtcbiAgICAgICAgZXh0cmFDb21wb25lbnRzID0gb3B0cy5nZXRFeHRyYUNvbXBvbmVudHMob3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9eyFnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICB7Li4uc2NyZWVuUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5zY29yZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7UFRTfVxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5UaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJtbTpzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9eyFyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGltZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpdGVtLW5hbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBQ1RJVkU6IG9wdHMuaXRlbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBpdGVtVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogaXRlbUxlZnQsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuaXRlbU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PXswfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3Q9e29wdHMubWF4SGl0c31cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5oaXRzfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxpZmVQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxNYW51YWxEcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXtvcHRzLmRyb3BwZXJBbW91bnR9XG4gICAgICAgICAgICAgICAgICAgIGRyb3A9e2Ryb3B9XG4gICAgICAgICAgICAgICAgICAgIHBpY2tVcD17cGlja1VwfVxuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcD17b25QaWNrVXB9XG4gICAgICAgICAgICAgICAgICAgIG5leHQ9e29wdHMubmV4dH1cbiAgICAgICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17Y2F0Y2hhYmxlc0FycmF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpblxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke29wdHMubGVmdH1weClgXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNhdWdodD17Y2F1Z2h0fVxuICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M9e2Ryb3BDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZj17aXRlbVJlZn1cbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzTmFtZT17b3B0cy5pdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVJdGVtQ2xhc3NOYW1lPXtyZW1vdmVJdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtPXtzZWxlY3RJdGVtfVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdiaW5zJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgRElTQUJMRUQ6ICFvcHRzLml0ZW1OYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENhdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWNrZXQ9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGFibGVSZWZzPXtjYXRjaGFibGVSZWZzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e2NhdWdodCB8fCAhc3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9e2Ryb3AgfHwgaXRlbVJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVGcmFjdGlvbj17b3B0cy5jb2xsaWRlRnJhY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uY2F0Y2hlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNlbGVjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RhYmxlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0PXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICB7ZXh0cmFDb21wb25lbnRzfVxuICAgICAgICAgICAgICAgIDxza29hc2guUmV2ZWFsXG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYXJnZXQ9XCJyZXZlYWxcIlxuICAgICAgICAgICAgICAgICAgICBvcGVuUmV2ZWFsPXtyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICBjbG9zZVJldmVhbD17cmV2ZWFsQ2xvc2V9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLnJldmVhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJlc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcGxheT17b3B0cy5wbGF5QXVkaW99XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXthdWRpb0FycmF5fVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tSZWFkeT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvblBsYXk9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAncGxheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kcm9wcGVyX2dhbWVfY29tcG9uZW50LmpzIiwiaW1wb3J0IENhdGNoIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMSc7XG5cbmNsYXNzIENhdGNoZXIgZXh0ZW5kcyBDYXRjaCB7XG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBza29hc2guQ29tcG9uZW50LnByb3RvdHlwZS5ib290c3RyYXAuY2FsbCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5idWNrZXROb2RlcyA9IF8ucmVkdWNlKHRoaXMucmVmcywgKGEsIHYsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChrLmluZGV4T2YoJ2J1Y2tldHMtJykpIHJldHVybiBhO1xuICAgICAgICAgICAgYVtrXSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHYpO1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICAgICAgICB2YXIgem9vbSA9IHN0YXRlLnNjYWxlO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgem9vbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHwgIXRoaXMuc3RhdGUuY2FuQ2F0Y2gpIHJldHVybjtcbiAgICAgICAgXy5lYWNoKHRoaXMuYnVja2V0Tm9kZXMsIChidWNrZXROb2RlLCBidWNrZXRSZWZLZXkpID0+IHtcbiAgICAgICAgICAgIHZhciBidWNrZXRSZWN0ID0gYnVja2V0Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLnByb3BzLmNhdGNoYWJsZVJlZnMsIGNhdGNoYWJsZVJlZiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYXRjaGFibGVSZWYuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIGNhdGNoYWJsZVJlZi5ET01Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYnVja2V0UmVmS2V5XSwgY2F0Y2hhYmxlUmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciB4Q2VudGVyID0gY2F0Y2hSZWN0LmxlZnQgKyAoY2F0Y2hSZWN0LnJpZ2h0IC0gY2F0Y2hSZWN0LmxlZnQpIC8gMjtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSAoYnVja2V0UmVjdC5ib3R0b20gLSBidWNrZXRSZWN0LnRvcCkgKiB0aGlzLnByb3BzLmNvbGxpZGVGcmFjdGlvbjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhdGNoUmVjdC53aWR0aCAmJlxuICAgICAgICAgICAgY2F0Y2hSZWN0LmhlaWdodCAmJlxuICAgICAgICAgICAgYnVja2V0UmVjdC50b3AgLSB5T2Zmc2V0IDwgY2F0Y2hSZWN0LmJvdHRvbSAmJlxuICAgICAgICAgICAgYnVja2V0UmVjdC50b3AgKyB5T2Zmc2V0ID4gY2F0Y2hSZWN0LnRvcCAmJlxuICAgICAgICAgICAgeENlbnRlciA+IGJ1Y2tldFJlY3QubGVmdCAmJlxuICAgICAgICAgICAgeENlbnRlciA8IGJ1Y2tldFJlY3QucmlnaHRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RDYXRjaGFibGUoYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpIHtcbiAgICAgICAgdmFyIGNhdGNoYWJsZVJlZktleTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHxcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmNhbkNhdGNoIHx8ICFjYXRjaGFibGVSZWYuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVSZWZLZXkgPSBjYXRjaGFibGVSZWYucHJvcHNbJ2RhdGEtcmVmJ107XG4gICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5jYXVnaHRUYXJnZXQsICdjYXVnaHQnXSxcbiAgICAgICAgICAgIGRhdGE6IGNhdGNoYWJsZVJlZktleSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYXRjaGFibGVSZWYucHJvcHMubWVzc2FnZSA9PT0gYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMucGF1c2UgJiYgcHJvcHMucGF1c2UgIT09IHRoaXMucHJvcHMucGF1c2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5yZXN1bWUgJiYgcHJvcHMucmVzdW1lICE9PSB0aGlzLnByb3BzLnJlc3VtZSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJ1Y2tldCgpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKFtdLmNvbmNhdCh0aGlzLnByb3BzLmJ1Y2tldCksIChidWNrZXQsIGtleSkgPT5cbiAgICAgICAgICAgIDxidWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi5idWNrZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnYnVja2V0cy0nICsga2V5fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1Y2tldCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXRjaGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNhdWdodFRhcmdldDogJ2NhdGNoZXInLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogMSAvIDYsXG59LCBDYXRjaC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNhbkNhdGNoOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zID0gdGhpcy5jaGVja0NvbGxpc2lvbnMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTW91c2VFdmVudHMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuXG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5idWNrZXQpO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZU5vZGVzID0gXy5tYXAodGhpcy5wcm9wcy5jYXRjaGFibGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAobm9kZSwga2V5KSB7XG4gICAgICAgICAgICB2YXIgY2F0Y2hhYmxlUmVmID0gdGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF07XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbml0ZXJhdGlvbicsIGNhdGNoYWJsZVJlZi5yZXNldCwgZmFsc2UpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGF0dGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB2YXIgY2F0Y2hSZWYgPSB0aGlzLnJlZnNbJ2NhdGNoLWNvbXBvbmVudCddO1xuICAgICAgICBpZiAoY2F0Y2hSZWYpIHtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbW91c2VYOiBlLnBhZ2VYXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHZhciB6b29tID0gc3RhdGUuc2NhbGU7XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB0aGlzLmdldEVkZ2VzKHRoaXMuYnVja2V0Tm9kZSk7XG4gICAgICAgICAgICB2YXIgYnVja2V0V2lkdGggPSBlZGdlcy5yaWdodCAtIGVkZ2VzLmxlZnQ7XG4gICAgICAgICAgICB2YXIgbGVmdEJvdW5kID0gdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudCA/XG4gICAgICAgICAgICAgICAgdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudC5vZmZzZXRXaWR0aCAtIGJ1Y2tldFdpZHRoIDogMDtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0VG9wOiBlZGdlcy50b3AsXG4gICAgICAgICAgICAgICAgYnVja2V0Qm90dG9tOiBlZGdlcy5ib3R0b20sXG4gICAgICAgICAgICAgICAgYnVja2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kLFxuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXVzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0Q2F0Y2hhYmxlKGNhdGNoYWJsZU5vZGUsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fFxuICAgICAgICAgICAgIWNhdGNoYWJsZU5vZGUuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVOb2RlLm1hcmtDYXVnaHQoKTtcbiAgICAgICAgaWYgKGNhdGNoYWJsZU5vZGUucHJvcHMuaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QoY2F0Y2hhYmxlTm9kZSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGNhdGNoYWJsZSwga2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBjYXRjaGFibGUsIGtleSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICB2YXIgYnVja2V0UmVjdCA9IHRoaXMuYnVja2V0Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQpIHJldHVybjtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuY2F0Y2hhYmxlTm9kZXMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgdmFsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2F0Y2hhYmxlKHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaFJlY3QpIHtcbiAgICAgICAgdmFyIHhDZW50ZXIgPSBjYXRjaFJlY3QubGVmdCArIChjYXRjaFJlY3QucmlnaHQgLSBjYXRjaFJlY3QubGVmdCkgLyAyO1xuICAgICAgICB2YXIgeU9mZnNldCA9IChjYXRjaFJlY3QuYm90dG9tIC0gY2F0Y2hSZWN0LnRvcCkgLyA2O1xuICAgICAgICByZXR1cm4gKGJ1Y2tldFJlY3QudG9wIDwgY2F0Y2hSZWN0LmJvdHRvbSAtIHlPZmZzZXQgJiYgYnVja2V0UmVjdC50b3AgPiBjYXRjaFJlY3QudG9wICsgeU9mZnNldCAmJlxuICAgICAgICAgICAgeENlbnRlciA+IGJ1Y2tldFJlY3QubGVmdCAmJiB4Q2VudGVyIDwgYnVja2V0UmVjdC5yaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0RWRnZXMoZWwpIHtcbiAgICAgICAgdmFyIHRvcDtcbiAgICAgICAgdmFyIGxlZnQ7XG4gICAgICAgIHZhciB3aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodDtcblxuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgICAgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmNsYXNzTmFtZSAmJiBlbC5jbGFzc05hbWUuaW5kZXhPZignc2NyZWVuJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgdG9wICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQsXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICB2YXIgbGVmdCA9ICh0aGlzLnN0YXRlLm1vdXNlWCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS5idWNrZXRXaWR0aCAvIDIpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5idWNrZXRJbkJvdW5kcykge1xuICAgICAgICAgICAgbGVmdCA9IGxlZnQgPCAxID8gMSA6IGxlZnQ7XG4gICAgICAgICAgICBsZWZ0ID0gbGVmdCA+PSB0aGlzLnN0YXRlLmxlZnRCb3VuZCA/IHRoaXMuc3RhdGUubGVmdEJvdW5kIC0gMSA6IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogYCR7bGVmdH1weGBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJCdWNrZXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5idWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJidWNrZXRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNhdGNoYWJsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGNoYWJsZXMubWFwKChpdGVtLCBrZXkpID0+XG4gICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgcmVmPXtgJHtrZXl9LWNhdGNoYWJsZWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9XCJjYXRjaC1jb21wb25lbnRcIiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2F0Y2hhYmxlcygpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQnVja2V0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuQ2F0Y2guZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgY2F0Y2hhYmxlczogW10sXG4gICAgYnVja2V0SW5Cb3VuZHM6IHRydWUsXG4gICAgYnVja2V0OiA8c2tvYXNoLkNvbXBvbmVudCAvPixcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDYXRjaGFibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F1Z2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuc3RhdGUuY2FuQ2F0Y2g7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2NhdGNoYWJsZScsIHtcbiAgICAgICAgICAgIENBVUdIVDogIXRoaXMuc3RhdGUuY2FuQ2F0Y2hcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVhZHkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5yZUNhdGNoYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmNvbnN0IElURU0gPSAnaXRlbXMtJztcbmNvbnN0IERST1BQRUQgPSAnRFJPUFBFRCc7XG5cbmNsYXNzIERyb3BwZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLml0ZW1Db3VudCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5leHQodGhpcy5wcm9wcy5hbW91bnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzW0lURU0gKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICB9XG5cbiAgICBkcm9wKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleTogW3Byb3BzLnJlZnNUYXJnZXQsICdkcm9wJ10sXG4gICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcHMub25Ecm9wLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgcGlja1VwKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUNsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG4gICAgICAgIGl0ZW1SZWYucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAga2V5OiBbcHJvcHMucmVmc1RhcmdldCwgJ3BpY2tVcCddLFxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLm9uUGlja1VwLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgbmV4dChhbW91bnQgPSAxLCBzaGlmdCA9IHRydWUpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcblxuICAgICAgICBfLmVhY2godGhpcy5yZWZzLmJpbi5nZXQoYW1vdW50KSwgdiA9PiB7XG4gICAgICAgICAgICBpdGVtc1t0aGlzLml0ZW1Db3VudCsrXSA9IChcbiAgICAgICAgICAgICAgICA8di50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi52LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvblJlYWR5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzaGlmdCkgZGVsZXRlIGl0ZW1zW3RoaXMuZmlyc3RJdGVtSW5kZXgrK107XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVmcyA9IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTSkpO1xuICAgICAgICAgICAgdGhpcy5pbnZva2VDaGlsZHJlbkZ1bmN0aW9uKCdtYXJrQ2F0Y2hhYmxlJyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLnByb3BzLnJlZnNUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICByZWZzLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk5leHQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2F1Z2h0KGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICBfLmludm9rZSh0aGlzLnJlZnNbY2F0Y2hhYmxlUmVmS2V5XSwgJ21hcmtDYXVnaHQnKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5uZXh0ID09PSB0cnVlICYmIHByb3BzLm5leHQgIT09IHRoaXMucHJvcHMubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZHJvcCA9PT0gdHJ1ZSAmJiBwcm9wcy5kcm9wICE9PSB0aGlzLnByb3BzLmRyb3ApIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcChwcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMucGlja1VwID09PSB0cnVlICYmIHByb3BzLnBpY2tVcCAhPT0gdGhpcy5wcm9wcy5waWNrVXApIHtcbiAgICAgICAgICAgIHRoaXMucGlja1VwKHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5jYXVnaHQgJiYgcHJvcHMuY2F1Z2h0ICE9PSB0aGlzLnByb3BzLmNhdWdodCkge1xuICAgICAgICAgICAgdGhpcy5jYXVnaHQocHJvcHMuY2F1Z2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdtYW51YWwtZHJvcHBlcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgKiB0aGF0IHRoZSBlbGVtZW50IGlzIHRyYW5zaXRpb25lZCBhbmQgbm90IHJlcGxhY2VkLlxuICAgICAqL1xuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5zdGF0ZS5pdGVtcywgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZiA9IElURU0gKyBrZXk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e2l0ZW0ucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXt0aGlzLnByb3BzLm9uVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ecm9wcGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3BDbGFzczogRFJPUFBFRCxcbiAgICBhbW91bnQ6IDEsXG4gICAgYmluOiAoXG4gICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZSAvPixcbiAgICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgKSxcbiAgICByZWZzVGFyZ2V0OiAnbWFudWFsLWRyb3BwZXInLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIG9uUGlja1VwOiBfLm5vb3AsXG4gICAgb25OZXh0OiBfLm5vb3AsXG4gICAgbmV4dDogZmFsc2UsXG4gICAgZHJvcDogZmFsc2UsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BwZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2F0Y2hhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIG1hcmtDYXVnaHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F0Y2hhYmxlKCkge1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSB0aGlzLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNhdGNoYWJsZSAmJiB0aGlzLmNhdGNoYWJsZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuY2F0Y2hhYmxlO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICAgICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhdGNoYWJsZVxuICAgICAgICB9LCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZWFkeSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnByb3BzLnJlQ2F0Y2hhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yLmpzIiwiaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5jb25zdCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgZ2FtZU51bWJlcjogMSxcbiAgICBiaW5OYW1lcyxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtcbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzY3I9e2Ake0NNV04uTUVESUEuSU1BR0V9cGlwZTAxLnBuZ2B9IC8+LFxuICAgIF0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzLmpzIiwiaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcblxuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmxldCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZWxlYXNlSXRlbTEubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29ycmVjdFNlbGVjdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWVOYW1lOiAncmVjeWNsaW5nLWNoYW1waW9uJyxcbiAgICBnYW1lTnVtYmVyOiAxLFxuICAgIGxldmVsOiAxLFxuICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICBzY29yZVRvV2luOiA2MDAsXG4gICAgbWF4SGl0czogNSxcbiAgICBkcm9wcGVyQW1vdW50OiAzLFxuICAgIHBvaW50c1Blckl0ZW06IDk1LFxuICAgIHBvaW50c1Blck1pc3M6IDI1MCxcbiAgICBjb2xsaWRlRnJhY3Rpb246IDAsXG4gICAgZ2V0U2NyZWVuUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFRpbWVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNjb3JlID49IG9wdHMuc2NvcmVUb1dpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hTY29yZTogTWF0aC5tYXgob3B0cy5zY29yZSwgb3B0cy5oaWdoU2NvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmV0cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25JbmNyZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kc0xlZnQgPSAodGhpcy5wcm9wcy50aW1lb3V0IC0gdGhpcy5zdGF0ZS50aW1lKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZHNMZWZ0ID09PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAncGxheScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAndGltZXInLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UmV2ZWFsUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25PcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzdGFydCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAocHJldk1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghcHJldk1lc3NhZ2UgfHwgcHJldk1lc3NhZ2UgPT09ICdyZXNvcnQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2UgPT09ICdyZXRyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaGl0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tiaW5SZWZLZXldKS5vZmZzZXRMZWZ0IC0gNzg1O1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmxlZnQgPT09IGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnZHJvcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbGVmdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuRE9NTm9kZSAhPT0gZS50YXJnZXQgfHwgb3B0cy5sZWZ0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdkcm9wJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKF8ucmVwbGFjZSh0aGlzLmdldEZpcnN0SXRlbSgpLnByb3BzLmNsYXNzTmFtZSwgL1xcZCsvZywgJycpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogWydtYW51YWwtZHJvcHBlcicsICdkcm9wQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldExpZmVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc2NvcmUgPj0gb3B0cy5zY29yZVRvV2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaFNjb3JlOiBNYXRoLm1heChvcHRzLnNjb3JlLCBvcHRzLmhpZ2hTY29yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBnZXRDYXRjaGFibGVzQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBjYXRjaGFibGVzQXJyYXk7XG4gICAgfSxcbiAgICBiaW5OYW1lcyxcbiAgICBpdGVtc1RvU29ydCxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZ2FtZV9vcHRzLmpzIiwiaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuaW1wb3J0IGl0ZW1zRm9vZFNoYXJlIGZyb20gJy4vaXRlbXNfZm9vZF9zaGFyZSc7XG5pbXBvcnQgaXRlbXNMYW5kZmlsbCBmcm9tICcuL2l0ZW1zX2xhbmRmaWxsJztcbmltcG9ydCBpdGVtc0xpcXVpZHMgZnJvbSAnLi9pdGVtc19saXF1aWRzJztcbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxuZXhwb3J0IGRlZmF1bHQgW11cbiAgICAuY29uY2F0KGl0ZW1zQ29tcG9zdClcbiAgICAuY29uY2F0KGl0ZW1zRm9vZFNoYXJlKVxuICAgIC5jb25jYXQoaXRlbXNMYW5kZmlsbClcbiAgICAuY29uY2F0KGl0ZW1zTGlxdWlkcylcbiAgICAuY29uY2F0KGl0ZW1zUmVjeWNsZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3RvX3NvcnQuanMiLCJsZXQgYmluID0gJ2Zvb2Qtc2hhcmUnO1xubGV0IG5hbWVzID0gW1xuICAgICdiYWctb2YtcG90YXRvLWNoaXBzLTInLFxuICAgICdiYWctb2YtcG90YXRvLWNoaXBzLTMnLFxuICAgICdib3gtb2YtY2hlZGRhci1jcmFja2VycycsXG4gICAgJ2JveC1vZi1jb29raWVzJyxcbiAgICAnZnJlc2gtdW5vcGVuZWQtc2FuZHdpY2gnLFxuICAgICdrZXRjaHVwLXBhY2tldCcsXG4gICAgJ21heW8tcGFja2V0JyxcbiAgICAnbXVzdGFyZC1wYWNrZXQnLFxuICAgICdwYWNrYWdlLW9mLWRyaWVkLWZydWl0JyxcbiAgICAncGFja2FnZWQtZGlubmVyLXJvbGwnLFxuICAgICdwYWNrYWdlZC12ZWdldGFibGVzJyxcbiAgICAnc2VhbGVkLWFwcGxlc2F1Y2UnLFxuICAgICdzZWFsZWQtYmFnLW9mLWNhcnJvdHMnLFxuICAgICdzZWFsZWQtcG9wY29ybicsXG4gICAgJ3NlYWxlZC1jaG9jb2xhdGUtbWlsaycsXG4gICAgJ3NlYWxlZC1mcnVpdC1kcmluay0xJyxcbiAgICAnc2VhbGVkLWZydWl0LWRyaW5rLTInLFxuICAgICdzZWFsZWQtZnJ1aXQtZHJpbmstMycsXG4gICAgJ3NlYWxlZC1taWxrLTEnLFxuICAgICdzZWFsZWQtbWlsay0yJyxcbiAgICAnc2VhbGVkLW1pbGstMycsXG4gICAgJ3NlYWxlZC1vcmFuZ2UtanVpY2UnLFxuICAgICdzZWFsZWQtcHJldHplbCcsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwnLFxuICAgICdzaW5nbGUtc2VydmUtY2VyZWFsLTInLFxuICAgICdzaW5nbGUtc2VydmUtY2VyZWFsLTMnLFxuICAgICdzaW5nbGUtc2VydmUtY29va2llcycsXG4gICAgJ3Vub3BlbmVkLWJveC1vZi1yYWlzaW5zJyxcbiAgICAndW5vcGVuZWQtY29va2llcy1wYWNrYWdlJyxcbiAgICAndW5vcGVuZWQtY3JhY2tlcnMtMScsXG4gICAgJ3Vub3BlbmVkLWNyYWNrZXJzLTInLFxuICAgICd1bm9wZW5lZC1jcmFja2Vycy0zJyxcbiAgICAndW5vcGVuZWQtZW5lcmd5LWJhcicsXG4gICAgJ3Vub3BlbmVkLWdyYWhhbS1jb29raWVzLTEnLFxuICAgICd1bm9wZW5lZC1ncmFoYW0tY29va2llcy0yJyxcbiAgICAndW5vcGVuZWQtZ3JhaGFtLWNvb2tpZXMtMycsXG4gICAgJ3Vub3BlbmVkLWdyYW5vbGEtYmFyJyxcbiAgICAndW5vcGVuZWQtanVpY2UtYm94LTEnLFxuICAgICd1bm9wZW5lZC1qdWljZS1ib3gtMicsXG4gICAgJ3Vub3BlbmVkLWp1aWNlLWJveC0zJyxcbiAgICAndW5vcGVuZWQtcGFjay1vZi1ncmFwZXMnLFxuICAgICd3aG9sZS1hcHBsZScsXG4gICAgJ3dob2xlLWJhbmFuYScsXG4gICAgJ3dob2xlLW9yYW5nZScsXG4gICAgJ3lvZ3VydC1jdXAtMScsXG4gICAgJ3lvZ3VydC1jdXAtMicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwibGV0IGJpbiA9ICdsaXF1aWRzJztcbmxldCBuYW1lcyA9IFtcbiAgICAnaGFsZi1mdWxsLWVuZXJneS1kcmluay1ib3R0bGUnLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTEnLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTInLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTMnLFxuICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTQnLFxuICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTEnLFxuICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTQnLFxuICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTEnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tMicsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi0zJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTQnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNScsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi02JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTcnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tOCcsXG4gICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UtMicsXG5dO1xuXG5sZXQgYmVjb21lcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLWJvdHRsZS0xJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLWJvdHRsZS0yJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLWJvdHRsZS0zJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLWJvdHRsZS00JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24nLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWFsdW1pbnVtLWNhbi0xJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdqdWljZS1ib3gtMScsXG4gICAgICAgIGJpbjogJ2xhbmRmaWxsJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2p1aWNlLWJveC0yJyxcbiAgICAgICAgYmluOiAnbGFuZGZpbGwnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMycsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNCcsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNycsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tOCcsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxuICAgIGJlY29tZXM6IGJlY29tZXNbZnJhbWVdLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19saXF1aWRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91ciBTb3J0aW5nIFNraWxsczxici8+XG4gICAgICAgICAgICAgICAgYXJlIG5lZWRlZCBmb3I8YnIvPlxuICAgICAgICAgICAgICAgIHRoaXMgbmV4dCByb3VuZC48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgR2V0IFJlYWR5LVNldC1HbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdSZWFkeVNldEdvJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogNzYwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBOb3cgdGhhdCB5b3UgaGF2ZTxici8+XG4gICAgICAgICAgICAgICAgdGhlIGhhbmcgb2YgdGhpcyBsZXQnczxici8+XG4gICAgICAgICAgICAgICAgYWRkIHNvbWUgc3BlZWQuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdvb2QgbHVjazxici8+XG4gICAgICAgICAgICAgICAgU3BlZWQgU29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTcGVlZFNvcnRpbmcnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDg1NSxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoYXQgd2FzIHNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQ8YnIvPlxuICAgICAgICAgICAgICAgIGludG8gaGlnaCBkcml2ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIaWdoRHJpdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogOTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBNYXN0ZXIgdGhpcyBsZXZlbDxici8+XG4gICAgICAgICAgICAgICAgYW5kIHdpbiB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIFJlY3ljbGUgQ2hhbXBpb24gRmxpcCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgQWNjdXJhY3kgaXMgaW1wb3J0YW50Li4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnQ2hhbXBpb25GbGlwJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwNDUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmxldCBmbGlwS2V5cyA9IFtcbiAgICAncmVjeWNsaW5nLWNoYW1waW9uJyxcbiAgICAncHJpY2VsZXNzLXBvdXJlcicsXG4gICAgJ2ZhbnRhc3RpYy1mb29kLXNoYXJlcicsXG4gICAgJ2R5bmFtaWMtZGl2ZXJ0ZXInLFxuICAgICdtYXN0ZXItc29ydGVyJyxcbiAgICAnZ3JlZW4tdGVhbS1jaGFsbGVuZ2UnLFxuXTtcblxubGV0IGxldmVsTmFtZXMgPSBbXG4gICAgJ1JlY3ljbGluZyBDaGFtcGlvbicsXG4gICAgJ1ByaWNlbGVzcyBQb3VyZXInLFxuICAgICdGYW50YXN0aWMgRm9vZCBTaGFyZXInLFxuICAgICdEeW5hbWljIERpdmVydGVyJyxcbiAgICAnTWFzdGVyIFNvcnRlcicsXG5dO1xuXG5sZXQgbnVtYmVyV29yZHMgPSBbXG4gICAgJ09uZScsXG4gICAgJ1R3bycsXG4gICAgJ1RocmVlJyxcbiAgICAnRm91cicsXG4gICAgJ0ZpdmUnLFxuXTtcblxubGV0IGdldExldmVsSGVhZGVyID0gbGV2ZWxOdW1iZXJXb3JkID0+IHtcbiAgICBpZiAobGV2ZWxOdW1iZXJXb3JkKSByZXR1cm4gPGgzIGNsYXNzTmFtZT1cImFuaW1hdGVkXCI+TGV2ZWwge2xldmVsTnVtYmVyV29yZH0gQ29tcGxldGUhPC9oMz47XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgIDxoMz5DT05HUkFUVUxBVElPTlMhPC9oMz5cbiAgICAgICAgICAgIDxoND5Zb3UgYXJlIGEgbWVtYmVyIG9mIEdyZWVuIFRlYW0hPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmxldCBsaXN0TGV2ZWxzID0gbGV2ZWxOdW1iZXIgPT5cbiAgICBfLm1hcChsZXZlbE5hbWVzLCAobmFtZSwgbnVtYmVyKSA9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bGV2ZWxOdW1iZXIgPiBudW1iZXIgPyAnY29tcGxldGUnIDogJyd9PlxuICAgICAgICAgICAgPHA+TGV2ZWwge251bWJlciArIDF9PC9wPlxuICAgICAgICAgICAgPHA+e25hbWV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobGV2ZWxOdW1iZXIpIHtcbiAgICBsZXQgbGV2ZWxOdW1iZXJXb3JkID0gbnVtYmVyV29yZHNbbGV2ZWxOdW1iZXIgLSAxXTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgcG9zdC1sZXZlbC0ke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKG9wdHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIEFQUEVBUjogXy5nZXQocHJvcHMsICdkYXRhLmFwcGVhci5wbGF5aW5nJyksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGVtaXRPbkNvbXBsZXRlPXt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJyxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogZmxpcEtleXNbbGV2ZWxOdW1iZXIgLSAxXVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9dHJhbnNpdGlvbi5mcmFtZS5wbmdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5sZXZlbHMucG5nYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxldmVsQXdhcmQubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUZsaXBIb3Zlci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJhcHBlYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1GbGlwRHJvcEJvdW5jZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0TGV2ZWxIZWFkZXIobGV2ZWxOdW1iZXJXb3JkKX1cbiAgICAgICAgICAgICAgICAgICAge2xpc3RMZXZlbHMobGV2ZWxOdW1iZXIpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFJlY3ljbGUgQ2hhbXBpb24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIE5leHQgdXDigJRpdCdzIExpcXVpZHMhPGJyLz5cbiAgICAgICAgICAgICAgICBQb3VyIHRoZSBsaXF1aWRzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgdGhlbiBzb3J0IHRoZSBjb250YWluZXJzLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVJlY3ljbGVDaGFtcGlvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdsaXF1aWRzJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1DbGlja1JlY0J1dHRvbi5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdwcmljZWxlc3MtcG91cmVyJyxcbiAgICBnYW1lTnVtYmVyOiAyLFxuICAgIGRyb3BwZXJBbW91bnQ6IDQsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoYmluUmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnbWFudWFsLWRyb3BwZXInLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiBfLnRvVXBwZXIob3B0cy5iaW5OYW1lc1tiaW5SZWZLZXldKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHBlclByb3BzKG9wdHMpIHtcbiAgICAgICAgbGV0IHByb3BzID0gZGVmYXVsdEdhbWVPcHRzLmdldERyb3BwZXJQcm9wcy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgIHByb3BzLm9uVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbVJlZiA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdO1xuICAgICAgICAgICAgbGV0IERPTU5vZGU7XG4gICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSAhPT0gJ2xlZnQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kcm9wQ2xhc3MgIT09ICdMSVFVSURTJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGl0ZW1SZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAncGlja1VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcblxuICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIG9uQW5pbWF0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja1VwKF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlyc3RJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gaXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByb3BzLm1lc3NhZ2UgPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMucHJvcHMpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUgfHwgaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUuaW5kZXhPZignUE9VUicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIERPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbJ2l0ZW0nLCAncG91ciddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGRlZmF1bHRHYW1lT3B0cy5nZXRDYXRjaGVyUHJvcHMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgICBwcm9wcy5vbkNvcnJlY3QgPSBmdW5jdGlvbiAoYnVja2V0UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChidWNrZXRSZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICduZXh0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cyhvcHRzKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdtaWxrJztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnQ2hvY29sYXRlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnY2hvY29sYXRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnT3JhbmdlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnRnJ1aXQnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdmcnVpdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMS5jb252ZXlvci5iZWx0YH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezI1MH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgaXRlbXNUb1NvcnQsXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBnZXRDYXRjaGFibGVzQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBjYXRjaGFibGVzQXJyYXk7XG4gICAgfSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEl0J3MgdGltZSB0byBkdWFsITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBEdWFsIHNvcnRpbmcgaXM8YnIvPlxuICAgICAgICAgICAgICAgIGltcG9ydGFudCBmb3IgYWNjdXJhY3kuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFNob3cgd2hhdCB5b3Uga25vdyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdJdHNUaW1lVG9EdWFsJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFN1Y2Nlc3MgaXMgdHdpY2UgYXMgbmljZTxici8+XG4gICAgICAgICAgICAgICAgd2hlbiBkdWFsIHNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQgdXAgYSBub3RjaC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdLaWNrSXR1cEFOb3RjaCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgU3VwZXIgU29ydGVyITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGluZ3MgYXJlIGFib3V0PGJyLz5cbiAgICAgICAgICAgICAgICB0byBnZXQgY3JhenkuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEkgaG9wZSB5b3UncmUgcmVhZHkhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGV5U3VwZXJTb3J0ZXInLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExldCdzIHRha2UgdGhpczxici8+XG4gICAgICAgICAgICAgICAgdG8gdGhlIG5leHQgbGV2ZWwhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgYWJvdXQgdG88YnIvPlxuICAgICAgICAgICAgICAgIGJlY29tZSBhPGJyLz5cbiAgICAgICAgICAgICAgICBQcmljZWxlc3MgUG91cmVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1Rha2VJdFRvdGhlTmV4dExldmVsJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3NtYWxsJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2hhcmluZyBzbmFja3MgaXMganVzdCBhPGJyLz5cbiAgICAgICAgICAgICAgICBraW5kIHRoaW5nIHRvIGRvIGZvciBvdGhlcnMuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIElkZW50aWZ5IHRob3NlIGl0ZW1zIHRoYXQ8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSByZWFkeSB0byBlYXQtbm90IHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBhcyBGb29kIFNoYXJlIGl0ZW1zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1NoYXJuaW5nU25hY2tzJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxuY29uc3QgUElDS1VQID0gJ1BJQ0tVUCc7XG5jb25zdCBEUk9QUEVEID0gJ0RST1BQRUQnO1xuY29uc3QgVElMVCA9ICdUSUxUJztcbmNvbnN0IElURU1TID0gJ2l0ZW1zLSc7XG5cbmNvbnN0IEJFTFRfU1JDID0gQ01XTi5NRURJQS5TUFJJVEUgKyAnbGV2ZWwuMy5jb252ZXlvci5iZWx0JztcbmNvbnN0IENMQVdfU1JDID0gQ01XTi5NRURJQS5TUFJJVEUgKyAnbGV2ZWwzcm9ib3Rhcm0nO1xuY29uc3QgRlVOTkVMX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2Zyb250LmJhY2suZnVubmVsJztcblxuY29uc3QgYmluTmFtZXMgPSBbXG4gICAgJ2Zvb2Qtc2hhcmUnLFxuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0JyxcbiAgICAnbGlxdWlkcycsXG5dO1xuXG5jb25zdCBvblRydWNrVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChvcHRzLCBlKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVNjcmVlbkRhdGEnLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICBkcm9wOiBfLmluY2x1ZGVzKGUudGFyZ2V0LmNsYXNzTmFtZSwgVElMVCksXG4gICAgICAgICAgICAgICAgZHJvcENsYXNzOiBfLnRvVXBwZXIoXy5zbmFrZUNhc2Uob3B0cy5zZWxlY3RhYmxlTWVzc2FnZSkpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdzZWxlY3RhYmxlJzoge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmNvbnN0IG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoaXRlbVJlZikge1xuICAgIGlmIChfLmluY2x1ZGVzKGl0ZW1SZWYuc3RhdGUuY2xhc3NOYW1lLCBQSUNLVVApKSB7XG4gICAgICAgIGl0ZW1SZWYucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU2NyZWVuRGF0YScsIHtcbiAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgIGRhdGE6ICcnLFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwiZHJvcFwiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgIDxza29hc2guQXVkaW8gZGVsYXk9ezQ2MDB9IHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GdW5uZWwubXAzYH0gLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1UcnVja0R1bXAubXAzYH0gLz5cbiAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgIGdhbWVOdW1iZXI6IDMsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChkYXRhUmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMubGlzdFtkYXRhUmVmXS5wcm9wcy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNsYXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSA9PT0gJ3RvcCcgJiYgXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIERST1BQRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzW0lURU1TICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBET01Ob2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFRJTFQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNlbGVjdGFibGVNZXNzYWdlICE9PSAnbGlxdWlkcycpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbVJlZik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcChfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpcnN0SXRlbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5jbGFzc05hbWUgPSBpdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5tZXNzYWdlID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LCAncmVmcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTVMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVja0NsYXNzTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSB8fCBpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZS5pbmRleE9mKCdQT1VSJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogWydpdGVtJywgJ3BvdXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uIChpdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgaXRlbVJlZi5yZW1vdmVBbGxDbGFzc05hbWVzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLkRPTU5vZGUpIGl0ZW1SZWYuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQuYmluZChudWxsLCBpdGVtUmVmKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShQSUNLVVApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWNrQ2xhc3NOYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICB2YXIgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0Q2F0Y2hlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25Db3JyZWN0ID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXh0cmFzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGF3XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTEFXX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm1vdmVDbGF3fVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgMjAwLCAyMDAsIDIwMCwgNTAwLCAxMDAsIDMwMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwLCAyMDBcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbW92ZUNsYXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZWx0XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtCRUxUX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NTAwfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm5leHR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjMuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZ1bm5lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e0ZVTk5FTF9TUkN9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZnJvbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtGVU5ORUxfU1JDfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd0cnVjaycsIG9wdHMudHJ1Y2tDbGFzc05hbWUsIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpfVxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJ1Y2tUcmFuc2l0aW9uRW5kLmJpbmQobnVsbCwgb3B0cyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydWNrLXN0YW5kXCIgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGl0ZW1zVG9Tb3J0LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNoYXJlIFNvbWUgTW9yZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgWW91ciBzb3J0aW5nIHNraWxscyBhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGFjdGlvbnMgb2Yga2luZG5lc3MuPGJyLz5cbiAgICAgICAgICAgICAgICBTaGFyZSB0aGUgbG92ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTaGFyZVRoZUxvdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU3BlZWQgU2hhcmUhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdldCByZWFkeSBmb3IgYTxici8+XG4gICAgICAgICAgICAgICAgcnVzaCBvZiBraW5kbmVzcyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTcGVlZHNoYXJlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSBTdXBlciBTaGFyZXIhPGJyLz5cbiAgICAgICAgICAgICAgICBLaW5kbmVzcyBqdXN0PGJyLz5cbiAgICAgICAgICAgICAgICBza3lyb2NrZXRlZCBpbjxici8+XG4gICAgICAgICAgICAgICAgdGhlIGx1bmNocm9vbSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgZG8gdGhpcyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIZXlTdXBlclNoYXJlclNreXJvY2tldGVkJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGUgdGl0bGUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIEZhbnRhc3RpYyBGb29kLVNoYXJlcjxici8+XG4gICAgICAgICAgICAgICAgaXMgb24gdGhlIGhvcml6b24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIG1ha2UgdGhpcyBoYXBwZW4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnT25UaGVIb3Jpem9uJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ2V4aGF1c3QnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgSnVzdCBiZWNhdXNlIGl0J3MgaW4gdGhlIGJpbi08YnIvPlxuICAgICAgICAgICAgICAgICAgICBkb2Vzbid0IG1lYW4gaXQgc2hvdWxkIGJlLjxici8+XG4gICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgIERyYWcgaXRlbXMgdG8gdGhlIHZlbnQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGF0IHNob3VsZCBub3QgYmUgaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGUgYmluIHRvIGJlIHJlc29ydGVkLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9jb21wb3N0YH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdEcmFnVG9CaW4nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgICAgICBpbWFnZTogYCR7Q01XTi5NRURJQS5JTUFHRX1leGhhdXN0LnBuZ2AsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNCc7XG5pbXBvcnQgRHJhZ2dhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQnO1xuXG5jb25zdCBQVFMgPSAncHRzJztcblxubGV0IGdldENoaWxkcmVuID0gdiA9PiB7XG4gICAgaWYgKHYuY2hpbGRyZW4pIHJldHVybiB2LmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9XyR7Xy5yZXBsYWNlKHYuYmluLCAnLScsICcnKX1gfVxuICAgICAgICAgICAgZnJhbWU9e3YuZnJhbWUgfHwgMX1cbiAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICBpZiAoTWF0aC5hYnMocHJvcHMuZ2FtZVN0YXRlLmN1cnJlbnRTY3JlZW5JbmRleCAtIHBhcnNlSW50KGtleSwgMTApKSA+IDIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2NyZWVuUHJvcHM7XG4gICAgICAgIGxldCB0aW1lclByb3BzO1xuICAgICAgICBsZXQgZHJvcHBlclByb3BzO1xuICAgICAgICBsZXQgcmV2ZWFsUHJvcHM7XG4gICAgICAgIGxldCBsaWZlUHJvcHM7XG4gICAgICAgIGxldCBkcmFnZ2FibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3B6b25lUHJvcHM7XG5cbiAgICAgICAgbGV0IGJpbkNvbXBvbmVudHM7XG5cbiAgICAgICAgY29uc3QgTEVWRUxfUEFUSCA9IGBnYW1lU3RhdGUuZGF0YS4ke18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpfS5sZXZlbHMuJHtvcHRzLmxldmVsfWA7XG5cbiAgICAgICAgbGV0IHN0YXJ0ID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LnN0YXJ0YCwgZmFsc2UpO1xuICAgICAgICBsZXQgZ2FtZUNvbXBsZXRlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmNvbXBsZXRlYCwgZmFsc2UpO1xuICAgICAgICBsZXQgZHJvcHBlZCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJvcHBlZCcpO1xuICAgICAgICBsZXQgZHJhZ2dpbmcgPSBfLmdldChwcm9wcywgJ2RhdGEuZHJhZ2dhYmxlLmRyYWdnaW5nJyk7XG4gICAgICAgIGxldCBpdGVtTmFtZSA9IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgXy5yZXBsYWNlKF8uZ2V0KGRyYWdnaW5nLCAncHJvcHMuY2xhc3NOYW1lJywgJycpLCAvXFxkKy9nLCAnJylcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJpbk5hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuYmluTmFtZScsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBjYXJvdXNlbE5leHQgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIubmV4dCcsIGZhbHNlKTtcbiAgICAgICAgbGV0IHBsYXkgPSBfLmdldChwcm9wcywgJ2RhdGEucGxheScsIG51bGwpO1xuXG4gICAgICAgIGxldCBhbnN3ZXJzID0gXy5maWx0ZXIob3B0cy5iaW5OYW1lcywgbmFtZSA9PiBuYW1lICE9PSBiaW5OYW1lKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIHJldmVhbE9wZW4gPT09ICdyZXNvcnQnID8gJ3Jlc29ydCcgOlxuICAgICAgICAgICAgXy5rZWJhYkNhc2UoaXRlbU5hbWUpIDogbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNjcmVlblByb3BzID0gb3B0cy5nZXRTY3JlZW5Qcm9wcyhvcHRzKTtcbiAgICAgICAgdGltZXJQcm9wcyA9IG9wdHMuZ2V0VGltZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHBlclByb3BzID0gb3B0cy5nZXREcm9wcGVyUHJvcHMob3B0cyk7XG4gICAgICAgIHJldmVhbFByb3BzID0gb3B0cy5nZXRSZXZlYWxQcm9wcyhvcHRzKTtcbiAgICAgICAgbGlmZVByb3BzID0gb3B0cy5nZXRMaWZlUHJvcHMob3B0cyk7XG4gICAgICAgIGRyYWdnYWJsZVByb3BzID0gb3B0cy5nZXREcmFnZ2FibGVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHpvbmVQcm9wcyA9IG9wdHMuZ2V0RHJvcHpvbmVQcm9wcyhvcHRzKTtcblxuICAgICAgICBiaW5Db21wb25lbnRzID0gXy5tYXAob3B0cy5iaW5JdGVtcywgYmluID0+ICh7XG4gICAgICAgICAgICB0eXBlOiBDYXJvdXNlbCxcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBiaW4ubmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBiaW4ubmFtZSxcbiAgICAgICAgICAgICAgICBzaG93TnVtOiAyMCxcbiAgICAgICAgICAgICAgICBuZXh0T25TdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYmluOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHNrb2FzaC5SYW5kb21pemVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluOiBfLm1hcChiaW4ub2JqZWN0cywgdiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IERyYWdnYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVjb21lczogdi5iZWNvbWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogZ2V0Q2hpbGRyZW4odiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZHJhZ2dhYmxlUHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YCR7b3B0cy5nYW1lTmFtZX0tJHtvcHRzLmxldmVsfWB9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e2dhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXshZ2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgey4uLnNjcmVlblByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxldmVsLXNjb3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e29wdHMuc2NvcmV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge1BUU31cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guU2NvcmU+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guVGltZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50RG93blxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0PVwibW06c3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dD17b3B0cy50aW1lb3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e2dhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlPXtyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdW1lPXshcmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RhcnQ9e3N0YXJ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRpbWVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIml0ZW0tbmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiaW4tbmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtiaW5OYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlmZVwiXG4gICAgICAgICAgICAgICAgICAgIG1heD17MH1cbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0PXtvcHRzLm1heEhpdHN9XG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e29wdHMuaGl0c31cbiAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5saWZlUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RHJvcHpvbmVcbiAgICAgICAgICAgICAgICAgICAgZHJvcHBlZD17ZHJvcHBlZH1cbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dpbmc9e2RyYWdnaW5nfVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHpvbmVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0T25PdXRPZkJvdW5kcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lcz17Wzxza29hc2guQ29tcG9uZW50IGFuc3dlcnM9e2Fuc3dlcnN9IC8+XX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxNYW51YWxEcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ9e29wdHMuZHJvcHBlckFtb3VudH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dD17Y2Fyb3VzZWxOZXh0fVxuICAgICAgICAgICAgICAgICAgICBiaW49ezxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW49e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtyZXZlYWxDbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLnJldmVhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJlc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcGxheT17b3B0cy5wbGF5QXVkaW99XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXthdWRpb0FycmF5fVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tSZWFkeT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcblxuaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEnO1xuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIFNlbGVjdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk7XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5zZWxlY3RlZCAmJiBuZXh0UHJvcHMuc2VsZWN0ZWQgIT09IHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLm5leHQgJiYgbmV4dFByb3BzLm5leHQgIT09IHRoaXMucHJvcHMubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubmV4dE9uU3RhcnQpIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLnJlZnMuYmluLmdldCgxKVswXTtcbiAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KFxuICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWtleSc6IHNob3J0aWQuZ2VuZXJhdGUoKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGNsYXNzZXNbMF0gPSAnJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5wcm9wcy5lbmFibGVkO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgIGxpc3QsXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXNbMF0gPSAnTEVBVkUnO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5wYXVzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgIC8vIHNrb2FzaC5Db21wb25lbnQgaXMgbm90IHRoZSBzdXBlciBoZXJlLCBidXQgdGhpcyBpcyB3aGF0IHdlIHdhbnRcbiAgICAgICAgc2tvYXNoLkNvbXBvbmVudC5wcm90b3R5cGUuYm9vdHN0cmFwLmNhbGwodGhpcyk7XG5cbiAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4gPyB0aGlzLnJlZnMuYmluLmdldCh0aGlzLnByb3BzLnNob3dOdW0gKyAxKSA6IHRoaXMucHJvcHMubGlzdDtcblxuICAgICAgICBfLmVhY2gobGlzdCwgaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1rZXknOiBzaG9ydGlkLmdlbmVyYXRlKClcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsaXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdEhlbHBlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnN0YXRlLmxpc3RbdGhpcy5wcm9wcy50YXJnZXRJbmRleF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLnN0YXRlLmxpc3RbdGhpcy5wcm9wcy50YXJnZXRJbmRleF0pO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXJvdXNlbCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgKiB0aGF0IHRoZSBlbGVtZW50IGlzIHRyYW5zaXRpb25lZCBhbmQgbm90IHJlcGxhY2VkLlxuICAgICAqL1xuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5zdGF0ZS5saXN0IHx8IHRoaXMucHJvcHMubGlzdDtcbiAgICAgICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmO1xuICAgICAgICAgICAgdmFyIG9uVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgICAgIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQgPSBrZXkgPT09IDAgPyB0aGlzLm5leHQgOiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhrZXksIGxpKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXtsaS5wcm9wcy5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZH1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICBkYXRhLWtleT17c2hvcnRpZChrZXkpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBvbkNsaWNrID0gdGhpcy5wcm9wcy5jbGlja2FibGUgPyB0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcykgOiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhcm91c2VsLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIHNob3dOdW06IDMsXG4gICAgdGFyZ2V0SW5kZXg6IDEsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBuZXh0T25TdGFydDogdHJ1ZSxcbiAgICBwYXVzZTogNTAwLFxuICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIFNlbGVjdGFibGUuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGVuY29kZSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTQ1OTcwNzYwNjUxODtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA2O1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCB2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgc2Vjb25kcyk7XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21CeXRlID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcblxuZnVuY3Rpb24gZW5jb2RlKGxvb2t1cCwgbnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBsb29rdXAoICggKG51bWJlciA+PiAoNCAqIGxvb3BDb3VudGVyKSkgJiAweDBmICkgfCByYW5kb21CeXRlKCkgKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxuZnVuY3Rpb24gcmFuZG9tQnl0ZSgpIHtcbiAgICBpZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSAmIDB4MzA7XG4gICAgfVxuICAgIHZhciBkZXN0ID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhkZXN0KTtcbiAgICByZXR1cm4gZGVzdFswXSAmIDB4MzA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLyoqXG4gKiBEZWNvZGUgdGhlIGlkIHRvIGdldCB0aGUgdmVyc2lvbiBhbmQgd29ya2VyXG4gKiBNYWlubHkgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZy5cbiAqIEBwYXJhbSBpZCAtIHRoZSBzaG9ydGlkLWdlbmVyYXRlZCBpZC5cbiAqL1xuZnVuY3Rpb24gZGVjb2RlKGlkKSB7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5zaHVmZmxlZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnNpb246IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMCwgMSkpICYgMHgwZixcbiAgICAgICAgd29ya2VyOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDEsIDEpKSAmIDB4MGZcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5jaGFyYWN0ZXJzKCk7XG4gICAgdmFyIGxlbiA9IGlkLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuO2krKykge1xuICAgICAgICBpZiAoY2hhcmFjdGVycy5pbmRleE9mKGlkW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TZWxlY3RhYmxlXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5jb25zb2xlLndhcm4oJ0FzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGUnKTtcbi8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2xhc3Nlczoge30sXG4gICAgICAgICAgICBzZWxlY3RGdW5jdGlvbjogdGhpcy5zZWxlY3QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxlY3RDbGFzcztcbiAgICAgICAgdmFyIHNlbGVjdEZ1bmN0aW9uO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcblxuICAgICAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgICAgIHNlbGVjdENsYXNzID0gdGhpcy5wcm9wcy5zZWxlY3RDbGFzcyB8fCB0aGlzLnN0YXRlLnNlbGVjdENsYXNzIHx8ICdTRUxFQ1RFRCc7XG4gICAgICAgIHNlbGVjdEZ1bmN0aW9uID0gc2VsZWN0Q2xhc3MgPT09ICdISUdITElHSFRFRCcgPyB0aGlzLmhpZ2hsaWdodCA6IHRoaXMuc2VsZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnQpIHtcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0XSA9IHNlbGVjdENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydGVkOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgIHNlbGVjdEZ1bmN0aW9uLFxuICAgICAgICAgICAgc2VsZWN0Q2xhc3MsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVmcy5iaW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGxpc3Q6IHRoaXMucmVmcy5iaW4uZ2V0QWxsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgdmFyIGRhdGFSZWY7XG4gICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgdmFyIGlzQ29ycmVjdDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFSZWYgPSBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnTEknKTtcblxuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcblxuICAgICAgICAgICAgZGF0YVJlZiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZWYgPSBzZWxmLnJlZnNbZGF0YVJlZl07XG5cbiAgICAgICAgaXNDb3JyZWN0ID0gKHJlZiAmJiByZWYucHJvcHMgJiYgcmVmLnByb3BzLmNvcnJlY3QpIHx8XG4gICAgICAgICAgICAoIXNlbGYucHJvcHMuYW5zd2VycyB8fCAhc2VsZi5wcm9wcy5hbnN3ZXJzLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIHNlbGYucHJvcHMuYW5zd2Vycy5pbmRleE9mKGRhdGFSZWYpICE9PSAtMSk7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuYWxsb3dEZXNlbGVjdCAmJiBjbGFzc2VzW2RhdGFSZWZdKSB7XG4gICAgICAgICAgICBkZWxldGUgY2xhc3Nlc1tkYXRhUmVmXTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvcnJlY3QpIHtcbiAgICAgICAgICAgIGNsYXNzZXNbZGF0YVJlZl0gPSBzZWxmLnN0YXRlLnNlbGVjdENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnByb3BzLnNlbGVjdFJlc3BvbmQuY2FsbChzZWxmLCBkYXRhUmVmKTtcbiAgICAgICAgc2VsZi5wcm9wcy5vblNlbGVjdC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNob29zZU9uZSkgc2VsZi5jb21wbGV0ZSgpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmRhdGFUYXJnZXQpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBzZWxmLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHJlZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuY29tcGxldGVMaXN0T25DbGljaykge1xuICAgICAgICAgICAgXy5lYWNoKHNlbGYucmVmcywgKHIsIGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gaWQpIF8uaW52b2tlKHIsICdjb21wbGV0ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgICAgICAgaWYgKGsgPT09IGRhdGFSZWYpIF8uaW52b2tlKHIsICdjb21wbGV0ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3QoZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgICB9XG5cbiAgICBoaWdobGlnaHQoZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgdGhpcy5zZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3Moa2V5LCBsaSkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgICAgICAgIGxpLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLXJlZiddXSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1rZXknXV1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnc2VsZWN0YWJsZScsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMuc2VsZWN0ICYmIHByb3BzLnNlbGVjdCAhPT0gdGhpcy5wcm9wcy5zZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uY2FsbCh0aGlzLCBwcm9wcy5zZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYmluKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGlzdCgpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3QgfHwgdGhpcy5zdGF0ZS5saXN0O1xuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKGxpLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciBkYXRhUmVmID0gbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgdmFyIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wcy5pZCB8fCBkYXRhUmVmO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBsaS5wcm9wcy5tZXNzYWdlIHx8ICcnICsga2V5O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhrZXksIGxpKX1cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17ZGF0YVJlZn1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXt0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBsaXN0OiBbXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPlxuICAgIF0sXG4gICAgc2VsZWN0Q2xhc3M6ICdTRUxFQ1RFRCcsXG4gICAgY29tcGxldGVMaXN0T25DbGljazogdHJ1ZSxcbiAgICBzZWxlY3RSZXNwb25kOiBfLm5vb3AsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0YWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZi5kcm9wem9uZUNvcm5lcnMgPSBfLm1hcChzZWxmLnByb3BzLmRyb3B6b25lcywgKHZhbHVlLCBrZXkpID0+XG4gICAgICAgICAgICBzZWxmLmdldENvcm5lcnMoUmVhY3RET00uZmluZERPTU5vZGUoc2VsZi5yZWZzW2Bkcm9wem9uZS0ke2tleX1gXSkpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNlbGYubG9hZERhdGEgJiYgdHlwZW9mIHNlbGYubG9hZERhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZjEucmVmICYmIHJlZjEuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWZzW2tleTFdICYmIHJlZjIucHJvcHMubWVzc2FnZSA9PT0gcmVmMS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBkcmFnZ2FibGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUocmVmMS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc2V0U3RhdGUoe2NvbnRlbnQ6IFtdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjMsIGtleTMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5My5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaW5jbHVkZXMocmVmMiwgcmVmMy5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc3RhdGUuY29udGVudC5wdXNoKHJlZjMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWYzLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZERyYWdORHJvcERhdGEoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmVmc1trZXkxXSAmJiByZWYyLnByb3BzLm1lc3NhZ2UgPT09IHJlZjEucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lID0gc2VsZi5yZWZzW2tleTFdO1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogZHJhZ2dhYmxlfSk7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5zZXRTdGF0ZShyZWYxLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTXVsdGlBc253ZXJEYXRhKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkcm9wem9uZTtcbiAgICAgICAgdmFyIGRyYWdnYWJsZTtcbiAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogW119KTtcbiAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgIGlmIChfLmluY2x1ZGVzKHJlZjEsIGRyYWdnYWJsZS5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zdGF0ZS5jb250ZW50LnB1c2goZHJhZ2dhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENvcm5lcnMoZWwpIHtcbiAgICAgICAgdmFyIG9mZnNldDtcbiAgICAgICAgdmFyIGNvcm5lcnMgPSBbXTtcblxuICAgICAgICBvZmZzZXQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29ybmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBvZmZzZXQubGVmdCArIG9mZnNldC53aWR0aCAqIChpID09PSAxIHx8IGkgPT09IDIgPyAxIDogMCksXG4gICAgICAgICAgICAgICAgeTogb2Zmc2V0LnRvcCArIG9mZnNldC5oZWlnaHQgKiAoaSA+IDEgPyAxIDogMCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JuZXJzO1xuICAgIH1cblxuICAgIG9uRHJvcChkcm9wcGVkKSB7XG4gICAgICAgIHZhciBkcm9wcGVkRE9NO1xuICAgICAgICB2YXIgY29ybmVycztcbiAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuXG4gICAgICAgIGRyb3BwZWRET00gPSBkcm9wcGVkLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUoZHJvcHBlZCk7XG4gICAgICAgIGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoZHJvcHBlZERPTSk7XG5cbiAgICAgICAgZHJvcHpvbmVSZWYgPSBfLnJlZHVjZSh0aGlzLnByb3BzLmRyb3B6b25lcywgKGEsIHYsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChza29hc2gudXRpbC5kb0ludGVyc2VjdChjb3JuZXJzLCB0aGlzLmRyb3B6b25lQ29ybmVyc1trXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2Bkcm9wem9uZS0ke2t9YF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChkcm9wem9uZVJlZikge1xuICAgICAgICAgICAgdGhpcy5pbkJvdW5kcyhkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm91dE9mQm91bmRzKGRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCBkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dpbmcpIHtcbiAgICAgICAgXy5lYWNoKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5zO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYgPSB0aGlzLnJlZnNbYGRyb3B6b25lLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGFpbnMgPSBkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXTtcbiAgICAgICAgICAgIGluZGV4ID0gY29udGFpbnMuaW5kZXhPZihkcmFnZ2luZyk7XG4gICAgICAgICAgICBpZiAofmluZGV4KSBjb250YWlucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYuY29udGFpbnMgPSBjb250YWlucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCBkcmFnZ2luZyk7XG4gICAgfVxuXG4gICAgaW5Cb3VuZHMoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgaWYgKCFkcm9wem9uZVJlZi5wcm9wcy5hbnN3ZXJzIHx8IGRyb3B6b25lUmVmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkcm9wcGVkLnByb3BzLm1lc3NhZ2UpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dE9mQm91bmRzKGRyb3BwZWQpIHtcbiAgICAgICAgLy8gcmVzcG9uZCB0byBhbiBvdXQgb2YgYm91bmRzIGRyb3BcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ291dCcpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmNvcnJlY3RPbk91dE9mQm91bmRzKSB0aGlzLmluY29ycmVjdChkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBjb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgICAgIC8vIHJlc3BvbmQgdG8gY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0NvcnJlY3QoKTtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcblxuICAgICAgICBkcm9wem9uZVJlZi5jb250YWlucyA9IChkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXSkuY29uY2F0KGRyb3BwZWQpO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZikge1xuICAgICAgICAvLyByZXNwb25kIHRvIGluY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0luY29ycmVjdCgpO1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMuZHJvcHBlZCAmJiBwcm9wcy5kcm9wcGVkICE9PSB0aGlzLnByb3BzLmRyb3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wKHByb3BzLmRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmRyYWdnaW5nICYmIHByb3BzLmRyYWdnaW5nICE9PSB0aGlzLnByb3BzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZyhwcm9wcy5kcmFnZ2luZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEcm9wem9uZXMoKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLmRyb3B6b25lcywgKGNvbXBvbmVudCwga2V5KSA9PlxuICAgICAgICAgICAgPGNvbXBvbmVudC50eXBlXG4gICAgICAgICAgICAgICAgey4uLmNvbXBvbmVudC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2Bkcm9wem9uZS0ke2tleX1gfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnZHJvcHpvbmVzJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgnYXNzZXRzJyl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRHJvcHpvbmVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyb3B6b25lLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3B6b25lczogWzxza29hc2guQ29tcG9uZW50IC8+XSxcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxuICAgIG9uRHJhZzogXy5ub29wLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIGluY29ycmVjdE9uT3V0T2ZCb3VuZHM6IHRydWUsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZW5kWDogMCxcbiAgICAgICAgICAgIGVuZFk6IDAsXG4gICAgICAgICAgICB6b29tOiAxLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW91c2VEb3duID0gdGhpcy5tb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tb3VzZVVwID0gdGhpcy5tb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb3ZlRXZlbnQgPSB0aGlzLm1vdmVFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRvdWNoRW5kID0gdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0Wm9vbSA9IHRoaXMuc2V0Wm9vbS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3VsZERyYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNob3VsZERyYWcuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ29ycmVjdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYXJrSW5jb3JyZWN0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXR1cm5PbkluY29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEV2ZW50KGUsIGNiKSB7XG4gICAgICAgIHZhciByZWN0O1xuICAgICAgICB2YXIgc3RhcnRYO1xuICAgICAgICB2YXIgc3RhcnRZO1xuICAgICAgICB2YXIgZW5kWDtcbiAgICAgICAgdmFyIGVuZFk7XG4gICAgICAgIHZhciBncmFiWDtcbiAgICAgICAgdmFyIGdyYWJZO1xuXG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcy5ET01Ob2RlKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5zaG91bGREcmFnKCkpIHJldHVybjtcblxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgICAgICAgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgZSA9IGUudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgICAgICAgIGUub2Zmc2V0WCA9IGUucGFnZVggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBlLm9mZnNldFkgPSBlLnBhZ2VZIC0gcmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICBncmFiWCA9IGUub2Zmc2V0WCAvIHRoaXMuc3RhdGUuem9vbTtcbiAgICAgICAgZ3JhYlkgPSBlLm9mZnNldFkgLyB0aGlzLnN0YXRlLnpvb207XG5cbiAgICAgICAgc3RhcnRYID0gZW5kWCA9IChlLnBhZ2VYIC8gdGhpcy5zdGF0ZS56b29tIC0gZ3JhYlgpO1xuICAgICAgICBzdGFydFkgPSBlbmRZID0gKGUucGFnZVkgLyB0aGlzLnN0YXRlLnpvb20gLSBncmFiWSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJldHVybikge1xuICAgICAgICAgICAgc3RhcnRYID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJYKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydFggKyB0aGlzLnN0YXRlLmdyYWJYIC0gZ3JhYlggOlxuICAgICAgICAgICAgICAgIHN0YXJ0WDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWSkgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnRZICsgdGhpcy5zdGF0ZS5ncmFiWSAtIGdyYWJZIDpcbiAgICAgICAgICAgICAgICBzdGFydFk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgICAgICAgcmV0dXJuOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXJ0WCxcbiAgICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICAgIGdyYWJYLFxuICAgICAgICAgICAgZ3JhYlksXG4gICAgICAgICAgICBlbmRYLFxuICAgICAgICAgICAgZW5kWSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IHRoaXMsXG4gICAgICAgICAgICAgICAgZHJvcHBlZDogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCB0aGlzKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYi5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIGF0dGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG1vdXNlRG93bihlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKTtcbiAgICB9XG5cbiAgICB0b3VjaFN0YXJ0KGUpIHtcbiAgICAgICAgdGhpcy5zdGFydEV2ZW50KGUsIHRoaXMuYXR0YWNoVG91Y2hFdmVudHMpO1xuICAgIH1cblxuICAgIG1vdmVFdmVudChlKSB7XG4gICAgICAgIGUgPSBlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdID8gZS50YXJnZXRUb3VjaGVzWzBdIDogZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVuZFg6IChlLnBhZ2VYIC8gdGhpcy5zdGF0ZS56b29tIC0gdGhpcy5zdGF0ZS5ncmFiWCksXG4gICAgICAgICAgICBlbmRZOiAoZS5wYWdlWSAvIHRoaXMuc3RhdGUuem9vbSAtIHRoaXMuc3RhdGUuZ3JhYlkpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmRFdmVudChjYikge1xuICAgICAgICB0aGlzLm9uRHJvcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0RW5kKGVuZFgsIGVuZFkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlbmRYLFxuICAgICAgICAgICAgZW5kWVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm5Ub1N0YXJ0KCkge1xuICAgICAgICB2YXIgZW5kWDtcbiAgICAgICAgdmFyIGVuZFk7XG4gICAgICAgIHZhciBkb1JldHVybjtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdGF5T25Db3JyZWN0ICYmIHRoaXMuc3RhdGUuY29ycmVjdCkge1xuICAgICAgICAgICAgZW5kWCA9IHRoaXMuc3RhdGUuZW5kWDtcbiAgICAgICAgICAgIGVuZFkgPSB0aGlzLnN0YXRlLmVuZFk7XG4gICAgICAgICAgICBkb1JldHVybiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kWCA9IHRoaXMuc3RhdGUuc3RhcnRYO1xuICAgICAgICAgICAgZW5kWSA9IHRoaXMuc3RhdGUuc3RhcnRZO1xuICAgICAgICAgICAgZG9SZXR1cm4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICByZXR1cm46IGRvUmV0dXJuLFxuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRldGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgfVxuXG4gICAgZGV0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hUb3VjaEV2ZW50cyk7XG4gICAgfVxuXG4gICAgb25Ecm9wKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRyYWdnYWJsZVRhcmdldCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICBkcm9wcGVkOiB0aGlzXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRHJvcC5jYWxsKHRoaXMsIHRoaXMpO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgdGhpcy5zZXRab29tKCk7XG5cbiAgICAgICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5ET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICAgICAgdGhpcy5ET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldFpvb20pO1xuICAgIH1cblxuICAgIHNldFpvb20oKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgem9vbTogc3RhdGUuc2NhbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5zdGF0ZS5lbmRYIC0gdGhpcy5zdGF0ZS5zdGFydFggfHwgMDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnN0YXRlLmVuZFkgLSB0aGlzLnN0YXRlLnN0YXJ0WSB8fCAwO1xuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLnN0YXRlLnNjYWxlIHx8IDE7XG4gICAgICAgIGxldCByb3RhdGUgPSB0aGlzLnN0YXRlLnJvdGF0ZSB8fCAwO1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcblxuICAgICAgICByZXR1cm4gXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBXZWJraXRUcmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgfSwgdGhpcy5zdGF0ZS5zdHlsZSwgdGhpcy5wcm9wcy5zdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgICAgICAgRFJBR0dJTkc6IHRoaXMuc3RhdGUuZHJhZ2dpbmcsXG4gICAgICAgICAgICBSRVRVUk46IHRoaXMuc3RhdGUucmV0dXJuLFxuICAgICAgICAgICAgQ09SUkVDVDogdGhpcy5zdGF0ZS5jb3JyZWN0LFxuICAgICAgICB9LCAnZHJhZ2dhYmxlJywgdGhpcy5zdGF0ZS5jbGFzc2VzLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17dGhpcy5wcm9wcy5tZXNzYWdlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRHJhZ2dhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyYWdnYWJsZVRhcmdldDogJ2RyYWdnYWJsZScsXG4gICAgc2hvdWxkRHJhZzogKCkgPT4gdHJ1ZSxcbiAgICByZXR1cm46IGZhbHNlLFxuICAgIHJldHVybk9uSW5jb3JyZWN0OiBmYWxzZSxcbiAgICBzdGF5T25Db3JyZWN0OiB0cnVlLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIG9uRHJhZzogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcmFnZ2FibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40LmpzIiwiaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuaW1wb3J0IGl0ZW1zTGFuZGZpbGwgZnJvbSAnLi9pdGVtc19sYW5kZmlsbCc7XG5pbXBvcnQgaXRlbXNSZWN5Y2xlIGZyb20gJy4vaXRlbXNfcmVjeWNsZSc7XG5cbmxldCBzaHVmZmxlZEl0ZW1zQ29tcG9zdCA9IF8uc2h1ZmZsZShpdGVtc0NvbXBvc3QpO1xubGV0IHNodWZmbGVkSXRlbXNMYW5kZmlsbCA9IF8uc2h1ZmZsZShpdGVtc0xhbmRmaWxsKTtcbmxldCBzaHVmZmxlZEl0ZW1zUmVjeWNsZSA9IF8uc2h1ZmZsZShpdGVtc1JlY3ljbGUpO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBbXS5jb25jYXQoaXRlbXNDb21wb3N0KS5jb25jYXQoaXRlbXNMYW5kZmlsbCkuY29uY2F0KGl0ZW1zUmVjeWNsZSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdkeW5hbWljLWRpdmVydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA0LFxuICAgIHBvaW50c1BlckJpbjogNDAwLFxuICAgIHNjb3JlVG9XaW46IDEyMDAsXG4gICAgZHJvcHBlckFtb3VudDogMixcbiAgICBnZXREcm9wcGVyUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Jpbk5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5pdGVtc1t0aGlzLmZpcnN0SXRlbUluZGV4XS5wcm9wcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyYWdnYWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBfLnJhbmRvbSgzMCwgNzApICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogXy5yYW5kb20oMzAsIDcwKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IF8ucmFuZG9tKDEsIDEuNSksXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogXy5yYW5kb20oLTMwLCAzMCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHpvbmVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICgoc2NvcmUgJSBvcHRzLnBvaW50c1BlckJpbikgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoZHJhZ2dhYmxlLCBkcm9wem9uZUFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkcm9wem9uZUFycmF5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbmRYOiBkcmFnZ2FibGUuc3RhdGUuZW5kWCArIDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kWTogZHJhZ2dhYmxlLnN0YXRlLmVuZFkgKyAyMDAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IG9wdHMuaGl0cyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzc2V0czogW1xuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvcnJlY3RTZWxlY3QubXAzYH0gLz4sXG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJpbmNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Xcm9uZ1NlbGVjdC5tcDNgfSAvPixcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyYWdcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1EcmFnLm1wM2B9IC8+LFxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVZhY3V1bS5tcDNgfSAvPixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvbkRyYWc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZWRpYSgnZHJhZycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRHJvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheU1lZGlhKCdkcm9wJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBiaW5JdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncmVjeWNsZScsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCA2KSksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYW5kZmlsbCcsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCA2KSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCAyKSksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjb21wb3N0JyxcbiAgICAgICAgICAgIG9iamVjdHM6IFtdXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zQ29tcG9zdC5zcGxpY2UoMCwgNikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zTGFuZGZpbGwuc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc1JlY3ljbGUuc3BsaWNlKDAsIDIpKSxcbiAgICAgICAgfSxcbiAgICBdXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTZW5kIG1pc3BsYWNlZCBpdGVtczxici8+XG4gICAgICAgICAgICAgICAgYmFjayB0byBiZSBzb3J0ZWQhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEhlbHAgb3RoZXJzIGJ5IGlkZW50aWZ5aW5nPGJyLz5cbiAgICAgICAgICAgICAgICBpdGVtcyBpbiB0aGUgd3JvbmcgYmluLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ01pc3BsYWNlZEl0ZW1zJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXYXkgdG8gU29ydCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhpcyBuZXh0IGxldmVsIHRha2VzPGJyLz5cbiAgICAgICAgICAgICAgICBTdXBlciBTb3J0aW5nIFNraWxscyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdXYXlUb1NvcnQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiAyMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEl0J3MgZ2V0dGluZyBtZXNzeSBpbiBoZXJlITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGVzZSBiaW5zIGFyZSBmdWxsPGJyLz5cbiAgICAgICAgICAgICAgICBvZiB0aGluZ3MgdGhhdCBzaG91bGRuJ3Q8YnIvPlxuICAgICAgICAgICAgICAgIGhhdmUgbGFuZGVkIGhlcmUuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGdldCBzb3J0aW5nIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0dldHRpbmdNZXNzeScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNCcsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFdhc3RlIERpdmVyc2lvbiBpcyB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIG5hbWUgb2YgdGhlIGdhbWUuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoZSB0aXRsZSBvZjxici8+XG4gICAgICAgICAgICAgICAgRHluYW1pYyBEaXZlcnRlciBpczxici8+XG4gICAgICAgICAgICAgICAganVzdCBhcm91bmQgdGhlIGNvcm5lci5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdXYXN0ZURpdmVyc2lvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNCcsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICd3YW50LXRvLXN0YWNrJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXaHkgd291bGQgeW91PGJyLz5cbiAgICAgICAgICAgICAgICB3YW50IHRvIHN0YWNrPGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIHRyYXk/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2h5U3RhY2snLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy93YW50X3RvX3N0YWNrX3NjcmVlbi5qcyIsImNvbnN0IFNSQyA9ICdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9jaGFuZ2VteXdvcmxkbm93L3ZpZGVvL3VwbG9hZC8nICtcbiAgICAndjE0ODY1MDc4NzMvYmFkX3N0YWNraW5nX2NvbXByZXNzZWRfbjNncnB3Lm1wNCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidmlkZW9cIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guVmlkZW8gc3JjPXtTUkN9IC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy92aWRlb19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgUHJvcGVyIHRyYXkgc3RhY2tpbmc8YnIvPlxuICAgICAgICAgICAgICAgIGlzIGEgZ2FtZSBvZiBzcGFjZS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgSG93IG11Y2ggc3BhY2U8YnIvPlxuICAgICAgICAgICAgICAgIGNhbiB5b3Ugc2F2ZT9cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdHYW1lT2ZTcGFjZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5pbXBvcnQgdHJheXNBcnJheSBmcm9tICcuL3RyYXlzX2FycmF5JztcblxubGV0IHJlc29ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxubGV0IGJpbk5hbWVzID0gW1xuICAgICdsaXF1aWRzJyxcbiAgICAnZm9vZC1zaGFyZScsXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2NvbXBvc3QnLFxuICAgICd0cmF5LXN0YWNraW5nJyxcbiAgICAnaG9tZScsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIm5leHRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MdW5jaGJveFNsaWRlLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvbnZleW9yQmVsdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBvdXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MaXF1aWRQb3VyLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidHJheVwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVRyYXlTdGFja2VyUmFjay5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInNlbGVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1TZWxlY3QubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAnbWFzdGVyLXNvcnRlcicsXG4gICAgZ2FtZU51bWJlcjogNSxcbiAgICBkcm9wcGVyQW1vdW50OiAyLFxuICAgIGJpbk5hbWVzLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogLjQsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoYmluUmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3BDbGFzcyA9IF8udG9VcHBlcihvcHRzLmJpbk5hbWVzW2JpblJlZktleV0pO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICdjbGFzc05hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRyb3BDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGxldCB0cmF5ID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUluZGV4ID0gXy5pbmRleE9mKHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnN0YXRlLmNsYXNzZXMsICdTRUxFQ1RFRCcpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gIW9wdHMuaXRlbVJlZiA/IHRyYXkgOiB0cmF5LnJlZnNbJ2NoaWxkcmVuLTAnXS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IERPTU5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IG9uQW5pbWF0aW9uRW5kO1xuXG4gICAgICAgICAgICAgICAgaWYgKGUucHJvcGVydHlOYW1lICE9PSAndG9wJyB8fFxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5pbmNsdWRlcyhvcHRzLml0ZW1DbGFzc05hbWUsICdMSVFVSURTJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmluY2x1ZGVzKHRoaXMucHJvcHMuZHJvcENsYXNzLCAnTElRVUlEUycpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghb3B0cy5pdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja1VwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1SZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3J0LmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcblxuICAgICAgICAgICAgICAgIGlmIChET01Ob2RlICE9PSBlLnRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlyc3RJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IGl0ZW0ucHJvcHMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RhYmxlLnByb3BzLmxpc3RbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLnByb3BzLmNsYXNzTmFtZSA9IHNlbGVjdGVkSXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbS5wcm9wcy5tZXNzYWdlID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0ucHJvcHNbJ2RhdGEtbWVzc2FnZSddID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG9wdHMuaXRlbUFtb3VudCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmF5LnJlZnNbJ2NoaWxkcmVuLTAnXS5zZXRTdGF0ZSh7Y2xhc3Nlczoge319KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvdXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIERPTU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIV8uaW5jbHVkZXMob3B0cy5pdGVtQ2xhc3NOYW1lLCAnUE9VUicpKSB7XG4gICAgICAgICAgICAgICAgICAgIERPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZSgnUE9VUicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbJ2l0ZW0nLCAncG91ciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXRlbVJlZiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXRlbUNsYXNzTmFtZSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMuaXRlbUNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5pdGVtQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdLnJlZnNbJ2NoaWxkcmVuLTAnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2Yoc2VsZWN0YWJsZS5zdGF0ZS5jbGFzc2VzLCBzZWxlY3RhYmxlLnByb3BzLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0YWJsZS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3NOYW1lKG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMucmVtb3ZlSXRlbUNsYXNzTmFtZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFByb3BzLnJlbW92ZUl0ZW1DbGFzc05hbWUgIT09IHRoaXMucHJvcHMuaXRlbUNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGFibGUgPSB0aGlzLnJlZnNbJ2l0ZW1zLScgKyB0aGlzLmZpcnN0SXRlbUluZGV4XS5yZWZzWydjaGlsZHJlbi0wJ107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUluZGV4ID0gXy5pbmRleE9mKHNlbGVjdGFibGUuc3RhdGUuY2xhc3Nlcywgc2VsZWN0YWJsZS5wcm9wcy5zZWxlY3RDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGVjdGFibGUucmVmc1tpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzTmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdEl0ZW0gJiZcbiAgICAgICAgICAgICAgICAgICAgbmV4dFByb3BzLnNlbGVjdEl0ZW0gIT09IHRoaXMucHJvcHMuc2VsZWN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHJheSA9IHRoaXMuZ2V0Rmlyc3RJdGVtKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYXkucHJvcHMubWVzc2FnZSA9PT0gJ2hvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF5LmFkZENsYXNzTmFtZSgnSE9NRScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0cmF5KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gXy5zdGFydENhc2UoXy5yZXBsYWNlKHRyYXkucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQgPSByZWN0LmxlZnQgKyAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkgKiAuOCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9wID0gcmVjdC50b3AgKyAocmVjdC5ib3R0b20gLSByZWN0LnRvcCkgKiAuOCAvIDI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IF8ucmVkdWNlKHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVmc1snY2hpbGRyZW4tMCddLnJlZnMsIChhLCByZWYpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgKyAocmVmLnByb3BzLm1lc3NhZ2UgPT09ICdsaXF1aWRzJyA/IDIgOiAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEl0ZW06IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uIChidWNrZXRSZWYpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW1vdW50ID0gb3B0cy5pdGVtQW1vdW50IC0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NBVUdIVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SXRlbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uZ2V0KGJ1Y2tldFJlZiwgJ3Byb3BzLm1lc3NhZ2UnKSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJheS1zdGFja2luZy10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYXkgU3RhY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdjaG9jb2xhdGUnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5jaG9jb2xhdGUubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2ZydWl0J30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuZnJ1aXQuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdtaWxrJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ29yYW5nZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm9yYW5nZS5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRyYXlzQXJyYXk7XG4gICAgfSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzLmpzIiwiaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5sZXQgb25TZWxlY3QgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgbGV0IHJlZiA9IHRoaXMucmVmc1trZXldO1xuICAgIGxldCByZWN0ID0gUmVhY3RET00uZmluZERPTU5vZGUocmVmKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHJlZi5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICBuZXc6IHRydWUsXG4gICAgICAgICAgICByZWYsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgb25Cb290c3RyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pbnZva2VDaGlsZHJlbkZ1bmN0aW9uKCdtYXJrQ2F0Y2hhYmxlJyk7XG59O1xuXG5sZXQgZ2V0TmFtZSA9IG5hbWUgPT4ge1xuICAgIGlmICghXy5pbmNsdWRlcyhuYW1lLCAndHJheScpKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAndHJheS1ibHVlJyxcbiAgICAgICAgICAgICd0cmF5LXBpbmsnLFxuICAgICAgICBdW18ucmFuZG9tKDAsIDEpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbn07XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IG1hcEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1OYW1lcykge1xuICAgIGxldCBpdGVtcyA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoaXRlbU5hbWVzLCBpdGVtLm5hbWUpKTtcblxuICAgIHJldHVybiBfLm1hcChpdGVtcywgaXRlbSA9PlxuICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICBjbGFzc05hbWU9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgIG1lc3NhZ2U9e2l0ZW0uYmlufVxuICAgICAgICAgICAgcmVDYXRjaGFibGU9e3RydWV9XG4gICAgICAgICAgICBiZWNvbWVzPXtpdGVtLmJlY29tZXN9XG4gICAgICAgICAgICBjaGlsZHJlbj17Z2V0Q2hpbGRyZW4oaXRlbSl9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCB0cmF5RGF0YSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdjbGVhbi1hbHVtaW51bS1mb2lsJyxcbiAgICAgICAgICAgICdhcHBsZS1jb3JlJyxcbiAgICAgICAgICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXInLFxuICAgICAgICAgICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnY2hpY2tlbi1sZWcnLFxuICAgICAgICAgICAgJ2VtcHR5LWNoaXAtYmFnJyxcbiAgICAgICAgICAgICdzZWFsZWQtcHJldHplbCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdoYW0tc2FuZHdpY2gnLFxuICAgICAgICAgICAgJ3dob2xlLWJhbmFuYScsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdoYW0tc2FuZHdpY2gnLFxuICAgICAgICAgICAgJ2VtcHR5LWJhZy1vZi1jaGlwcycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwYXBlci1wYWNrYWdpbmcnLFxuICAgICAgICAgICAgJ29yYW5nZS1zbGljZScsXG4gICAgICAgICAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyJyxcbiAgICAgICAgICAgICdzZWFsZWQtcG9wY29ybicsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdmcnVpdC1zbmFjay13cmFwcGVyJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXInLFxuICAgICAgICAgICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3BhY2thZ2Utb2YtZHJpZWQtZnJ1aXQnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1sZW1vbmFkZS1ib3gnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnbmFwa2luJyxcbiAgICAgICAgICAgICdzdHlyb2ZvYW0tY29udGFpbmVyJyxcbiAgICAgICAgICAgICdwYWNrYWdlZC1kaW5uZXItcm9sbCcsXG4gICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdlbXB0eS1yYWlzaW4tYm94JyxcbiAgICAgICAgICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3Vub3BlbmVkLWdyYW5vbGEtYmFyJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3NlYWxlZC1iYWctb2YtY2Fycm90cycsXG4gICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdjbGVhbi1hbHVtaW51bS1mb2lsJyxcbiAgICAgICAgICAgICdiYW5hbmEtcGVlbCcsXG4gICAgICAgICAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICAgICAgICAgJ2ZyZXNoLXVub3BlbmVkLXNhbmR3aWNoJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3RlYWJhZycsXG4gICAgICAgICAgICAnZW1wdHktc25hY2std3JhcHBlcicsXG4gICAgICAgICAgICAnc2VhbGVkLWFwcGxlc2F1Y2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ21ldGFsLWZvb2QtY2FuJyxcbiAgICAgICAgICAgICdjZWxlcnktc3RpY2snLFxuICAgICAgICAgICAgJ2VuZXJneS1iYXItd3JhcHBlcicsXG4gICAgICAgICAgICAnYmFnLW9mLXBvdGF0by1jaGlwcycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LWJveC1vZi1jcmFja2VycycsXG4gICAgICAgICAgICAncGxhc3RpYy1zcG9yaycsXG4gICAgICAgICAgICAnYm94LW9mLWNoZWRkYXItY3JhY2tlcnMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnbmFwa2luJyxcbiAgICAgICAgICAgICdwbGFzdGljLWJhZ2dpZScsXG4gICAgICAgICAgICAnd2hvbGUtYXBwbGUnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGxhc3RpYy1jdXAnLFxuICAgICAgICAgICAgJ2RpcnR5LXBhcGVyLWZvb2QtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdhcHBsZXNhdWNlLXBvdWNoJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ21ldGFsLWZvb2QtY2FuJyxcbiAgICAgICAgICAgICdjaGlja2VuLWxlZycsXG4gICAgICAgICAgICAnd2hvbGUtb3JhbmdlJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94JyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwbGFzdGljLWN1cCcsXG4gICAgICAgICAgICAnbmFwa2luJyxcbiAgICAgICAgICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdjZWxlcnktc3RpY2snLFxuICAgICAgICAgICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICAgICAgICAgJ3NlYWxlZC1taWxrJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2NsZWFuLWFsdW1pbnVtLWZvaWwnLFxuICAgICAgICAgICAgJ2VtcHR5LXJhaXNpbi1ib3gnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAgICAgICAgICdwbGFzdGljLXN0cmF3cycsXG4gICAgICAgICAgICAnc2VhbGVkLXByZXR6ZWwnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktY29va2llLWJveCcsXG4gICAgICAgICAgICAna2V0Y2h1cC1wYWNrZXQnLFxuICAgICAgICAgICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BsYXN0aWMtY3VwJyxcbiAgICAgICAgICAgICduYXBraW4nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnYWx1bWludW0tYmV2ZXJhZ2UtY2FuJyxcbiAgICAgICAgICAgICdmb29kLXNvaWxlZC1wYXBlci1wbGF0ZScsXG4gICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyJyxcbiAgICAgICAgICAgICdwYWNrYWdlZC12ZWdldGFibGVzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2NhcnJvdC1zdGlja3MnLFxuICAgICAgICAgICAgJ2VtcHR5LWNoaXAtYmFnJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXInLFxuICAgICAgICAgICAgJ2dyYWhhbS1jb29raWUtd3JhcHBlcicsXG4gICAgICAgICAgICAndW5vcGVuZWQtcGFjay1vZi1ncmFwZXMnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LW1pbGstY2FydG9uJyxcbiAgICAgICAgICAgICdoYW0tc2FuZHdpY2gnLFxuICAgICAgICAgICAgJ3BhY2thZ2Utb2YtZHJpZWQtZnJ1aXQnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1sZW1vbmFkZS1ib3gnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnYmFuYW5hLXBlZWwnLFxuICAgICAgICAgICAgJ2J1cnJpdG8td3JhcHBlcicsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXBsYXN0aWMtcGFja2FnZScsXG4gICAgICAgICAgICAnY2VsZXJ5LXN0aWNrJyxcbiAgICAgICAgICAgICdjZXJlYWwtbGlkLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3NlYWxlZC1mcnVpdC1kcmluaycsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnYnVycml0by13cmFwcGVyJyxcbiAgICAgICAgICAgICdwYWNrYWdlZC1kaW5uZXItcm9sbCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwYXBlci1wYWNrYWdpbmcnLFxuICAgICAgICAgICAgJ25hcGtpbicsXG4gICAgICAgICAgICAnZW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYycsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1hbHVtaW51bS1jYW4nLFxuICAgICAgICAgICAgJ2FwcGxlLWNvcmUnLFxuICAgICAgICAgICAgJ2FwcGxlc2F1Y2UtcG91Y2gnLFxuICAgICAgICAgICAgJ211c3RhcmQtcGFja2V0JyxcbiAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BsYXN0aWMtY3VwJyxcbiAgICAgICAgICAgICdvcmFuZ2Utc2xpY2UnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnYm94LW9mLWNvb2tpZXMnLFxuICAgICAgICAgICAgJ3Vub3BlbmVkLWVuZXJneS1iYXInLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktYm94LW9mLWNyYWNrZXJzJyxcbiAgICAgICAgICAgICdoYW0tc2FuZHdpY2gnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgICAgICAgICAncGxhc3RpYy1zcG9vbicsXG4gICAgICAgICAgICAnbWF5by1wYWNrZXQnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlJyxcbiAgICAgICAgICAgICdzb2lsZWQtcGFwZXItdHJheScsXG4gICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyJyxcbiAgICAgICAgICAgICdzZWFsZWQtYXBwbGVzYXVjZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1jb29raWUtYm94JyxcbiAgICAgICAgICAgICdqdWljZS1ib3gnLFxuICAgICAgICAgICAgJ3NlYWxlZC1wb3Bjb3JuJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAgICAgICAgICdlbXB0eS1iYWctb2YtY2hpcHMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jYXJ0b24tb2YtbWlsaycsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnbWV0YWwtZm9vZC1jYW4nLFxuICAgICAgICAgICAgJ2Zvb2Qtc29pbGVkLXBhcGVyLXBsYXRlJyxcbiAgICAgICAgICAgICdwbGFzdGljLXNwb3JrJyxcbiAgICAgICAgICAgICdib3gtb2YtY2hlZGRhci1jcmFja2VycycsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKHRyYXlEYXRhLCBkYXRhID0+IHtcbiAgICBsZXQgYmluID0gXy5pbmNsdWRlcyhkYXRhLm5hbWUsICd0cmF5JykgPyAndHJheS1zdGFja2luZycgOiAnaG9tZSc7XG4gICAgbGV0IG5hbWUgPSBnZXROYW1lKGRhdGEubmFtZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBDYXRjaGFibGUsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IG5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBiaW4sXG4gICAgICAgICAgICByZUNhdGNoYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBiaW4sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJvb3RzdHJhcD17b25Cb290c3RyYXB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhkYXRhLml0ZW1zKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICB9O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RyYXlzX2FycmF5LmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIE5vdCBhbGwgbHVuY2hlcyBhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGNyZWF0ZWQgZXF1YWxseS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgU29tZSBsdW5jaGVzIGNvbWUgZnJvbTxici8+XG4gICAgICAgICAgICAgICAgaG9tZSBhbmQgdGhlcmUgaXM8YnIvPlxuICAgICAgICAgICAgICAgIG5vIHRyYXkgc3RhY2tpbmcgbmVlZGVkIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0x1bmNoZXNDcmVhdGVkRXF1YWxseScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdGVtcyBmcm9tIGhvbWU8YnIvPlxuICAgICAgICAgICAgICAgIGNhbiBiZSB0cmlja3khPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoZXkgYXJlIHVuaXF1ZSBhbmQgeW91PGJyLz5cbiAgICAgICAgICAgICAgICBhcmUgb24geW91ciBvd24gdG8gc29ydCE8YnIvPlxuICAgICAgICAgICAgICAgIEFzayBmb3IgaGVscCBpZiB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSB1bnN1cmUgb2YgaXRlbXMuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSXRlbXNGcm9tSG9tZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGlzIGlzIGEgdG91Z2g8YnIvPlxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZSBidXQgSSBzZWU8YnIvPlxuICAgICAgICAgICAgICAgIHlvdXIgbmV3IEZsaXA8YnIvPlxuICAgICAgICAgICAgICAgIG9uIHRoZSBob3Jpem9uITxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgR28hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVG91Z2hDaGFsbGVuZ2UnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgYWJvdXQgdG8gV2luPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgaGlnaGVzdCBob25vciBmb3IgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBHcmVlbiBUZWFtIENoYWxsZW5nZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgV2luIHRoaXMgbGV2ZWwgdG8gYmVjb21lPGJyLz5cbiAgICAgICAgICAgICAgICBhIE1hc3RlciBTb3J0ZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlnaGVzdEhvbm9yJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnbm93LWEtbWVtYmVyJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91IGFyZSBub3cgYSBtZW1iZXI8YnIvPlxuICAgICAgICAgICAgICAgIG9mIHRoZSBHcmVlbiBUZWFtITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBJdCdzIHRpbWUgdG8gc2hhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGl0IHdpdGggeW91cjxici8+XG4gICAgICAgICAgICAgICAgZmFtaWx5IGFuZCBjb21tdW5pdHkhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnTWVtYmVyT2ZHcmVlblRlYW0nLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9ub3dfYV9tZW1iZXJfc2NyZWVuLmpzIiwiY2xhc3MgUXVpdFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICAgIG9rYXkoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdxdWl0Jyk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdtZW51Q2xvc2UnLCB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQXNzZXRzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hc3NldHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFzc2V0cy5tYXAoKGFzc2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uYXNzZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e2Fzc2V0LnJlZiB8fCBhc3NldC5wcm9wc1snZGF0YS1yZWYnXSB8fCAoJ2Fzc2V0LScgKyBrZXkpfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17a2V5fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzY3JlZW4gJHt0aGlzLmdldENsYXNzTmFtZXMoKX1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFzc2V0cygpfVxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkFyZSB5b3Ugc3VyZTxici8+eW91IHdhbnQgdG8gcXVpdD88L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInF1aXQteWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9rYXkuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicXVpdC1ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG4gICAgPFF1aXRTY3JlZW5cbiAgICAgICAgaWQ9XCJxdWl0XCJcbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgIF19XG4gICAgLz5cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3F1aXRfc2NyZWVuLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvakJBO0FDQ0E7QUFEQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QURDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDQ0E7QURDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FFcENBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUZFQTtBQUNBO0FBQ0E7QUFpR0E7QUFDQTtBQURBO0FBR0E7QUF2R0E7QUFDQTtBQXVKQTs7Ozs7O0FHN05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQWRBO0FBQ0E7QUpnQkE7Ozs7Ozs7Ozs7Ozs7O0FLakJBO0FMQ0E7QUFDQTtBQUFBO0FLRUE7QUxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQVpBO0FBZUE7Ozs7Ozs7Ozs7Ozs7O0FNRkE7QU5DQTtBQUNBO0FBQUE7QU1FQTtBTkNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUF6QkE7QUFzQ0E7QUFDQTtBQXhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FPWkE7QUFDQTs7Ozs7QUFDQTtBUEFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBUU5BO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7OztBQzJMQTtBVENBO0FBQ0E7QUFDQTs7O0FBaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBU0NBO0FUQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBVXhMQTtBVkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBV21DQTtBWEFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QVdFQTtBWENBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBZkE7QUFzQkE7QUFDQTtBQTdEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7O0FZbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdCQTtBYkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckNBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FjUkE7QUFDQTtBQUNBO0FkdURBO0FBQUE7QUFDQTtBQUNBO0FjQ0E7QWRIQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBZTZDQTtBZkNBO0FBQ0E7QUFBQTtBZUVBO0FmQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FlQ0E7QWZDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUFBO0FBQUE7QUFDQTtBZURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBZkZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFQQTtBQUhBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUE1Q0E7QUFtREE7QUFDQTtBQTVKQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQXhDQTtBQUNBO0FBaURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTs7Ozs7Ozs7Ozs7QWdCNUZBO0FBQ0E7QUFDQTtBaEJ3REE7QUFBQTtBQUNBO0FBQ0E7QWdCQ0E7QWhCSEE7QUFBQTs7Ozs7Ozs7Ozs7O0FpQnhDQTtBakJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5DQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBOzs7Ozs7Ozs7OztBa0JSQTtBQUNBO0FBQ0E7QWxCc0NBO0FBQUE7QUFDQTtBQUNBO0FrQkNBO0FsQkhBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FtQnRCQTtBQUNBO0FBQ0E7QW5CQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QW1CQ0E7QW5CQ0E7QUFDQTtBQUNBO0FBRkE7QUFOQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFGQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBWkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUF6Q0E7QUErQ0E7QUFDQTtBQUNBO0FBaEZBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QW9CYkE7QXBCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FxQkVBO0FyQkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FzQktBO0F0QkFBO0FBQ0E7QUFBQTtBQUNBO0FzQkdBO0F0QkNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QXNCQ0E7QXRCQ0E7QUFDQTtBc0JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0F0QkNBO0FBQ0E7QXNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0F0QkNBO0FBQ0E7QUFDQTtBc0JDQTtBdEJDQTtBc0JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0F0QkNBO0FBQ0E7QXNCQ0E7QXRCQ0E7QXNCQ0E7QUFDQTtBQUNBO0FBQ0E7QXRCWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FzQkVBO0F0QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFWQTtBQXFCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFYQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBeUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUVBO0FBRkE7QUFoQkE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBaEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVhBO0FBM0hBO0FBMElBO0FBQ0E7QUFDQTtBQTNPQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QXVCTEE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0F2QkNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVFBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBd0J0SEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QXhCQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBaE5BO0FBQ0E7QUFtTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7O0F5QmhPQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBekJBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUF0Q0E7QUFDQTtBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBMEJuREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QTFCQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFIQTtBQU1BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QTBCQUE7QUFDQTtBQUNBO0ExQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVRBO0FBY0E7Ozs7QUFyS0E7QUFDQTtBQXVLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQUNBO0FBa0JBOzs7Ozs7Ozs7Ozs7Ozs7O0EyQmxNQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBM0JBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQWhEQTtBQUNBO0FBa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTs7Ozs7Ozs7Ozs7O0E0QjdEQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFLQTtBNUJBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBNUJDQTtBQUxBOzs7Ozs7Ozs7Ozs7QTZCWEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBS0E7QTdCQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQTdCQTtBQStCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUF4QkE7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUExQkE7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFzQkE7QUF2REE7QUF5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QTZCQ0E7QTdCek9BOzs7Ozs7Ozs7Ozs7QThCL0RBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0EvQmdEQTtBQUFBO0FBQ0E7QUFDQTtBK0JDQTtBL0JIQTtBQUFBOzs7Ozs7Ozs7OztBZ0NsREE7QUFDQTtBQUNBO0FoQ21CQTtBQUVBO0FBQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBQ0E7QUFLQTtBaENBQTtBQUNBO0FBQ0E7QWdDQ0E7QWhDQ0E7QUFKQTtBQUFBOzs7Ozs7Ozs7Ozs7QWlDOUZBO0FqQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrQ0VBO0FsQ0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbUNBQTtBbkNDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvQ0VBO0FwQ0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUNBQTtBckNDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBc0NFQTtBdENDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXVDQUE7QXZDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXdDRUE7QXhDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QXlDMkNBO0FBQ0E7QUFDQTtBQUNBO0F6Q0FBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QXlDQ0E7QXpDQ0E7QUFEQTtBQUdBO0F5Q0NBO0FBQ0E7QXpDQ0E7QXlDRkE7QUFUQTtBQWNBO0FBQ0E7QUFDQTtBekNGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFUQTtBQWVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QXlDRkE7QUFyQ0E7QUEyQ0E7QUFDQTtBQUNBO0FBL0ZBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBekNRQTtBQUNBO0FBT0E7QUFDQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFEQTtBQURBOzs7Ozs7Ozs7Ozs7QTBDbkNBO0ExQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0EyQ0VBO0EzQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0Q0ZBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQU1BO0E1Q0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0E0Q0NBO0E1Q0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUF0QkE7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQTdDQTtBQTBEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1TkE7Ozs7Ozs7Ozs7OztBNkNsRUE7QTdDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QThDRUE7QTlDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErQ0FBO0EvQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdERUE7QWhEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpREFBO0FqRENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUNBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrREVBO0FsRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbURBQTtBbkRDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvREVBO0FwRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcURBQTtBckRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXNERUE7QXREQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBdURGQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QXVEQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFQQTtBQURBO0FBV0E7QUFiQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFSQTtBQURBO0FBY0E7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFNQTtBQUNBO0FBREE7QUFHQTtBQVZBO0FBREE7QUFjQTtBQUNBO0FBL0JBO0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBM0dBO0FBQ0E7QUFEQTtBQTRHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBdURDQTtBQUNBO0FBQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFSQTtBQURBO0FBWUE7QUF2SUE7QUF5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBO0FBY0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQTdGQTtBQWdHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzU0E7Ozs7Ozs7Ozs7OztBd0R2R0E7QXhEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXlERUE7QXpEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0EwREFBO0ExRENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTJERUE7QTNEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0REFBO0E1RENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTZERUE7QTdEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E4REFBO0E5RENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErREVBO0EvRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBZ0VBQTtBaEVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUE1QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpRUVBO0FqRUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QWtFaUJBO0FsRUFBO0FBQ0E7QUFBQTtBQUNBO0FrRUdBO0FsRUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBa0VDQTtBQUNBO0FsRUdBO0FrRUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbEVBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWtFQ0E7QUFDQTtBbEVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QWtFQ0E7QWxFQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrRUNBO0FsRUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUZBO0FBQUE7QUFGQTtBQUZBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUF3QkE7QUFBQTtBQUNBO0FBQUE7QWtFRUE7QWxFQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVZBO0FBcUJBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSEE7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWRBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBMUZBO0FBREE7QUF6RUE7QUFDQTtBQURBO0FBNktBO0FBQ0E7QUFDQTtBQTdNQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBbUVqQkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QW5FQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUhBO0FBSUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBOzs7Ozs7QW9FdkpBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0E3RUNBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7O0FBN0tBO0FBQ0E7QUErS0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFDQTtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBOEVwTUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0E5RUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBSEE7QUFEQTtBQU9BOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Ozs7QUFwTUE7QUFDQTtBQXNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTs7Ozs7Ozs7Ozs7Ozs7OztBK0VsTkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QS9FQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqQkE7QUFrQkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTs7OztBQTNQQTtBQUNBO0FBNlBBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBOzs7Ozs7Ozs7Ozs7QWdGMVFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QWhGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFOQTtBQVFBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBREE7QUFRQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoRUE7QUFrRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBcEhBOzs7Ozs7Ozs7Ozs7QWlGbkNBO0FqRkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrRkVBO0FsRkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbUZBQTtBbkZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFsQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvRkVBO0FwRkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUZBQTtBckZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBQ0E7QUFOQTtBQUFBO0FBVUE7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXNGRUE7QXRGQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0F1RkFBO0F2RkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXdGRUE7QXhGQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0F5RkFBO0F6RkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQU1BO0FBVkE7QUFZQTtBQUNBO0FBaEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0EwRkVBO0ExRkNBO0FBQ0E7QUFBQTtBMEZFQTtBMUZDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBUEE7QUFVQTtBQUNBO0FBaEJBOzs7Ozs7Ozs7Ozs7QTJGRUE7QTNGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTRGRUE7QTVGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTZGRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBN0ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBbEJBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFKQTtBQURBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUZBO0FBU0E7QUFsQkE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFDQTtBQURBO0FBTkE7QUFEQTtBQVlBO0FBN0xBO0FBK0xBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQWpCQTtBQW1CQTtBQTFCQTtBQUNBO0FBNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFKQTtBQURBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFKQTtBQURBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakdBO0FBbUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQXZDQTtBQW9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVZQTs7Ozs7Ozs7Ozs7O0E4RjFFQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0E5RkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBOEZDQTtBOUZDQTtBQUhBO0FBSkE7QUFKQTtBQUZBO0FBbUJBOzs7Ozs7Ozs7Ozs7QStGL2FBO0EvRkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdHRUE7QWhHQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpR0FBO0FqR0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrR0VBO0FsR0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbUdBQTtBbkdDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvR0VBO0FwR0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUdBQTtBckdDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzR0VBO0F0R0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBdUdBQTtBdkdDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBWkE7QUFjQTtBQUNBO0FBbEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QXdHREE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBeEdDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQU5BO0FBTEE7QUFrQkE7Ozs7QUFqREE7QUFDQTtBQW9EQTtBQUNBO0FBQ0E7QUFGQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==