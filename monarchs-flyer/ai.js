!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){__webpack_require__(25),__webpack_require__(24),module.exports=__webpack_require__(6)},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var generalDefaultProps={image:"land",scale:[.5,.5]},woodDefaultProps={image:"wood",scale:[.5,.5]},fruitDefaultProps={image:"fruits",scale:[1,1]},flowerDefaultProps={image:"flowers",scale:[.5,.5]};exports.default={level:1,hitsPerLife:10,hitDelay:1e3,bounceY:0,gravityY:600,playerImage:"butterfly",playerBody:[500,500,750,100],leftFrames:[5,4,3,2,1,0],leftFrameRate:10,leftLoop:!0,rightFrames:[6,7,8,9,10,11],rightFrameRate:10,rightLoop:!0,playerScale:[-.15,.15],upSpeed:-250,rightSpeed:150,fastUpSpeed:-250,fastRightSpeed:300,fastDuration:3e3,slowUpSpeed:-350,slowRightSpeed:100,slowDuration:2e3,playerStopFrame:6,boostTime:3e3,itemProps:{star:{image:"star",scale:[.1,.1]},crow:{image:"crow",scale:[-.1,.1],collideWorldBounds:!1},wind:{image:"wind"},water:{image:"water",scale:[.75,.75]},web:{image:"web"},log:_.defaults({image:"log"},generalDefaultProps),leaf:{image:"leaf"},egg:{image:"egg",scale:[.75,.75]},cloud:_.defaults({image:"cloud"},generalDefaultProps),wood1:_.defaults({frame:0,body:[200,120,150,0]},woodDefaultProps),wood2:_.defaults({frame:1},woodDefaultProps),wood3:_.defaults({frame:2,body:[250,120,120,0]},woodDefaultProps),land1:_.defaults({frame:0},generalDefaultProps),land2:_.defaults({frame:1},generalDefaultProps),land3:_.defaults({frame:2},generalDefaultProps),land4:_.defaults({frame:3},generalDefaultProps),land5:_.defaults({frame:4},generalDefaultProps),fruit1:_.defaults({frame:0},fruitDefaultProps),fruit2:_.defaults({frame:1},fruitDefaultProps),fruit3:_.defaults({frame:2},fruitDefaultProps),fruit4:_.defaults({frame:3},fruitDefaultProps),flower1:_.defaults({frame:0},flowerDefaultProps),flower2:_.defaults({frame:1},flowerDefaultProps),flower3:_.defaults({frame:2},flowerDefaultProps),flower4:_.defaults({frame:3},flowerDefaultProps),flower5:_.defaults({frame:4},flowerDefaultProps),flower6:_.defaults({frame:5},flowerDefaultProps)},groups:{star:"stars",crow:"crows",wind:"winds",water:"waters",web:"webs",log:"logs",leaf:"leafs",egg:"eggs",cloud:"clouds",wood1:"logs",wood2:"logs",wood3:"logs",land1:"lands",land2:"lands",land3:"lands",land4:"lands",land5:"lands",fruit1:"fruits",fruit2:"fruits",fruit3:"fruits",fruit4:"fruits",flower1:"flowers",flower2:"flowers",flower3:"flowers",flower4:"flowers",flower5:"flowers",flower6:"flowers"},itemAmounts:{blank:0,star:0,crow:0,wind:0,water:0,web:0,leaf:0,cloud:0,fruit1:0,fruit2:0,fruit3:0,fruit4:0,flower1:0,flower2:0,flower3:0,flower4:0,flower5:0,flower6:0},obstacleAmounts:{log:0,land1:0,land2:0,land3:0,land4:0,land5:0,wood1:0,wood2:0,wood3:0}}},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,groupOpts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},optsArray=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];groupOpts.defaultOpts=_.defaults(groupOpts.defaultOpts,{alpha:1,scale:[1,1],left:0,top:0,image:"ground",immovable:!0,bounceX:1,bounceY:1,gravityX:0,gravityY:0,collideWorldBounds:!0,checkCollisionUp:!0,checkCollisionDown:!0,checkCollisionRight:!0,checkCollisionLeft:!0,angle:0,anchor:[0,0]}),groupOpts=_.defaults(groupOpts,{enableBody:!0,group:"platforms"}),this[groupOpts.group]&&this[groupOpts.group].game===this.game||(this[groupOpts.group]=this.game.add.group(),this[groupOpts.group].enableBody=groupOpts.enableBody),_.each(optsArray,function(options){var _item$scale,_item$anchor,opts=_.defaults({},options,groupOpts.defaultOpts),item=void 0;if(_this[groupOpts.group].game=_this.game,item=_this[groupOpts.group].create(opts.left,opts.top,opts.image),item.originalImage=opts.image,item.alpha=opts.alpha,(_item$scale=item.scale).setTo.apply(_item$scale,_toConsumableArray(opts.scale)),opts.crop&&item.crop(new(Function.prototype.bind.apply(Phaser.Rectangle,[null].concat(_toConsumableArray(opts.crop))))),item.angle=opts.angle,(_item$anchor=item.anchor).setTo.apply(_item$anchor,_toConsumableArray(opts.anchor)),item.frame=opts.frame,groupOpts.enableBody&&(item.body.immovable=opts.immovable,item.body.collideWorldBounds=opts.collideWorldBounds,item.body.bounce.x=opts.bounceX,item.body.bounce.y=opts.bounceY,item.body.gravity.x=opts.gravityX,item.body.gravity.y=opts.gravityY,item.body.checkCollision.up=opts.checkCollisionUp,item.body.checkCollision.down=opts.checkCollisionDown,item.body.checkCollision.right=opts.checkCollisionRight,item.body.checkCollision.left=opts.checkCollisionLeft,opts.body)){var _item$body;(_item$body=item.body).setSize.apply(_item$body,_toConsumableArray(opts.body))}})}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var images=[["wind",CMWN.MEDIA.IMAGE+"img.wind.png"],["water",CMWN.MEDIA.IMAGE+"img.waterdrop.png"],["web",CMWN.MEDIA.IMAGE+"img.spiderweb.png"],["log",CMWN.MEDIA.IMAGE+"img.log.png"],["leaf",CMWN.MEDIA.IMAGE+"img.leaf.png"],["egg",CMWN.MEDIA.IMAGE+"img.egg.png"],["cloud",CMWN.MEDIA.IMAGE+"img.cloud.png"]];this.opts.level&&images.push(["sky",CMWN.MEDIA.IMAGE+"level0"+this.opts.level+".panorama.jpg"]),_2.default.call(this,"image",images),_2.default.call(this,"spritesheet",[["wood",CMWN.MEDIA.SPRITE+"sprite.logs.png",490,125],["land",CMWN.MEDIA.SPRITE+"sprite.land.png",345,245],["fruits",CMWN.MEDIA.SPRITE+"sprite.fruits.png",120,105],["flowers",CMWN.MEDIA.SPRITE+"sprite.flowers.png",190,180]]),_2.default.call(this,"atlas",[["butterfly",CMWN.MEDIA.SPRITE+"monarchsprite.png",CMWN.MEDIA.SPRITE+"monarchsprite.json"],["crow",CMWN.MEDIA.SPRITE+"crowflyingsprite.png",CMWN.MEDIA.SPRITE+"crowflyingsprite.json"],["star",CMWN.MEDIA.SPRITE+"starsprite.png",CMWN.MEDIA.SPRITE+"starsprite.json"]]),_2.default.call(this,"audio",[["egg",CMWN.MEDIA.EFFECT+"EggDrop.mp3"],["obstacle",CMWN.MEDIA.EFFECT+"BumpObstacles.mp3"],["bird",CMWN.MEDIA.EFFECT+"Bird.mp3"],["flower",CMWN.MEDIA.EFFECT+"PowerFlower.mp3"],["water",CMWN.MEDIA.EFFECT+"Drop.mp3"],["cloud",CMWN.MEDIA.EFFECT+"Cloud.mp3"],["wind",CMWN.MEDIA.EFFECT+"Wind.mp3"],["star",CMWN.MEDIA.EFFECT+"StarFact.mp3"],["speed",CMWN.MEDIA.EFFECT+"SpeedBKG.mp3"]])};var _=__webpack_require__(4),_2=_interopRequireDefault(_)},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,fn=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image",optsArray=arguments[1];"audio"!==fn||this.audio||(this.audio={}),this.game.load.crossOrigin="anonymous",_.each(optsArray,function(opts){var _game$load;_this.game.cache.checkImageKey(opts[0])||((_game$load=_this.game.load)[fn].apply(_game$load,_toConsumableArray(opts)),"audio"===fn&&(_this.audio[opts[0]]=!0))})}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};opts=_.defaults(opts,{physics:Phaser.Physics.ARCADE,disableVisibilityChange:!0,left:0,top:0,width:2e3,height:600}),this.game.physics.startSystem(opts.physics),this.game.stage.disableVisibilityChange=opts.disableVisibilityChange,this.game.world.setBounds(opts.left,opts.top,opts.width,opts.height)}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _=__webpack_require__(19),_2=_interopRequireDefault(_),_states=__webpack_require__(17),_states2=_interopRequireDefault(_states),_helpers=__webpack_require__(10),_helpers2=_interopRequireDefault(_helpers);window.game=new _2.default({helpers:_helpers2.default,states:_states2.default})},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this;this.controller={},_3.default.call(this,{width:3e4,height:740,top:-200}),this.helpers.makeBackground.call(this),_5.default.call(this,{left:300,top:this.game.world.height-650,image:this.opts.playerImage,bounceY:0,gravityY:0,body:this.opts.playerBody,rightFrames:[0,1,2,3],scale:this.opts.playerScale,onWorldBounds:this.helpers.onWorldCollide.bind(this)}),this.helpers.makeItems.call(this),this.data=_.defaults({levels:_defineProperty({},this.opts.level,{start:!0,score:0,hits:0})},this.data),this.audio=_.reduce(this.audio,function(a,v,k){return a[k]=_this.game.add.audio(k),a},{}),this.helpers.emitData.call(this)};var _2=__webpack_require__(5),_3=_interopRequireDefault(_2),_4=__webpack_require__(20),_5=_interopRequireDefault(_4)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _2=__webpack_require__(2),_3=_interopRequireDefault(_2);exports.default={onLogOverlap:function onLogOverlap(){this.helpers.hitSomething.call(this,1,this.audio.obstacle)},onWoodOverlap:function onWoodOverlap(){this.helpers.hitSomething.call(this,1,this.audio.obstacle)},onLandOverlap:function onLandOverlap(){this.helpers.hitSomething.call(this,1,this.audio.obstacle)},onCrowOverlap:function onCrowOverlap(){this.helpers.hitSomething.call(this,1,this.audio.bird)},onWorldCollide:function onWorldCollide(){this.helpers.hitSomething.call(this,1,this.audio.obstacle)},hitSomething:function hitSomething(){var _this=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,audio=arguments[1];this.isHit||(this.isHit=!0,setTimeout(function(){_this.isHit=!1},this.opts.hitDelay),this.data.levels[this.opts.level].hits+=i,this.helpers.emitData.call(this),_.invoke(audio,"play"))},onWindOverlap:function onWindOverlap(p,i){i.kill(),p.fast=(p.fast||0)+1,setTimeout(function(){p.fast--},this.opts.fastDuration),this.helpers.updateScore.call(this,3),this.audio.wind.play()},onWaterOverlap:function onWaterOverlap(p,i){i.kill(),this.helpers.addLife.call(this),this.audio.water.play()},onWebOverlap:function onWebOverlap(p,i){i.kill(),p.slow=!0,setTimeout(function(){p.slow=!1},this.opts.slowDuration),this.helpers.hitSomething.call(this,2)},onLeafOverlap:function onLeafOverlap(p,i){i.laid||(i.laid=!0,this.audio.egg.play(),_3.default.call(this,{group:this.opts.groups.egg,defaultOpts:this.opts.itemProps.egg},[{left:i.body.x+50,top:i.body.y}]),this.helpers.updateScore.call(this))},onCloudOverlap:function onCloudOverlap(){this.helpers.hitSomething.call(this),this.audio.cloud.play()},onFruitOverlap:function onFruitOverlap(p,i){i.kill(),this.helpers.updateScore.call(this)},onFlowerOverlap:function onFlowerOverlap(p,i){i.kill(),this.helpers.updateScore.call(this),this.audio.flower.play()},onStarOverlap:function onStarOverlap(p,i){i.kill(),this.helpers.updateScore.call(this,2),this.audio.star.play()},addLife:function addLife(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.data.levels[this.opts.level].hits=Math.max(0,this.data.levels[this.opts.level].hits-i),this.helpers.emitData.call(this)},updateScore:function updateScore(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.data.levels[this.opts.level].score+=i,this.helpers.emitData.call(this)}}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(opts){return{preload:function preload(){this.opts=opts,_preload3.default.call(this)},create:_create2.default,update:_update2.default}};var _preload2=__webpack_require__(3),_preload3=_interopRequireDefault(_preload2),_create=__webpack_require__(7),_create2=_interopRequireDefault(_create),_update=__webpack_require__(18),_update2=_interopRequireDefault(_update)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_events=__webpack_require__(8),_events2=_interopRequireDefault(_events),_make_background=__webpack_require__(11),_make_background2=_interopRequireDefault(_make_background),_make_items=__webpack_require__(12),_make_items2=_interopRequireDefault(_make_items);exports.default=_extends({emitData:function emitData(){this.emitEvent({updateGameState:{path:["game"],data:this.data}})}},_events2.default,{makeBackground:_make_background2.default,makeItems:_make_items2.default})},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){for(var locations=[],left=0;left<this.game.world.width;left+=2880)locations.push({left:left});_2.default.call(this,{group:"sky",enableBody:!1,defaultOpts:{collideWorldBounds:!1,top:0,image:"sky",scale:[.5,.5]}},locations)};var _=__webpack_require__(2),_2=_interopRequireDefault(_)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){for(var _this=this,defaultProps=this.opts.itemProps,groups=this.opts.groups,getObjects=function getObjects(){var objects=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],amounts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return objects.concat(_.shuffle(_.reduce(amounts,function(a,v,k){return a.concat(_.times(v||0,function(){return k}))},[])))},objects=getObjects([],this.opts.itemAmounts),locations=_.defaults(_.reduce(this.opts.itemAmounts,function(a,v,k){return a[k]=[],a},{}),_.reduce(this.opts.obstacleAmounts,function(a,v,k){return a[k]=[],a},{})),placeObject=function placeObject(top,left){var object=objects.shift();locations[object]&&locations[object].push({top:top,left:left})},left=500;left<this.game.world.width;left+=200)placeObject(200*_.random(0,2),left),objects.length||(objects=getObjects([],this.opts.itemAmounts));objects=getObjects([],this.opts.obstacleAmounts);for(var _left=500;_left<this.game.world.width;_left+=500)placeObject(100+200*_.random(0,1),_left),objects.length||(objects=getObjects([],this.opts.obstacleAmounts));_.each(locations,function(locationArray,key){"blank"!==key&&_3.default.call(_this,{group:groups[key],defaultOpts:defaultProps[key]},locationArray)}),this.stars&&_.each(this.stars.children,function(star){star.animations.add("spin",[0,1,2,3,4,5],10,!0),star.animations.play("spin")}),this.crows&&_.each(this.crows.children,function(crow){crow.animations.add("fly",[0,1,2,3,4,5,6,7,8],10,!0),crow.body.velocity.x=-200,crow.animations.play("fly")})};var _2=__webpack_require__(2),_3=_interopRequireDefault(_2)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _opts=__webpack_require__(14),_opts2=_interopRequireDefault(_opts),_opts3=__webpack_require__(15),_opts4=_interopRequireDefault(_opts3),_opts5=__webpack_require__(16),_opts6=_interopRequireDefault(_opts5);exports.default=[_opts2.default,_opts4.default,_opts6.default]},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(1),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:1,itemAmounts:{blank:1,star:1,crow:1,wind:0,water:3,web:0,leaf:10,cloud:0,fruit1:0,fruit2:0,fruit3:0,fruit4:0,flower1:0,flower2:0,flower3:0,flower4:0,flower5:0,flower6:0},obstacleAmounts:{log:0,land1:0,land2:0,land3:0,land4:0,land5:0,wood1:1,wood2:1,wood3:1}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(1),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:2,itemAmounts:{blank:1,star:1,crow:0,wind:0,water:3,web:2,leaf:0,cloud:3,fruit1:0,fruit2:0,fruit3:0,fruit4:0,flower1:2,flower2:2,flower3:2,flower4:2,flower5:2,flower6:2},obstacleAmounts:{log:10,land1:0,land2:0,land3:0,land4:0,land5:0,wood1:0,wood2:0,wood3:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(1),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:3,itemAmounts:{blank:1,star:1,crow:1,wind:4,water:3,web:0,leaf:0,cloud:0,fruit1:2,fruit2:2,fruit3:2,fruit4:2,flower1:0,flower2:0,flower3:0,flower4:0,flower5:0,flower6:0},obstacleAmounts:{log:0,land1:2,land2:1,land3:1,land4:1,land5:1,wood1:0,wood2:0,wood3:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _2=__webpack_require__(4),_3=_interopRequireDefault(_2),_4=__webpack_require__(5),_5=_interopRequireDefault(_4),_opts=__webpack_require__(13),_opts2=_interopRequireDefault(_opts),_get_state=__webpack_require__(9),_get_state2=_interopRequireDefault(_get_state),_preload=__webpack_require__(3),_preload2=_interopRequireDefault(_preload);exports.default=_.reduce(_opts2.default,function(a,v,k){return a[k+1]=(0,_get_state2.default)(v),a},{default:{preload:function preload(){_3.default.call(this,"image",[["sky",CMWN.MEDIA.IMAGE+"level01.panorama.jpg"]])},create:function create(){_5.default.call(this,{width:3e4,height:740,top:-200}),this.helpers.makeBackground.call(this),_preload2.default.call(this)},update:function update(){this.shouldUpdate||(this.shouldUpdate=!0,this.emitEvent({ready:!0}))}}})},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var upSpeed,rightSpeed;return this.controller.pause||this.data.levels[this.opts.level].complete?(this.controller={pause:!0},void(this.game.paused=!0)):(_2.default.call(this,"overlap",[[this.player,this.logs,this.helpers.onLogOverlap],[this.player,this.woods,this.helpers.onWoodOverlap],[this.player,this.lands,this.helpers.onLandOverlap],[this.player,this.winds,this.helpers.onWindOverlap],[this.player,this.waters,this.helpers.onWaterOverlap],[this.player,this.webs,this.helpers.onWebOverlap],[this.player,this.leafs,this.helpers.onLeafOverlap],[this.player,this.clouds,this.helpers.onCloudOverlap],[this.player,this.fruits,this.helpers.onFruitOverlap],[this.player,this.flowers,this.helpers.onFlowerOverlap],[this.player,this.stars,this.helpers.onStarOverlap],[this.player,this.crows,this.helpers.onCrowOverlap]]),upSpeed=this.player.fast?this.opts.fastUpSpeed:this.player.slow?this.opts.slowUpSpeed:this.opts.upSpeed,rightSpeed=this.player.fast?this.opts.fastRightSpeed:this.player.slow?this.opts.slowRightSpeed:this.opts.rightSpeed,_4.default.call(this,{upSpeed:upSpeed,rightSpeed:rightSpeed,gravityY:this.opts.gravityY,stopFrame:this.opts.playerStopFrame}),void(this.game.camera.x=Math.min(Math.max(this.player.body.center.x-400,0),this.game.world.width-800)))};var _=__webpack_require__(21),_2=_interopRequireDefault(_),_3=__webpack_require__(22),_4=_interopRequireDefault(_3)},function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Game=function(){function Game(){var _this=this,opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,Game),opts=_.defaults(opts,{width:960,height:540,renderer:Phaser.AUTO,parent:"",helpers:{},defaultState:"default"}),this.helpers=opts.helpers,this.opts=opts.opts||{},this.game=new Phaser.Game(opts.width,opts.height,opts.renderer,opts.parent),_.each(opts.states,function(state,stateName){_.each(state,function(func,funcName){state[funcName]=(func||_.noop).bind(_this)}),_this.game.state.add(stateName,state)}),this.game.state.start(opts.defaultState),this.attachEvents()}return _createClass(Game,[{key:"attachEvents",value:function attachEvents(){var _this2=this;window.addEventListener("skoash-event",function(e){switch(e.name){case"controller-update":_this2.controller=e.data.controller;break;case"data-update":_this2.data=_.defaults(e.data.data,_this2.data);break;case"state-update":_this2.game.state.start(e.data.data||"default");break;case"pause":_this2.game.paused=!0;break;case"resume":_this2.game.paused=!1}},!1),document.domain="changemyworldnow.com"}},{key:"emitEvent",value:function emitEvent(opts){var e=new Event("game-event");_.each(opts,function(v,k){e[k]=v}),window.frameElement&&window.frameElement.dispatchEvent(e)}}]),Game}();exports.default=Game},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _player$scale,_player$anchor,opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(opts=_.defaults(opts,{left:32,top:500,image:"dude",bounceX:0,bounceY:.2,gravityX:0,gravityY:300,collideWorldBounds:!0,checkCollisionUp:!0,checkCollisionDown:!0,checkCollisionRight:!0,checkCollisionLeft:!0,leftFrames:[0,1,2,3],leftFrameRate:10,leftLoop:!0,rightFrames:[5,6,7,8],rightFrameRate:10,rightLoop:!0,scale:[1,1],anchor:[.5,.5]}),this.player=this.game.add.sprite(opts.left,opts.top,opts.image),this.game.physics.arcade.enable(this.player),(_player$scale=this.player.scale).setTo.apply(_player$scale,_toConsumableArray(opts.scale)),(_player$anchor=this.player.anchor).setTo.apply(_player$anchor,_toConsumableArray(opts.anchor)),this.player.body.bounce.x=opts.bounceX,this.player.body.bounce.y=opts.bounceY,this.player.body.gravity.x=opts.gravityX,this.player.body.gravity.y=opts.gravityY,this.player.body.collideWorldBounds=opts.collideWorldBounds,this.player.body.checkCollision.up=opts.checkCollisionUp,this.player.body.checkCollision.down=opts.checkCollisionDown,this.player.body.checkCollision.right=opts.checkCollisionRight,this.player.body.checkCollision.left=opts.checkCollisionLeft,opts.body){var _player$body;(_player$body=this.player.body).setSize.apply(_player$body,_toConsumableArray(opts.body))}opts.onWorldBounds&&(this.player.body.onWorldBounds=new Phaser.Signal,this.player.body.onWorldBounds.add(opts.onWorldBounds)),this.player.animations.add("left",opts.leftFrames,opts.leftFrameRate,opts.leftLoop),this.player.animations.add("right",opts.rightFrames,opts.rightFrameRate,opts.rightLoop)};var _2=__webpack_require__(23),_3=_interopRequireDefault(_2)},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,fn=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"collide",optsArray=arguments[1];_.each(optsArray,function(opts){var _game$physics$arcade;opts=_.defaults(opts,[_this.player,_this.platforms,_.noop,null,_this]),(_game$physics$arcade=_this.game.physics.arcade)[fn].apply(_game$physics$arcade,_toConsumableArray(opts))})}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(opts){opts=_.defaults(opts,{upSpeed:-350,rightSpeed:150,gravityY:300,stopFrame:0}),this.player.body.velocity.x=opts.rightSpeed,this.player.animations.play("right"),this.controller.up&&(this.player.body.velocity.y=opts.upSpeed,this.player.body.gravity.y||(this.player.body.gravity.y=opts.gravityY))}},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(item){var _item$scale,opts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};opts=_.defaults(opts,{scale:[1,1]}),(_item$scale=item.scale).setTo.apply(_item$scale,_toConsumableArray(opts.scale)),opts.body&&setTimeout(function(){item.body.width=opts.body[0]*opts.scale[0],item.body.height=opts.body[1]*opts.scale[1],item.body.offset.x=opts.body[2],item.body.offset.y=opts.body[3]},0)}},function(module,exports){"use strict";!function(gameName){var MEDIA=window.MEDIA={BASE:ENVIRONMENT.MEDIA},GAME="games/",EFFECT="sound-assets/effects/",VO="sound-assets/vos/",IMAGE="image-assets/",SPRITE="sprites-animations/",FRAME="frames/",FONT="fonts/",SHARED="shared/",MOCK_GAME="mock-game/";MEDIA.FONT=MEDIA.BASE+FONT,MEDIA.SHARED=MEDIA.BASE+GAME+SHARED,MEDIA.GAME=MEDIA.BASE+GAME+gameName+"/",MEDIA.EFFECT=MEDIA.GAME+EFFECT,MEDIA.VO=MEDIA.GAME+VO,MEDIA.IMAGE=MEDIA.GAME+IMAGE,MEDIA.SPRITE=MEDIA.GAME+SPRITE,MEDIA.FRAME=MEDIA.GAME+FRAME,MEDIA.FONT=MEDIA.GAME+FONT,MEDIA.MOCK={},MEDIA.MOCK.GAME=MEDIA.BASE+GAME+MOCK_GAME,MEDIA.MOCK.EFFECT=MEDIA.MOCK.GAME+EFFECT,MEDIA.MOCK.VO=MEDIA.MOCK.GAME+VO,MEDIA.MOCK.IMAGE=MEDIA.MOCK.GAME+IMAGE,MEDIA.MOCK.SPRITE=MEDIA.MOCK.GAME+SPRITE,MEDIA.MOCK.FRAME=MEDIA.MOCK.GAME+FRAME,MEDIA.MOCK.FONT=MEDIA.MOCK.GAME+FONT,window.CMWN.MEDIA=MEDIA}(window.CMWN.gameFolder)},function(module,exports){"use strict";window.ENVIRONMENT={MEDIA:"https://media.changemyworldnow.com/f/"}}]);
//# sourceMappingURL=ai.js.map