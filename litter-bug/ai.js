!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(16)},function(module,exports){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},Reveal=function(_skoash$Component){function Reveal(){_classCallCheck(this,Reveal),_get(Object.getPrototypeOf(Reveal.prototype),"constructor",this).call(this),this.list=[React.createElement("li",null),React.createElement("li",null),React.createElement("li",null),React.createElement("li",null)],this.state={openReveal:""}}return _inherits(Reveal,_skoash$Component),_createClass(Reveal,[{key:"open",value:function open(message){var _this=this;this.setState({open:!0,openReveal:message}),this.playAudio(message),this.requireForComplete=this.requireForComplete.filter(function(item){return item!==message||_this.refs[message]instanceof skoash.Audio})}},{key:"close",value:function close(){this.setState({open:!1,openReveal:""}),"function"==typeof this.props.closeRespond&&this.props.closeRespond()}},{key:"start",value:function start(){skoash.Component.prototype.start.call(this),this.close(),null!=this.props.openOnStart&&this.open(this.props.openOnStart)}},{key:"playAudio",value:function playAudio(message){var _this2=this,messages;""+parseInt(message,10)===message&&(message="asset-"+message),this.audio["open-sound"]&&this.audio["open-sound"].play(),"string"==typeof message?(messages=message.split(" "),messages.map(function(audio){_this2.audio[audio]&&_this2.audio[audio].play()})):this.audio.voiceOver[message]&&this.audio.voiceOver[message].play()}},{key:"renderAssets",value:function renderAssets(){return this.props.assets?this.props.assets.map(function(asset,key){return React.createElement(skoash.Audio,_extends({},asset.props,{ref:asset.props["data-ref"]||"asset-"+key,key:key,"data-ref":key}))}):null}},{key:"renderList",value:function renderList(){var _this3=this,list=this.props.list||this.list;return list.map(function(li,key){var ref=li.ref||li.props["data-ref"]||key;return React.createElement(li.type,_extends({},li.props,{className:_this3.getClass(li,key),"data-ref":ref,ref:ref,key:key}))})}},{key:"getClass",value:function getClass(li,key){var classes="";return li.props.className&&(classes+=li.props.className),-1!==this.state.openReveal.indexOf(key)&&(classes+=" OPEN"),-1!==this.state.openReveal.indexOf(li.props["data-ref"])&&(classes+=" OPEN"),classes}},{key:"getClasses",value:function getClasses(){var classes="";return this.state.open&&(classes+="OPEN"),this.state.complete&&(classes+=" COMPLETE"),classes}},{key:"render",value:function render(){return React.createElement("div",{className:"reveal "+this.getClasses()},this.renderAssets(),React.createElement("div",null,React.createElement("ul",null,this.renderList()),React.createElement("button",{className:"close-reveal",onClick:this.close.bind(this)})))}}]),Reveal}(skoash.Component);exports["default"]=Reveal,module.exports=exports["default"]},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg))classes.push(classNames.apply(null,arg));else if("object"===argType)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}return classes.join(" ")}var hasOwn={}.hasOwnProperty;"undefined"!=typeof module&&module.exports?module.exports=classNames:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()},function(module,exports,__webpack_require__){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _sharedComponentsReveal01=__webpack_require__(1),_sharedComponentsReveal012=_interopRequireDefault(_sharedComponentsReveal01),_sharedComponentsSelectable_reveal01=__webpack_require__(21),_sharedComponentsSelectable_reveal012=_interopRequireDefault(_sharedComponentsSelectable_reveal01),toggleSun=function toggleSun(sun){skoash.trigger("passData",{sun:sun})},CleanUpScreen=React.createElement(skoash.Screen,{id:"clean-up",onComplete:toggleSun.bind(null,!0),onOpen:toggleSun.bind(null,!1)},React.createElement(_sharedComponentsReveal012["default"],{ref:"reveal",openOnStart:"0",assets:[React.createElement(skoash.Audio,{type:"voiceOver",src:"media/S_3/VO_3.1.mp3"})],list:[React.createElement(skoash.Component,{ref:"center",className:"center",type:"li"},React.createElement(skoash.Component,{ref:"frame",className:"frame"},React.createElement(skoash.Image,{ref:"background",className:"background",src:"media/_Frames/FR_1.png"}),React.createElement("div",{className:"content-group center"},React.createElement("div",null,React.createElement("h2",null,"Let’s clean up the mess left by Litterbugs!"),React.createElement("p",null,"Click or touch each item",React.createElement("br",null),"and remove it from the park.")))))]}),React.createElement(_sharedComponentsSelectable_reveal012["default"],{ref:"trash",className:"trash",selectableSelectClass:"HIGHLIGHTED",allCorrect:!0,assets:[React.createElement(skoash.Audio,{ref:"correct",type:"sfx",src:"media/S_3/S_3.1.mp3"})],selectableList:[React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"bottle"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"card-board-first"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"card-board-second"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"bag"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"paper-first"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"paper-second"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"paper-third"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"paper-fourth"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"batteries"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"banana"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"glass"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"tuna"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"glass-bottle"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"newspaper"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"soda-first"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"soda-second"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"can"}),React.createElement(skoash.Component,{type:"li",checkComplete:!1,className:"tires"})]}));exports["default"]=CleanUpScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var CommitScreen=React.createElement(skoash.Screen,{id:"commit"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_13/VO_13.1.mp3"}),React.createElement(skoash.Component,{ref:"center",className:"center"},React.createElement(skoash.Component,{ref:"frame",className:"frame"},React.createElement(skoash.Image,{ref:"background",className:"background",src:"media/_Frames/FR_3.png"}),React.createElement("p",null,"I promise to NEVER litter",React.createElement("br",null),"and to pick up the litter",React.createElement("br",null),"I see whenever I safely can.",React.createElement("br",null),"I will dispose of it in a",React.createElement("br",null),"trash can or a recycle bin."))));exports["default"]=CommitScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var FlipScreen=React.createElement(skoash.Screen,{id:"flip",emitOnComplete:{name:"flip"}},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_14/VO_14.1.mp3"}),React.createElement(skoash.Image,{ref:"image-1",className:"animated",src:"media/S_14/img_14.1.png"}),React.createElement("p",null,"Here’s another thing",React.createElement("br",null),"you won’t throw away:",React.createElement("br",null),"A great new",React.createElement("br",null),"I-MADE-A-DIFFERENCE"),React.createElement(skoash.Image,{ref:"image-2",className:"animated",src:"media/S_14/img_14.2.png"}));exports["default"]=FlipScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var GoodForYouScreen=React.createElement(skoash.Screen,{id:"good-for-you"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_11/VO_11.1.mp3"}),React.createElement(skoash.Component,{ref:"frame",className:"frame"},React.createElement(skoash.Image,{className:"background",src:"media/_Frames/FR_1.png"}),React.createElement(skoash.Component,{ref:"content-group",className:"content-group"},React.createElement(skoash.Image,{ref:"image-1",className:"animated",src:"media/S_11/img_11.1.png"}),React.createElement(skoash.Image,{ref:"image-2",className:"animated",src:"media/S_11/img_11.2.png"}),React.createElement("p",{className:"animated"},"You learned about littering",React.createElement("br",null),"and showed leadership!"))));exports["default"]=GoodForYouScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var GroundScreen=React.createElement(skoash.Screen,{id:"ground"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_6/VO_6.1.mp3"}),React.createElement(skoash.Audio,{ref:"button",complete:!0,type:"sfx",src:"media/S_4/VO_4.2.mp3"}),React.createElement(skoash.Image,{ref:"image-1","class":"animated",src:"media/S_6/img_6.1.png"}),React.createElement(skoash.Image,{ref:"image-2",src:"media/S_6/img_6.2.png"}));exports["default"]=GroundScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var LetsCleanUpScreen=React.createElement(skoash.Screen,{id:"lets-clean-up"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_2/VO_2.1.mp3"}),React.createElement("div",{className:"animated"},React.createElement("h3",null,"Litter is trash."),React.createElement("p",null,"Paper, cans, and bottles on the ground",React.createElement("br",null),"make a mess and can hurt wildlife",React.createElement("br",null),"and the environment.")),React.createElement(skoash.Image,{ref:"image",className:"animated",src:"media/S_2/img_2.1.png"}));exports["default"]=LetsCleanUpScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var RoomScreen=React.createElement(skoash.Screen,{id:"room"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_4/VO_4.1.mp3"}),React.createElement(skoash.Audio,{ref:"button",complete:!0,type:"sfx",src:"media/S_4/VO_4.2.mp3"}),React.createElement(skoash.Image,{ref:"image-1",className:"animated",src:"media/S_4/img_4.1.png"}),React.createElement(skoash.Image,{ref:"image-2",className:"animated",src:"media/S_4/img_4.2.png"}));exports["default"]=RoomScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var SchoolScreen=React.createElement(skoash.Screen,{id:"school"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_5/VO_5.1.mp3"}),React.createElement(skoash.Audio,{ref:"button",complete:!0,type:"sfx",src:"media/S_4/VO_4.2.mp3"}),React.createElement(skoash.Image,{ref:"image-1",src:"media/S_5/img_5.1.png"}),React.createElement(skoash.Image,{ref:"image-2","class":"animated",src:"media/S_5/img_5.2.png"}));exports["default"]=SchoolScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var SingAboutItScreen=React.createElement(skoash.Screen,{id:"sing-about-it"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_7/VO_7.1.mp3"}),React.createElement(skoash.Image,{ref:"image",className:"animated",src:"media/S_7/img_7.1.png"}));exports["default"]=SingAboutItScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var TakePledgeScreen=React.createElement(skoash.Screen,{id:"take-pledge"},React.createElement(skoash.Audio,{ref:"vo",type:"voiceOver",src:"media/S_12/VO_12.1.mp3"}),React.createElement(skoash.Component,{ref:"frame",className:"frame"},React.createElement(skoash.Image,{ref:"bkg",className:"background",src:"media/_Frames/FR_1.png"}),React.createElement(skoash.Component,{ref:"content-group",className:"content-group"},React.createElement(skoash.Image,{ref:"image",className:"animated",src:"media/S_11/img_11.2.png"}),React.createElement("p",null,"Take the Anti-Litter Pledge",React.createElement("br",null),"and start making the world",React.createElement("br",null),"a better, safer, cleaner place!"))));exports["default"]=TakePledgeScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var TitleScreen=React.createElement(skoash.Screen,{id:"title"},React.createElement(skoash.Component,{ref:"center",className:"center"},React.createElement(skoash.Image,{ref:"symbol",className:"symbol animated",src:"media/S_1/img_1.1.png"}),React.createElement(skoash.Image,{ref:"litterbug",className:"litterbug animated",src:"media/S_1/img_1.2.png"}),React.createElement(skoash.Component,{ref:"title",className:"title animated"},React.createElement(skoash.Image,{ref:"image-1",src:"media/S_1/img_1.3.png"}),React.createElement(skoash.Image,{ref:"image-2",src:"media/S_1/img_1.4.png"}))));exports["default"]=TitleScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var VideoScreen=React.createElement(skoash.Screen,{id:"video"},React.createElement(skoash.Component,{ref:"center",className:"center"},React.createElement(skoash.Component,{ref:"frame",className:"frame"},React.createElement(skoash.Video,{ref:"video",src:"https://res.cloudinary.com/changemyworldnow/video/upload/v1455037034/Litterbug-Final_jjmrg7.mp4"}))));exports["default"]=VideoScreen,module.exports=exports["default"]},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var config={id:"litter-bug",version:2,dimensions:{width:960,ratio:16/9}};exports["default"]=config,module.exports=exports["default"]},function(module,exports,__webpack_require__){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},_classnames=__webpack_require__(2),_classnames2=_interopRequireDefault(_classnames),_configGame=__webpack_require__(15),_configGame2=_interopRequireDefault(_configGame),_sharedComponentsLoader01=__webpack_require__(18),_sharedComponentsLoader012=_interopRequireDefault(_sharedComponentsLoader01),_sharedComponentsIos_splash_screen01=__webpack_require__(17),_sharedComponentsIos_splash_screen012=_interopRequireDefault(_sharedComponentsIos_splash_screen01),_componentsTitle_screen=__webpack_require__(13),_componentsTitle_screen2=_interopRequireDefault(_componentsTitle_screen),_componentsLets_clean_up_screen=__webpack_require__(8),_componentsLets_clean_up_screen2=_interopRequireDefault(_componentsLets_clean_up_screen),_componentsClean_up_screen=__webpack_require__(3),_componentsClean_up_screen2=_interopRequireDefault(_componentsClean_up_screen),_componentsRoom_screen=__webpack_require__(9),_componentsRoom_screen2=_interopRequireDefault(_componentsRoom_screen),_componentsSchool_screen=__webpack_require__(10),_componentsSchool_screen2=_interopRequireDefault(_componentsSchool_screen),_componentsGround_screen=__webpack_require__(7),_componentsGround_screen2=_interopRequireDefault(_componentsGround_screen),_componentsSing_about_it_screen=__webpack_require__(11),_componentsSing_about_it_screen2=_interopRequireDefault(_componentsSing_about_it_screen),_componentsVideo_screen=__webpack_require__(14),_componentsVideo_screen2=_interopRequireDefault(_componentsVideo_screen),_componentsGood_for_you_screen=__webpack_require__(6),_componentsGood_for_you_screen2=_interopRequireDefault(_componentsGood_for_you_screen),_componentsTake_pledge_screen=__webpack_require__(12),_componentsTake_pledge_screen2=_interopRequireDefault(_componentsTake_pledge_screen),_componentsCommit_screen=__webpack_require__(4),_componentsCommit_screen2=_interopRequireDefault(_componentsCommit_screen),_componentsFlip_screen=__webpack_require__(5),_componentsFlip_screen2=_interopRequireDefault(_componentsFlip_screen),_sharedComponentsQuit_screen01=__webpack_require__(19),_sharedComponentsQuit_screen012=_interopRequireDefault(_sharedComponentsQuit_screen01);__webpack_require__(22);var LitterBug=function(_skoash$Game){function LitterBug(){_classCallCheck(this,LitterBug),_get(Object.getPrototypeOf(LitterBug.prototype),"constructor",this).call(this,_configGame2["default"]),this.screens={0:_sharedComponentsIos_splash_screen012["default"],1:_componentsTitle_screen2["default"],2:_componentsLets_clean_up_screen2["default"],3:_componentsClean_up_screen2["default"],4:_componentsRoom_screen2["default"],5:_componentsSchool_screen2["default"],6:_componentsGround_screen2["default"],7:_componentsSing_about_it_screen2["default"],8:_componentsVideo_screen2["default"],9:_componentsGood_for_you_screen2["default"],10:_componentsTake_pledge_screen2["default"],11:_componentsCommit_screen2["default"],12:_componentsFlip_screen2["default"]},this.menus={quit:React.createElement(_sharedComponentsQuit_screen012["default"],null)}}return _inherits(LitterBug,_skoash$Game),_createClass(LitterBug,[{key:"passData",value:function passData(opts){this.setState(opts)}},{key:"renderLoader",value:function renderLoader(){return React.createElement(_sharedComponentsLoader012["default"],null)}},{key:"getClassNames",value:function getClassNames(){return(0,_classnames2["default"])({SUN:this.state.sun},skoash.Game.prototype.getClassNames.call(this))}},{key:"renderAssets",value:function renderAssets(){return React.createElement("div",null,React.createElement(skoash.Audio,{ref:"bkg-1",type:"background",src:"media/_BKG/S_BKG_1.mp3",loop:!0}),React.createElement(skoash.Audio,{ref:"button",type:"sfx",src:"media/_Buttons/S_BU_1.mp3"}),React.createElement(skoash.Image,{ref:"img-bkg-1",className:"hidden",src:"media/_BKG/BKG_1.png"}),React.createElement(skoash.Image,{ref:"img-bkg-2",className:"hidden",src:"media/_BKG/BKG_2.png"}),React.createElement(skoash.Image,{ref:"img-bkg-3",className:"hidden",src:"media/_BKG/BKG_3.png"}),React.createElement(skoash.Image,{ref:"img-bkg-4",className:"hidden",src:"media/_BKG/BKG_4.png"}),React.createElement(skoash.Image,{ref:"img-bkg-5",className:"hidden",src:"media/_BKG/BKG_5.png"}),React.createElement("div",{className:"background default"}),React.createElement("div",{className:"background lets-clean-up"}),React.createElement("div",{className:"background select"}),React.createElement("div",{className:"background sun"}),React.createElement("div",{className:"background commit"}))}}]),LitterBug}(skoash.Game);skoash.start(LitterBug,_configGame2["default"].id)},function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var iOSSplashScreen=React.createElement(skoash.Screen,{id:"ios-splash",checkComplete:!1,completeDelay:6e3,showPrev:!1},React.createElement(skoash.Image,{className:"hidden",src:"../shared/images/ios_start_ball.png"}),React.createElement(skoash.Image,{className:"hidden",src:"../shared/images/ios_start_ball_anim.gif"}));exports["default"]=iOSSplashScreen,module.exports=exports["default"]},function(module,exports){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},Loader=function(_play$Component){function Loader(){_classCallCheck(this,Loader),_get(Object.getPrototypeOf(Loader.prototype),"constructor",this).call(this)}return _inherits(Loader,_play$Component),_createClass(Loader,[{key:"render",value:function render(){return React.createElement("div",{id:"loader",className:"center"},React.createElement("div",{className:"group"},React.createElement("h2",null,"Loading!"),React.createElement("div",{className:"spinner animated"},React.createElement("div",{className:"spinner animated"},React.createElement("div",{className:"spinner animated"})))))}}]),Loader}(play.Component);exports["default"]=Loader,module.exports=exports["default"]},function(module,exports){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},QuitScreen=function(_skoash$Screen){function QuitScreen(){_classCallCheck(this,QuitScreen),_get(Object.getPrototypeOf(QuitScreen.prototype),"constructor",this).call(this),this.state={id:"quit"}}return _inherits(QuitScreen,_skoash$Screen),_createClass(QuitScreen,[{key:"okay",value:function okay(){skoash.trigger("quit")}},{key:"cancel",value:function cancel(){this.close(),skoash.trigger("menuClose",{id:this.state.id})}},{key:"render",value:function render(){return React.createElement("div",{id:this.state.id,className:this.getClassNames()},React.createElement("div",{className:"center"},React.createElement("div",{className:"frame"},React.createElement("h2",null,"Are you sure you",React.createElement("br",null),"want to quit?"),React.createElement("h3",null,"Your game progress will be saved"),React.createElement("button",{className:"quit-yes",onClick:this.okay.bind(this)}),React.createElement("button",{className:"quit-no",onClick:this.cancel.bind(this)}))))}}]),QuitScreen}(skoash.Screen);exports["default"]=QuitScreen,module.exports=exports["default"]},function(module,exports,__webpack_require__){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},_classnames=__webpack_require__(2),_classnames2=_interopRequireDefault(_classnames),Selectable=function(_skoash$Component){function Selectable(){_classCallCheck(this,Selectable),_get(Object.getPrototypeOf(Selectable.prototype),"constructor",this).call(this),this.state={selectClass:"SELECTED",classes:{},list:[React.createElement("li",null),React.createElement("li",null),React.createElement("li",null),React.createElement("li",null)],selectFunction:this.select}}return _inherits(Selectable,_skoash$Component),_createClass(Selectable,[{key:"start",value:function start(){var _this=this,selectClass,selectFunction,classes={};selectClass=this.props.selectClass||this.state.selectClass||"SELECTED",selectFunction="HIGHLIGHTED"===selectClass?this.highlight:this.select,this.props.selectOnStart&&(classes[this.props.selectOnStart]=selectClass),this.setState({started:!0,classes:classes,selectFunction:selectFunction,selectClass:selectClass}),this.bootstrap(),Object.keys(this.refs).map(function(key){"function"==typeof _this.refs[key].start&&_this.refs[key].start()})}},{key:"selectHelper",value:function selectHelper(e,classes){var _this2=this,message,target;target=e.target.closest("LI"),target&&(message=target.getAttribute("data-ref"),classes[message]=this.state.selectClass,this.setState({classes:classes}),"function"==typeof this.props.selectRespond&&this.props.selectRespond(message),this.requireForComplete.map(function(key){key===message&&_this2.refs[key]&&_this2.refs[key].complete()}))}},{key:"select",value:function select(e){var classes=[];this.selectHelper(e,classes)}},{key:"highlight",value:function highlight(e){var classes=this.state.classes;this.selectHelper(e,classes)}},{key:"getClass",value:function getClass(key){return(0,_classnames2["default"])(_defineProperty({},this.state.classes[key]||"",!0))}},{key:"getClassNames",value:function getClassNames(){return(0,_classnames2["default"])({selectable:!0,COMPLETE:this.state.complete},this.props.className)}},{key:"checkComplete",value:function checkComplete(){var self=this,complete;this.props.checkComplete!==!1&&(complete=self.requireForComplete.every(function(key){return self.refs[key]instanceof Node?!0:!self.refs[key].state||self.refs[key].state&&!self.refs[key].state.complete?("function"==typeof self.refs[key].checkComplete&&self.refs[key].checkComplete(),!1):!0}),complete&&!self.state.complete?self.complete():self.state.started&&!complete&&self.state.complete&&self.incomplete())}},{key:"renderList",value:function renderList(){var _this3=this,list=this.props.list||this.state.list;return list.map(function(li,key){var ref=null==li.props["data-ref"]?key:li.props["data-ref"];return li.type=li.type||skoash.ListItem,React.createElement(li.type,_extends({},li.props,{className:(li.props.className?li.props.className+" ":"")+_this3.getClass(ref),"data-ref":ref,ref:ref,key:key}))})}},{key:"render",value:function render(){return React.createElement("ul",{className:this.getClassNames(),onClick:this.state.selectFunction.bind(this)},this.renderList())}}]),Selectable}(skoash.Component);exports["default"]=Selectable,module.exports=exports["default"]},function(module,exports,__webpack_require__){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;if(void 0===getter)return;return getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return;_x=parent,_x2=property,_x3=receiver,_again=!0,desc=parent=void 0}},_selectable01Js=__webpack_require__(20),_selectable01Js2=_interopRequireDefault(_selectable01Js),_reveal01Js=__webpack_require__(1),_reveal01Js2=_interopRequireDefault(_reveal01Js),SelectableReveal=function(_skoash$Component){function SelectableReveal(){_classCallCheck(this,SelectableReveal),_get(Object.getPrototypeOf(SelectableReveal.prototype),"constructor",this).call(this),this.state={answers:[]}}return _inherits(SelectableReveal,_skoash$Component),_createClass(SelectableReveal,[{key:"open",value:function open(message){this.refs.reveal.open(message)}},{key:"selectRespond",value:function selectRespond(message){this.state.answers.length?-1===this.state.answers.indexOf(message)?this.audio.incorrect&&this.audio.incorrect.play():(this.audio.correct&&this.audio.correct.play(),"function"==typeof this.refs.reveal.open&&this.open(message)):(this.props.allCorrect&&this.audio.correct&&this.audio.correct.play(),"function"==typeof this.refs.reveal.open&&this.open(message))}},{key:"closeRespond",value:function closeRespond(){"function"==typeof this.props.closeRespond&&this.props.closeRespond()}},{key:"renderAssets",value:function renderAssets(){return this.props.assets?this.props.assets.map(function(asset,key){return React.createElement(skoash.Audio,_extends({},asset.props,{ref:asset.ref||asset.props["data-ref"]||"asset-"+key,key:key,"data-ref":key}))}):null}},{key:"renderSelectable",
value:function renderSelectable(){return React.createElement(_selectable01Js2["default"],{ref:"selectable",list:this.props.selectableList,selectRespond:this.selectRespond.bind(this),selectClass:this.props.selectableSelectClass,selectOnStart:this.props.selectOnStart})}},{key:"renderReveal",value:function renderReveal(){return React.createElement(_reveal01Js2["default"],{ref:"reveal",list:this.props.revealList,assets:this.props.revealAssets,closeRespond:this.closeRespond.bind(this),openOnStart:this.props.openOnStart})}},{key:"getClasses",value:function getClasses(){var classes="";return this.state.complete&&(classes+=" COMPLETE"),classes}},{key:"render",value:function render(){return React.createElement("div",{className:"selectable-reveal"+this.getClasses()},this.renderAssets(),this.renderSelectable(),this.renderReveal())}}]),SelectableReveal}(skoash.Component);exports["default"]=SelectableReveal,module.exports=exports["default"]},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")}]);
//# sourceMappingURL=ai.js.map