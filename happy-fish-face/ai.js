!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(13)},function(module,exports){pl.game.component("audio-sequence",function(){var i,sounds;this.on("ready",function(_event){this.is(_event.target)&&(sounds=this.find("audio").map(function(){return $(this).data("context")}).toArray(),this.audio.on("ended",function(){var next=sounds[i++];next&&this.screen.state(this.screen.STATE.OPEN)&&next.play()}.bind(this)))}),this.start=function(){i=1,sounds[0]&&sounds[0].play()}})},function(module,exports){pl.game.component("bubbles",function(){})},function(module,exports){pl.game.component("modal",function(){this.item=function(_id){this.select(this),this.reveal.item(_id)},this.close=function(){this.screen.state(this.screen.STATE.VOICE_OVER)&&!this.game.demoMode||this.deselect(this)}})},function(module,exports){pl.game.component("multiple-choice",function(){this.validateAnswer=function(){var answers;return this.properties.correct&&(answers=this.properties.correct.split(/\s*,\s*/),~answers.indexOf(String(this.getSelected().id()))?(this.audio.sfx.play("correct"),this.complete()):this.audio.sfx.play("incorrect")),!1},this.answer=function(){var $li;this.event&&($li=$(this.event.target).closest("li"),this.select($li)&&this.validateAnswer())}})},function(module,exports){pl.game.component("reveal",function(){this.item=function(_id){var vo,index;"number"==typeof _id?(this.select(this.find("li").eq(_id)),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.select(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&vo.play()))}})},function(module,exports){pl.game.component("score",function(){var _this=this;this.value=0,this.entity("board",function(){this.template=null,this.images=null,this.ready=function(){this.template=this.counter.html(),this.images=this.find("img")},this.render=function(){var image;return this.images.length&&(image=this.images[this.value],this.select(image)),this.counter.html(this.template.replace("{{score}}",this.value)),this}}),this.start=function(){_this.value=0,_this.board.render()},this.ready=function(){this.board.render()},this.up=function(_count){return this.value+=_count||1,this.board.render(),this.value>=this.properties.max&&this.complete(),this},this.down=function(_count){return this.value-=_count||1,this.board.render(),this.value>=this.properties.max&&this.complete(),this},this.state("incomplete","-COMPLETE",{willSet:function willSet(){this.isComplete=!1,this.value>=this.properties.max&&(this.value=this.properties.max-1)}})})},function(module,exports){pl.game.component("screen-basic",function(){this.on("ready",function(_event){this.is(_event.target)&&this.audio&&this.audio.rule(".voiceOver","shouldPlay",function(_e){_e.response(!_e.target.config("dontautoplay"))})}),this.allowAction=function(){return this.screen.state(this.screen.STATE.OPEN)&&!this.screen.state(this.screen.STATE.VOICE_OVER)||this.game.demoMode},this.next=function(){var nextScreen,buttonSound;return nextScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),nextScreen&&(this.leave(),nextScreen.open(),buttonSound&&buttonSound.play()),nextScreen},this.prev=function(){var prevScreen,buttonSound;return prevScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),prevScreen&&(this.screen.close(),prevScreen.open(),buttonSound&&buttonSound.play()),prevScreen},this.start=function(){var entities=this.hasOwnProperty("entities")&&this.entities;return this.startAudio(),this.audio&&this.audio.sfx.play("start"),entities&&entities.forEach(function(_entity){_entity.isMemberSafe("start")&&_entity.start()}),this},this.stop=function(){var entities=this.hasOwnProperty("entities")&&this.entities;return this.stopAudio(),this.kill("delay"),entities&&entities.forEach(function(_entity){_entity.isMemberSafe("start")&&_entity.stop()}),this},this.stopAudio=function(){this.audio&&(this.audio.voiceOver.stop("@ALL"),this.audio.sfx.stop("@ALL"))},this.complete=function(){return this.isComplete||this.game.audio.sfx.screenComplete.play(),this.proto()},this.on("ui-open",function(_event){this.is(_event.target)&&(this.isReady&&this.start(),this.properties.gameClass&&this.game.addClass(this.properties.gameClass))}),this.on("ui-leave ui-close",function(_event){this.is(_event.target)&&(this.stop(),this.properties.gameClass&&this.game.removeClass(this.properties.gameClass))})})},function(module,exports){pl.game.component("screen-quit",function(){this.buttonSound=function(){this.game.audio.sfx.button&&this.game.audio.sfx.button.play()},this.on("transitionend",function(){this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.buttonSound(),this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.init=function(){this.addClass("LEAVE LEAVE-END")},this.okay=function(){this.buttonSound(),this.game.exit()},this.cancel=function(){this.buttonSound(),this.leave()}})},function(module,exports){pl.game.component("selectable-reveal",function(){this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.select_state||"select",~index&&(this[stateMethod](_event.behaviorTarget),this.reveal.item(index))}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()?!this.screen.state(this.STATE.VOICE_OVER):!1}})})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target,message;if(this.event){if($target=$(this.event.target).closest("li"),message=$target.id()||$target.index(),this.shouldSelect($target)!==!1)return{message:message,behaviorTarget:$target}}else this.proto(_target);return!1}),this.shouldSelect=function(_$target){return this.screen.allowAction()&&_$target.is("li")},this.deselectAll=function(){var items=this.find("li");this.deselect(items),this.unhighlight(items)}})},function(module,exports){pl.game.component("timer",function(){function testTime(){var time;time=Date.now(),time>=this.stamp&&(this.stamp=time+1e3,this.time+=1,this.render(),1e3*this.time>=this.timeout&&this.timerComplete())}this.timeout=0,this.time=0,this.stamp=0,this.countDown=!1,this.behavior("timerComplete",function(){this.stop().complete()}),this.init=function(){return this.timeout=pl.util.toMillisec(this.properties.set),this},this.ready=function(){return this.screen.on("ui-open",this.bind(function(){this.start()})),this},this.start=function(){return this.eachFrame(testTime),this},this.restart=function(){return this.time=0,this.stamp=0,this.start(),this},this.stop=function(){return this.eachFrame(testTime,!1),this},this.pause=this.stop,this.resume=this.start,this.render=function(){return this.stopWatch.text(this.countDown?this.timeout/1e3-this.time:this.time),this},this.handleProperty({countdown:function countdown(_node,_name,_value){this.is(_node)&&(this.countDown="true"===_value)}})})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(12),__webpack_require__(15),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(9),__webpack_require__(10),__webpack_require__(11),__webpack_require__(16),__webpack_require__(14),pl.game("happy-fish-face",function(){var self=this;pl.game.attachScreen=function(cb){cb.call(self)};var garbage=function garbage(){this.on("ui-open",function(){this.game.addClass("garbage")}),this.on("ui-close ui-leave",function(){this.game.removeClass("garbage")})};this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()}),this.on("animationend",function(_event){!this.find(".fish")[0]!==_event.target&&this.screen.allowAction()&&this.complete()})}),this.screen("you-feel",function(){garbage.call(this),this.respond("select",function(_event){var id,stateMethod;id=_event.message,stateMethod=this.properties.selectState||"select",null!=id&&(this.audio.sfx.stop("@ALL"),this.audio.sfx.play(id),this[stateMethod](_event.behaviorTarget),this.delay("2s",function(){this.requiredQueue.ready("select")}))}),this.on("ready",function(_event){this.is(_event.target)&&this.require("select")}),this.on("ui-open",function(){this.deselect(this.find(".SELECTED"))})}),this.screen("water-pollution",garbage),this.screen("healthy-water",function(){this.on("ui-open",function(){this.game.addClass("garbage")}),this.on("ui-close ui-leave",function(){this.game.removeClass("garbage")}),this.on("ui-open",function(){this.deselect(this.find(".SELECTED"))})}),this.screen("clean-water",garbage),this.screen("multi-bubbles",function(){this.SELECTER={CORRECT:"[pl-correct]"},this.respond("select",function(_event){_event.behaviorTarget.hasClass("HIGHLIGHTED")||(~this.items.correct.indexOf(_event.message)?(this.audio.voiceOver.play(_event.message),this.highlight(_event.behaviorTarget),this.score.up(10),this.items.correct.ready(_event.message)):(this.score.down(10),this.audio.sfx.incorrect.play()))}),this.on("ui-open",function(_e){var correct;this.is(_e.target)&&(this.isComplete&&(this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED)),this.start()),this.items||(correct=pl.Queue.create(),correct.on("complete",this.bind(function(){this.game.audio.sfx.screenComplete.play(),this.complete()})),this.items=this.find(this.SELECTER.CORRECT).map(function(_index,_node){return correct.add($(_node).id()),_node}).toArray(),this.items.correct=correct))})}),this.screen("trash",function(){this.SELECTOR={CORRECT:"[pl-correct]"},this.on("ready",function(_event){this.is(_event.target)&&this.on("touchstart",function(){this.addClass("TOUCH")}.bind(this))}),this.setup=function(){var correct=pl.Queue.create();correct.on("complete",this.bind(function(){this.timer.stop(),this.modal.item("goodJob"),this.addClass("GOOD-JOB")})),this.items=this.$items.map(function(_index,_node){return correct.add($(_node).id()),_node}).toArray(),this.unhighlight(this.$items),this.items.correct=correct,this.removeClass("TRY-AGAIN GOOD-JOB")},this.reset=function(){this.setup(),this.deselect(this.modal),this.timer.restart()},this.respond("select",function(_event){~this.items.correct.indexOf(_event.message)?(this.audio.sfx.correct.play(),this.highlight(_event.behaviorTarget),this.items.correct.ready(_event.message)):this.audio.sfx.incorrect.play()}),this.respond("timerComplete",function(){this.addClass("TRY-AGAIN").modal.item("tryAgain")}),this.on("ui-open",function(_e){this.is(_e.target)&&(this.modal.state(this.STATE.SELECTED)&&this.reset(),this.$net||(this.$net=this.find(".net"),this.mousemove(function(e){this.$net.css({left:e.clientX/this.game.zoom-50,top:e.clientY/this.game.zoom-65})}.bind(this))),this.$items||(this.$items=this.find(this.SELECTOR.CORRECT),this.setup()),this.modal.reveal.audio.voiceOver.on("ended",function(_ev){this.screen.state(this.STATE.OPEN)&&"goodJob"===_ev.target.id()&&this.audio.voiceOver.neverThrow.play()}.bind(this.modal.reveal)))}),this.on("ui-leave ui-close",function(){this.modal.reveal.audio.voiceOver.off("ended")})}),this.screen("flip",function(){this.next=function(){this.game.quit.okay()},this.complete=function(){var eventCategory,theEvent=new Event("game-event",{bubbles:!0,cancelable:!1});return theEvent.name="flip",theEvent.gameData={id:this.game.id()},window.frameElement&&window.frameElement.dispatchEvent(theEvent),eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" "),ga("send","event",eventCategory,"complete"),this.proto()}}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map