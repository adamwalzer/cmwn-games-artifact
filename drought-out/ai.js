!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(10)},function(module,exports){pl.game.component("audio-sequence",function(){var sounds;this.on("ready",function(_event){var self=this;this.is(_event.target)&&(sounds=this.audio.find(".audio"),this.audio.on("ended",function(){var next=sounds[self.i++];next&&next.play()}))}),this.start=function(){this.i=1,sounds.length&&sounds[0].play()}})},function(module,exports){pl.game.component("reveal",function(){this.item=function(_id){var vo,index;"number"==typeof _id?(this.select(this.find("li").eq(_id)),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.select(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&vo.play()))},this.start=function(){}})},function(module,exports){pl.game.component("screen-basic",function(){this.shouldProceed=function(){return!this.state(this.STATE.VOICE_OVER)||this.game.demoMode},this.next=function(){var nextScreen,buttonSound;return nextScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),nextScreen&&(this.leave(),nextScreen.open(),buttonSound&&buttonSound.play()),nextScreen},this.prev=function(){var prevScreen,buttonSound;return prevScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),prevScreen&&(this.screen.close(),prevScreen.open(),buttonSound&&buttonSound.play()),prevScreen},this.start=function(){var fxSound=this.audio&&this.audio.sfx.start;return this.startAudio(),fxSound&&fxSound.play(),this.hasOwnProperty("entities")&&this.entities.forEach(function(_entity){_entity&&"function"==typeof _entity.start&&_entity.start()}),this},this.stop=function(){return this.timeoutID&&clearTimeout(this.timeoutID),this.proto()},this.on("ui-open",function(_event){this.is(_event.target)&&(this.isReady&&this.start(),this.properties.gameClass&&this.game.addClass(this.properties.gameClass),(!this.requiredQueue||this.hasOwnProperty("requiredQueue")&&!this.requiredQueue.length)&&this.complete())}),this.on("ui-leave",function(_event){this.properties.gameClass&&this.game.removeClass(this.properties.gameClass),this.isReady&&this===_event.targetScope&&this.stop()}),this.on("ui-close",function(_event){this.properties.gameClass&&this.game.removeClass(this.properties.gameClass),this.isReady&&this===_event.targetScope&&this.stop()}),this.complete=function(){var audio;return audio=this.audio&&this.audio.has("screenComplete")?this.audio:this.game.audio,audio.sfx.play("screenComplete"),this.proto()},this.on("ready",function(){this.state(this.STATE.OPEN)&&this.start()})})},function(module,exports){pl.game.component("screen-quit",function(){this.buttonSound=function(){this.game.audio.sfx.button&&this.game.audio.sfx.button.play()},this.on("transitionend",function(_event){this.is(_event.target)&&this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.buttonSound(),this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.init=function(){this.addClass("LEAVE LEAVE-END")},this.okay=function(){this.buttonSound(),this.game.exit()},this.cancel=function(){this.buttonSound(),this.leave()}})},function(module,exports){pl.game.component("selectable-canvas-move",function(){var canvas,Item,gameLoop,self=this;gameLoop={frame:function frame(_scope){_scope.items.forEach(function(_item){var y,height;_item.position.y-=_item.speed,y=_item.position.y+_item.margin,height=_item.size.height,0>y+height&&(_item.position.y=1.1*_scope.height())})}},Item=pl.Basic.extend(function(){this.position=null,this.size=null,this.margin=0,this.image=null,this.$image=null,this.left=0,this.selected=!1,this.init=function(_image){return this.$image=$(_image),this.image=_image,this.position=pl.Point.create(),this.backgroundSize=[200,200].to("size"),this.size=[360,460].to("size"),this},this.render=function(){return{drawImage:[this.image,this.left,this.image.getAttribute("top")*this.image.naturalHeight/15,this.size.width,this.size.height,this.position.x,this.position.y,this.backgroundSize.width,this.backgroundSize.height]}},this.hover=function(){this.selected||(this.left=this.image.naturalWidth/3)},this.unhover=function(){this.selected||(this.left=0)},this.select=function(){this.selected=!0,this.left=2*this.image.naturalWidth/3},this.deselect=function(){this.selected=!1,this.left=0},this.is=function(_type){return $(this.image).is(_type)},this.id=function(){return this.$image.id()}}),canvas={ctx:null,node:null,content:null,scale:1,init:function init(_canvas,_size,_scale){var size;size=_scale?_size.scale(_scale):_size,this.node=_canvas,this.ctx=_canvas.getContext("2d"),this.scale=_scale||1,~size.indexOf(void 0)||(_canvas.width=size.width,_canvas.height=size.height),this.ctx.scale(_scale,_scale),this.node.onmousemove=function(_e){var offset,cursor,scale;scale=self.game.transformScale().x,offset=self.$els.absolutePosition().scale(1/scale),cursor=pl.Point.create().set(_e.x,_e.y).scale(scale/self.game.zoom).dec(offset).math("floor"),self.reverseItems.every(function(_item){return self.isImageTarget(_item,cursor)?(_item.hover(),!1):(_item.unhover(),!0)})}},resize:function resize(_size,_scale){var size;size=_scale?_size.scale(_scale):_size,this.node.width=size.width,this.node.height=size.height,this.scale=_scale||1,this.ctx.scale(_scale,_scale)},clear:function clear(){this.ctx.clearRect(0,0,this.node.width/this.scale,this.node.height/this.scale)},draw:function draw(_obj){var commands,cmd;commands=_obj.render();for(cmd in commands)"function"==typeof this.ctx[cmd]&&this.ctx[cmd].apply(this.ctx,commands[cmd])}},this.items=null,this.player=null,this.canvas=null,this.buffer=null,this.bctx=null,this.isRunning=!1,this.init=function(){this.buffer=document.createElement("canvas"),this.bctx=this.buffer.getContext("2d")},this.on("ready",function(_event){var canvasSize,width,height;this.is(_event.target)&&(this.buffer.width=width=this.width(),this.buffer.height=height=this.height(),this.items=this.bin.find("img").map(function(_i,_node){var item=Item.create().init(_node);return item.position.x=40+120*_i%(width-280),item.position.y=height+250*_i%(2*height),item.speed=(5*_i%3+2)/2,item}).toArray(),this.reverseItems=this.items.slice().reverse(),canvasSize=pl.Size.create().set(width,height),canvas.init(this.canvas[0],canvasSize,this.game.zoom),this.game.viewport.onResize(this.game.bind(function(){canvas.resize(canvasSize,this.zoom)})))}),this.start=function(){this.isRunning=!0,this.eachFrame(this.onEachFrame),this.items.forEach(function(_item){_item.deselect()})},this.stop=function(){this.eachFrame(this.onEachFrame,!1)},this.onEachFrame=function(){this.isRunning&&(canvas.clear(),gameLoop.frame(this),this.items.forEach(function(_item){canvas.draw(_item)}))},this.isImageTarget=function(_item,_point){var pixel;return this.bctx.clearRect(0,0,this.buffer.width,this.buffer.height),this.bctx.drawImage(_item.image,0,_item.image.getAttribute("top")*_item.image.naturalHeight/15,_item.size.width,_item.size.height,_item.position.x,_item.position.y,_item.backgroundSize.width,_item.backgroundSize.height),pixel=this.bctx.getImageData(_point.x,_point.y,1,1),this.bctx.fillStyle="white",this.bctx.fillRect(_point.x,_point.y,5,5),pixel.data[3]>0},this.behavior("select",function(){var offset,cursor,scale,returnValue=!1;return scale=this.game.transformScale().x,offset=this.$els.absolutePosition().scale(1/scale),cursor=this.event.cursor.scale(scale/this.game.zoom).dec(offset).math("floor"),this.reverseItems.every(function(_item){return self.isImageTarget(_item,cursor)?(_item.select(),returnValue={message:_item.$image.id(),behaviorTarget:_item.$image},!1):!0}),returnValue})})},function(module,exports){pl.game.component("selectable-reveal",function(){this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.selectState||"select",Number.isInteger(index)&&~index&&(this[stateMethod](_event.behaviorTarget),this.reveal.item(index))}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()?!this.screen.state(this.STATE.VOICE_OVER):!1}})})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target,message;if(this.event){if($target=$(this.event.target).closest("li"),message=$target.id()||$target.index(),this.shouldSelect($target)!==!1)return{message:message,behaviorTarget:$target}}else this.proto(_target);return!1}),this.shouldSelect=function(_$target){return this.allowSelectAll||_$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()?!this.screen.state(this.STATE.VOICE_OVER):!1},this.start=function(){this.allowSelectAll="undefined"!=typeof this.attr("pl-allow-select-all")}})},function(module,exports){pl.game.component("title",function(){})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(9),__webpack_require__(12),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(13),__webpack_require__(11),pl.game("drought-out",function(){var self=this;pl.game.attachScreen=function(cb){cb.call(self)};var selectScreen=function selectScreen(){this.respond("select",function(_event){var vo;_event.behaviorTarget.is("li")&&(null==_event.behaviorTarget.attr("pl-correct")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.selectable.audio.voiceOver[_event.message]),vo&&vo.play())}),this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))})};this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&(this.require("cacti"),this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash())}),this.on("animationend",function(_e){"cacti"===$(_e.target).id()&&(this.isComplete||this.requiredQueue.ready("cacti"))})}),this.screen("think",selectScreen),this.screen("balloons",function(){this.respond("select",function(_event){var vo,sfx;switch(null!=_event.behaviorTarget.attr("pl-incorrect")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.audio.voiceOver[_event.message]),_event.message){case"bathing":case"drinking":case"canoeing":case"factories":case"lawns":case"flowers":case"animalFeed":sfx=this.audio.sfx.yellow;break;case"washingDishes":case"swimming":case"brushingTeeth":case"electricity":sfx=this.audio.sfx.green;break;case"cooking":case"rafting":case"waterSlides":case"growingFood":sfx=this.audio.sfx.red}vo&&vo.play(),sfx&&sfx.play()}),this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))}),this.startAudio=function(){}}),this.screen("what-can-we-do",selectScreen),this.screen("shower",function(){this.respond("select",function(_event){var vo;null==_event.behaviorTarget.attr("pl-correct")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.audio.voiceOver[_event.message]),vo&&vo.play()}),this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))})}),this.screen("conserve",function(){var item=0;this.openDoor=function(){this.shouldProceed()&&(this.select(),this.reveal.item(item),this.audio.sfx.open.play())},this.on("ui-open",function(_e){var self=this;this.is(_e.target)&&(this.length=this.reveal.find("li").length,this.reveal.audio.voiceOver.on("ended",function(){self.audio.sfx.close.play(),self.deselect(),item=(item+1)%self.length}),this.isComplete&&(item=0))}),this.on("ui-close ui-leave",function(_e){this.is(_e.target)&&this.reveal.audio.voiceOver.off("ended")})}),this.screen("flip",function(){this.next=function(){this.game.quit.okay()},this.on("ui-open",function(){this.audio&&this.audio.sfx&&this.delay("9.5s",this.audio.sfx.play.bind(this.audio.sfx))}),this.complete=function(){var eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" ");return ga("send","event",eventCategory,"complete"),pl.game.report.flip(this,{name:"flip",gameData:{id:this.game.id()}}),this.proto()}}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map