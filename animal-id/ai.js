!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/build/",__webpack_require__(0)}([function(module,exports,__webpack_require__){module.exports=__webpack_require__(14)},function(module,exports){pl.game.component("class-switcher",function(){this.start=function(){var target,add,remove;target=this.properties.target||"body",add=this.properties.add||"",remove=this.properties.remove||"",$(target).addClass(add).removeClass(remove)}})},function(module,exports){pl.game.component("drop-responder",function(){this.respond("drop",function(_event){this.screen.reveal.item(_event.behaviorTarget.id())})})},function(module,exports){pl.game.component("dropzone",function(){this.entity(".area",function(){this.cache=null,this.respond("grab",function(){this.audio.sfx.drag.play(),this.cache={position:this.absolutePosition().dec(this.game.absolutePosition()),size:this.size().scale(this.game.transformScale().x)}}),this.respond("release",function(_event){var point,scale;if(point=1!==(scale=this.game.transformScale().x)?[_event.state.start.point[0]+scale*_event.state.progress.distance[0],_event.state.start.point[1]+scale*_event.state.progress.distance[1]]:_event.state.progress.point,point&&this.isPointInBounds(point)){if(this.takes(_event.state.$draggable.id()))return _event.state.$draggable.removeClass("PLUCKED"),_event.state.$helper.addClass("DROPED"),this.drop(_event.state.$draggable),void this.audio.sfx.correct.play();this.audio.sfx.incorrect.play()}_event.state.$helper.addClass("RETURN")})}),this.init=function(){this.takes().forEach(this.bind(function(_id){this.require(_id)}))},this.takes=function(_id){var takes=this.properties.take.split(/\s+/);return arguments.length?!!~takes.indexOf(_id):takes},this.isPointInBounds=function(){var point;return point=pl.Point.create(arguments),point.x>=this.cache.position.x&&point.x<=this.cache.position.x+this.cache.size.width&&point.y>=this.cache.position.y&&point.y<=this.cache.position.y+this.cache.size.height},this.behavior("drop",function(_$thing){return this.requiredQueue.ready(_$thing.id()),{behaviorTarget:_$thing}})})},function(module,exports){pl.game.component("flip-card",function(){})},function(module,exports){pl.game.component("frame",function(){this.start=function(){var voSound=this.audio.voiceOver[0];return this.audio.background.play(),voSound&&!voSound.config("dontautoplay")&&voSound.play(),this.hasOwnProperty("entities")&&this.entities[0]&&this.entities[0].start(),this},this.handleProperty({title:function title(_node,_name,_value){this.is(_node)&&(this.find(".frame").addClass("title"),this.game.defineRule(".experiment:nth-of-type("+(this.screen.index()+1)+") .frame-component .frame.title::before",{backgroundImage:"url("+_value+")"}))}}),this.on("ui-open",function(_event){this.isReady&&this.start(),this===_event.targetScope&&(this.hasOwnProperty("isComplete")&&this.isComplete||this.hasOwnProperty("requiredQueue")&&this.requiredQueue&&this.requiredQueue.length||this.complete())})})},function(module,exports){pl.game.component("match-game",function(){this.behavior("select",function(_target){var $target;if(this.event&&!_target){if($target=$(this.event.target).closest("li"),!$target.length)return!1;if(this.shouldSelect($target)!==!1){if($target.is("li")&&this.audio.sfx.correct.play(),this.showSelect($target))return{message:$target.id(),behaviorTarget:$target}}else this.audio.sfx.incorrect&&this.audio.sfx.incorrect.play()}else this.proto(_target);return!1}),this.shouldSelect=function(_$target){return!_$target.hasClass(this.STATE.HIGHLIGHTED)&&!_$target.parent().hasClass("show-all")},this.start=function(){var $items,self=this;$items=this.find(".items").addClass("show-all"),this.disable(),setTimeout(function(){$items.removeClass("show-all"),this.enable()}.bind(this),5e3),this.$currentCard=null,this.find("li").each(function(){self.unhighlight($(this))})},this.showSelect=function(_$target){var stateMethod,undoStateMethod;if(stateMethod=this.properties.selectState||"select","select"===stateMethod&&(undoStateMethod="deselect"),"highlight"===stateMethod&&(undoStateMethod="unhighlight"),_$target)if(this[stateMethod](_$target),this.$currentCard){if(this.$currentCard.id()===_$target.id())return this.$currentCard=null,this.enable(),!0;this.disable(),setTimeout(function(){this[undoStateMethod](_$target),this[undoStateMethod](this.$currentCard),this.$currentCard=null,this.enable()}.bind(this),1e3)}else this.$currentCard=_$target,this.disable().on("transitionend",function(){this.enable().off("transitionend")}.bind(this));return!1},this.populateList=function(_$bin){var $items,$bin,random;for($items=this.find(".items"),$bin=_$bin;$bin.length;)random=Math.floor(_$bin.length*Math.random()),$bin.eq(random).remove().appendTo($items),$bin=this.find(".bin li")},this.randomize=function(){var $bin;$bin=this.find(".bin"),this.find(".items li").remove().appendTo($bin),this.populateList($bin.find("li"))},this.ready=function(){var correct,$bin;correct=pl.Queue.create(),correct.on("complete",this.bind(function(){this.screen.complete()})),this.items=this.find(".items li[pl-correct]").map(function(_index,_node){return correct.add(_node.getAttribute("pl-id")),_node}).toArray(),this.items.correct=correct,$bin=this.find(".bin li"),$bin.length&&this.populateList($bin)}})},function(module,exports){pl.game.component("reveal",function(){function playSound(_sound){var delay;return delay=$(_sound).attr("pl-delay"),delay?this.delay(delay,_sound.play.bind(_sound)):_sound.play()}this.screen.STATE.COMPLETE="COMPLETE",this.nextOnClose=!0,this.respond("select",function(_event){var vo,index;index=_event.message,this.closeAll(),"undefined"!=typeof index&&("number"==typeof index?(this.open(this.find("li").eq(index)),this.audio.voiceOver[index].play()):"string"==typeof index&&this[index]&&(this.open(this[index]),this.audio&&(this.audio.voiceOver.length&&(index=this[index].index()),vo=this.audio.voiceOver?this.audio.voiceOver[index]:null,vo&&playSound.call(this,vo))))}),this.handleProperty({nextOnClose:function nextOnClose(_node,_name,_value){this.is(_node)&&(this.nextOnClose=_value!==!1)}}),this.item=function(_id){var vo;this.closeAll(),"undefined"!=typeof _id&&("number"==typeof _id?(this.open("li:nth-child("+_id+")"),this.audio.voiceOver[_id].play()):"string"==typeof _id&&this[_id]&&(this.open(this[_id]),this.audio&&(this.audio.voiceOver.length&&(_id=this[_id].index()),vo=this.audio.voiceOver?this.audio.voiceOver[_id]:null,vo&&playSound.call(this,vo))))},this.closeAll=function(){(!this.screen.state(this.screen.STATE.VOICE_OVER)||this.screen.state(this.screen.STATE.COMPLETE)||this.game.demoMode)&&this.close(this.find("li.OPEN"))},this.handleCloseClick=function(){this.screen.state(this.screen.STATE.VOICE_OVER)&&!this.game.demoMode||(this.closeAll(),this.nextOnClose&&this.screen.next())}})},function(module,exports){pl.game.component("screen-basic",function(){this.SELECTOR={CORRECT:"[pl-correct]",INCORRECT:"[pl-incorrect]"},this.on("ui-open",function(_event){this.is(_event.target)&&(this.isReady&&this.start(),this.screen.isLast()&&this.addClass("last"))}),this.on("ui-leave",function(_event){this.isReady&&this.is(_event.target)&&this.stop()}),this.next=function(){var nextScreen;return this.screen.isLast()&&this.completed()&&this.game.quit.okay(),nextScreen=this.proto(),nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.prev=function(){var prevScreen;return prevScreen=this.proto(),prevScreen&&(this.screen.close(),prevScreen.open(),this.game.audio.sfx.button.play()),prevScreen},this.start=function(){var entities=this.hasOwnProperty("entities")&&this.entities;return this.startAudio(),entities&&entities.forEach(function(_entity){var type=typeof _entity.start;_entity.hasOwnProperty("start")&&"function"===type&&_entity.start()}),this},this.complete=function(){return this.is(this.screen)&&this.game.audio.sfx.play("screenComplete"),this.proto()},this.on("ui-close",function(_event){this.is(_event.target)&&this.stop()}),this.on("ready",function(_event){this.is(_event.target)&&this.state(this.STATE.OPEN)&&this.start()})})},function(module,exports){pl.game.component("screen-quit",function(){this.on("transitionend",function(_event){this.is(_event.target)&&this.state(this.STATE.LEAVE)&&this.addClass("LEAVE-END")}),this.on("ui-open",function(_event){this.is(_event.target)&&(this.game.addClass("QUIT-SCREEN"),this.removeClass("LEAVE-END"),this.game.pause(!0))}),this.on("ui-leave",function(){this.game.removeClass("QUIT-SCREEN"),this.game.resume()}),this.okay=function(){this.screen.audio.sfx.play(),this.game.exit()},this.cancel=function(){this.screen.audio.sfx.play(),this.leave()}})},function(module,exports){pl.game.component("selectable",function(){this.behavior("select",function(_target){var $target;if(this.screen.state(this.screen.STATE.VOICE_OVER)&&!this.game.demoMode)return!1;if(this.event&&!_target)if($target=$(this.event.target).closest("li"),this.shouldSelect($target)!==!1){if($target.is("li")&&this.audio.sfx.correct.play(),this.showSelect($target))return{message:$target.id(),behaviorTarget:$target}}else this.audio.sfx.incorrect&&this.audio.sfx.incorrect.play();else this.proto(_target);return!1}),this.shouldSelect=function(_$target){return _$target.is(this.screen.SELECTOR.CORRECT)},this.showSelect=function(_$target){var stateMethod;return stateMethod=this.properties.selectState||"select",_$target&&this[stateMethod](_$target),!0},this.populateList=function(_$bin){var $items,$bin,random;for($items=this.find(".items"),$bin=_$bin;$bin.length;)random=Math.floor(_$bin.length*Math.random()),$bin.eq(random).remove().appendTo($items),$bin=this.find(".bin li")},this.ready=function(){var $bin=this.find(".bin li");$bin.length&&this.populateList($bin)}})},function(module,exports){pl.game.component("sparkles",function(){})},function(module,exports){pl.game.component("title",function(){this.ready=function(){}})},function(module,exports){pl.game.config({screenSelector:".screen",componentDirectory:"components/",dimensions:{width:960,ratio:16/9},shouldLoadComponentStyles:!1})},function(module,exports,__webpack_require__){__webpack_require__(13),__webpack_require__(16),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8),__webpack_require__(9),__webpack_require__(10),__webpack_require__(11),__webpack_require__(12),__webpack_require__(17),__webpack_require__(15),pl.game("animal-id",function(){var showNext,showNextScreens,self=this;showNext=function(){this.STATE.BACK="RETURN",this.state("return","+RETURN"),this.on("ui-open",function(_event){this.is(_event.target)&&(this.state(this.STATE.COMPLETE)&&this["return"](this),this.reveal&&this.reveal.close(this.reveal.find("li.OPEN")))})},this.screen("title",function(){this.on("ready",function(_event){this.is(_event.target)&&this.game.iosSplash.state(this.STATE.READY)&&this.game.iosSplash.splash()}),this.on("ui-open",function(_event){this.is(_event.target)&&this.title.startAudio(),this.state(this.STATE.OPEN)&&this.start()}),this.startAudio=function(){this.title.audio.background.play()},this.stopAudio=function(){this.title.audio.background.stop()},this.entity("title",function(){this.on("animationend",function(_event){this.image.is(_event.target)&&this.complete()})})}),showNextScreens=["id-carnivore","id-marsupial","id-rodent","id-arachnid","id-mammal","id-mollusk","id-reptile","id-herbivore","dnd-lion","dnd-sloth","dnd-wolf","dnd-elephant","dnd-dragon","dnd-pig","dnd-gorilla","dnd-mule"],showNextScreens.forEach(function(key){self.screen(key,showNext)}),this.screen("match-game",function(){this.on("ui-close",function(_event){this.is(_event.target)&&(this.reveal.close(this.reveal.find("li.OPEN")),this.delay(".5s",this.matchGame.randomize.bind(this.matchGame)))})}),this.screen("what-does-a-nose-do",function(){this.on("ui-open",function(_event){this.is(_event.target)&&this.unhighlight(this.find(".HIGHLIGHTED"))})}),this.screen("flip",function(){this.complete=function(){var eventCategory=["game",this.game.id(),this.id()+"("+(this.index()+1)+")"].join(" ");return ga("send","event",eventCategory,"complete"),pl.game.report.flip(this.game,{name:"flip",gameData:{id:this.game.id()}}),this.proto()}}),this.exit=function(){var screen,eventCategory;return screen=this.findOwn(pl.game.config("screenSelector")+".OPEN:not(#quit)").scope(),eventCategory=["game",this.id(),screen.id()+"("+(screen.index()+1)+")"].join(" "),ga("send","event",eventCategory,"quit"),this.proto()}})},function(module,exports){!function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-26000499-1","auto"),ga("send","pageview")},function(module,exports){pl.game.component("screen-ios-splash",function(){this.on("ready",function(_e){this.is(_e.target)&&this.game&&this.game.title.state(this.STATE.READY)&&this.splash()}),this.splash=function(){this.close(this.game.loader),this.game.hasClass("iOS")?(this.open(),this.ball.delay(0,this.ball.open)):this.game.title.open()},this.next=function(){var nextScreen=this.proto();return nextScreen&&(this.screen.leave(),nextScreen.open(),this.game.audio.sfx.button.play()),nextScreen},this.complete=function(){return this.game.audio.sfx.play("screenComplete"),this.proto()},this.startGame=function(){this.hasClass("FINISHED")&&(this.game.addClass("STARTED"),this.delay("2.5s",function(){this.next()}))},this.on("animationend",function(_e){this.ball.is(_e.target)&&this.addClass("FINISHED")})})},function(module,exports){!function test(_env){window.parent===window?window.location.href="https://www.changemyworldnow.com/":document.domain="changemyworldnow.com"}()}]);
//# sourceMappingURL=ai.js.map