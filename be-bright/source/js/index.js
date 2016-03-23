/**
 * Index script
 * @module
 */
import './testPlatformIntegration';
import 'js-interactive-library';
import './config.game';

import './components/title/behavior';
import './components/screen-basic/behavior';
import './components/screen-quit/behavior';
import './components/selectable/behavior';
import './components/selectable-reveal/behavior';
import './components/reveal/behavior';
import './components/multiple-choice/behavior';
import './components/video/behavior';

pl.game('be-bright', function () {

	this.screen('title', function () {

		this.ready = function () {
			this.open();
			this.close(this.game.loader);
			this.delay('3s', function() {
				this.complete();
				if(this.title.audio.sfx) this.title.audio.sfx.play();
			});
		};

	});

	this.screen('video', function() {
		this.on('ui-open', function() {
			if(this.game.bgSound) this.game.bgSound.pause();
			this.video.start();
		});
		this.on("ui-close", function() {
			this.video.pause();
			if(this.game.bgSound) this.game.bgSound.play();
		});
	});

	this.screen('video-2', function() {
		this.on('ui-open', function() {
			if(this.game.bgSound) this.game.bgSound.pause();
			this.video.start();
		});
		this.on("ui-close", function() {
			this.video.pause();
			if(this.game.bgSound) this.game.bgSound.play();
		});
	});

	this.screen('flip', function () {
		this.on('audio-ended', function (_event) {
			if (this.audio.voiceOver !== _event.target) return;
			this.stampImg.addClass('START');
			this.audio.sfx.stamp.play();
		});

		this.next = function () {
			this.game.quit.okay();
		};

		this.complete = function (_event) {
			var eventCategory = (['game', this.game.id(), this.id()+'('+(this.index()+1)+')']).join(' ');

			ga('send', 'event', eventCategory, 'complete');

			return this.proto();
		};
	});

	this.exit = function () {
		var screen, eventCategory;

		screen = this.findOwn(pl.game.config('screenSelector')+'.OPEN:not(#quit)').scope();
		eventCategory = (['game', this.id(), screen.id()+'('+(screen.index()+1)+')']).join(' ');

		ga('send', 'event', eventCategory, 'quit');

		return this.proto();
	};

});
