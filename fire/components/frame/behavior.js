pl.game.component('frame', function () {
	
	this.start = function () {
		var bgSound, voSound;

		bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
		voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');

		if (bgSound) bgSound.play();
		if (voSound && !voSound.hasAttribute("pl-dontautoplay")) voSound.play();

		if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();

		return this;
	};

	this.on('ui-open', function (_event) {
		if (this.isReady) {
			this.start();
		}

		if (this === _event.targetScope) {
			if (!(this.hasOwnProperty('isComplete') && this.isComplete) && !(this.hasOwnProperty('requiredQueue') && (this.requiredQueue && this.requiredQueue.length))) {
				this.complete();
			}
		}
	});

});
