!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(10)},function(module,exports){pl.game.component("multiple-choice",function(){function validateAnswer(_scope){var answers;return _scope.properties.correct&&(answers=_scope.properties.correct.split(/\s*,\s*/),~answers.indexOf(String(_scope.getSelected().index()))?(_scope.complete(),_scope.audio.sfx.correct&&_scope.audio.sfx.correct.play(),_scope.audio.voiceOver.correct&&_scope.audio.voiceOver.correct.play()):(_scope.audio.sfx.incorrect&&_scope.audio.sfx.incorrect.play(),_scope.audio.voiceOver.incorrect&&_scope.audio.voiceOver.incorrect.play())),!1}this.answer=function(){var $li;this.event&&($li=$(this.event.target).closest("li"),!this.isComplete&&this.select($li)&&validateAnswer(this))}})},function(module,exports){pl.game.component("reveal",function(){this.item=function(_id){var vo,index;this.close(this.find("li.OPEN")),"number"==typeof _id?(this.open(this.find("li").eq(_id)),this.screen.playSound(this.audio.voiceOver[_id])):"string"==typeof _id&&this[_id]&&(this.open(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&this.screen.playSound(vo)))},this.closeAll=function(){this.allowAction()&&(this.game.audio.sfx.button&&this.game.audio.sfx.button.play(),this.close(this.find("li.OPEN")))}})},function(module,exports){pl.game.component("screen-basic",function(){this.allowAction=function(){return this.screen.state(this.screen.STATE.OPEN)&&!this.screen.state(this.screen.STATE.VOICE_OVER)||this.game.demoMode},this.playSound=function(_sound){var delay,$sound;return $sound=$(_sound),delay=$sound.attr("pl-delay"),"voiceOver"===_sound.type&&(this.currentVO=_sound),delay?this.delay(delay,_sound.play.bind(_sound)):_sound.play()},this.ready=function(){this.isMemberSafe("requiredQueue")&&this.requiredQueue&&this.requiredQueue.on("complete",this.bind(function(){var sfx;sfx=pl.util.resolvePath(this,"game.audio.sfx.screenComplete"),sfx&&this.playSound(sfx)})),this.state(this.STATE.OPEN)&&this.start()},this.next=function(){var nextScreen,buttonSound;return nextScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),nextScreen&&(this.leave(),nextScreen.open(),buttonSound&&this.playSound(buttonSound)),nextScreen},this.prev=function(){var prevScreen,buttonSound;return prevScreen=this.proto(),buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),prevScreen&&(this.screen.close(),prevScreen.open(),buttonSound&&this.playSound(buttonSound)),prevScreen},this.start=function(){var bgSound,voSound;return bgSound=pl.util.resolvePath(this,"audio.background[0]?"),voSound=pl.util.resolvePath(this,"audio.voiceOver[0]?"),bgSound&&this.playSound(bgSound),voSound&&this.playSound(voSound),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.stop=function(){return this.currentVO&&this.currentVO.stop(),this},this.on("ui-open",function(_event){this.isReady&&this===_event.targetScope&&this.off("transitionend").on("transitionend",function(_e){this.is(_e.target)&&(this.start(),this.off("transitionend"))}.bind(this)),(!this.requiredQueue||this.hasOwnProperty("requiredQueue")&&!this.requiredQueue.length)&&this.complete()}),this.on("ui-leave ui-close",function(_event){this.is(_event.target)&&this.stop()})})},function(module,exports){pl.game.component("screen-quit",function(){this.on("transitionend",function(_event){this.is(_event.target)&&this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.init=function(){this.addClass("LEAVE LEAVE-END")},this.okay=function(){this.game.audio.sfx.button.play(),this.game.exit()},this.cancel=function(){this.game.audio.sfx.button.play(),this.leave()}})},function(module,exports){pl.game.component("selectable-reveal",function(){this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.selectState||"select",~index&&(this[stateMethod](_event.behaviorTarget),this.reveal.item(index),this.features.correct.ready(index))}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().state(this.STATE.HIGHLIGHTED)||0===_$target.index()||_$target.is("[pl-always-selectable]")?!(this.screen.state(this.STATE.VOICE_OVER)||_$target.state(this.STATE.HIGHLIGHTED)):!1}}),this.ready=function(){var correct;correct=pl.Queue.create(),correct.on("complete",this.bind(function(){this.complete()})),this.features=this.find(".items li").map(function(_index){return correct.add(_index),_index}).toArray(),this.features.correct=correct}})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target;if(this.event){if($target=$(this.event.target).closest("li"),this.shouldSelect($target)!==!1)return this.game.audio.sfx.correct&&this.game.audio.sfx.correct.play(),{message:$target.index(),behaviorTarget:$target}}else this.proto(_target);return!1}),this.shouldSelect=function(){return!0}})},function(module,exports){pl.game.component("title",function(){this.startAudio=function(){this.audio.background.play()}})},function(module,exports){pl.game.component("video",function(){var bg;this.start=function(){this.video.on("ended",function(){this.complete()}.bind(this)),this.stopBackground(),this.video[0].play()},this.stopBackground=function(){!this.properties.playBackground&&(bg=this.game.media.playing(".background"))&&bg.stop("@ALL")},this.pause=function(){this.video[0].pause()},this.resume=function(){this.isComplete||(this.stopBackground(),this.video[0].play())}})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(9),__webpack_require__(12),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(13),__webpack_require__(11),pl.game("be-bright",function(){var screens,restart,vScreens,startVideo;restart=function(){this.on("ui-open",function(_event){this.is(_event.target)&&(this.unhighlight(this.find(".HIGHLIGHTED")),this.selectableReveal.reveal.closeAll())})},startVideo=function(){this.on("ui-open",function(_e){this.is(_e.target)&&setTimeout(function(){this.video.start()}.bind(this),250)}),this.on("ui-close ui-leave",function(){this.video.pause(),this.game.bgSound&&this.game.bgSound.play()})},this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.start(),this.off("transitionend"),this.delay("3s",function(){this.title.complete(),this.title.audio.sfx.play()}))}),this.prev=function(){},this.startAudio=function(){this.title.startAudio()}}),screens=["bulbs","switches"],screens.map(function(name){this.screen(name,restart)}.bind(this)),this.screen("pig",function(){this.on("ui-open",function(_event){this.is(_event.target)&&(this.deselect(this.find(".SELECTED")),this.multipleChoice.removeClass("COMPLETE").isComplete=!1)})}),vScreens=["video","video-2"],vScreens.map(function(name){this.screen(name,startVideo)}.bind(this)),this.screen("flip",function(){this.on("ui-open",function(){this.audio.voiceOver.on("ended",function(){this.stampImg.addClass("START"),this.audio.sfx.stamp.play()}.bind(this))}),this.on("ui-close ui-leave",function(){this.audio.voiceOver.off("ended")}),this.next=function(){this.game.quit.okay()},this.complete=function(){var eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" ");return ga("send","event",eventCategory,"complete"),pl.game.trigger($.Event("platform-event",{name:"flip",gameData:{id:this.game.id()}})),this.proto()}}),this.screen("quit",function(){this.on("ui-open",function(){this.game.audio.sfx.button.play()})}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map