!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){__webpack_require__(3),module.exports=__webpack_require__(10)},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,groupOpts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},optsArray=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];groupOpts.defaultOpts=_.defaults(groupOpts.defaultOpts,{scale:[1,1],left:0,top:0,image:"ground",immovable:!0,bounceX:1,bounceY:1,gravityX:0,gravityY:0,collideWorldBounds:!0,checkCollisionUp:!0,checkCollisionDown:!0,checkCollisionRight:!0,checkCollisionLeft:!0,angle:0,anchor:[0,0]}),groupOpts=_.defaults(groupOpts,{enableBody:!0,group:"platforms"}),this[groupOpts.group]||(this[groupOpts.group]=this.game.add.group(),this[groupOpts.group].enableBody=groupOpts.enableBody),_.each(optsArray,function(options){var _item$scale,_item$anchor,opts=_.defaults({},options,groupOpts.defaultOpts),item=_this[groupOpts.group].create(opts.left,opts.top,opts.image);item.originalImage=opts.image,(_item$scale=item.scale).setTo.apply(_item$scale,_toConsumableArray(opts.scale)),opts.crop&&(item.crop(new(Function.prototype.bind.apply(Phaser.Rectangle,[null].concat(_toConsumableArray(opts.crop))))),groupOpts.enableBody&&(item.body.width=opts.crop[2],item.body.height=opts.crop[3])),item.angle=opts.angle,(_item$anchor=item.anchor).setTo.apply(_item$anchor,_toConsumableArray(opts.anchor)),groupOpts.enableBody&&(item.body.immovable=opts.immovable,item.body.collideWorldBounds=opts.collideWorldBounds,item.body.bounce.x=opts.bounceX,item.body.bounce.y=opts.bounceY,item.body.gravity.x=opts.gravityX,item.body.gravity.y=opts.gravityY,item.body.checkCollision.up=opts.checkCollisionUp,item.body.checkCollision.down=opts.checkCollisionDown,item.body.checkCollision.right=opts.checkCollisionRight,item.body.checkCollision.left=opts.checkCollisionLeft,opts.body&&setTimeout(function(){item.body.width=opts.body[0]*opts.scale[0],item.body.height=opts.body[1]*opts.scale[1],item.body.offset.x=opts.body[2]*opts.scale[0],item.body.offset.y=opts.body[3]*opts.scale[1]},0))})}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={level:1,hitVelocity:200,recyclingScore:100,rainbowRecyclyingScore:300,hitsPerLife:4,maxLives:3,maxBags:5,maxTrucks:3,bounceY:.2,gravityY:400,playerImage:"turtle",playerBody:[315,396,100,150],leftFrames:[5,4,3,2,1,0],leftFrameRate:10,leftLoop:!0,rightFrames:[6,7,8,9,10,11],rightFrameRate:10,rightLoop:!0,boostLeftFrames:[2,1,0],boostLeftFrameRate:10,boostLeftLoop:!0,boostRightFrames:[3,4,5],boostRightFrameRate:10,boostRightLoop:!0,playerScale:[.15,.15],upSpeed:-350,downSpeed:500,leftSpeed:-150,rightSpeed:150,boostUpSpeed:-350,boostDownSpeed:500,boostLeftSpeed:-300,boostRightSpeed:300,playerStopFrame:6,boostPlayerStopFrame:6,boostTime:3e3,platformsLogChance:0,groundLogChance:0,setPlatforms:[],locations:[],platformItemAmounts:{},groundItemAmounts:{}}},function(module,exports){"use strict";window.ENVIRONMENT={MEDIA:"https://media.changemyworldnow.com/f/"}},function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Game=function(){function Game(){var opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,Game),opts.preload=(opts.preload||_.noop).bind(this),opts.create=(opts.create||_.noop).bind(this),opts.update=(opts.update||_.noop).bind(this),opts=_.defaults(opts,{width:960,height:540,renderer:Phaser.CANVAS,parent:"",helpers:{},state:{preload:opts.preload,create:opts.create,update:opts.update}}),this.helpers=opts.helpers,this.opts=opts.opts,this.game=new Phaser.Game(opts.width,opts.height,opts.renderer,opts.parent,opts.state),this.attachEvents()}return _createClass(Game,[{key:"attachEvents",value:function attachEvents(){var _this=this;window.addEventListener("skoash-event",function(e){switch(e.name){case"controller-update":_this.controller=e.data.controller;break;case"data-update":_this.data=_.defaults(e.data.data,_this.data);break;case"pause":_this.game.paused=!0;break;case"resume":_this.game.paused=!1}},!1),document.domain="changemyworldnow.com"}},{key:"emitEvent",value:function emitEvent(opts){var e=new Event("game-event");_.each(opts,function(v,k){e[k]=v}),window.frameElement&&window.frameElement.dispatchEvent(e)}}]),Game}();exports.default=Game},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _player$scale,_this=this,opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};opts=_.defaults(opts,{left:32,top:500,image:"dude",bounceX:0,bounceY:.2,gravityX:0,gravityY:300,collideWorldBounds:!0,checkCollisionUp:!0,checkCollisionDown:!0,checkCollisionRight:!0,checkCollisionLeft:!0,leftFrames:[0,1,2,3],leftFrameRate:10,leftLoop:!0,rightFrames:[5,6,7,8],rightFrameRate:10,rightLoop:!0,scale:[1,1]}),this.player=this.game.add.sprite(opts.left,opts.top,opts.image),this.game.physics.arcade.enable(this.player),(_player$scale=this.player.scale).setTo.apply(_player$scale,_toConsumableArray(opts.scale)),this.player.body.bounce.x=opts.bounceX,this.player.body.bounce.y=opts.bounceY,this.player.body.gravity.x=opts.gravityX,this.player.body.gravity.y=opts.gravityY,this.player.body.collideWorldBounds=opts.collideWorldBounds,this.player.body.checkCollision.up=opts.checkCollisionUp,this.player.body.checkCollision.down=opts.checkCollisionDown,this.player.body.checkCollision.right=opts.checkCollisionRight,this.player.body.checkCollision.left=opts.checkCollisionLeft,opts.body&&setTimeout(function(){_this.player.body.width=opts.body[0]*opts.scale[0],_this.player.body.height=opts.body[1]*opts.scale[1],_this.player.body.offset.x=opts.body[2],_this.player.body.offset.y=opts.body[3]},0),this.player.animations.add("left",opts.leftFrames,opts.leftFrameRate,opts.leftLoop),this.player.animations.add("right",opts.rightFrames,opts.rightFrameRate,opts.rightLoop)}},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,fn=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"collide",optsArray=arguments[1];_.each(optsArray,function(opts){var _game$physics$arcade;opts=_.defaults(opts,[_this.player,_this.platforms,_.noop,null,_this]),(_game$physics$arcade=_this.game.physics.arcade)[fn].apply(_game$physics$arcade,_toConsumableArray(opts))})}},function(module,exports){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,fn=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image",optsArray=arguments[1];_.each(optsArray,function(opts){var _game$load;opts=_.defaults(opts,["sky","media/sky.png",32,48]),(_game$load=_this.game.load)[fn].apply(_game$load,_toConsumableArray(opts))})}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(opts){opts=_.defaults(opts,{upSpeed:-350,downSpeed:500,leftSpeed:-150,rightSpeed:150,stopFrame:4}),this.isHit||(this.player.body.velocity.x=0,this.cursors.left.isDown||this.controller.left?(this.player.body.velocity.x=opts.leftSpeed,this.player.animations.play("left")):this.cursors.right.isDown||this.controller.right?(this.player.body.velocity.x=opts.rightSpeed,this.player.animations.play("right")):(this.player.animations.stop(),this.player.frame=opts.stopFrame),this.player.canJump&&(this.cursors.up.isDown||this.controller.up)&&this.player.body.touching.down&&(this.player.body.velocity.y=opts.upSpeed),!this.cursors.down.isDown&&!this.controller.down||this.player.body.touching.down||(this.player.body.velocity.y=opts.downSpeed))}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};opts=_.defaults(opts,{physics:Phaser.Physics.ARCADE,disableVisibilityChange:!0,left:0,top:0,width:2e3,height:600}),this.game.physics.startSystem(opts.physics),this.game.stage.disableVisibilityChange=opts.disableVisibilityChange,this.game.world.setBounds(opts.left,opts.top,opts.width,opts.height)}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _=__webpack_require__(4),_2=_interopRequireDefault(_),_preload=__webpack_require__(24),_preload2=_interopRequireDefault(_preload),_create=__webpack_require__(11),_create2=_interopRequireDefault(_create),_update=__webpack_require__(25),_update2=_interopRequireDefault(_update),_helpers=__webpack_require__(12),_helpers2=_interopRequireDefault(_helpers),_opts=__webpack_require__(18),_opts2=_interopRequireDefault(_opts),opts=_opts2.default[location.search.split("v=")[1]-1||0];ENVIRONMENT.MEDIA+="Games/WasteBusters/",window.game=new _2.default({width:960,height:540,preload:_preload2.default,create:_create2.default,update:_update2.default,helpers:_helpers2.default,opts:opts})},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){this.controller={},_3.default.call(this,{width:4e3,height:740,top:-200}),this.cursors=this.game.input.keyboard.createCursorKeys(),this.helpers.makeBackground.call(this),this.helpers.makeGround.call(this),this.helpers.makeDoor.call(this),this.helpers.makePlatforms.call(this),this.helpers.makeLogs.call(this),this.helpers.makeItems.call(this),_5.default.call(this,{left:32,top:this.game.world.height-450,image:this.opts.playerImage,bounceY:this.opts.bounceY,gravityY:this.opts.gravityY,body:this.opts.playerBody,rightFrames:this.opts.rightFrames,leftFrames:this.opts.leftFrames,scale:this.opts.playerScale}),this.data=_.defaults({levels:_defineProperty({},this.opts.level,{start:!0,trucks:0})},this.data),this.helpers.emitData.call(this)};var _2=__webpack_require__(9),_3=_interopRequireDefault(_2),_4=__webpack_require__(5),_5=_interopRequireDefault(_4)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _=__webpack_require__(1),_2=_interopRequireDefault(_),_make_background=__webpack_require__(13),_make_background2=_interopRequireDefault(_make_background),_make_ground=__webpack_require__(14),_make_ground2=_interopRequireDefault(_make_ground),_make_platforms=__webpack_require__(17),_make_platforms2=_interopRequireDefault(_make_platforms),_make_logs=__webpack_require__(16),_make_logs2=_interopRequireDefault(_make_logs),_make_items=__webpack_require__(15),_make_items2=_interopRequireDefault(_make_items);exports.default={emitData:function emitData(){this.emitEvent({updateGameState:{path:["game"],data:this.data}})},onBump:function onBump(){},activateSnake:function activateSnake(snake,hole){var climb;snake.active||snake.climbing?snake.active&&!snake.climbing&&snake.body.velocity.x>0&&snake.left<hole.left&&(snake.left=hole.left-100,snake.body.velocity.x=0,snake.loadTexture(snake.originalImage+"down",0),snake.left=snake.left+25,snake.top=snake.top+25,climb=snake.animations.add("hole",[0,1,2,3,4,5,6],10,!1),climb.onComplete.add(function(){snake.loadTexture(null,0),setTimeout(function(){snake.climbing=!1},5e3)}),snake.scale.setTo(.4,.4),snake.animations.play("hole"),snake.active=!1,snake.climbing=!0):(snake.left=hole.left-100,snake.loadTexture(snake.originalImage+"up",0),climb=snake.animations.add("hole",[0,1,2,3,4,5,6],10,!1),climb.onComplete.add(function(){snake.loadTexture(snake.originalImage,5),snake.scale.setTo(.3,.3),snake.left=snake.left-25,snake.top=snake.top-25,snake.animations.add("left",[5,4,3,2,1,0],10,!0),snake.animations.add("right",[6,7,8,9,10,11],10,!0),snake.animations.play("left"),snake.body.velocity.x=-100,setTimeout(function(){snake.climbing=!1},5e3)}),snake.scale.setTo(.4,.4),snake.animations.play("hole"),snake.active=!0,snake.climbing=!0)},turnAround:function turnAround(enemy){enemy.isTurning||(enemy.isTurning=!0,enemy.body.velocity.x=-1*enemy.body.velocity.x,enemy.animations.play(enemy.body.velocity.x<0?"left":"right"),setTimeout(function(){enemy.isTurning=!1},500))},hitEnemy:function hitEnemy(p,e){e.active&&this.helpers.hitSomething.call(this,p)},hitObstacle:function hitObstacle(p){this.helpers.hitSomething.call(this,p)},hitWater:function hitWater(p){this.helpers.hitSomething.call(this,p,1,1)},hitSomething:function hitSomething(p){var _this=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;this.isHit||(this.isHit=!0,p.body.velocity.y=-1*this.opts.hitVelocity,p.body.velocity.x=(p.body.velocity.x===Math.abs(p.body.velocity.x)?d:-1*d)*this.opts.hitVelocity,setTimeout(function(){_this.isHit=!1},1e3),this.data.hits+=i,this.helpers.emitData.call(this),setTimeout(function(){_this.data.hits>=_this.opts.hitsPerLife&&(_this.data.hits-=_this.opts.hitsPerLife,_this.data.lives--,_this.helpers.emitData.call(_this))},250))},inLog:function inLog(){this.player.canJump=!1},collectRecycling:function collectRecycling(player,recyclying){recyclying.kill(),this.data.score+=this.opts.recyclingScore,this.helpers.emitData.call(this)},collectRainbowRecycling:function collectRainbowRecycling(player,recyclying){recyclying.kill(),this.data.score+=this.opts.rainbowRecyclyingScore,this.helpers.emitData.call(this)},collectHeart:function collectHeart(player,heart){this.data.lives!==this.opts.maxLives&&(heart.kill(),this.data.lives++,this.helpers.emitData.call(this))},collectBags:function collectBags(player,bag){this.data.bagCount!==this.opts.maxBags&&(bag.kill(),this.data.bagCount++,this.helpers.updatePlayer.call(this),this.helpers.emitData.call(this))},collectLightening:function collectLightening(player,lightening){var _this2=this;player.boost=player.boost+1||1,lightening.kill(),this.helpers.updatePlayer.call(this),setTimeout(function(){player.boost--,_this2.helpers.updatePlayer.call(_this2)},this.opts.boostTime)},updatePlayer:function updatePlayer(){this.player.boost?(this.player.loadTexture("jet",0),this.player.animations.add("left",this.opts.boostLeftFrames,this.opts.boostLeftFrameRate,this.opts.boostLeftLoop),this.player.animations.add("right",this.opts.boostRightFrames,this.opts.boostRightFrameRate,this.opts.boostRightLoop)):(this.data.bagCount===this.opts.maxBags?this.player.loadTexture("turtle5",0):this.data.bagCount>=this.opts.maxBags/2?this.player.loadTexture("turtle3",0):this.player.loadTexture("turtle",0),this.player.animations.add("left",this.opts.leftFrames,this.opts.leftFrameRate,this.opts.leftLoop),this.player.animations.add("right",this.opts.rightFrames,this.opts.rightFrameRate,this.opts.rightLoop))},stay:function stay(a){a.body.gravity.y=0,a.body.velocity.y=0},loadTruck:function loadTruck(player,truck){truck.driving||this.data.bagCount!==this.opts.maxBags||(truck.driving=!0,truck.animations.play("drive"),this.data.bagCount=0,this.data.levels[this.opts.level].trucks++,this.helpers.updatePlayer.call(this),this.data.levels[this.opts.level].trucks===this.opts.maxTrucks&&(this.doors.children[0].animations.play("open"),this.data.levels[this.opts.level].doorOpen=!0),this.helpers.emitData.call(this))},makeBackground:_make_background2.default,makeGround:_make_ground2.default,makePlatforms:_make_platforms2.default,makeLogs:_make_logs2.default,makeItems:_make_items2.default,makeDoor:function makeDoor(){_2.default.call(this,{group:"doors"},[{image:"door",gravityY:100,body:[200,200,25,25],scale:[.5,.5],collideWorldBounds:!1,left:this.game.world.width-90,top:0}]),this.doors.children[0].animations.add("open",[0,1,2,3,4,5,6],10,!1),this.doors.children[0].animations.add("close",[6,5,4,3,2,1,0],10,!1)},exit:function exit(){var _this3=this;this.data.levels[this.opts.level].trucks===this.opts.maxTrucks&&(this.data.levels[this.opts.level].complete||(this.data.levels[this.opts.level].complete=!0,this.player.body.collideWorldBounds=!1,this.helpers.emitData.call(this),setTimeout(function(){_this3.doors.children[0].animations.play("close"),_this3.data.levels[_this3.opts.level].doorOpen=!1,_this3.helpers.emitData.call(_this3),_this3.player.body.velocity.x=0},1500)))}}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){_2.default.call(this,{group:"sky",enableBody:!1,defaultOpts:{collideWorldBounds:!1,top:0,image:"sky",scale:[.5,.5]}},[{left:0},{left:2975.5}]),_2.default.call(this,{group:"clouds",enableBody:!1,defaultOpts:{collideWorldBounds:!1,top:0,image:"clouds",scale:[.5,.5]}},[{left:0},{left:2975.5}])};var _=__webpack_require__(1),_2=_interopRequireDefault(_)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){for(var left=0,groundOpts=[],waterOpts=[],random=2,crops=[[20,0,380,210],[545,0,200,210],[865,0,380,210],[1405,0,200,210]],bodies=[[380,140,0,60],[200,140,0,60],[380,140,0,60],[200,140,0,60]];left<this.game.world.width;){random=_.random(random>1||left>this.game.world.width-600?crops.length/2-1:crops.length-1);var crop=crops[random],body=bodies[random];random<2?groundOpts.push({left:left,crop:crop,body:body}):waterOpts.push({left:left,crop:crop,body:body}),left+=crop[2]-3}var defaultOpts={top:330,collideWorldBounds:!1,image:"ground"};_3.default.call(this,{group:"ground",defaultOpts:defaultOpts},groundOpts),_3.default.call(this,{group:"water",defaultOpts:defaultOpts},waterOpts)};var _2=__webpack_require__(1),_3=_interopRequireDefault(_2)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,crops=[[0,0,155,140],[155,0,155,140],[310,0,155,140],[465,0,155,140],[620,0,155,140],[775,0,155,140],[930,0,155,140],[0,0,300,360],[300,0,300,360],[600,0,300,360],[900,0,300,360],[1200,0,300,360],[1500,0,300,360],[1800,0,300,360]],generalDefaultProps={image:"items",gravityY:12,body:[115,100,20,50],scale:[.5,.5],collideWorldBounds:!1},treeDefaultProps={image:"trees",gravityY:12,body:[300,325,0,0],scale:[.5,.5],collideWorldBounds:!1},defaultProps={squareBush:_.defaults({crop:crops[0]},generalDefaultProps),roundBush:_.defaults({crop:crops[1]},generalDefaultProps),hole:_.defaults({crop:crops[2],body:[115,20,20,50],gravityY:1e4},generalDefaultProps),bag:_.defaults({crop:crops[3]},generalDefaultProps),rock:_.defaults({crop:crops[4]},generalDefaultProps),stump:_.defaults({crop:crops[5],body:[115,120,20,50]},generalDefaultProps),lightening:_.defaults({crop:crops[6],gravityY:0},generalDefaultProps),heart:{image:"heart",scale:[.15,.15]},recycle:{image:"recycle",scale:[.15,.15]},raibowRecycle:{image:"rainbowRecycle",scale:[.15,.15]},truck:{image:"truck",scale:[.5,.5],collideWorldBounds:!1},tree1:_.defaults({crop:crops[7],body:null},treeDefaultProps),tree2:_.defaults({crop:crops[8]},treeDefaultProps),tree3:_.defaults({crop:crops[9]},treeDefaultProps),tree4:_.defaults({crop:crops[10],body:null},treeDefaultProps),tree5:_.defaults({crop:crops[11]},treeDefaultProps),tree6:_.defaults({crop:crops[12]},treeDefaultProps),tree7:_.defaults({crop:crops[13]},treeDefaultProps),snake:{scale:[.25,.25],gravityY:12,collideWorldBounds:!1}},groups={squareBush:"bushes",roundBush:"bushes",snake:"snakes",hole:"holes",bag:"bags",rock:"obstacles",stump:"obstacles",heart:"hearts",recycle:"recycles",raibowRecycle:"rainbowRecycles",lightening:"lightening",truck:"trucks",tree1:"trees",tree2:"trees",tree3:"trees",tree4:"trees",tree5:"trees",tree6:"trees",tree7:"trees"},truckNumber=1,truckTotal=this.opts.maxTrucks,getObjects=function getObjects(){var objects=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],amounts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return objects.concat(_.shuffle([].concat(_.times(amounts.squareBush||0,function(){return"squareBush"})).concat(_.times(amounts.roundBush||0,function(){return"roundBush"})).concat(_.times(amounts.snake||0,function(){return"snake"})).concat(_.times(amounts.hole||0,function(){return"hole"})).concat(_.times(amounts.bag||0,function(){return"bag"})).concat(_.times(amounts.blank||0,function(){return"blank"})).concat(_.times(amounts.rock||0,function(){return"rock"})).concat(_.times(amounts.stump||0,function(){return"stump"})).concat(_.times(amounts.heart||0,function(){return"heart"})).concat(_.times(amounts.recycle||0,function(){return"recycle"})).concat(_.times(amounts.raibowRecycle||0,function(){return"raibowRecycle"})).concat(_.times(amounts.lightening||0,function(){return"lightening"})).concat(_.times(amounts.tree1||0,function(){return"tree1"})).concat(_.times(amounts.tree2||0,function(){return"tree2"})).concat(_.times(amounts.tree3||0,function(){return"tree3"})).concat(_.times(amounts.tree4||0,function(){return"tree4"})).concat(_.times(amounts.tree5||0,function(){return"tree5"})).concat(_.times(amounts.tree6||0,function(){return"tree6"})).concat(_.times(amounts.tree7||0,function(){return"tree7"}))))},objects=getObjects([],this.opts.platformItemAmounts),locations={tree1:[],tree2:[],tree3:[],tree4:[],tree5:[],tree6:[],tree7:[],squareBush:[],roundBush:[],snake:[],hole:[],bag:[],rock:[],stump:[],heart:[],recycle:[],raibowRecycle:[],lightening:[],truck:[],blank:[]},placeObject=function placeObject(platform,up,over){var object=objects.shift();switch(object){case"tree1":up+=110;break;case"tree2":case"tree3":case"tree5":case"tree7":up+=90;break;case"tree4":up+=105;break;case"tree6":up+=95}platform.hasLog&&"bag"!==object&&"blank"!==object&&(objects.unshift(object),object="blank"),locations[object]&&locations[object].push({top:platform.top-up,left:platform.left+over})};for(_.every(this.platforms.children,function(platform){return placeObject(platform,50,30),platform.width>120&&placeObject(platform,50,80),platform.width>200&&placeObject(platform,50,170),objects.length}),objects=getObjects(objects,this.opts.groundItemAmounts),objects.unshift("blank"),objects.unshift("blank"),_.every(this.ground.children,function(platform){return truckNumber<=truckTotal&&platform.left>_this.game.world.width*truckNumber/(truckTotal+1.5)?(locations.truck.push({top:platform.top-50,left:platform.left}),truckNumber++,!0):!(platform.left>_this.game.world.width-200)&&(placeObject(platform,20,30),objects.length)});~objects.indexOf("bag");)locations.bag.push(locations.blank.shift()),objects[objects.indexOf("bag")]="blank";_.each(locations,function(locationArray,key){var holeLocations,snakeLocations;if("blank"!==key)return"snake"===key?(holeLocations=_.map(locationArray,function(opts){return{top:opts.top,left:opts.left+80}}),_3.default.call(_this,{group:groups.hole,defaultOpts:defaultProps.hole},holeLocations),snakeLocations=_.map(locationArray,function(opts){return{top:opts.top-10,left:opts.left+70,image:"snake"+_.random(2)}}),void _3.default.call(_this,{group:groups.snake,defaultOpts:defaultProps.snake},snakeLocations)):void _3.default.call(_this,{group:groups[key],defaultOpts:defaultProps[key]},locationArray)}),_.each(this.hearts.children,function(heart){heart.animations.add("spin",[0,1,2,3,4,5],10,!0),heart.animations.play("spin")}),_.each(this.recycles.children,function(recycle){recycle.animations.add("spin",[0,1,2,3,4],10,!0),recycle.animations.play("spin")}),_.each(this.rainbowRecycles.children,function(recycle){recycle.animations.add("spin",[0,1,2,3],10,!0),recycle.animations.play("spin")}),_.each(this.trucks.children,function(truck){var drive=truck.animations.add("drive",[0,1,2,3,4,5,6,7,8,9],10,!1);drive.onComplete.add(function(){truck.body.velocity.x=200})}),_.each(this.trees.children,function(tree){tree.sendToBack()}),_.each(this.snakes.children,function(snake){snake.loadTexture(null,0)})};var _2=__webpack_require__(1),_3=_interopRequireDefault(_2)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this,crops=[[100,0,220,100],[460,0,350,100],[830,0,415,100]],bodies=[[220,100,0,0],[350,100,0,0],[415,100,0,0]],offsets={platforms:0,ground:40};_.each(offsets,function(offset,location){_.each(_this[location].children,function(platform){var index;platform.left<400||platform.left>_this.game.world.width-400||Math.random()<_this.opts[location+"LogChance"]&&(platform.hasLog=!0,index=Math.floor(Math.random()*(platform.width>300?3:platform.width>150?2:1)),_3.default.call(_this,{group:"logs",defaultOpts:{image:"logs",scale:[.5,.5],collideWorldBounds:!1,checkCollisionRight:!1,checkCollisionLeft:!1}},[{top:platform.top+offset-35,left:platform.left,crop:crops[Math.floor(index)],body:bodies[index]}]))})})};var _2=__webpack_require__(1),_3=_interopRequireDefault(_2)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){function addPlatform(location,i){platformOpts.push({left:location[0],top:location[1],crop:crops[i],body:bodies[i]})}var crops=[[200,0,240,96],[790,0,350,96],[1290,0,645,96]],bodies=[[200,28,0,80],[310,28,0,80],[605,28,0,80]],platformParams=this.opts.setPlatforms||[],locations=this.opts.locations||[],platformOpts=[];_.each(platformParams,function(params){addPlatform.apply(void 0,_toConsumableArray(params))}),_.each(locations,function(location){addPlatform(location,_.random(crops.length-1))}),_3.default.call(this,{group:"platforms",defaultOpts:{top:300,collideWorldBounds:!1,image:"platforms",scale:[.5,.5],checkCollisionDown:!1,checkCollisionRight:!1,checkCollisionLeft:!1}},platformOpts)};var _2=__webpack_require__(1),_3=_interopRequireDefault(_2)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _opts=__webpack_require__(19),_opts2=_interopRequireDefault(_opts),_opts3=__webpack_require__(20),_opts4=_interopRequireDefault(_opts3),_opts5=__webpack_require__(21),_opts6=_interopRequireDefault(_opts5),_opts7=__webpack_require__(22),_opts8=_interopRequireDefault(_opts7),_opts9=__webpack_require__(23),_opts10=_interopRequireDefault(_opts9);exports.default=[_opts2.default,_opts4.default,_opts6.default,_opts8.default,_opts10.default]},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(2),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:1,platformsLogChance:.1,groundLogChance:0,setPlatforms:[[[130,80],0],[[350,160],1],[[950,160],2],[[1050,240],0],[[2650,80],2],[[3600,240],0]],locations:[[100,240],[600,240],[650,80],[1350,80],[1400,240],[1700,160],[1900,80],[2050,240],[2300,160],[2550,240],[2800,160],[3e3,240],[3300,160]],platformItemAmounts:{squareBush:1,roundBush:1,snake:0,bag:15,blank:10,rock:1,stump:1,heart:1,recycle:1,raibowRecycle:1,lightening:0,tree1:1,tree2:1,tree3:1},groundItemAmounts:{squareBush:1,roundBush:1,hole:2,bag:0,blank:5,rock:1,stump:1,heart:0,recycle:0,raibowRecycle:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(2),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:2,platformsLogChance:.05,groundLogChance:.05,setPlatforms:[[[-30,240],0],[[3600,240],1],[[3200,240],1]],locations:[[100,160],[300,240],[400,80],[700,160],[900,240],[1e3,80],[1200,160],[1300,240],[1600,240],[1650,80],[1800,160],[2e3,240],[2100,80],[2400,160],[2700,240],[2800,80],[3e3,160]],platformItemAmounts:{squareBush:2,roundBush:2,snake:0,bag:15,blank:10,rock:2,stump:2,heart:2,recycle:1,raibowRecycle:1,lightening:1,tree1:1,tree6:1,tree7:1},groundItemAmounts:{squareBush:1,roundBush:1,snake:2,bag:0,blank:5,rock:1,stump:1,heart:0,recycle:0,raibowRecycle:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(2),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:3,platformsLogChance:.05,groundLogChance:.05,setPlatforms:[[[-30,160],2],[[0,240],0],[[700,240],2],[[1100,160],1],[[1900,240],1],[[2200,240],2],[[3400,160],2]],locations:[[300,240],[400,80],[650,160],[900,80],[1300,240],[1350,80],[1550,160],[2e3,80],[2700,80],[2700,240],[3100,240]],platformItemAmounts:{squareBush:2,roundBush:2,snake:0,bag:15,blank:10,rock:2,stump:2,heart:2,recycle:1,raibowRecycle:1,lightening:1,tree2:1,tree4:1,tree5:1},groundItemAmounts:{squareBush:1,roundBush:1,snake:2,bag:0,blank:5,rock:1,stump:1,heart:0,recycle:0,raibowRecycle:0,tree1:1}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(2),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:4,platformsLogChance:0,groundLogChance:.05,setPlatforms:[[[0,160],1],[[1100,160],1],[[1650,160],2],[[2100,80],0],[[2500,240],1],[[2800,160],2],[[3400,160],1]],
locations:[[200,80],[200,240],[500,160],[800,240],[900,80],[1250,240],[1400,80],[1950,240],[2200,160],[3100,80],[3100,240]],platformItemAmounts:{squareBush:1,roundBush:1,snake:0,bag:15,blank:5,rock:2,stump:2,heart:2,recycle:1,raibowRecycle:1,lightening:1,tree1:1,tree2:1,tree3:1,tree6:1,tree7:1},groundItemAmounts:{squareBush:1,roundBush:1,snake:2,bag:0,blank:5,rock:1,stump:1,heart:0,recycle:0,raibowRecycle:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default_opts=__webpack_require__(2),_default_opts2=_interopRequireDefault(_default_opts);exports.default=_.defaults({level:5,platformsLogChance:.1,groundLogChance:.05,setPlatforms:[[[0,160],1],[[400,160],2],[[700,240],2],[[950,160],2],[[1550,160],2],[[1800,240],2],[[3400,80],0],[[3400,240],0],[[3600,160],1]],locations:[[200,80],[200,240],[850,80],[1250,240],[1300,80],[1900,80],[2200,160],[2500,240],[2800,160],[3050,240],[3100,80]],platformItemAmounts:{squareBush:2,roundBush:2,snake:0,bag:15,blank:5,rock:3,stump:3,heart:2,recycle:2,raibowRecycle:2,lightening:1,tree1:1,tree2:1,tree3:1,tree6:1,tree7:1},groundItemAmounts:{squareBush:1,roundBush:1,snake:2,bag:0,blank:5,rock:1,stump:1,heart:0,recycle:0,raibowRecycle:0}},_default_opts2.default)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){_2.default.call(this,"image",[["sky",ENVIRONMENT.MEDIA+"ImageAssets/game.1.bkg.sky.jpg"],["clouds",ENVIRONMENT.MEDIA+"ImageAssets/game.1.bkg.clouds.png"],["ground",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.ground.png"],["platforms",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.platform.png"],["items",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.5.png"],["logs",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.logs.png"],["trees",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.trees.png"]]),_2.default.call(this,"spritesheet",[["turtle",ENVIRONMENT.MEDIA+"SpritesAnimations/turtle.walk.0.png",515,645],["turtle3",ENVIRONMENT.MEDIA+"SpritesAnimations/turtle.walk.3.png",515,645],["turtle5",ENVIRONMENT.MEDIA+"SpritesAnimations/turtle.walk.5.png",515,645],["heart",ENVIRONMENT.MEDIA+"SpritesAnimations/game1.hearts.png",305,276],["recycle",ENVIRONMENT.MEDIA+"SpritesAnimations/recycle-01.png",345,310],["rainbowRecycle",ENVIRONMENT.MEDIA+"SpritesAnimations/rainbow.recycle-01.png",345,310],["truck",ENVIRONMENT.MEDIA+"SpritesAnimations/truck.png",575,286],["door",ENVIRONMENT.MEDIA+"SpritesAnimations/door.open.png",250,253],["jet",ENVIRONMENT.MEDIA+"SpritesAnimations/jet.pack.png",600,326],["snake0",ENVIRONMENT.MEDIA+"SpritesAnimations/mother.slither-01.png",655,410],["snake0up",ENVIRONMENT.MEDIA+"SpritesAnimations/Mom.leaving.hole.png",475,250],["snake0down",ENVIRONMENT.MEDIA+"SpritesAnimations/Mom.going.to.hole.png",475,250],["snake1",ENVIRONMENT.MEDIA+"SpritesAnimations/sister.slither-01.png",655,410],["snake1up",ENVIRONMENT.MEDIA+"SpritesAnimations/sister.leave.hole.png",475,250],["snake1down",ENVIRONMENT.MEDIA+"SpritesAnimations/sister.down.hole.png",475,250],["snake2",ENVIRONMENT.MEDIA+"SpritesAnimations/brother.slither-01.png",655,410],["snake2up",ENVIRONMENT.MEDIA+"SpritesAnimations/brother.leave.hole.png",475,250],["snake2down",ENVIRONMENT.MEDIA+"SpritesAnimations/brother.down.hole.png",475,250]]),_2.default.call(this,"audio",[])};var _=__webpack_require__(7),_2=_interopRequireDefault(_)},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var _this=this;return this.shouldUpdate?(this.player.canJump=!0,_2.default.call(this,"collide",[[this.player,this.ground,this.helpers.onBump],[this.player,this.water,this.helpers.hitWater],[this.player,this.platforms,this.helpers.onBump],[this.player,this.bushes,this.helpers.onBump],[this.player,this.obstacles,this.helpers.hitObstacle],[this.player,this.logs,this.helpers.onBump],[this.bushes,this.ground,this.helpers.stay],[this.bushes,this.platforms,this.helpers.stay],[this.trees,this.ground,this.helpers.stay],[this.trees,this.platforms,this.helpers.stay],[this.snakes,this.ground,this.helpers.stay],[this.snakes,this.platforms,this.helpers.stay],[this.snakes,this.water,this.helpers.turnAround],[this.holes,this.ground,this.helpers.stay],[this.bags,this.ground,this.helpers.stay],[this.bags,this.platforms,this.helpers.stay],[this.obstacles,this.ground,this.helpers.stay],[this.obstacles,this.platforms,this.helpers.stay],[this.doors,this.ground,this.helpers.stay]]),_2.default.call(this,"overlap",[[this.player,this.bags,this.helpers.collectBags],[this.player,this.hearts,this.helpers.collectHeart],[this.player,this.recycles,this.helpers.collectRecycling],[this.player,this.rainbowRecycles,this.helpers.collectRainbowRecycling],[this.player,this.trucks,this.helpers.loadTruck],[this.player,this.doors,this.helpers.exit],[this.player,this.logs,this.helpers.inLog],[this.player,this.lightening,this.helpers.collectLightening],[this.player,this.snakes,this.helpers.hitEnemy],[this.snakes,this.holes,this.helpers.activateSnake]]),this.data.levels[this.opts.level].complete?this.data.levels[this.opts.level].doorOpen&&(this.player.body.velocity.x=150,this.player.body.collideWorldBounds=!1,this.player.animations.play("right"),this.game.physics.arcade.enable(this.player)):this.player.boost?_4.default.call(this,{upSpeed:this.opts.boostUpSpeed,downSpeed:this.opts.boostDownSpeed,leftSpeed:this.opts.boostLeftSpeed,rightSpeed:this.opts.boostRightSpeed,stopFrame:this.opts.boostPlayerStopFrame}):_4.default.call(this,{upSpeed:this.opts.upSpeed,downSpeed:this.opts.downSpeed,leftSpeed:this.opts.leftSpeed,rightSpeed:this.opts.rightSpeed,stopFrame:this.opts.playerStopFrame}),this.game.camera.x=Math.min(Math.max(this.player.body.center.x-400,0),this.game.world.width-800),this.clouds.children[0].position.x=-.25*this.player.body.center.x,void(this.clouds.children[1].position.x=2975.5-.25*this.player.body.center.x)):void setTimeout(function(){return _this.shouldUpdate=!0},100)};var _=__webpack_require__(6),_2=_interopRequireDefault(_),_3=__webpack_require__(8),_4=_interopRequireDefault(_3)}]);
//# sourceMappingURL=ai.js.map