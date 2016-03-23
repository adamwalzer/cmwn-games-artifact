pl.game.component('frame', function () {
	
	this.ready = function () {
		if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
			this.requiredQueue.on('complete', this.bind(function () {
				var sfx;

				sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');

				if (sfx) sfx.play();
			}));
		}
	};

	this.start = function () {
		var bgSound, voSound;

		bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
		voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');

		if (bgSound) bgSound.play();
		if (voSound && !voSound.hasAttribute("pl-dontautoplay")) voSound.play();

		if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();

		return this;
	};

	this.handleProperty({
		title: function (_node, _name, _value) {
			if (this.is(_node)) {
				this.find('.frame').addClass('title');
				this.game.defineRule('.experiment:nth-of-type('+(this.screen.index()+1)+') .frame-component .frame.title::before', {
					backgroundImage: 'url('+ _value +')'
				});
			}
		}
	});

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
