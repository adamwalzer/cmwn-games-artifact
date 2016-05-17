!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(15)},function(module,exports){pl.game.component("cannon",function(){this.entity("ball",function(){this.reloadRequest=!1,this.isLaunchComplete=!1,this.willInit=function(){this.cannon.properties.ball&&(this.attr("src",this.cannon.properties.ball),this.on("load",function(){this.assetQueue.ready(this.node().src),this.off("load")}))},this.on("transitionend",function(){this.log("transitionend"),this.isLaunchComplete=!0,this.launched()&&(this.playSFX("hit"),this.reloadRequest&&this.reload())}),this.state("launch launched","+LAUNCHED -RELOAD",{didSet:function didSet(){this.playSFX("fire"),this.isLaunchComplete=!1}}),this.state("reload","+RELOAD -LAUNCHED",{shouldSet:function shouldSet(){return this.isLaunchComplete?void 0:(this.reloadRequest=!0,!1)},didSet:function didSet(){this.reloadRequest=!1}})}),this.behavior("fire",function(){return this.ball.launch(),{message:this.cannon.properties.fire}}),this.reload=function(){this.ball.reload()},this.playSFX=function(_name){var sfx;return sfx=pl.util.resolvePath(this,"audio.sfx."+_name),sfx&&sfx.play(),this}})},function(module,exports){pl.game.component("carousel",function(){this.TYPE=function(){return this.SLIDE="slide",this.CROSS_FADE="cross-fade",this}.call(["slide","cross-fade"]),this.type=null,this.$images=null,this.nodes=null,this.shouldRandomize=!1,this.isPlaying=!1,this.hitTarget=null,this.ready=function(){this.$images=this.find("img"),this.shouldRandomize=this.properties.has("randomize"),this.TYPE.every(this.bind(function(_type){return!this.hasClass(_type)}))&&this.addClass(this.TYPE.CROSS_FADE),this.$images.length&&(this.nodes=this.$images.map(this.bind(function(_index,_node){var siblings;return siblings=[_node.previousSibling,_node.nextSibling],siblings.forEach(function(_n){_n.nodeType===document.TEXT_NODE&&$(_n).remove()}),_node})).toArray()),this.TYPE.forEach(this.bind(function(_item){this.hasClass(_item)&&(this.type=_item)})),this.on("transitionend",function(_event){"IMG"===_event.target.nodeName&&$(_event.target).state(this.STATE.LEAVE)&&this.recycle()})},this.provideBehaviorTarget=function(){return this.properties.targetNext?this.current().next():this.current()},this.respond("fire",function(_event){this.hit(_event.message)}),this.behavior("hit",function(_message){return{message:_message,behaviorTarget:this.provideBehaviorTarget()}}),this.behavior("next",function(){var current;current=this.$images.first(),this.leave(current),this.open(current.next())}),this.start=function(){var delay;delay=pl.util.toMillisec(this.properties.delay)||1e3,this.isReady&&!this.isPlaying?(this.isPlaying=!0,this.open(this.$images.first()),this.repeat(delay,this.next)):this.on("ready",this.beginShow)},this.stop=function(){this.kill("repeat"),this.isPlaying=!1},this.current=function(){return this.$images.filter(".OPEN")},this.recycle=function(){var $current,reload;return $current=this.$images.first(),reload=this.reloadWithNode(this.$images[0]),$current.removeClass(this.STATE.LEAVE),$current.remove(),[].shift.call(this.$images),this.$images.push(reload),this.append(reload),this},this.reloadWithNode=function(_item){var $clone,state;return this.shouldRandomize?($clone=$(pl.util.random(this.nodes)).clone(),state=$clone.state(),state&&$clone.removeClass(state.join?state.join(" "):state),$clone[0]):_item}})},function(module,exports){pl.game.component("frame",function(){this.ready=function(){this.isMemberSafe("requiredQueue")&&this.requiredQueue&&this.requiredQueue.on("complete",this.bind(function(){var sfx;sfx=pl.util.resolvePath(this,"game.audio.sfx.screenComplete"),sfx&&sfx.play()}))},this.start=function(){var voSound;return this.audio&&(voSound=this.audio.voiceOver[0],this.audio.background.play(),voSound&&!voSound.config("dontautoplay")&&voSound.play()),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.on("ui-open",function(_event){this.isReady&&this.start(),this===_event.targetScope&&(this.hasOwnProperty("isComplete")&&this.isComplete||this.hasOwnProperty("requiredQueue")&&this.requiredQueue&&this.requiredQueue.length||this.complete())}),this.on("ui-close",function(_event){this.isReady&&this.is(_event.target)&&this.stop()})})},function(module,exports){pl.game.component("map",function(){var SELECTOR;SELECTOR={CORRECT:"[pl-correct]",INCORRECT:"[pl-incorrect]"},this.buffer=null,this.bctx=null,this.countries=null,this.grayMap=null,this.iceland=null,this.russia=null,this.northPole=null,this.greenland=null,this.denmark=null,this.norway=null,this.canada=null,this.usa=null,this.sweden=null,this.finland=null,this.init=function(){this.buffer=document.createElement("canvas"),this.bctx=this.buffer.getContext("2d")},this.ready=function(){var correct,$countries;correct=pl.Queue.create(),correct.on("complete",this.bind(function(){var sfx=pl.util.resolvePath(this,"game.audio.sfx.screenComplete");sfx&&sfx.play(),this.complete()})),this.buffer.width=500,this.buffer.height=500,$countries=this.find(".country"),$countries.not(SELECTOR.CORRECT).on("animationend",function(){$(this).removeClass("flash").addClass("fadeIn")}),this.countries=$countries.map(function(_index,_node){var $node,id;return $node=$(_node),id=pl.util.transformId($node.id(),!0),$node.is(SELECTOR.CORRECT)&&correct.add(id),id}).toArray(),this.countries.correct=correct},this.isImageTarget=function(_image,_point){var pixel;return this.bctx.clearRect(0,0,this.buffer.width,this.buffer.height),this.bctx.drawImage(_image[0],0,0,_image.width(),_image.height()),pixel=this.bctx.getImageData(_point.x,_point.y,1,1),this.bctx.fillStyle="white",this.bctx.fillRect(_point.x,_point.y,5,5),pixel.data[3]>0},this.test=function(_cursor){var offset,cursor,gameScale;return this.screen.allowAction()?(offset=this.grayMap.absolutePosition(),gameScale=this.game.transformScale().x,cursor=1!==gameScale?_cursor.dec(offset).scale(1/this.game.zoom).math("floor"):_cursor.scale(1/this.game.zoom).math("floor").dec(offset),void this.countries.every(this.bind(function(_country){return this.isImageTarget(this[_country],cursor)?(this.answer(_country),!1):!0}))):!1},this.answer=function(_country){var $country;$country=this[_country],$country.is(SELECTOR.CORRECT)?(this.playSFX("correct"),this.playVO(_country),$country.addClass("animated fadeIn"),this.state("COMPLETE")||this.countries.correct.ready(_country)):(this.playSFX("incorrect"),$country.addClass("animated flash"))},this.playSFX=function(_answer){var sfx;return sfx=pl.util.resolvePath(this,"audio.sfx."+_answer),sfx&&sfx.play(),sfx},this.playVO=function(_name){var vo;return vo=pl.util.resolvePath(this,"audio.voiceOver."+_name),vo&&vo.play(),vo},this.on("ui-open",function(_e){this.is(_e.target)&&this.isComplete&&this.find(".fadeIn").removeClass("fadeIn")})})},function(module,exports){pl.game.component("multiple-choice",function(){function validateAnswer(_scope){var $selected,answers,$correct;return $selected=_scope.getSelected(),_scope.properties.correct?(answers=_scope.properties.correct.split(/\s*,\s*/),~answers.indexOf(String($selected.index()))?(_scope.isComplete&&_scope.playSFX("correct"),_scope.complete()):_scope.playSFX("incorrect")):($correct=_scope.find("[pl-correct]"),~$.inArray($selected[0],$correct)?(_scope.isComplete&&_scope.playSFX("correct"),_scope.complete()):_scope.playSFX("incorrect")),!1}this.playSFX=function(_answer){var sfx;return sfx=pl.util.resolvePath(this,"audio.sfx."+_answer),sfx&&sfx.play(),sfx},this.playVO=function(_name){var vo;return vo=pl.util.resolvePath(this,"audio.voiceOver."+_name),vo&&vo.play(),vo},this.answer=function(){var $li;this.screen.state(this.screen.STATE.VOICE_OVER)&&!this.game.demoMode||this.event&&($li=$(this.event.target).closest("li"),this.playVO($li.id()),this.select($li)&&validateAnswer(this))},this.start=function(){}})},function(module,exports){pl.game.component("reveal",function(){this.on("transitionend",function(){this.opened()||this.addClass("ANIM-DONE")}),this.item=function(_id){var vo,index;this.removeClass("ANIM-DONE"),this.open(),"number"==typeof _id?(this.select("li:nth-child("+_id+")"),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.select(this[_id]),this.audio&&(index=this[_id].index(),vo=this.audio.voiceOver[_id]||this.audio.voiceOver[index],vo&&vo.play()))}})},function(module,exports){pl.game.component("score",function(){this.value=0,this.entity("board",function(){this.template=null,this.ready=function(){this.template=this.counter.html()},this.render=function(){return this.counter.html(this.template.replace("{{score}}",this.value)),this}}),this.reset=function(){this.value=0,this.ready()},this.ready=function(){this.attr("value",this.value),this.board.render()},this.up=function(_count){return this.value+=_count||1,this.attr("value",this.value),this.board.render(),this.value>=this.properties.max&&this.complete(),this},this.down=function(_count){return this.value-=_count||1,this.attr("value",this.value),this.board.render(),this.value>=this.properties.max&&this.complete(),this}})},function(module,exports){pl.game.component("screen-basic",function(){this.allowAction=function(){return!this.screen.state(this.screen.STATE.VOICE_OVER)||this.game.demoMode},this.on("ready",function(_event){this.is(_event.target)&&(this.isMemberSafe("requiredQueue")&&this.requiredQueue&&this.requiredQueue.on("complete",this.bind(function(){var sfx;sfx=pl.util.resolvePath(this,"game.audio.sfx.screenComplete"),sfx&&sfx.play()})),this.state(this.STATE.OPEN)&&this.start())}),this.next=function(){var current,nextScreen,buttonSound;if(this.state(this.STATE.OPEN))return this.hasClass("last")&&this.hasClass("COMPLETE")&&this.game.quit.okay(),this!==this.screen?void this.log("Not called on a screen"):(buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),this.slides&&this.slides.isComponent?(current=this.slides.current(),nextScreen=current.next(),null==nextScreen&&(current=this,nextScreen=this.proto())):(current=this,nextScreen=this.proto()),nextScreen&&(current.leave(),nextScreen.open(),buttonSound&&buttonSound.play()),nextScreen)},this.prev=function(){var current,prevScreen,buttonSound;if(this.state(this.STATE.OPEN))return this!==this.screen?void this.log("Not called on a screen"):(buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),this.slides&&this.slides.isComponent?(current=this.slides.current(),prevScreen=current.prev(),null==prevScreen&&(current=this,prevScreen=this.proto())):(current=this,prevScreen=this.proto()),prevScreen&&(current.close(),prevScreen.open(),buttonSound&&buttonSound.play()),prevScreen)},this.start=function(){return this.startAudio(),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.on("ui-open",function(_event){this.is(_event.target)&&(this.isReady&&this.start(),this.isComplete||(!this.requiredQueue||this.isMemberSafe("requiredQueue")&&!this.requiredQueue.length)&&this.complete(),this.screen.isLast()&&this.addClass("last"))}),this.on("ui-close",function(_event){this.isReady&&this.is(_event.target)&&this.stop()})})},function(module,exports){pl.game.component("screen-quit",function(){this.on("transitionend",function(_event){this.is(_event.target)&&this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.init=function(){this.addClass("LEAVE LEAVE-END")},this.okay=function(){this.game.exit()},this.cancel=function(){this.leave()}})},function(module,exports){pl.game.component("selectable-reveal",function(){this.respond("select",function(_event){var index,stateMethod;index=_event.message,stateMethod=this.properties.selectState||"select",~index&&(this[stateMethod](_event.behaviorTarget),this.reveal.item(index),this.features.correct.ready(index))}),this.entity("selectable",function(){this.shouldSelect=function(_$target){return _$target.prev().hasClass(this.STATE.HIGHLIGHTED)||0===_$target.index()||_$target.is("[pl-always-selectable]")?!this.screen.state(this.STATE.VOICE_OVER)&&!_$target.state(this.STATE.HIGHLIGHTED):!1}}),this.ready=function(){var correct;correct=pl.Queue.create(),correct.on("complete",this.bind(function(){this.complete()})),this.features=this.find(".items li").map(function(_index){return correct.add(_index),_index}).toArray(),this.features.correct=correct}})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target;if(this.event){if($target=$(this.event.target).closest("li"),this.shouldSelect($target)!==!1)return{message:$target.index(),behaviorTarget:$target}}else this.proto(_target);return!1}),this.shouldSelect=function(){return!(this.screen.state(this.screen.STATE.VOICE_OVER)&&!this.game.demoMode)}})},function(module,exports){pl.game.component("slides",function(){this.slides=null,this.ready=function(){this.slides=this.find("> *").scope()},this.start=function(){var current,i,n;if(current=this.current())current.start();else if(this.slides.length)for(this.slides[0].open(),i=1,n=this.slides.length;n>i;i++)this.slides[i]&&this.slides[i].close()},this.current=function(){return this.find("> .OPEN").scope()},this.next=function(){var index,nextSlide,buttonSound;return this.completed()?(buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),index=this.slides.indexOf(this),~index?this.slides[index+1]:(~index&&(nextSlide=this.slides[index+1]),nextSlide?(this.leave(),nextSlide.open(),buttonSound&&buttonSound.play(),nextSlide):this.proto())):!1},this.prev=function(){var index,prevSlide,buttonSound;return buttonSound=pl.util.resolvePath(this,"game.audio.sfx.button"),index=this.slides.indexOf(this),~index?this.slides[index-1]:(~index&&(prevSlide=this.slides[index-1]),prevSlide?(this.close(),prevSlide.open(),buttonSound&&buttonSound.play(),prevSlide):this.proto())}})},function(module,exports){pl.game.component("title",function(){this.start=function(){this.proto(),this.showTitle()},this.showTitle=function(){this.image.addClass("animated "+this.image.attr("pl-animation")),this.complete()}})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(14),__webpack_require__(17),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(9),__webpack_require__(10),__webpack_require__(11),__webpack_require__(12),__webpack_require__(13),__webpack_require__(18),__webpack_require__(16),pl.game("polar-bear",function(){var resetMultipleChoice=function resetMultipleChoice(){this.on("ui-open",function(_e){this.is(_e.target)&&this.isComplete&&this.deselect(this.find("."+this.STATE.SELECTED))})};this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()}),this.startAudio=function(){this.title.audio.background.play(),this.title.audio.voiceOver.play()},this.stopAudio=function(){this.title.audio.voiceOver.stop("@ALL")}}),this.screen("what-color",function(){this.on("ui-open",function(_e){this.slides.mc.is(_e.target)&&this.isComplete&&this.deselect(this.find("."+this.STATE.SELECTED))})}),this.screen("bears",function(){this.start=function(){this.proto(),this.carousel.start()},this.stop=function(){this.carousel.stop()},this.on("ui-select",function(_event){_event.targetScope===this.reveal&&this.reveal.delay("1s",function(){var $selected;$selected=this.getSelected(),this.close(),$selected.addClass("animated slideOutUp").on("animationend",function(){$selected.removeClass("slideOutUp"),$selected.off()})})}),this.on("ui-open",function(_event){this.is(_event.target)&&this.isComplete&&this.score.reset()}),this.state("incomplete","-COMPLETE",{willSet:function willSet(){this.isComplete=!1}}),this.respond("hit",function(_event){_event.message===_event.behaviorTarget.id()?(this.score.up(),this.playSFX("correct")):this.playSFX("incorrect"),this.reveal.item(_event.behaviorTarget.id())}),this.respond("next",function(){this.cannon.ball.reload()}),this.playSFX=function(_name){var sfx;return sfx=pl.util.resolvePath(this,"audio.sfx."+_name),sfx&&sfx.play(),this}}),this.screen("experiment-hands",resetMultipleChoice),this.screen("experiment-why-warmer",resetMultipleChoice),this.screen("experiment-how-warmer",resetMultipleChoice),this.screen("experiment-discover",function(){this.on("ui-open",function(_e){this.is(_e.target)&&this.unhighlight(this.find("."+this.STATE.HIGHLIGHTED))}),this.respond("select",function(_event){var id=_event.message;id&&(this.highlight(_event.behaviorTarget),this.audio.voiceOver[id].play())})}),this.screen("flip",function(){this.complete=function(){var eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" ");return ga("send","event",eventCategory,"complete"),pl.game.trigger($.Event("platform-event",{name:"flip",gameData:{id:this.game.id()}})),this.proto()}}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map