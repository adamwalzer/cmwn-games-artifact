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
/******/ 	var hotCurrentHash = "757cbe20bb3293455632"; // eslint-disable-line no-unused-vars
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
		"skoash": "1.1.3",
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
	        )
	    );
		};

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
	        })
	    );
		};

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
	        React.createElement("div", { className: "turtle" })
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
	        React.createElement("div", { className: "truck" })
	    );
		};

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
	        return '../waste-busters-phaser/index.html?v=' + opts.level;
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

	    function Carousel() {
	        _classCallCheck(this, Carousel);

	        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

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
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'start', this).call(this);
	            this.next();
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
	            this.enabled = true;

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

	            this.updateGameState({
	                path: this.props.dataTarget,
	                data: {
	                    firing: true
	                }
	            });

	            setTimeout(function () {
	                _this2.updateGameState({
	                    path: _this2.props.dataTarget,
	                    data: {
	                        play: 'fire',
	                        fired: list[_this2.state.list.length - 1],
	                        firing: false
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
	            id: 'flip'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzdGUtYnVzdGVycy9haS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NTdjYmUyMGJiMzI5MzQ1NTYzMiIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvZGV2LXZhcmlhYmxlcy5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9qcy9tYWtlX21lZGlhX2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi93YXN0ZS1idXN0ZXJzL2NvbmZpZy5qc29uIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90aXRsZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2VhdF9hbmRfZHJpbmtfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZWFybl9hbmRfY3JlYXRlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvd2hhdF9oYXBwZW5zX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9iZXR0ZXJfd2F5c19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvY2xpY2tfY2FyZHNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9jYXJkc19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3RpbWVfdG9fY29sbGVjdF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldHNfcGxheV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3JlbWVtYmVyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvcGhhc2VyX2dhbWVfc2NyZWVuX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL25laWdoYm9yaG9vZF93YXN0ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3R5cGVzX29mX3dhc3RlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvd2FzdGVfc29ydF9jZW50ZXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvYWxwaGFiZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fubm9uLzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF90d29fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvdGFrZV9hY3Rpb25fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9mbGlwX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xuIFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0fVxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0fSBjYXRjaChlKSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdH1cblxuXG4gXHQvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iZWY0NWIwL3NyYy9zaGFyZWQvdXRpbHMvY2FuRGVmaW5lUHJvcGVydHkuanNcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuIFx0dHJ5IHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge1xuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxuIFx0XHR9KTtcbiBcdFx0Y2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuIFx0fSBjYXRjaCh4KSB7XG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjc1N2NiZTIwYmIzMjkzNDU1NjMyXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgKGZ1bmN0aW9uKG5hbWUpIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBlbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobnVsbCwgZm4pO1xuIFx0XHRcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR9XG5cbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0dmFsdWU6IGVuc3VyZVxuIFx0XHRcdH0pO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGZuLmUgPSBlbnN1cmU7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm51bWJlclwiKVxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RDYWxsYmFjaztcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSwgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGZhbHNlO1xuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRob3REb3dubG9hZE1hbmlmZXN0KGZ1bmN0aW9uKGVyciwgdXBkYXRlKSB7XG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0XHRpZighdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XG4gXHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0fVxuXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwW3VwZGF0ZS5jW2ldXSA9IHRydWU7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XG4gXHRcdGlmKCFjYWxsYmFjaykgcmV0dXJuO1xuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuIFx0XHRcdG9wdGlvbnMgPSB7fTtcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZSkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XG4gXHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0dmFyIHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXN1bHQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHRbMF0pO1xuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgY2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzU3Y2JlMjBiYjMyOTM0NTU2MzIiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIiwiKGZ1bmN0aW9uIChnYW1lTmFtZSkge1xuICAgIC8vIHJlbW92ZSB3aW5kb3cuTUVESUEgb25jZSBubyBnYW1lcyByZWZlcmVuY2UgaXRcbiAgICB2YXIgTUVESUEgPSB3aW5kb3cuTUVESUEgPSB7XG4gICAgICAgIEJBU0U6IEVOVklST05NRU5ULk1FRElBXG4gICAgfTtcblxuICAgIGNvbnN0IEdBTUUgPSAnZ2FtZXMvJztcbiAgICBjb25zdCBFRkZFQ1QgPSAnc291bmQtYXNzZXRzL2VmZmVjdHMvJztcbiAgICBjb25zdCBWTyA9ICdzb3VuZC1hc3NldHMvdm9zLyc7XG4gICAgY29uc3QgSU1BR0UgPSAnaW1hZ2UtYXNzZXRzLyc7XG4gICAgY29uc3QgU1BSSVRFID0gJ3Nwcml0ZXMtYW5pbWF0aW9ucy8nO1xuICAgIGNvbnN0IEZSQU1FID0gJ2ZyYW1lcy8nO1xuICAgIGNvbnN0IEZPTlQgPSAnZm9udHMvJztcbiAgICBjb25zdCBTSEFSRUQgPSAnc2hhcmVkLyc7XG4gICAgY29uc3QgTU9DS19HQU1FID0gJ21vY2stZ2FtZS8nO1xuXG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkJBU0UgKyBGT05UO1xuICAgIE1FRElBLlNIQVJFRCA9IE1FRElBLkJBU0UgKyBHQU1FICsgU0hBUkVEO1xuXG4gICAgTUVESUEuR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgZ2FtZU5hbWUgKyAnLyc7XG4gICAgTUVESUEuRUZGRUNUID0gTUVESUEuR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5WTyA9IE1FRElBLkdBTUUgKyBWTztcbiAgICBNRURJQS5JTUFHRSA9IE1FRElBLkdBTUUgKyBJTUFHRTtcbiAgICBNRURJQS5TUFJJVEUgPSBNRURJQS5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLkZSQU1FID0gTUVESUEuR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLkZPTlQgPSBNRURJQS5HQU1FICsgRk9OVDtcblxuICAgIE1FRElBLk1PQ0sgPSB7fTtcbiAgICBNRURJQS5NT0NLLkdBTUUgPSBNRURJQS5CQVNFICsgR0FNRSArIE1PQ0tfR0FNRTtcbiAgICBNRURJQS5NT0NLLkVGRkVDVCA9IE1FRElBLk1PQ0suR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5NT0NLLlZPID0gTUVESUEuTU9DSy5HQU1FICsgVk87XG4gICAgTUVESUEuTU9DSy5JTUFHRSA9IE1FRElBLk1PQ0suR0FNRSArIElNQUdFO1xuICAgIE1FRElBLk1PQ0suU1BSSVRFID0gTUVESUEuTU9DSy5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLk1PQ0suRlJBTUUgPSBNRURJQS5NT0NLLkdBTUUgKyBGUkFNRTtcbiAgICBNRURJQS5NT0NLLkZPTlQgPSBNRURJQS5NT0NLLkdBTUUgKyBGT05UO1xuXG4gICAgd2luZG93LkNNV04uTUVESUEgPSBNRURJQTtcbn0od2luZG93LkNNV04uZ2FtZUZvbGRlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5pbXBvcnQgTG9hZGVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEnO1xuXG5pbXBvcnQgaU9TU2NyZWVuIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2lvc19zcGxhc2hfc2NyZWVuLzAuMSc7XG5pbXBvcnQgVGl0bGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3RpdGxlX3NjcmVlbic7XG5pbXBvcnQgRWF0QW5kRHJpbmtTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2VhdF9hbmRfZHJpbmtfc2NyZWVuJztcbmltcG9ydCBMZWFybkFuZENyZWF0ZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5fYW5kX2NyZWF0ZV9zY3JlZW4nO1xuaW1wb3J0IFdoYXRIYXBwZW5zU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy93aGF0X2hhcHBlbnNfc2NyZWVuJztcbmltcG9ydCBWaWRlb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuJztcbmltcG9ydCBCZXR0ZXJXYXlzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9iZXR0ZXJfd2F5c19zY3JlZW4nO1xuaW1wb3J0IENsaWNrQ2FyZHNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2NsaWNrX2NhcmRzX3NjcmVlbic7XG5pbXBvcnQgQ2FyZHNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2NhcmRzX3NjcmVlbic7XG5pbXBvcnQgVGltZVRvQ29sbGVjdFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdGltZV90b19jb2xsZWN0X3NjcmVlbic7XG5pbXBvcnQgTGV0c1BsYXlTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldHNfcGxheV9zY3JlZW4nO1xuaW1wb3J0IFJlbWVtYmVyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZW1lbWJlcl9zY3JlZW4nO1xuaW1wb3J0IExldmVsT25lU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBMZXZlbFR3b1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgTGV2ZWxUaHJlZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBMZXZlbEZvdXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBMZXZlbEZpdmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX2ZpdmVfc2NyZWVuJztcbi8vIGltcG9ydCBCb251c1JvdW5kU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9ib251c19yb3VuZF9zY3JlZW4nO1xuaW1wb3J0IE5laWdoYm9yaG9vZFdhc3RlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9uZWlnaGJvcmhvb2Rfd2FzdGVfc2NyZWVuJztcbmltcG9ydCBUeXBlc09mV2FzdGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3R5cGVzX29mX3dhc3RlX3NjcmVlbic7XG5pbXBvcnQgV2FzdGVTb3J0Q2VudGVyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy93YXN0ZV9zb3J0X2NlbnRlcl9zY3JlZW4nO1xuaW1wb3J0IFNvcnRpbmdMZXZlbE9uZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBTb3J0aW5nTGV2ZWxUd29TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3NvcnRpbmdfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgU29ydGluZ0xldmVsVGhyZWVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3NvcnRpbmdfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBUYWtlQWN0aW9uU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90YWtlX2FjdGlvbl9zY3JlZW4nO1xuaW1wb3J0IEZsaXBTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZsaXBfc2NyZWVuJztcblxuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xJztcblxuc2tvYXNoLnN0YXJ0KFxuICAgIDxza29hc2guR2FtZVxuICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgbG9hZGVyPXs8TG9hZGVyIC8+fVxuICAgICAgICBzY3JlZW5zPXtbXG4gICAgICAgICAgICBpT1NTY3JlZW4sXG4gICAgICAgICAgICBUaXRsZVNjcmVlbixcbiAgICAgICAgICAgIEVhdEFuZERyaW5rU2NyZWVuLFxuICAgICAgICAgICAgTGVhcm5BbmRDcmVhdGVTY3JlZW4sXG4gICAgICAgICAgICBXaGF0SGFwcGVuc1NjcmVlbixcbiAgICAgICAgICAgIFZpZGVvU2NyZWVuLFxuICAgICAgICAgICAgQmV0dGVyV2F5c1NjcmVlbixcbiAgICAgICAgICAgIENsaWNrQ2FyZHNTY3JlZW4sXG4gICAgICAgICAgICBDYXJkc1NjcmVlbixcbiAgICAgICAgICAgIFRpbWVUb0NvbGxlY3RTY3JlZW4sXG4gICAgICAgICAgICBMZXRzUGxheVNjcmVlbixcbiAgICAgICAgICAgIFJlbWVtYmVyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxPbmVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFR3b1NjcmVlbixcbiAgICAgICAgICAgIExldmVsVGhyZWVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbEZvdXJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbEZpdmVTY3JlZW4sXG4gICAgICAgICAgICAvLyBCb251c1JvdW5kU2NyZWVuLFxuICAgICAgICAgICAgTmVpZ2hib3Job29kV2FzdGVTY3JlZW4sXG4gICAgICAgICAgICBUeXBlc09mV2FzdGVTY3JlZW4sXG4gICAgICAgICAgICBXYXN0ZVNvcnRDZW50ZXJTY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxPbmVTY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxUd29TY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxUaHJlZVNjcmVlbixcbiAgICAgICAgICAgIFRha2VBY3Rpb25TY3JlZW4sXG4gICAgICAgICAgICBGbGlwU2NyZWVuLFxuICAgICAgICBdfVxuICAgICAgICBtZW51cz17e1xuICAgICAgICAgICAgcXVpdDogUXVpdFNjcmVlbixcbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkZvbnQgbmFtZT1cIlNvdXJjZSBTYW5zIFByb1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ2dhbWUxLnRpbWVsZXZlbHNjb3JlLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ2dhbWUxLm1ldGVyaWNvbnMucG5nJ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5TUFJJVEUgKyAnZnJhbWVzLmludHJvLTAxLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ25hdi5wbmcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLlNQUklURSArICdCS0cuMS5qcGcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLklNQUdFICsgJ0JLRy4xLmpwZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuSU1BR0UgKyAnQktHLjIuanBnJ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5JTUFHRSArICdCS0cuMy5qcGcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnT3BlbmluZ1NlcXVlbmNlLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0NhcmRTZWN0aW9uLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0JLRy5tcDMnfVxuICAgICAgICAgICAgICAgIGxvb3BcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJiYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLkVGRkVDVCArICdCb251c1JvdW5kQktHLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0JLR1dhc3RlU29ydGluZ0dhbWUubXAzJ31cbiAgICAgICAgICAgICAgICBsb29wXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnTmV4dExldmVsLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0ZsaXBTY3JlZW4ubXAzJ31cbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgIHJlZj1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnQWxsQ2xpY2subXAzJ31cbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgIHJlZj1cInNjcmVlbi1jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnTmV4dEFwcGVhci5tcDMnfVxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdGl0bGVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBldmVyeWRheVwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGNhcmRzXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnLTFcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2ctMlwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZy0zXCIgLz4sXG4gICAgICAgIF19XG4gICAgICAgIGdldEJhY2tncm91bmRJbmRleD17KGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2lvcy1zcGxhc2gnOiByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2VhdC1hbmQtZHJpbmsnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlYXJuLWFuZC1jcmVhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3doYXQtaGFwcGVucyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYmV0dGVyLXdheXMnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGljay1jYXJkcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY2FyZHMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUtdG8tY29sbGVjdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbGV0cy1wbGF5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1lbWJlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BoYXNlci1sZXZlbC0xJzpcbiAgICAgICAgICAgICAgICBjYXNlICdwaGFzZXItbGV2ZWwtMic6XG4gICAgICAgICAgICAgICAgY2FzZSAncGhhc2VyLWxldmVsLTMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3BoYXNlci1sZXZlbC00JzpcbiAgICAgICAgICAgICAgICBjYXNlICdwaGFzZXItbGV2ZWwtNSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvbnVzLXJvdW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmVpZ2hib3Job29kLXdhc3RlJzpcbiAgICAgICAgICAgICAgICBjYXNlICd0eXBlcy1vZi13YXN0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NvcnRpbmctbGV2ZWwtMSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc29ydGluZy1sZXZlbC0yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzb3J0aW5nLWxldmVsLTMnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgICAgICBjYXNlICd0YWtlLWFjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZsaXAnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgcmVuZGVyTWVudT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiByZWY9XCJwYXVzZVwiIGNsYXNzTmFtZT1cInBhdXNlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNsb3NlXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0b3Iub3Blbk1lbnUuYmluZCh0aGlzLCB7aWQ6ICdxdWl0J30pfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAvPlxuKTtcblxuaWYgKG1vZHVsZS5ob3QpIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiaWRcIjogXCJ3YXN0ZS1idXN0ZXJzXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS4zXCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCI8bGluayBocmVmPSdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9TWNMYXJlbicgcmVsPSdzdHlsZXNoZWV0Jz5cIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3dhc3RlLWJ1c3RlcnMvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU0hBUkVEfWlvcy1zdGFydC1iYWxsLWFuaW0uZ2lmYH0gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdQTFRsb2dvLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibG9nb1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICd0aXRsZS5wbmcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpdGxlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiZWF0LWFuZC1kcmlua1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnRXZlcnlEYXkubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZS0xXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMVwiIC8+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEV2ZXJ5IGRheSwgd2U8YnIvPlxuICAgICAgICAgICAgICAgICAgICBlYXQgYW5kIGRyaW5rLi4uXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9lYXRfYW5kX2RyaW5rX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibGVhcm4tYW5kLWNyZWF0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnQW5kRXZlcnkubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZS0xXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMlwiIC8+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEFuZCBldmVyeWRheSwgd2U8YnIvPlxuICAgICAgICAgICAgICAgICAgICB1c2UgdGhpbmdzIHRvIGhlbHA8YnIvPlxuICAgICAgICAgICAgICAgICAgICB1cyBsZWFybiBhbmQgY3JlYXRlLi4uXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZWFybl9hbmRfY3JlYXRlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwid2hhdC1oYXBwZW5zXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdCdXRXaGF0Lm1wMyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMVwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJpbnRyby1pbWFnZS0yXCIgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZyYW1lLTJcIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQnV0IHdoYXQgaGFwcGVucyB0byB0aGUgaXRlbXM8YnIvPlxuICAgICAgICAgICAgICAgICAgICB3ZSBkb24ndCBuZWVkIGFueW1vcmU/XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgV2hlcmUgZG8gdGhleSBhbGwgZ28/XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvd2hhdF9oYXBwZW5zX3NjcmVlbi5qcyIsImNvbnN0IFNSQyA9ICdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9jaGFuZ2VteXdvcmxkbm93L3ZpZGVvL3VwbG9hZC8nICtcbiAgICAndjE0ODY1NjczOTcvV2FzdGVCdXN0ZXJzX0ZpbmFsX0Zvcl9VcGxvYWRfZXJ2dHZuLm1wNCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidmlkZW9cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1mcmFtZS5pbnRyby52aWRlby5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5WaWRlbyBzcmM9e1NSQ30gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiYmV0dGVyLXdheXNcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0FyZVRoZXJlLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuRUZGRUNUICsgJ1llc1Nob3V0Lm1wMyd9XG4gICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJ5ZXNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZnJhbWUtMVwiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImludHJvLWltYWdlLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBBcmUgdGhlcmUgYmV0dGVyIHdheXM8YnIvPlxuICAgICAgICAgICAgICAgICAgICBZT1UgY2FuIGtlZXAgd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICBvdXQgb2YgYSBsYW5kZmlsbD9cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd5ZXMgYW5pbWF0ZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5jZTogXy5nZXQocHJvcHMsICdkYXRhLnllcy5wbGF5aW5nJylcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAneWVzLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9iZXR0ZXJfd2F5c19zY3JlZW4uanMiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJjbGljay1jYXJkc1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnQ2xpY2tUaGVDYXJkcy5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmcmFtZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2ZyYW1lLnNxdWFyZS5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWN5Y2xlXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAncmVjeWNsZS50cmFuc3BhcmVuY3kucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJhc2hcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdjYXJkcy50cmFzaC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnZ2FtZTEuNC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHVydGxlXCIgLz5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIENsaWNrIHRoZSBjYXJkczxici8+XG4gICAgICAgICAgICAgICAgdG8gZmluZCBvdXQgaG93PGJyLz5cbiAgICAgICAgICAgICAgICBZT1UgY2FuIGJlIGE8YnIvPlxuICAgICAgICAgICAgICAgIFdhc3RlIEJ1c3RlciFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvY2xpY2tfY2FyZHNfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJjYXJkc1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnY2FyZHMuMS5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnY2FyZHMuMi5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnY2FyZHMuMy5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnY2FyZHMuNC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdjYXJkLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2NhcmRzLnRyYXNoLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS50YXJnZXQucHJvcHMubWVzc2FnZScpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlZj1cInJlZHVjZVwiXG4gICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnUmVkdWNlU3Ryb25nLm1wMyd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPVwicmV1c2VcIlxuICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ1JldXNlU3Ryb25nLm1wMyd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPVwicmVjeWNsZVwiXG4gICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnUmVjeWNsZVN0cm9uZy5tcDMnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5TZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgZGF0YVRhcmdldD1cInNlbGVjdGFibGVcIlxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzPVwiSElHSExJR0hURURcIlxuICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgdHlwZT1cImxpXCIgY29ycmVjdD17dHJ1ZX0gbWVzc2FnZT1cInJlZHVjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGJcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJyZXVzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGJcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJyZWN5Y2xlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYlwiPjxkaXYvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGFcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvY2FyZHNfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ0aW1lLXRvLWNvbGxlY3RcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0l0c1RpbWVUb0NvbGxlY3QubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2dhbWUxLmludHJvLnRyZWVzLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZSBzcXVhcmVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICAgICAgSXQncyBUaW1lIFRvIENvbGxlY3QhXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmF2aWdhdGUgdGhlIG5laWdoYm9yaG9vZDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmQgY29sbGVjdCBhbGwgb2YgdGhlIHdhc3RlIGJhZ3MuPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIExvb2sgZm9yIFdhc3RlIFRydWNrczxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICB0byBkdW1wIHlvdXIgYmFza2V0LlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1Y2tcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYXNoXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTFcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTJcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0dXJ0bGVcIiAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90aW1lX3RvX2NvbGxlY3Rfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJsZXRzLXBsYXlcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0xldHNfUGxheS5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnZ2FtZTEuaW50cm8udHJlZXMucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHNxdWFyZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgICAgICAgICBMZXQncyBQbGF5IGEgR2FtZSFcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICBXYXRjaCBPdXQhPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIElmIHlvdSBtaXNzIGEgd2FzdGUgYmFnIGl0IGFmZmVjdHM8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGhlYWx0aCBvZiB0aGUgZW52aXJvbm1lbnQhPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBIZXJlIGlzIGEgaGludCEgQmUgc3VyZSB0byB1bmxvYWQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgeW91ciBiYXNrZXQgdG8gYWNjZXNzPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbiB3YXN0ZSBiYWdzITxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBMZXQncyBjbGVhbiB1cCFcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtMVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtMlwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydWNrXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV0c19wbGF5X3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwicmVtZW1iZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ1JlbWVtYmVyLm1wMyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdnYW1lMS5pbnRyby50cmVlcy5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWUgc3F1YXJlXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiYW5uZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnYmFubmVyLnBuZyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbWVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ3JlbWVtYmVyLjEucG5nJ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFsd2F5cyBjaGVjayB3aXRoPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuIGFkdWx0IGJlZm9yZSBwaWNraW5nPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdHRlciB1cCBvdXRzaWRlIVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlZS0xXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlZS0yXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3c3BhcGVyXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvcmVtZW1iZXJfc2NyZWVuLmpzIiwiaW1wb3J0IFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQgZnJvbSAnLi9waGFzZXJfZ2FtZV9zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgaW50cm9WTzogJ1Jlc3BvbnNpYmx5JyxcbiAgICAgICAgZmFjdDFWTzogJ3NwaWxscycsXG4gICAgICAgIGZhY3QyVk86ICdVdGVuc2lscycsXG4gICAgICAgIGZhY3QzVk86ICdTZXBhcmF0ZScsXG4gICAgICAgIGludHJvQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgT24gdGhpcyBsZXZlbCwgYmUgc3VyZSB0bzxici8+XG4gICAgICAgICAgICAgICAgY29sbGVjdCBhbGwgdGhlIDxzcGFuIGNsYXNzTmFtZT1cInRydWNrXCIgLz4gdG88YnIvPlxuICAgICAgICAgICAgICAgIHJldmVhbCB0aXBzIG9uIGhvdzxici8+XG4gICAgICAgICAgICAgICAgdG8gcmVzcG9uc2libHk8YnIvPlxuICAgICAgICAgICAgICAgIGRlYWwgd2l0aCB3YXN0ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGVDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UgY2FuIG5vdyB1c2UgdGhlIHRpcHMgeW91J3ZlPGJyLz5cbiAgICAgICAgICAgICAgICBsZWFybmVkIHRvIGhlbHAgcmVkdWNlPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgYW1vdW50IG9mIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBjcmVhdGVkIGluIHRoZSB3b3JsZCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDFDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgVXNlIExlc3MgUGFwZXJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBUZWFyIG9mZiBvbmUgcGFwZXI8YnIvPlxuICAgICAgICAgICAgICAgIHRvd2VsIHNoZWV0IGF0IGEgdGltZTxici8+XG4gICAgICAgICAgICAgICAgdG8gd2lwZSB1cCBzcGlsbHMuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QyQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFVzZSBNZXRhbCBVdGVuc2lsc1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IFJldXNhYmxlIG1ldGFsIHNwb29ucyw8YnIvPlxuICAgICAgICAgICAgICAgIGtuaXZlcyBhbmQgZm9ya3MgYXJlPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgd2F5IHRvIGdvIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0M0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBTb3J0IFJlY3ljbGFibGVzIGZyb20gV2FzdGVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBDcmVhdGUgb3IgYnV5IHNwZWNpYWwgYmluczxici8+XG4gICAgICAgICAgICAgICAgdG8gc2VwYXJhdGUgdGhlIG1ldGFsLDxici8+XG4gICAgICAgICAgICAgICAgZ2xhc3MsIHBhcGVyIGFuZCBwbGFzdGljPGJyLz5cbiAgICAgICAgICAgICAgICBmcm9tIHlvdXIgd2FzdGUuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICB2YXIgc3RhcnRTY3JlZW47XG4gICAgdmFyIG9uU2NyZWVuU3RhcnQ7XG4gICAgdmFyIG9uU2NyZWVuU3RvcDtcbiAgICB2YXIgZ2V0R2FtZVNyYztcbiAgICB2YXIgb25PcGVuUmV2ZWFsO1xuICAgIHZhciBvbkNsb3NlUmV2ZWFsO1xuICAgIHZhciBvblJlc3BvbmQ7XG4gICAgdmFyIG9uVGltZXJDb21wbGV0ZTtcblxuICAgIHN0YXJ0U2NyZWVuID0gZnVuY3Rpb24gKHNjcmVlblN0YXJ0ID0gdHJ1ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNjcmVlblN0YXJ0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25TY3JlZW5TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdhbWVEYXRhID0gXy5nZXQocHJvcHMsICdnYW1lU3RhdGUuZGF0YS5nYW1lJyk7XG5cbiAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzKTtcblxuICAgICAgICBpZiAoXy5nZXQoZ2FtZURhdGEsIGBsZXZlbHMuJHtvcHRzLmxldmVsfS5jb21wbGV0ZWAsIGZhbHNlKSkge1xuICAgICAgICAgICAgXy5hc3NpZ24oZ2FtZURhdGEsIHtcbiAgICAgICAgICAgICAgICBsZXZlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgW29wdHMubGV2ZWxdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgZGF0YTogXy5kZWZhdWx0cyhnYW1lRGF0YSwge1xuICAgICAgICAgICAgICAgIGhpdHM6IDAsXG4gICAgICAgICAgICAgICAgYmFnQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgICAgICAgbGl2ZXM6IDEsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9uU2NyZWVuU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFnQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW29wdHMubGV2ZWxdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzdGFydFNjcmVlbi5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZ2V0R2FtZVNyYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zY3JlZW5TdGFydCcpKSByZXR1cm47XG4gICAgICAgIHJldHVybiBgLi4vd2FzdGUtYnVzdGVycy1waGFzZXIvaW5kZXguaHRtbD92PSR7b3B0cy5sZXZlbH1gO1xuICAgIH07XG5cbiAgICBvbk9wZW5SZXZlYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdkLXBhZCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBwYXVzZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfTtcblxuICAgIG9uQ2xvc2VSZXZlYWwgPSBmdW5jdGlvbiAocHJldk1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6ICdkLXBhZCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcGF1c2U6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiBbJ2dhbWUnXSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBsZXZlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgW29wdHMubGV2ZWxdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwcmV2TWVzc2FnZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgc2tvYXNoLlNjcmVlbi5wcm90b3R5cGUuZ290byhwYXJzZUludChrZXksIDEwKSArIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG9uUmVzcG9uZCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciB0cnVja3MgPSBfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0udHJ1Y2tzYCk7XG4gICAgICAgIHZhciBjb21wbGV0ZSA9IF8uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5jb21wbGV0ZWApO1xuXG4gICAgICAgIGlmIChfLmdldChvcHRpb25zLCAndXBkYXRlR2FtZVN0YXRlLmRhdGEuZ2FtZS5saXZlcycpID09PSAwKSB7XG4gICAgICAgICAgICBzdGFydFNjcmVlbi5jYWxsKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFnQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxpdmVzOiAxLFxuICAgICAgICAgICAgICAgICAgICBsZXZlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uZ2V0KG9wdGlvbnMsIGB1cGRhdGVHYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LnN0YXJ0YCkgJiZcbiAgICAgICAgICAgIF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdkLXBhZCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBwYXVzZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wbGV0ZSAmJiBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLndhc09wZW5lZCcpICE9PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBvcGVuOiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICAgICB3YXNPcGVuZWQ6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbXBsZXRlICYmIHRydWNrcyAmJiBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLndhc09wZW5lZCcpICE9PSAnZmFjdC0nICsgdHJ1Y2tzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBvcGVuOiAnZmFjdC0nICsgdHJ1Y2tzLFxuICAgICAgICAgICAgICAgICAgICB3YXNPcGVuZWQ6ICdmYWN0LScgKyB0cnVja3MsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb25UaW1lckNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LmNvbXBsZXRlYCwgZmFsc2UpKSByZXR1cm47XG5cbiAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFnQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxpdmVzOiBfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5kYXRhLmdhbWUubGl2ZXMnLCAxKSAtIDEgfHwgMSxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbb3B0cy5sZXZlbF06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLmNhbGwodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPXtgcGhhc2VyLWxldmVsLSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgb25TdGFydD17b25TY3JlZW5TdGFydH1cbiAgICAgICAgICAgIG9uU3RvcD17b25TY3JlZW5TdG9wfVxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkdhbWVFbWJlZGRlclxuICAgICAgICAgICAgICAgIHNyYz17Z2V0R2FtZVNyYygpfVxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI9e18uZ2V0KHByb3BzLCAnZGF0YS5kLXBhZCcpfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0uY29tcGxldGVgLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgZGF0YT17Xy5nZXQocHJvcHMsICdnYW1lU3RhdGUuZGF0YS5nYW1lJywge30pfVxuICAgICAgICAgICAgICAgIG9uUmVzcG9uZD17b25SZXNwb25kfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guVGltZXJcbiAgICAgICAgICAgICAgICBjb3VudERvd25cbiAgICAgICAgICAgICAgICB0aW1lb3V0PXsxMjAwMDB9XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZT17b25UaW1lckNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIHBhdXNlPXtcbiAgICAgICAgICAgICAgICAgICAgXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LnN0YXJ0YCwgZmFsc2UpICYmXG4gICAgICAgICAgICAgICAgICAgIF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bWU9eyFfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgc3RvcD17Xy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LmNvbXBsZXRlYCwgZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0uY29tcGxldGVgLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17Xy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LnN0YXJ0YCwgZmFsc2UpfVxuICAgICAgICAgICAgICAgIHJlc3RhcnQ9e18uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5zdGFydGAsIGZhbHNlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvdHRvbVwiXG4gICAgICAgICAgICAgICAgY29tcGxldGU9e18uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5jb21wbGV0ZWAsIGZhbHNlKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpZmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17NCAtIF8uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLmRhdGEuZ2FtZS5oaXRzJywgMCkgfHwgMH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiYWdzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e18uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLmRhdGEuZ2FtZS5iYWdDb3VudCcsIDApfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1pZGRsZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZXZlbC1zY29yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5kYXRhLmdhbWUuc2NvcmUnLCAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdsZXZlbCcsIGBsZXZlbC0ke29wdHMubGV2ZWx9YCl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpdmVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e18uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLmRhdGEuZ2FtZS5saXZlcycsIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRydWNrc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0udHJ1Y2tzYCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5EUGFkIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICBvcGVuT25TdGFydD1cImludHJvXCJcbiAgICAgICAgICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICBvcGVuUmV2ZWFsPXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xvc2VSZXZlYWw9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17b25DbG9zZVJldmVhbH1cbiAgICAgICAgICAgICAgICBvbk9wZW49e29uT3BlblJldmVhbH1cbiAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJpbnRyb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnRybyBmcmFtZSBzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuaW50cm9Db250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJmYWN0LTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmFjdC0xIGZyYW1lIHNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRzLmZhY3QxQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiZmFjdC0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZhY3QtMiBmcmFtZSBzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5mYWN0MkNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImZhY3QtM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmYWN0LTMgZnJhbWUgc3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuZmFjdDNDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb21wbGV0ZSBmcmFtZSBzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuY29tcGxldGVDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXBsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVwbGF5IGZyYW1lIHNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGhhdmUgbm90IHdvbiB0aGlzIGxldmVsLDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dCBkb24ndCB3b3JyeeKAlDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBoYXZlIGFub3RoZXIgY2hhbmNlIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJpbnRyb1wiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT30ke29wdHMuaW50cm9WT30ubXAzYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlZPfUxldmVsXyR7b3B0cy5sZXZlbH0ubXAzYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImZhY3QtMVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT30ke29wdHMuZmFjdDFWT30ubXAzYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImZhY3QtMlwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT30ke29wdHMuZmFjdDJWT30ubXAzYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImZhY3QtM1wiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT30ke29wdHMuZmFjdDNWT30ubXAzYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInJlcGxheVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT31Bbm90aGVyX0NoYW5jZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYUNvbGxlY3Rpb24+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBpbnRyb1ZPOiAnbGFuZGZpbGwnLFxuICAgICAgICBmYWN0MVZPOiAnUG9ydGlvbnMnLFxuICAgICAgICBmYWN0MlZPOiAnUmV1c2FibGVfQmFncycsXG4gICAgICAgIGZhY3QzVk86ICdSdWxlcycsXG4gICAgICAgIGludHJvQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSW4gdGhpcyBsZXZlbCw8YnIvPlxuICAgICAgICAgICAgICAgIHlvdSdsbCBkaXNjb3ZlciB3YXlzPGJyLz5cbiAgICAgICAgICAgICAgICB0byBrZWVwIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBvdXQgb2YgdGhlIGxhbmRmaWxsIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBjb21wbGV0ZUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEV4Y2VsbGVudCBXb3JrITxici8+XG4gICAgICAgICAgICAgICAgUmV1c2luZyBjZXJ0YWluIGl0ZW1zIGlzIG9uZSBvZjxici8+XG4gICAgICAgICAgICAgICAgdGhlIGJlc3Qgd2F5cyB0byByZWR1Y2U8YnIvPlxuICAgICAgICAgICAgICAgIHdhc3Rl4oCUYW5kIGl0IHNhdmVzPGJyLz5cbiAgICAgICAgICAgICAgICB5b3UgbW9uZXkgdG9vIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBDaG9vc2UgU21hbGxlciBGb29kIFBvcnRpb25zXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogU29tZXRpbWVzIG91ciBleWVzIGNhbjxici8+XG4gICAgICAgICAgICAgICAgYmUgYmlnZ2VyIHRoYW4gb3VyIHN0b21hY2hzITxici8+XG4gICAgICAgICAgICAgICAgT25seSB0YWtlIGFzIG11Y2ggZm9vZDxici8+XG4gICAgICAgICAgICAgICAgYXMgeW91IGNhbiBlYXQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QyQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIENhcnJ5IFJldXNhYmxlIEJhZ3NcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBLZWVwIGEgY2FudmFzIGJhZyB3aXRoPGJyLz5cbiAgICAgICAgICAgICAgICB5b3Ugd2hlcmV2ZXIgeW91IGdvLDxici8+XG4gICAgICAgICAgICAgICAgc28gaWYgeW91IHNob3AgeW91IGNhbjxici8+XG4gICAgICAgICAgICAgICAgYXZvaWQgdXNpbmcgcGxhc3RpYyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDNDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgRGlzY292ZXIgUmVjeWNsaW5nIFJ1bGVzXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogRWFjaCBjaXR5IGhhcyB0aGVpciBvd248YnIvPlxuICAgICAgICAgICAgICAgIHJlY3ljbGluZyBydWxlcy4gRGlzY292ZXIgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBydWxlcyBmb3Igd2hlcmUgeW91IGxpdmUhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vcGhhc2VyX2dhbWVfc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIGludHJvVk86ICdmaW5kX291dF9ob3cnLFxuICAgICAgICBmYWN0MVZPOiAnTGVzc19QYWNrYWdpbmcnLFxuICAgICAgICAvLyB0aGlzIFZPIG5lZWRzIHRvIGJlIHJlcGxhY2VkXG4gICAgICAgIGZhY3QyVk86ICdSZXVzYWJsZV9CYWdzJyxcbiAgICAgICAgZmFjdDNWTzogJ0ZyaWVuZHMnLFxuICAgICAgICBpbnRyb0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExlYXJuaW5nIHdheXMgdG8gcmVkdWNlLDxici8+XG4gICAgICAgICAgICAgICAgcmV1c2UgYW5kIHJlY3ljbGUgaXMgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBnb2Fs4oCUY29sbGVjdCBhbGw8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSA8c3BhbiBjbGFzc05hbWU9XCJ0cnVja1wiIC8+IHRvPGJyLz5cbiAgICAgICAgICAgICAgICBmaW5kIG91dCBob3chXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGNvbXBsZXRlQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91J3JlIGEgUmVjeWNsaW5nIFdpemFyZCE8YnIvPlxuICAgICAgICAgICAgICAgIEJlaW5nIG1pbmRmdWwgb2YgaG93IHlvdTxici8+XG4gICAgICAgICAgICAgICAgaGFuZGxlIHdhc3RlIGhlbHBzPGJyLz5cbiAgICAgICAgICAgICAgICBrZWVwIHRoZSBlbnZpcm9ubWVudDxici8+XG4gICAgICAgICAgICAgICAgaW4gZ3JlYXQgc2hhcGUuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QxQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIEJ1eSBJdGVtcyB3aXRoIExlc3MgUGFja2FnaW5nXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogU29tZSBwcm9kdWN0cyBoYXZlIG1vcmU8YnIvPlxuICAgICAgICAgICAgICAgIGVjby1mcmllbmRseSBwYWNrYWdpbmcgdGhhbjxici8+XG4gICAgICAgICAgICAgICAgb3RoZXJzLiBCZSBzbWFydCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDJDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgQnV5IENsb3RoaW5nIGF0IGEgVGhyaWZ0IFNob3BcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBTYXZlIGdlbnRseSB1c2VkIGNsb3RoaW5nPGJyLz5cbiAgICAgICAgICAgICAgICBmcm9tIHRoZSBsYW5kZmlsbCBieSBidXlpbmc8YnIvPlxuICAgICAgICAgICAgICAgIGF0IHRocmlmdCBzdG9yZXMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QzQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIEVuY291cmFnZSBGcmllbmRzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgICAgIEZhbWlseSB0byBSZWN5Y2xlXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogR2l2ZSB0aG9zZSBjbG9zZXN0IHRvIHlvdTxici8+XG4gICAgICAgICAgICAgICAgZnJpZW5kbHkgcmVtaW5kZXJzIHRvPGJyLz5cbiAgICAgICAgICAgICAgICBwcm9wZXJseSByZWN5Y2xlIHRoZWlyIHdhc3RlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vcGhhc2VyX2dhbWVfc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIGludHJvVk86ICdBbmRfVGhlX1dvcmxkJyxcbiAgICAgICAgZmFjdDFWTzogJ0JvdGhTaWRlcycsXG4gICAgICAgIGZhY3QyVk86ICdDb250YWluZXInLFxuICAgICAgICBmYWN0M1ZPOiAnRWxlY3Ryb25pY3MnLFxuICAgICAgICBpbnRyb0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEJ5IGNvbGxlY3RpbmcgdGhlIDxzcGFuIGNsYXNzTmFtZT1cInRydWNrXCIgLz48YnIvPlxuICAgICAgICAgICAgICAgIGFuZCBkaXNwb3Npbmcgb2Ygd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgIHByb3Blcmx5LCB5b3UgY2FuIGhlbHA8YnIvPlxuICAgICAgICAgICAgICAgIGJvdGggeW91ciBjb21tdW5pdHk8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCB0aGUgd29ybGQhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGNvbXBsZXRlQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91J3JlIGEgUmVjeWNsaW5nIFdpemFyZCE8YnIvPlxuICAgICAgICAgICAgICAgIEJlaW5nIG1pbmRmdWwgb2YgaG93IHlvdTxici8+XG4gICAgICAgICAgICAgICAgaGFuZGxlIHdhc3RlIGhlbHBzPGJyLz5cbiAgICAgICAgICAgICAgICBrZWVwIHRoZSBlbnZpcm9ubWVudDxici8+XG4gICAgICAgICAgICAgICAgaW4gZ3JlYXQgc2hhcGUuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QxQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFVzZSBCb3RoIFNpZGVzIG9mIGE8YnIvPlxuICAgICAgICAgICAgICAgICAgICBQaWVjZSBvZiBQYXBlclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IFdoZXRoZXIgZG9pbmcgeW91ciBob21ld29yazxici8+XG4gICAgICAgICAgICAgICAgb3IgbWFraW5nIGEgc2hvcHBpbmcgbGlzdCw8YnIvPlxuICAgICAgICAgICAgICAgIHdyaXRpbmcgb24gYm90aCBzaWRlcyBvZjxici8+XG4gICAgICAgICAgICAgICAgbm90ZXBhcGVyIGlzIHRoZTxici8+XG4gICAgICAgICAgICAgICAgcmlnaHQgdGhpbmcgdG8gZG8hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QyQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFB1dCBZb3VyIEx1bmNoIGluPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgYSBSZXVzYWJsZSBDb250YWluZXJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBJbnN0ZWFkIG9mIGNhcnJ5aW5nIHlvdXI8YnIvPlxuICAgICAgICAgICAgICAgIGx1bmNoIGluIGEgcGFwZXIgb3I8YnIvPlxuICAgICAgICAgICAgICAgIHBsYXN0aWMgYmFnLCB3aHkgbm90IHVzZTxici8+XG4gICAgICAgICAgICAgICAgYSByZXVzYWJsZSBjb250YWluZXI/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QzQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFJlY3ljbGUgWW91ciBFbGVjdHJvbmljc1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IEVsZWN0cm9uaWMgd2FzdGUgY29udGFpbnM8YnIvPlxuICAgICAgICAgICAgICAgIGhhemFyZG91cyBtYXRlcmlhbHMgYW5kPGJyLz5cbiAgICAgICAgICAgICAgICB0b3hpbnMgYW5kIHNob3VsZCBhbHdheXMgYmU8YnIvPlxuICAgICAgICAgICAgICAgIHJlY3ljbGVkIGFwcHJvcHJpYXRlbHkuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBpbnRyb1ZPOiAnQWxtb3N0VGhlcmUnLFxuICAgICAgICBmYWN0MVZPOiAnQnVsaycsXG4gICAgICAgIGZhY3QyVk86ICdCb3R0bGVkX1dhdGVyJyxcbiAgICAgICAgZmFjdDNWTzogJ0JveGVzJyxcbiAgICAgICAgaW50cm9Db250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UncmUgYWxtb3N0IHRoZXJlISBLZWVwPGJyLz5cbiAgICAgICAgICAgICAgICBwaWNraW5nIHVwIHdhc3RlIGFuZCBsZWFybmluZzxici8+XG4gICAgICAgICAgICAgICAgdGlwcyBhcyB5b3UgaGVhZDxici8+XG4gICAgICAgICAgICAgICAgdG8gdGhlIGZpbmlzaCBsaW5lIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBjb21wbGV0ZUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSd2ZSB3b24gdGhlIGdhbWUhPGJyLz5cbiAgICAgICAgICAgICAgICBOb3cgdGFrZSB3aGF0IHlvdSd2ZSBsZWFybmVkLDxici8+XG4gICAgICAgICAgICAgICAgZ28gb3V0IGludG8gdGhlIHdvcmxkLDxici8+XG4gICAgICAgICAgICAgICAgYW5kIGRvIHlvdXIgcGFydCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDFDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgQnV5IEluIEJ1bGtcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBJbmRpdmlkdWFsbHktd3JhcHBlZCBpdGVtczxici8+XG4gICAgICAgICAgICAgICAgdXNlIG1vcmUgcGFja2FnaW5nIHRoYW48YnIvPlxuICAgICAgICAgICAgICAgIGEgd2hvbGUgYnVuY2ggb2YgdGhlbTxici8+XG4gICAgICAgICAgICAgICAgc29sZCBpbiBvbmUgcGFja2FnZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDJDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgQ2FycnkgV2F0ZXIgaW4gYTxici8+XG4gICAgICAgICAgICAgICAgICAgIFJldXNhYmxlIFdhdGVyIEJvdHRsZVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IEJvdHRsZWQgd2F0ZXIgdXNlcyBjb250YWluZXJzPGJyLz5cbiAgICAgICAgICAgICAgICBkZXNpZ25lZCB0byBiZSB1c2VkIG9ubHkgb25jZS48YnIvPlxuICAgICAgICAgICAgICAgIEJ1dCBzcGVjaWFsIHJldXNhYmxlIHdhdGVyPGJyLz5cbiAgICAgICAgICAgICAgICBib3R0bGVzIGNhbiBiZSBmaWxsZWQgd2l0aDxici8+XG4gICAgICAgICAgICAgICAgd2F0ZXIgZnJvbSB5b3VyIHRhcCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDNDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgUHJlcGFyZSBZb3VyIENhcmRib2FyZDxici8+XG4gICAgICAgICAgICAgICAgICAgIGZvciBSZWN5Y2xpbmdcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBCcmVhayBib3hlcyBkb3duIHRvIHNhdmU8YnIvPlxuICAgICAgICAgICAgICAgIHNwYWNlLCBhbmQgYmUgc3VyZTxici8+XG4gICAgICAgICAgICAgICAgdG8gcmVtb3ZlIGFueSBmb29kIHdhc3RlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJuZWlnaGJvcmhvb2Qtd2FzdGVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ2lkZW50aWZ5d2FzdGUubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtM1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtNFwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHVydGxlXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnbWFpbi50dXJ0bGUucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnZnJhbWUucm91bmQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIE5vdyB0aGF0IHRoZTxici8+XG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9yaG9vZCB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgICAgIGhhcyBiZWVuIHBpY2tlZCB1cCwgbGV0J3M8YnIvPlxuICAgICAgICAgICAgICAgICAgICBpZGVudGlmeSB0aGUgZGlmZmVyZW50PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgdHlwZXMgb2Ygd2FzdGUhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbmVpZ2hib3Job29kX3dhc3RlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidHlwZXMtb2Ytd2FzdGVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjEucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjIucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjMucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnY2FyZC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUudGFyZ2V0LnByb3BzLm1lc3NhZ2UnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICByZWY9XCJjb21wb3N0XCJcbiAgICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdjb21wb3N0Lm1wMyd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPVwicmVjeWNsZVwiXG4gICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnUmVjeWNsZXMubXAzJ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICByZWY9XCJsYW5kZmlsbFwiXG4gICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnTGFuZGZpbGxfRGVzYy5tcDMnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5TZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgZGF0YVRhcmdldD1cInNlbGVjdGFibGVcIlxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzPVwiSElHSExJR0hURURcIlxuICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgdHlwZT1cImxpXCIgY29ycmVjdD17dHJ1ZX0gbWVzc2FnZT1cImNvbXBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBiXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlzY2FyZGVkIG9yZ2FuaWMgbWF0dGVyPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjaCBhcyBwbGFudCBzY3JhcHMgYW5kPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWdnIHNoZWxscyBjYW4gYWxsIGJlIHR1cm5lZDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gbWluZXJhbC1yaWNoIHNvaWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJyZWN5Y2xlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1ldGFsLCBnbGFzcywgYW5kIGNlcnRhaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlcyBvZiBwYXBlciBhbmQgcGxhc3RpYzxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbiBiZSByZWN5Y2xlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGFcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgdHlwZT1cImxpXCIgY29ycmVjdD17dHJ1ZX0gbWVzc2FnZT1cImxhbmRmaWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsYXMsIG5vdCBhbGwgd2FzdGUgY2FuIGJlPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjeWNsZWQgb3IgY29tcG9zdGVkLjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvaWxlZCB0aXNzdWVzLCBwbGFzdGljPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhcGVycywgYW5kIG1vcmUgYXJlIGp1c3Q8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lIG9mIHRoZSB0aW1lcyB0aGF0PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlnaHQgZW5kIHVwIGluIHRoZSBsYW5kZmlsbCFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGFcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvdHlwZXNfb2Zfd2FzdGVfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ3YXN0ZS1zb3J0LWNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnSGVscF9NZS5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ3NvcnQudGl0bGUucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHVydGxlXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnbWFpbi50dXJ0bGUucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnZnJhbWUucm91bmQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIE5vdyB0aGF0IHdlJ3ZlIGxlYXJuZWQgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgYmVzdCB3YXlzIHRvIHNlcGFyYXRlIHdhc3RlLDxici8+XG4gICAgICAgICAgICAgICAgICAgIGxldCdzIHRlc3QgeW91ciBrbm93bGVkZ2U8YnIvPlxuICAgICAgICAgICAgICAgICAgICBieSBoZWxwaW5nIG1lIGF0IHRoZTxici8+XG4gICAgICAgICAgICAgICAgICAgIFdhc3RlIFNvcnRpbmcgQ2VudGVyLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3dhc3RlX3NvcnRfY2VudGVyX3NjcmVlbi5qcyIsImltcG9ydCBTb3J0aW5nR2FtZUNvbXBvbmVudCBmcm9tICcuL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFNvcnRpbmdHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgIHRpbWVyOiAxMjAwMDAsXG4gICAgICAgIGluc3RydWN0aW9uc1ZPOiAnTGF1bmNoX1RoZV9PYmplY3QnLFxuICAgICAgICBjb21wbGV0ZVZPOiAnV2FzdGVfU29ydGluZ19XaXphcmQnLFxuICAgICAgICBjb21wbGV0ZVNGWDogJ0xldmVsQ29tcGxldGUnLFxuICAgICAgICBpbnN0cnVjdGlvbnM6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExhdW5jaCB0aGUgb2JqZWN0IGludG8gdGhlIGNvcnJlY3QgYmluIGJlZm9yZTxici8+XG4gICAgICAgICAgICAgICAgdGhlIHRpbWVyIHJ1bnMgb3V0IHRvIGdldCB0byB0aGUgbmV4dCBsZXZlbC48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgU2hvdWxkIHRoZSB3YXN0ZSBiZSByZWN5Y2xlZCw8YnIvPlxuICAgICAgICAgICAgICAgIGNvbXBvc3RlZCwgb3IgdGFrZW4gdG8gdGhlIGxhbmRmaWxsPzxici8+XG4gICAgICAgICAgICAgICAgVGhpcyBpcyB5b3VyIGNoYW5jZSB0byBwcm92ZSB3aGF0PGJyLz5cbiAgICAgICAgICAgICAgICB5b3Uga25vdyBhbmQgZ2FpbiBwb2ludHMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGNvbXBsZXRlOiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBOb3cgdHJ5IHlvdXIgaGFuZCBhdDxici8+XG4gICAgICAgICAgICAgICAgdGhlIG5leHQgbGV2ZWwgb2Ygc29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xJztcbmltcG9ydCBDYW5ub24gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2Fubm9uLzAuMic7XG5pbXBvcnQgUmFuZG9taXplciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMSc7XG5cbnZhciBpbWFnZXMgPSBbXTtcblxuZm9yIChsZXQgaSA9IDE7IGkgPCA5OyBpKyspIHtcbiAgICBpbWFnZXMucHVzaChcbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9Z2FtZTIuJHtpfS5wbmdgfVxuICAgICAgICAvPlxuICAgICk7XG59XG5cbmltYWdlcy5wdXNoKFxuICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAga2V5PXs5fVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNsaW5nc2hvdC5wbmdgfVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPXtgc29ydGluZy1sZXZlbC0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3JldmVhbC1vcGVuLScgKyBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCAnJyl9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgbnVsbCl9XG4gICAgICAgICAgICAgICAgb25QbGF5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgc2lsZW50T25TdGFydFxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99V2FzdGVfU29ydGluZ19DZW50ZXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmluc3RydWN0aW9uc1ZPfS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmNvbXBsZXRlVk99Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdLZWVwX1NvcnRpbmcubXAzJ31cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5wbGF5JywgXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgbnVsbCkpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiY29ycmVjdFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvcnJlY3QubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW5jb3JyZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9V3JvbmdCaW5Gb3JJdGVtLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cIndhcm5pbmdcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1UZW5TZWNvbmRzV2FybmluZy5tcDNgfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJmaXJlXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2xpbmdzaG90UmVsZWFzZV9zb3J0QnV0dG9uLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9JHtvcHRzLmNvbXBsZXRlU0ZYfS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYUNvbGxlY3Rpb24+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICB7aW1hZ2VzfVxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVBbmltYXRpb25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzbGluZ3Nob3RcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9c2xpbmdzaG90LnBuZ2B9XG4gICAgICAgICAgICAgICAgYW5pbWF0ZT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuZmlyaW5nJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgIGFuaW1hdGVPblN0YXJ0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICBmcmFtZXM9ezZ9XG4gICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q2Fyb3VzZWxcbiAgICAgICAgICAgICAgICByZWY9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHNob3dOdW09ezd9XG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg9ezR9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmZpcmVkJyl9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e2Z1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvcnJlY3QgPSBfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb3JyZWN0JywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmNvcnJlY3QgPSBfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5pbmNvcnJlY3QnLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGF5O1xuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNbdGFyZ2V0LnByb3BzWydkYXRhLWtleSddXSA9ICdTRUxFQ1RFRCc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNbdGFyZ2V0LnByb3BzWydkYXRhLWtleSddXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQucHJvcHMubmFtZSA9PT0gXy5nZXQocHJvcHMsICdkYXRhLmdhbWUuZmlyZWQucHJvcHMubWVzc2FnZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ID0gJ2NvcnJlY3QnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ID0gJ2luY29ycmVjdCc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGJpbj17XG4gICAgICAgICAgICAgICAgICAgIDxSYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyYW5kb21pemVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwicmVjeWNsZVwiIG5hbWU9XCJyZWN5Y2xlXCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJsYW5kZmlsbFwiIG5hbWU9XCJsYW5kZmlsbFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvbXBvc3RcIiBuYW1lPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInJlY3ljbGVcIiBuYW1lPVwicmVjeWNsZVwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwibGFuZGZpbGxcIiBuYW1lPVwibGFuZGZpbGxcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb21wb3N0XCIgbmFtZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJyZWN5Y2xlXCIgbmFtZT1cInJlY3ljbGVcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImxhbmRmaWxsXCIgbmFtZT1cImxhbmRmaWxsXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiY29tcG9zdFwiIG5hbWU9XCJjb21wb3N0XCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q2Fubm9uXG4gICAgICAgICAgICAgICAgcmVmPVwiY2Fubm9uXCJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgcmV2ZXJzZVJlbG9hZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBsYXVuY2hCdXR0b249e3RydWV9XG4gICAgICAgICAgICAgICAgcmVsb2FkVGltZT17MjAwMH1cbiAgICAgICAgICAgICAgICBkYXRhRGVsYXk9ezEwMDB9XG4gICAgICAgICAgICAgICAgc2hvd051bT17MH1cbiAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmbG93ZXJzXCIgbWVzc2FnZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInBhcGVyXCIgbWVzc2FnZT1cInJlY3ljbGVcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cIm5ld3NwYXBlclwiIG1lc3NhZ2U9XCJyZWN5Y2xlXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJuYXBraW5cIiBtZXNzYWdlPVwibGFuZGZpbGxcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImxldHR1Y2VcIiBtZXNzYWdlPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwianVpY2VcIiBtZXNzYWdlPVwicmVjeWNsZVwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZWdnc2hlbGxcIiBtZXNzYWdlPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZGlhcGVyXCIgbWVzc2FnZT1cImxhbmRmaWxsXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJtdWdcIiBtZXNzYWdlPVwibGFuZGZpbGxcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvZmZlZVwiIG1lc3NhZ2U9XCJjb21wb3N0XCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJib3hcIiBtZXNzYWdlPVwicmVjeWNsZVwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiY2FuXCIgbWVzc2FnZT1cInJlY3ljbGVcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImJvdHRsZVwiIG1lc3NhZ2U9XCJyZWN5Y2xlXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJiYW5hbmFcIiBtZXNzYWdlPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiYXBwbGVcIiBtZXNzYWdlPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwic3RhdHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxldmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPmxldmVsPC9wPlxuICAgICAgICAgICAgICAgICAgICB7b3B0cy5sZXZlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInRpbWVyXCJcbiAgICAgICAgICAgICAgICAgICAgY291bnREb3duPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVyfVxuICAgICAgICAgICAgICAgICAgICBzdG9wPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIGxlYWRpbmdDb250ZW50PXs8cD50aW1lPC9wPn1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdyZXRyeSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29ycmVjdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9e29wdHMucG9pbnRzfVxuICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ9ezEwfVxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb3JyZWN0JywgMCl9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuaW5jb3JyZWN0JywgMCl9XG4gICAgICAgICAgICAgICAgICAgIGxlYWRpbmdDb250ZW50PXs8cD5zY29yZTwvcD59XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdjb21wbGV0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8c2tvYXNoLlJldmVhbFxuICAgICAgICAgICAgICAgIG9wZW5PblN0YXJ0PVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICBjbG9zZVRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgbnVsbCl9XG4gICAgICAgICAgICAgICAgb25PcGVuPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbG9zZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnMgZnJhbWUgcm91bmRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5pbnN0cnVjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbXBsZXRlIGZyYW1lIHJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuY29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJldHJ5IGZyYW1lIHJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtlZXAgU29ydGluZyE8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB5b3UgZG9uJ3Qgc3VjY2VlZCw8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkgYWdhaW4hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2VsZWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWQgJiYgbmV4dFByb3BzLnNlbGVjdGVkICE9PSB0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLnJlZnMuYmluLmdldCgxKVswXTtcbiAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KFxuICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWtleSc6IHNob3J0aWQuZ2VuZXJhdGUoKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGNsYXNzZXNbMF0gPSAnJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBsaXN0LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzWzBdID0gJ0xFQVZFJztcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMucGF1c2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHZhciBsaXN0O1xuICAgICAgICAvLyBza29hc2guQ29tcG9uZW50IGlzIG5vdCB0aGUgc3VwZXIgaGVyZSwgYnV0IHRoaXMgaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluID8gdGhpcy5yZWZzLmJpbi5nZXQodGhpcy5wcm9wcy5zaG93TnVtICsgMSkgOiB0aGlzLnByb3BzLmxpc3Q7XG5cbiAgICAgICAgXy5lYWNoKGxpc3QsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEta2V5Jzogc2hvcnRpZC5nZW5lcmF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2Fyb3VzZWwnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHZhciBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kID0ga2V5ID09PSAwID8gdGhpcy5uZXh0IDogbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bGkucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmR9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1rZXk9e3Nob3J0aWQoa2V5KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgb25DbGljayA9IHRoaXMucHJvcHMuY2xpY2thYmxlID8gdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXJvdXNlbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHRhcmdldEluZGV4OiAxLFxuICAgIHBhdXNlOiA1MDAsXG4gICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICBvblNlbGVjdDogXy5ub29wLFxufSwgU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgZW5jb2RlID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbnZhciBkZWNvZGUgPSByZXF1aXJlKCcuL2RlY29kZScpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNDU5NzA3NjA2NTE4O1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDY7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBzZWNvbmRzKTtcblxuICAgIHJldHVybiBzdHI7XG59XG5cblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvYWxwaGFiZXQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUJ5dGUgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xuXG5mdW5jdGlvbiBlbmNvZGUobG9va3VwLCBudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGxvb2t1cCggKCAobnVtYmVyID4+ICg0ICogbG9vcENvdW50ZXIpKSAmIDB4MGYgKSB8IHJhbmRvbUJ5dGUoKSApO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG5mdW5jdGlvbiByYW5kb21CeXRlKCkge1xuICAgIGlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpICYgMHgzMDtcbiAgICB9XG4gICAgdmFyIGRlc3QgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGRlc3QpO1xuICAgIHJldHVybiBkZXN0WzBdICYgMHgzMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vKipcbiAqIERlY29kZSB0aGUgaWQgdG8gZ2V0IHRoZSB2ZXJzaW9uIGFuZCB3b3JrZXJcbiAqIE1haW5seSBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nLlxuICogQHBhcmFtIGlkIC0gdGhlIHNob3J0aWQtZ2VuZXJhdGVkIGlkLlxuICovXG5mdW5jdGlvbiBkZWNvZGUoaWQpIHtcbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LnNodWZmbGVkKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmVyc2lvbjogY2hhcmFjdGVycy5pbmRleE9mKGlkLnN1YnN0cigwLCAxKSkgJiAweDBmLFxuICAgICAgICB3b3JrZXI6IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMSwgMSkpICYgMHgwZlxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LmNoYXJhY3RlcnMoKTtcbiAgICB2YXIgbGVuID0gaWQubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSsrKSB7XG4gICAgICAgIGlmIChjaGFyYWN0ZXJzLmluZGV4T2YoaWRbaV0pID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEFzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGVcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnNvbGUud2FybignQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guU2VsZWN0YWJsZScpO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBTZWxlY3RhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb246IHRoaXMuc2VsZWN0LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZWN0Q2xhc3M7XG4gICAgICAgIHZhciBzZWxlY3RGdW5jdGlvbjtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG5cbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICBzZWxlY3RDbGFzcyA9IHRoaXMucHJvcHMuc2VsZWN0Q2xhc3MgfHwgdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcyB8fCAnU0VMRUNURUQnO1xuICAgICAgICBzZWxlY3RGdW5jdGlvbiA9IHNlbGVjdENsYXNzID09PSAnSElHSExJR0hURUQnID8gdGhpcy5oaWdobGlnaHQgOiB0aGlzLnNlbGVjdDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW3RoaXMucHJvcHMuc2VsZWN0T25TdGFydF0gPSBzZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBzZWxlY3RGdW5jdGlvbixcbiAgICAgICAgICAgIHNlbGVjdENsYXNzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZnMuYmluKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsaXN0OiB0aGlzLnJlZnMuYmluLmdldEFsbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHZhciBkYXRhUmVmO1xuICAgICAgICB2YXIgdGFyZ2V0O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHZhciBpc0NvcnJlY3Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhUmVmID0gZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIGRhdGFSZWYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmID0gc2VsZi5yZWZzW2RhdGFSZWZdO1xuXG4gICAgICAgIGlzQ29ycmVjdCA9IChyZWYgJiYgcmVmLnByb3BzICYmIHJlZi5wcm9wcy5jb3JyZWN0KSB8fFxuICAgICAgICAgICAgKCFzZWxmLnByb3BzLmFuc3dlcnMgfHwgIXNlbGYucHJvcHMuYW5zd2Vycy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkYXRhUmVmKSAhPT0gLTEpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmFsbG93RGVzZWxlY3QgJiYgY2xhc3Nlc1tkYXRhUmVmXSkge1xuICAgICAgICAgICAgZGVsZXRlIGNsYXNzZXNbZGF0YVJlZl07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW2RhdGFSZWZdID0gc2VsZi5zdGF0ZS5zZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5wcm9wcy5zZWxlY3RSZXNwb25kLmNhbGwoc2VsZiwgZGF0YVJlZik7XG4gICAgICAgIHNlbGYucHJvcHMub25TZWxlY3QuY2FsbChzZWxmLCBkYXRhUmVmKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jaG9vc2VPbmUpIHNlbGYuY29tcGxldGUoKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogc2VsZi5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiByZWZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlTGlzdE9uQ2xpY2spIHtcbiAgICAgICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGlkKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5lYWNoKHNlbGYucmVmcywgKHIsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChrID09PSBkYXRhUmVmKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGdldENsYXNzKGtleSwgbGkpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoXG4gICAgICAgICAgICBsaS5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNba2V5XSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1yZWYnXV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEta2V5J11dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3NlbGVjdGFibGUnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLnNlbGVjdCAmJiBwcm9wcy5zZWxlY3QgIT09IHRoaXMucHJvcHMuc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmNhbGwodGhpcywgcHJvcHMuc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmJpbikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmJpbi50eXBlXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYmluLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj1cImJpblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5wcm9wcy5saXN0IHx8IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YVJlZiA9IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgICAgICAgIHZhciByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHMuaWQgfHwgZGF0YVJlZjtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbGkucHJvcHMubWVzc2FnZSB8fCAnJyArIGtleTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2RhdGFSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17dGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNlbGVjdGFibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgbGlzdDogW1xuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT5cbiAgICBdLFxuICAgIHNlbGVjdENsYXNzOiAnU0VMRUNURUQnLFxuICAgIGNvbXBsZXRlTGlzdE9uQ2xpY2s6IHRydWUsXG4gICAgc2VsZWN0UmVzcG9uZDogXy5ub29wLFxuICAgIG9uU2VsZWN0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDYW5ub24gZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2xhc3Nlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZpcmUgPSB0aGlzLmZpcmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWxvYWQgPSB0aGlzLnJlbG9hZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4gPyB0aGlzLnJlZnMuYmluLmdldCh0aGlzLnByb3BzLnNob3dOdW0gKyAxKSA6IHRoaXMucHJvcHMubGlzdDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxpc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV2ZXJzZVJlbG9hZCkge1xuICAgICAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4uZ2V0KDEpLmNvbmNhdChsaXN0KTtcbiAgICAgICAgICAgIGxpc3QucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0ID0gbGlzdC5jb25jYXQodGhpcy5yZWZzLmJpbi5nZXQoMSkpO1xuICAgICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzZXNbdGhpcy5zdGF0ZS5saXN0Lmxlbmd0aCAtIDFdID0gJ0xPQURFRCc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlKCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3QgfHwge307XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaXJlOiB0cnVlLFxuICAgICAgICAgICAgcmVsb2FkOiBmYWxzZVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5yZWxvYWRUaW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZpcmluZzogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcGxheTogJ2ZpcmUnLFxuICAgICAgICAgICAgICAgICAgICBmaXJlZDogbGlzdFt0aGlzLnN0YXRlLmxpc3QubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIGZpcmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMucHJvcHMuZGF0YURlbGF5KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRmlyZS5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaXJlOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcGxheTogbnVsbCxcbiAgICAgICAgICAgICAgICBmaXJlZDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uUmVsb2FkLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2Nhbm5vbicsIHtcbiAgICAgICAgICAgIEZJUkU6IHRoaXMuc3RhdGUuZmlyZSxcbiAgICAgICAgICAgIFJFTE9BRDogdGhpcy5zdGF0ZS5yZWxvYWRcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzcyhrZXksIGxpKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ2FtbW8nLFxuICAgICAgICAgICAgbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBbW1vKCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckxhdW5jaEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmxhdW5jaEJ1dHRvbikgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhdW5jaC1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmZpcmV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtbW8tY29udGFpbmVyXCIgLz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBbW1vKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGF1bmNoQnV0dG9uKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhbm5vbi5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHJldmVyc2VSZWxvYWQ6IGZhbHNlLFxuICAgIGxpc3Q6IFtcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+XG4gICAgXSxcbiAgICBkYXRhVGFyZ2V0OiAnZ2FtZScsXG4gICAgZGF0YURlbGF5OiAwLFxuICAgIG9uUmVsb2FkOiBfLm5vb3AsXG4gICAgb25GaXJlOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbm5vbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhbm5vbi8wLjIuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUmFuZG9taXplciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIF8uc2h1ZmZsZSh0aGlzLnByb3BzLmJpbik7XG4gICAgfVxuXG4gICAgZ2V0KGFtb3VudCA9IDEpIHtcbiAgICAgICAgdmFyIGl0ZW1zO1xuICAgICAgICB2YXIgYmluID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVtYWluICYmIHRoaXMuc3RhdGUuYmluKSB7XG4gICAgICAgICAgICBiaW4gPSB0aGlzLnN0YXRlLmJpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChiaW4ubGVuZ3RoIDwgYW1vdW50KSB7XG4gICAgICAgICAgICBiaW4gPSBiaW4uY29uY2F0KF8uc2h1ZmZsZSh0aGlzLnByb3BzLmJpbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMgPSBiaW4uc3BsaWNlKDAsIGFtb3VudCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVtYWluKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtiaW59KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygncmFuZG9taXplcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5wcm9wcy5iaW4sIChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmIHx8IChsaS5wcm9wcyAmJiBsaS5wcm9wc1snZGF0YS1yZWYnXSkgfHwga2V5O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJhbmRvbWl6ZXIuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgYmluOiBbXSxcbiAgICByZW1haW46IGZhbHNlLFxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogKCkgPT4gZmFsc2UsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmRvbWl6ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMS5qcyIsImltcG9ydCBTb3J0aW5nR2FtZUNvbXBvbmVudCBmcm9tICcuL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFNvcnRpbmdHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgIHRpbWVyOiAxMjAwMDAsXG4gICAgICAgIGluc3RydWN0aW9uc1ZPOiAnR2V0X1JlYWR5X0dvJyxcbiAgICAgICAgY29tcGxldGVWTzogJ1dhc3RlX1NvcnRpbmdfV2l6YXJkJyxcbiAgICAgICAgY29tcGxldGVTRlg6ICdMZXZlbENvbXBsZXRlJyxcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTb3J0aW5nIGlzIGp1c3QgYWJvdXQgdG88YnIvPlxuICAgICAgICAgICAgICAgIGdldCBhIGxpdHRsZSB0b3VnaGVyITxici8+XG4gICAgICAgICAgICAgICAgR2V0IFJlYWR5ISBHbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGU6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFdvdywgeW91J3JlIGRvaW5nPGJyLz5cbiAgICAgICAgICAgICAgICBhbWF6aW5nIHNvcnRpbmcgd29yayE8YnIvPlxuICAgICAgICAgICAgICAgIEtlZXAgZ29pbmcgYW5kIGJlY29tZTxici8+XG4gICAgICAgICAgICAgICAgYSBTb3J0aW5nIENoYW1waW9uIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBTb3J0aW5nR2FtZUNvbXBvbmVudCBmcm9tICcuL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFNvcnRpbmdHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgIHRpbWVyOiAxMjAwMDAsXG4gICAgICAgIGluc3RydWN0aW9uc1ZPOiAnV2FzdGVfU29ydGluZ19BY3Rpb24nLFxuICAgICAgICBjb21wbGV0ZVZPOiAnV2FzdGVfU29ydGluZ19XaXphcmQnLFxuICAgICAgICBjb21wbGV0ZVNGWDogJ0dhbWVXb24nLFxuICAgICAgICBpbnN0cnVjdGlvbnM6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoZSBjbG9jayBpcyBzZXQhPGJyLz5cbiAgICAgICAgICAgICAgICBHZXQgcmVhZHkgZm9yIHNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIGNoYWxsZW5naW5nIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBzb3J0aW5nIGFjdGlvbiFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGU6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgbm93IGFcbiAgICAgICAgICAgICAgICA8aDM+V0FTVEUgU09SVElORyBDSEFNUElPTjwvaDM+XG4gICAgICAgICAgICAgICAgVGhhbmsgeW91IGZvciBsZWFybmluZzxici8+XG4gICAgICAgICAgICAgICAgYWJvdXQgdGhlIHJpZ2h0IHdheTxici8+XG4gICAgICAgICAgICAgICAgdG8gZGlzcG9zZSBvZiB3YXN0ZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidGFrZS1hY3Rpb25cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0hvbWVfYW5kX1NjaG9vbC5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdiYW5uZXIucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2dhbWUyLjQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnZnJhbWUucm91bmQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIE5vdyB0aGF0IHlvdSd2ZSBsZWFybmVkPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgaG93IHRvIGRpc3Bvc2Ugb2Ygd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaWJseSwgdGFrZSBhY3Rpb24gaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICB5b3VyIGhvbWUgYW5kIHNjaG9vbCFcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90YWtlX2FjdGlvbl9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgZmxpcEVhcm5lZCA9IENNV04uTUVESUEuQkFTRSArXG4gICAgJ0ZsaXBzL1BMVCUyMFdhc3RlYnVzdGVyJTIwRmxpcC9QTFQlMjAtJTIwQW5pbWF0ZWQlMjBFYXJuZWQlMjBGbGlwL1BMVC5BbmltYXRlZGVhcm5lZEZsaXAuZ2lmJztcblxuY29uc3QgZmxpcFN0YXRpYyA9IENNV04uTUVESUEuQkFTRSArXG4gICAgJ0ZsaXBzL1BMVCUyMFdhc3RlYnVzdGVyJTIwRmxpcC9QTFQtJTIwU3RhdGljJTIwSW1hZ2UlMjBGbGlwL1BMVC5TdGF0aWNGbGlwLnBuZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiZmxpcFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnZmlscC5tcDMnfVxuICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJ2b1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2ZyYW1lLnNxdWFyZS5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnZmxpcC50cmVlcy5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZyYW1lIHNxdWFyZVwiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdmbGlwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IF8uZ2V0KHByb3BzLCAnZGF0YS52by5wbGF5aW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtmbGlwRWFybmVkfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2ZsaXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogIV8uZ2V0KHByb3BzLCAnZGF0YS52by5wbGF5aW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtmbGlwU3RhdGljfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnZmxpcC50ZXh0LnBuZyd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhhbmtzIGZvciB0YWtpbmc8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHRpbWUgdG8gbGVhcm48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJvdXQgaG93IHlvdTxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW4gaGVscCB0aGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnQhXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2ZsaXBfc2NyZWVuLmpzIiwiY2xhc3MgUXVpdFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICAgIG9rYXkoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdxdWl0Jyk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdtZW51Q2xvc2UnLCB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQXNzZXRzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hc3NldHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFzc2V0cy5tYXAoKGFzc2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uYXNzZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e2Fzc2V0LnJlZiB8fCBhc3NldC5wcm9wc1snZGF0YS1yZWYnXSB8fCAoJ2Fzc2V0LScgKyBrZXkpfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17a2V5fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT17J3NjcmVlbiAnICsgdGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFzc2V0cygpfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5BcmUgeW91IHN1cmUgeW91PGJyLz53YW50IHRvIHF1aXQ/PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5Zb3VyIGdhbWUgcHJvZ3Jlc3Mgd2lsbCBiZSBzYXZlZDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInF1aXQteWVzXCIgb25DbGljaz17dGhpcy5va2F5LmJpbmQodGhpcyl9PjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJxdWl0LW5vXCIgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX0+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG4gICAgPFF1aXRTY3JlZW5cbiAgICAgICAgaWQ9XCJxdWl0XCJcbiAgICAvPlxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3F1aXRfc2NyZWVuLzAuMS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL2pCQTtBQ0NBO0FBREE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FEQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0NBO0FEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBRXBDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FGRUE7QUFDQTtBQUNBO0FBa0JBO0FBbEJBO0FBNEJBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQVlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQ0E7QUFrQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQXhLQTtBQWJBO0FBQ0E7QUFDQTtBQXVMQTs7Ozs7O0FHOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQWRBO0FBQ0E7QUpnQkE7Ozs7Ozs7Ozs7Ozs7O0FLakJBO0FMQ0E7QUFDQTtBQUFBO0FLRUE7QUxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQVpBO0FBZUE7Ozs7Ozs7Ozs7Ozs7O0FNakJBO0FOQ0E7QUFDQTtBQUFBO0FNRUE7QU5DQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFnQkE7Ozs7Ozs7Ozs7Ozs7O0FPbEJBO0FQQ0E7QUFDQTtBQUFBO0FPRUE7QVBDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFGQTtBQVZBO0FBbUJBOzs7Ozs7Ozs7Ozs7OztBUXJCQTtBUkNBO0FBQ0E7QUFBQTtBUUVBO0FSQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUZBO0FBVkE7QUFvQkE7Ozs7Ozs7Ozs7Ozs7O0FTdEJBO0FUQ0E7QUFDQTtBQUFBO0FTRUE7QVRDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQVpBO0FBdUJBOzs7Ozs7Ozs7Ozs7OztBVXRCQTtBVkNBO0FBQ0E7QUFBQTtBVUVBO0FWQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQVBBO0FBVUE7QUFDQTtBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QVdFQTtBWENBO0FBQ0E7QUFBQTtBV0VBO0FYQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FXREE7QUFHQTtBWEpBO0FBekJBO0FBaUNBO0FBQ0E7QUF0Q0E7QUFDQTs7Ozs7Ozs7O0FZREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QWJDQTtBQUNBO0FBQUE7QWFFQTtBYkNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUEzQkE7QUFtQ0E7Ozs7Ozs7Ozs7Ozs7O0FjckNBO0FkQ0E7QUFDQTtBQUFBO0FjRUE7QWRDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBY0RBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QWRIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFaQTtBQWpEQTtBQXFFQTs7Ozs7Ozs7Ozs7Ozs7QWV2RUE7QWZDQTtBQUNBO0FBQUE7QWVFQTtBZkNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU1BO0FBQ0E7QUFYQTtBQURBO0FBZUE7QUFDQTtBQUNBO0FBL0JBO0FBa0NBOzs7Ozs7Ozs7Ozs7OztBZ0JwQ0E7QWhCQ0E7QUFDQTtBQUFBO0FnQkVBO0FoQkNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBT0E7QUFQQTtBQUFBO0FBSkE7QUFEQTtBQWlCQTtBQUNBO0FBQ0E7QUFqQ0E7QUFvQ0E7Ozs7Ozs7Ozs7Ozs7O0FpQnRDQTtBakJDQTtBQUNBO0FBQUE7QWlCRUE7QWpCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFEQTtBQVRBO0FBaUJBO0FBQ0E7QUFDQTtBQWpDQTtBQW9DQTs7Ozs7Ozs7Ozs7O0FrQnBDQTtBbEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFBQTtBQTVDQTtBQXVEQTtBQUNBO0FBM0RBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FtQkNBO0FuQkFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbUJDQTtBQUNBO0FuQkNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUhBO0FBRkE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbUJDQTtBbkJDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUZBO0FBRkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQURBO0FBSkE7QUFGQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FtQkVBO0FuQkNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QW1CQ0E7QW5CQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FtQkNBO0FuQkVBO0FBREE7QUFKQTtBQUZBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBbUJFQTtBbkJDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FtQkNBO0FuQkNBO0FtQkNBO0FuQkxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbUJJQTtBQUNBO0FuQkNBO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBbUJDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQVJBO0FBY0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FuQkRBO0FBUkE7QUFZQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FtQkNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QW5CQ0E7QUFIQTtBQUtBO0FBYkE7QUE5QkE7QUE4Q0E7QUFDQTtBQUNBO0FBQ0E7QW1CQ0E7QUFDQTtBbkJDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUxBO0FBU0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFQQTtBQVdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBUEE7QUFXQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVBBO0FBV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUxBO0FBU0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBREE7QUFMQTtBQTNEQTtBQTBFQTtBQUFBO0FBQUE7QUFDQTtBbUJEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FuQkhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQTVCQTtBQXJKQTtBQTBMQTtBQUNBO0FBM1hBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FvQkNBO0FwQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBVUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBOUNBO0FBd0RBO0FBQ0E7QUE1REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FxQkNBO0FyQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBREE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBOUNBO0FBeURBO0FBQ0E7QUE3REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzQkNBO0F0QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBREE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQU9BO0FBUEE7QUFRQTtBQVJBO0FBQUE7QUFZQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQURBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFPQTtBQVBBO0FBQUE7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFBQTtBQWxEQTtBQTZEQTtBQUNBO0FBakVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBdUJDQTtBdkJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBVUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFEQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBT0E7QUFQQTtBQVFBO0FBUkE7QUFBQTtBQVlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBREE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBL0NBO0FBMERBO0FBQ0E7QUE5REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QXdCREE7QXhCQ0E7QUFDQTtBQUFBO0F3QkVBO0F4QkNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBREE7QUF4QkE7QUFtQ0E7Ozs7Ozs7Ozs7Ozs7O0F5QnJDQTtBekJDQTtBQUNBO0FBQUE7QXlCRUE7QXpCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBeUJEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0F6QkhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFiQTtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBREE7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEE7QUFXQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBREE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUkE7QUFVQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBREE7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWEE7QUF6QkE7QUF6Q0E7QUFtRkE7Ozs7Ozs7Ozs7Ozs7O0EwQnJGQTtBMUJDQTtBQUNBO0FBQUE7QTBCRUE7QTFCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQURBO0FBdEJBO0FBaUNBOzs7Ozs7Ozs7Ozs7QTJCakNBO0EzQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQW5CQTtBQXlCQTtBQUNBO0FBN0JBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0E0QnVCQTtBNUJBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0E0QkVBO0E1QkNBO0FBQ0E7QUFDQTtBNEJMQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBNUJDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFSQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUE3QkE7QUFvQ0E7QUFBQTtBQUFBO0FBQ0E7QTRCREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBNUJDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBM0JBO0FBa0NBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTVCQ0E7QTRCQ0E7QUFDQTtBNUJDQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBNUJDQTtBQURBO0FBR0E7QUFDQTtBNEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0E1QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBekNBO0FBNERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFWQTtBQWlDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTRCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBNUJDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBekJBO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTRCQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBNUJDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFwQkE7QUFoQ0E7QUF1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBQUNBO0E1QkNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUpBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFKQTtBQVFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFEQTtBQUpBO0FBeENBO0FBNU9BO0FBb1NBO0FBQ0E7QUEvVEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBNkJqQkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0E3QkhBO0FBSUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7QThCakpBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0F2Q0NBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7O0FBN0tBO0FBQ0E7QUErS0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFDQTtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QXdDcE1BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBeENDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBUkE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRkE7QUFLQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTs7OztBQWpLQTtBQUNBO0FBbUtBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFaQTtBQUNBO0FBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBeUNyTEE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0F6Q0NBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7Ozs7QUFsREE7QUFDQTtBQW9EQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7OztBMEMzREE7QTFDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBZkE7QUF1QkE7QUFDQTtBQTNCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTJDQ0E7QTNDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBaEJBO0FBeUJBO0FBQ0E7QUE3QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QTRDREE7QTVDQ0E7QUFDQTtBQUFBO0E0Q0VBO0E1Q0NBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQURBO0FBdEJBO0FBZ0NBOzs7Ozs7Ozs7Ozs7OztBNkMxQkE7QTdDQ0E7QUFDQTtBQUFBO0E2Q0VBO0E3Q0NBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0E2Q0RBO0FBR0E7QTdDSkE7QUFNQTtBQUNBO0FBQ0E7QTZDREE7QUFHQTtBN0NKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFqQkE7QUFEQTtBQW5CQTtBQWdEQTtBQUNBO0FBM0RBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0E4Q0xBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QTlDQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUZBO0FBWUE7Ozs7QUEzQ0E7QUFDQTtBQThDQTtBQUNBO0FBREE7OzsiLCJzb3VyY2VSb290IjoiIn0=