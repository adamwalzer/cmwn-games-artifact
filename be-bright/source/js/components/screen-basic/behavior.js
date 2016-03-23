pl.game.component('screen-basic', function () {

	this.playSound = function(_sound) {
		var delay, $sound;

		$sound = $(_sound);
		delay = $sound.attr('pl-delay');
		if($sound.hasClass('voice-over')) {
			this.currentVO = _sound;
		}

		if (delay) {
			return this.delay(delay, _sound.play.bind(_sound));
		} else {
			return _sound.play();
		}
	};

	this.ready = function () {
		if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
			this.requiredQueue.on('complete', this.bind(function () {
				var sfx;
				console.log("complete");

				sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');

				if (sfx) this.playSound(sfx);
			}));
		}
	};

	this.next = function () {
		var nextScreen, buttonSound;

		nextScreen = this.proto();
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');

		if (nextScreen) {
			this.leave();
			nextScreen.open();
			if (buttonSound) this.playSound(buttonSound);
		}

		return nextScreen;
	};

	this.prev = function () {
		var prevScreen, buttonSound;

		prevScreen = this.proto();
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');

		if (prevScreen) {
			this.screen.close();
			prevScreen.open();
			if (buttonSound) this.playSound(buttonSound);
		}

		return prevScreen;
	};

	this.start = function () {
		var bgSound, voSound;

		bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
		voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');

		if (bgSound) {
			this.game.bgSound = bgSound;
			this.playSound(bgSound);
		}
		if (voSound) this.playSound(voSound);

		if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();

		return this;
	};

	this.stop = function() {
		if(this.currentVO) {
			this.currentVO.pause();
			this.currentVO.currentTime = 0;
		}

		return this;
	};

	this.on('ui-open', function (_event) {
		if (this.isReady && this === _event.targetScope) {
			this.start();
		}

		if (!this.requiredQueue || (this.hasOwnProperty('requiredQueue') && !this.requiredQueue.length)) {
			this.complete();
		}
	});

	this.on('ui-leave', function (_event) {
		if (this.isReady && this === _event.targetScope) {
			this.stop();
		}
	});

	this.on('ui-close', function (_event) {
		if(!this.is(_event.target)) return;
		this.stop();
	});

});
