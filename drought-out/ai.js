!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(10)},function(module,exports){pl.game.component("audio-sequence",function(){var sounds;this.on("ready",function(_event){var self=this;this.is(_event.target)&&(sounds=this.audio.find(".audio"),this.audio.on("ended",function(_event){var next=sounds[self.i++];next&&next.play()}))}),this.start=function(){this.i=1,sounds.length&&sounds.play()}})},function(module,exports){pl.game.component("background",function(){var characters;this.handleProperty({bg:function bg(_node,_name,_value){var img=new Image;characters||(characters=[]),img.src=_value,characters.push(img),$(_node).css("background-image","url("+_value+")")}})})},function(module,exports){pl.game.component("reveal",function(){this.item=function(_id){var vo,index;"number"==typeof _id?(this.select(this.find("li").eq(_id)),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.select(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&vo.play()))},this.start=function(){}})},function(module,exports){pl.game.component("screen-basic",function(){this.shouldProceed=function(){return!this.state(this.STATE.VOICE_OVER)||this.game.demoMode},this.next=function(){var nextScreen,buttonSound;return nextScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),nextScreen&&(this.leave(),nextScreen.open(),buttonSound&&buttonSound.play()),nextScreen},this.prev=function(){var prevScreen,buttonSound;return prevScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),prevScreen&&(this.screen.close(),prevScreen.open(),buttonSound&&buttonSound.play()),prevScreen},this.start=function(){var fxSound=this.audio&&this.audio.sfx.start;return this.startAudio(),fxSound&&fxSound.play(),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.stop=function(){return this.timeoutID&&clearTimeout(this.timeoutID),this.proto()},this.on("ui-open",function(_event){this.isReady&&this===_event.targetScope&&this.start(),this.properties.gameClass&&this.game.addClass(this.properties.gameClass),(!this.requiredQueue||this.hasOwnProperty("requiredQueue")&&!this.requiredQueue.length)&&this.complete()}),this.on("ui-leave",function(_event){this.properties.gameClass&&this.game.removeClass(this.properties.gameClass),this.isReady&&this===_event.targetScope&&this.stop()}),this.on("ui-close",function(_event){this.properties.gameClass&&this.game.removeClass(this.properties.gameClass),this.isReady&&this===_event.targetScope&&this.stop()}),this.complete=function(){var audio;return audio=this.audio&&this.audio.has("screenComplete")?this.audio:this.game.audio,audio.sfx.play("screenComplete"),this.proto()},this.on("ready",function(){this.state(this.STATE.OPEN)&&this.start()})})},function(module,exports){pl.game.component("screen-quit",function(){this.buttonSound=function(){this.game.audio.sfx.button&&this.game.audio.sfx.button.play()},this.on("transitionend",function(_event){this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.buttonSound(),this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0)}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.init=function(){this.addClass("LEAVE LEAVE-END")},this.okay=function(){this.buttonSound(),this.game.exit()},this.cancel=function(){this.buttonSound(),this.leave()}})},function(module,exports){pl.game.component("selectable-reveal",function(){this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.selectState||"select",Number.isInteger(index)&&~index&&(this[stateMethod](_event.behaviorTarget),this.reveal.item(index))}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()?!this.screen.state(this.STATE.VOICE_OVER):!1}})})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target,message;if(this.event){if($target=$(this.event.target).closest("li"),message=$target.id()||$target.index(),this.shouldSelect($target)!==!1)return{message:message,behaviorTarget:$target}}else this.proto(_target);return!1}),this.shouldSelect=function(_target){return!this.screen.state(this.STATE.VOICE_OVER)},this.start=function(){}})},function(module,exports){pl.game.component("title",function(){})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(9),__webpack_require__(12),__webpack_require__(4),__webpack_require__(5),__webpack_require__(2),__webpack_require__(8),__webpack_require__(7),__webpack_require__(6),__webpack_require__(3),__webpack_require__(1),__webpack_require__(13),__webpack_require__(11),pl.game("drought-out",function(){var selectScreen=function selectScreen(){this.respond("select",function(_event){var vo;_event.behaviorTarget.is("li")&&(null==_event.behaviorTarget.attr("pl-correct")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.selectable.audio.voiceOver[_event.message]),vo&&vo.play())}),this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))})};this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()}),this.entity("cacti",function(){this.on("animationend",function(_e){this.is(_e.target)&&this.complete()})})}),this.screen("think",selectScreen),this.screen("balloons",function(){this.respond("select",function(_event){var vo,sfx;switch(null!=_event.behaviorTarget.attr("pl-incorrect")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.selectable.audio.voiceOver[_event.message]),_event.message){case"bathing":case"drinking":case"canoeing":case"factories":case"lawns":case"flowers":case"animalFeed":sfx=this.audio.sfx.yellow;break;case"washingDishes":case"swimming":case"brushingTeeth":case"electricity":sfx=this.audio.sfx.green;break;case"cooking":case"rafting":case"waterSlides":case"growingFood":sfx=this.audio.sfx.red}vo&&vo.play(),sfx&&sfx.play()})}),this.screen("what-can-we-do",selectScreen),this.screen("shower",function(){this.respond("select",function(_event){var vo;null==_event.behaviorTarget.attr("pl-correct")?vo=this.audio.sfx.incorrect:(this.highlight(_event.behaviorTarget),vo=this.selectable.audio.voiceOver[_event.message]),vo&&vo.play()}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()?!this.screen.state(this.STATE.VOICE_OVER):!1}}),this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))})}),this.screen("conserve",function(){var item=0;this.openDoor=function(){this.shouldProceed()&&(this.select(this),this.reveal.item(item),this.audio.sfx.open.play())},this.on("ready",function(_e){var self=this;this.is(_e.target)&&this.reveal.audio&&this.reveal.audio.voiceOver.on("ended",function(audio){self.audio.sfx.close.play(),self.deselect(),item++})}),this.on("ui-open",function(_e){this.is(_e.target)&&this.isComplete&&(item=0)})}),this.screen("flip",function(){this.next=function(){this.game.quit.okay()},this.on("ui-open",function(){this.audio&&this.audio.sfx&&this.delay("9.5s",this.audio.sfx.play.bind(this.audio.sfx))})})})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}}]);
//# sourceMappingURL=ai.js.map