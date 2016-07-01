!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(13)},function(module,exports){pl.game.component("characters",function(){function preventDrag(_event){var $target,isDisabled;$target=$(_event.target),isDisabled=[this.state(this.STATE.DISABLED),$target.state(this.STATE.DISABLED)],~isDisabled.indexOf(!0)&&_event.stopPropagation()}this.$active=null,this.on("drag-start",function(_event){(this.$active=_event.state.$draggable.closest("li")).addClass("ACTIVE")}),this.on("initialize",function(){var eventName="undefined"!=typeof this.$els[0].ontouchstart?"touchstart":"mousedown";this.listen(eventName,!0,preventDrag.bind(this))}),this.respond("answer",function(_event){"correct"===_event.message&&this.disable(this.$active.removeClass("ACTIVE"))})})},function(module,exports){pl.game.component("dropzone",function(){function reportState(_state){return{state:_state,behaviorTarget:_state.$draggable}}this.entity(".area",function(){this.cache=null,this.respond("grab",function(){this.cache={position:this.absolutePosition().dec(this.game.absolutePosition()),size:this.size().scale(this.game.transformScale().x)}}),this.respond("release",function(_event){if(_event.state.progress.point&&this.isPointInBounds(_event.state.progress.point)){if(this.takes(_event.state.$draggable.id()))return _event.state.$draggable.removeClass("PLUCKED"),_event.state.$helper.addClass("DROPED"),void this.drop(_event.state.$draggable);this.reject(_event.state)}this.missed(_event.state),_event.state.$helper.addClass("RETURN")})}),this.init=function(){this.takes().forEach(this.bind(function(_id){this.require(_id)}))},this.takes=function(_id){var takes;return this.properties.take?(takes=this.properties.take.split(/\s+/),null!=_id?!!~takes.indexOf(_id):takes):null!=_id?!0:[]},this.isPointInBounds=function(){var point,scale;return point=pl.Point.create(arguments),1!==(scale=this.game.transformScale().x)&&(point=point.scale(1/scale)),point.x>=this.cache.position.x&&point.x<=this.cache.position.x+this.cache.size.width&&point.y>=this.cache.position.y&&point.y<=this.cache.position.y+this.cache.size.height},this.behavior("drop",function(_$draggable){return _$draggable.id()&&this.requiredQueue.ready(_$draggable.id()),{behaviorTarget:_$draggable}}),this.behavior("missed",reportState),this.behavior("reject",reportState)})},function(module,exports){pl.game.component("frame",function(){this.start=function(){var voSound;return this.audio&&(voSound=this.audio.voiceOver[0],this.audio.background.play(),voSound&&!voSound.config("dontautoplay")&&voSound.play()),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.handleProperty({title:function title(_node,_name,_value){this.is(_node)&&(this.find(".frame").addClass("title"),this.game.defineRule(".experiment:nth-of-type("+(this.screen.index()+1)+") .frame-component .frame.title::before",{backgroundImage:"url("+_value+")"}))}}),this.on("ui-open",function(_event){this.isReady&&this.start(),this===_event.targetScope&&(this.hasOwnProperty("isComplete")&&this.isComplete||this.hasOwnProperty("requiredQueue")&&this.requiredQueue&&this.requiredQueue.length||this.complete())})})},function(module,exports){pl.game.component("multiple-choice",function(){function validateAnswer(_$selected){var index;if(this.properties.correct){if(index=_$selected.index(),this.correct.has(index))return this.correct.ready(index),!0}else if(_$selected&&_$selected.is("[pl-correct]")&&this.correct.has(_$selected[0]))return this.correct.ready(_$selected[0]),!0;return!1}this.correct=null,this.handleProperty({correct:function correct(_node){var answers;this.correct||(this.correct=pl.Queue.create(),this.correct.on("complete",this.bind(function(){this.complete()}))),this.is(_node)?(answers=this.properties.correct.split(/\s*,\s*/),answers.forEach(this.bind(function(_index){this.correct.add(Number(_index))}))):this.correct.add(_node)}}),this.start=function(){var self=this;this.find("[pl-correct]").each(function(i,_node){self.correct.add(_node)})},this.behavior("answer",function(_$target){var isCorrect;return this.select(_$target)&&(isCorrect=validateAnswer.call(this,_$target)),{message:isCorrect?"correct":"incorrect",behaviorTarget:_$target}})})},function(module,exports){pl.game.component("reveal",function(){this.items=null,this.on("ready",function(){this.items=this.findOwn("li")}),this.start=function(){},this.item=function(_id){var vo,index;return this.shouldRevealItem(_id)===!1?!1:("number"==typeof _id?(this.select(this.items[_id]),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.select(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&vo.play())),this)},this.shouldRevealItem=function(_id){return!!this.items[_id]||!!this[_id]},this.behavior("deselectTarget",function(_$target){return this.state(this.STATE.VOICE_OVER)&&!this.game.demoMode||this.deselect(_$target),{message:_$target.index()}})})},function(module,exports){pl.game.component("screen-basic",function(){this.on("ready",function(_e){var self=this;this.is(_e.target)&&this.isMemberSafe("requiredQueue")&&this.requiredQueue&&this.requiredQueue.on("complete",function(){var sfx;sfx=pl.util.resolvePath(self,"game.audio.sfx.screenComplete"),sfx&&sfx.play()})}),this.next=function(){var nextScreen,buttonSound;return this.hasClass("last")&&this.hasClass("COMPLETE")&&this.game.quit.okay(),nextScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),nextScreen&&(this.screen.leave(),nextScreen.open(),buttonSound&&buttonSound.play()),nextScreen},this.prev=function(){var prevScreen,buttonSound;return prevScreen=this.proto(),buttonSound=this.game.audio.sfx.button,prevScreen&&(this.screen.close(),prevScreen.open(),buttonSound&&buttonSound.play()),prevScreen},this.start=function(){return this.startAudio(),this.startEntities(),this},this.startEntities=function(){return this.hasOwnProperty("entities")&&this.entities&&this.entities.forEach(function(_node){"function"==typeof _node.start&&_node.start()}),!1},this.on("ui-open",function(_event){this.is(_event.target)&&(this.isReady&&this.start(),this.isComplete||(!this.requiredQueue||this.isMemberSafe("requiredQueue")&&!this.requiredQueue.length)&&this.complete(),this.screen.isLast()&&this.addClass("last"))}),this.on("ui-close",function(_event){this.isReady&&this===_event.targetScope&&this.stop()})})},function(module,exports){pl.game.component("screen-quit",function(){this.on("transitionend",function(_event){this.is(_event.target)&&this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.okay=function(){this.screen.audio.sfx.play(),this.game.exit()},this.cancel=function(){this.screen.audio.sfx.play(),this.leave()}})},function(module,exports){pl.game.component("selectable-all",function(){function populateViewport(){var width,i,columns;for(width=this.$bin.outerWidth(!0),columns=Math.floor(this.$viewport.width()/width),i=0;columns>i;i+=1)this.columns.push(Column.create().init(this.$bin,this.$viewport))}var Column;Column=pl.Basic.extend(function(){this.$el=null,this.$collection=null,this.$viewport=null,this.shouldRecycle=!0,this.init=function(_$collection,_$viewport){return this.$collection=_$collection,this.$viewport=_$viewport,this.$el=$(pl.util.random(_$collection)).clone(),this.$viewport.append(this.$el),this},this.recycle=function(){var $clone;if(this.shouldRecycle)return $clone=$(pl.util.random(this.$collection)).clone(),this.$el.replaceWith($clone),this.$el=$clone,setTimeout(this.bind(function(){this.launch()}),0),$clone},this.launch=function(){this.$el.on("transitionend",this.bind(function(_event){this.$el.is(_event.target)&&(this.recycle()||this.$el.off())})),this.$el.addClass("LAUNCHED")},this.bind=function(_fun){var self=this;return function(){return _fun.apply(self,arguments)}}}),this.$viewport=null,this.$bin=null,this.columns=null,this.count=0,this.init=function(){return this.$viewport=this.find(".viewport"),this.$bin=this.find(".bin li"),this.columns=[],populateViewport.call(this),$(window).on("resize",this.restart.bind(this)),this},this.start=function(){this.columns.forEach(function(_item){_item.launch()}),this.screen.requiredQueue.ready()},this.restart=function(){this.columns.forEach(function(_item){_item.recycle()})},this.stop=function(){this.columns.forEach(function(_item){_item.shouldRecycle=!1,_item.$el.removeClass("LAUNCHED").css("transition","none")})},this.behavior("pick",function(_$target){var message=this.count;if(null!=_$target.attr("pl-correct")&&(this.game.demoMode||!this.screen.state(this.STATE.VOICE_OVER)))return this.screen.requiredQueue.ready(this.count),this.screen.reveal.item(this.count),this.audio.sfx.play(),this.count=(this.count+1)%6,this.highlight(_$target),{message:message,behaviorTarget:_$target}})})},function(module,exports){pl.game.component("selectable-remove",function(){this.behavior("select",function(_target){var $target;if($target=$(this.event.target).closest("li"),this.event&&!_target&&!$target.hasClass(this.STATE.HIGHLIGHTED)){if(this.shouldSelect($target)!==!1)return $target.is("li")&&this.audio.sfx.correct.play(),{message:$target.attr("class"),behaviorTarget:$target};this.audio.sfx.incorrect.play()}return!1}),this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.selectState||"select",index&&(this[stateMethod](_event.behaviorTarget),this.items.correct.ready(index))}),this.shouldSelect=function(_target){var $target=$(_target);return $target.is("[pl-incorrect]")?!1:!this.screen.state(this.STATE.VOICE_OVER)},this.start=function(){var correct=pl.Queue.create();correct.on("complete",this.bind(function(){this.complete()})),this.items=this.find(".items li:not([pl-incorrect])").map(function(_index,_node){return correct.add(_node.className),_node}).toArray(),this.items.correct=correct},this.ready=function(){var $net=$(".selectable-remove-component .net");this.mousemove(this.bind(function(e){$net.css({left:e.clientX/this.game.zoom-72,top:e.clientY/this.game.zoom-50})}))}})},function(module,exports){pl.game.component("title",function(){this.start=function(){this.proto(),this.showTitle()},this.showTitle=function(){this.image.addClass("animated "+this.image.attr("pl-animation")),this.complete()}})},function(module,exports){pl.game.component("video",function(){var bg;this.start=function(){var self=this;this.video.on("ended",function(){self.complete()}),this.stopBackground(),this.video[0].play()},this.stopBackground=function(){!this.properties.playBackground&&(bg=this.game.media.playing(".background"))&&bg.stop("@ALL")},this.pause=function(){this.video[0].pause()},this.resume=function(){this.isComplete||(this.stopBackground(),this.video[0].play())},this.screen.on("ui-close",this.pause.bind(this))})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},bgVolume:{drop:.2,max:1},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(12),__webpack_require__(15),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(9),__webpack_require__(10),__webpack_require__(11),__webpack_require__(16),__webpack_require__(14),pl.game("sea-turtle",function(){this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()})}),this.screen("video",function(){this.on("ui-open",function(){this.video.start()}),this.on("ui-close",function(){this.video.pause()})}),this.screen("globe",function(){this.respond("answer",function(_event){var message,playing;message=this.reveal[_event.message],playing=this.reveal.audio.playing(),message&&!this.reveal.isComplete&&(this.reveal.select(message),this.delay("2s",function(){this.reveal.deselect(message)}),playing&&playing.stop(),this.delay("2.5s",function(){this.reveal.wellDone.state(this.STATE.SELECTED)||(this.reveal.item("instruction"),this.characters.enable())}))}),this.STATE.COMPLETE="COMPLETE",this.on("initialize",function(_event){this.is(_event.targetScope)&&(this.area=this.find(".area"))}),this.respond("drop",function(_event){var $character,sfx;$character=_event.behaviorTarget.parent(),sfx=pl.util.resolvePath(this,"dropzone.audio.sfx.drop"),this.area.find("div:eq("+$character.index()+")").addClass("show active"),this.reveal.item($character.index()+1),this.characters.disable(),this.deselect(this.reveal.find("img.response")),sfx&&sfx.play()}),this.respond("missed",function(_event){_event.behaviorTarget.parent().removeClass("ACTIVE")}),this.respond("answer",function(_event){var sfx;sfx=pl.util.resolvePath(this,"audio.sfx."+_event.message),sfx&&sfx.play(),_event.targetScope.state(this.STATE.COMPLETE)&&this.area.find("div.active").removeClass("active")}),this.respond("complete",function(_event){this.reveal.is(_event.targetScope)&&(this.reveal.item("wellDone"),this.audio.sfx.complete.play())}),this.on("ui-close ui-leave",function(_event){this.is(_event.target)&&(this.area.find(".active").removeClass("show active"),this.characters.$active&&this.characters.$active.removeClass("ACTIVE"),this.characters.enable())}),this.start=function(){this.proto(),this.reveal.item(0)},this.on("ui-open",function(_e){this.is(_e.target)&&this.isComplete&&(this.deselect(this.dropzone.find(".SELECTED")),this.enable(this.characters.find(".DISABLED")),this.dropzone.find(".show").removeClass("show"),this.reveal.item(0))})}),this.screen("trash",function(){this.on("ui-open",function(){this.unhighlight(this.find(".HIGHLIGHTED"))}),this.on("ui-close",function(_e){this.is(_e.target)&&this.isComplete&&this.delay(".5s",function(){this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))})})}),this.screen("jellyfish",function(){this.respond("deselectTarget",function(_event){this.isComplete||this.state(this.STATE.VOICE_OVER)&&!this.game.demoMode||this.screen.requiredQueue.ready(this.reveal.audio.voiceOver[_event.message])})}),this.screen("flip",function(){this.next=function(){this.game.quit.okay()},this.complete=function(){var eventCategory,theEvent=new Event("game-event",{bubbles:!0,cancelable:!1});return theEvent.name="flip",theEvent.gameData={id:this.game.id()},window.frameElement&&window.frameElement.dispatchEvent(theEvent),eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" "),ga("send","event",eventCategory,"complete"),this.proto()}}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state("READY")&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map