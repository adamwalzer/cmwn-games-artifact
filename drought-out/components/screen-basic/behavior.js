pl.game.component('screen-basic', function () {
	var characters;

	/**
	 * Nodes, including the node of this screen, with a
	 * attribute of pl-bg will get a background-image style
	 * and the resource preloaded and collected for watching.
	 */
	this.handleProperty({
		bg: function (_node, _name, _value) {
			var img = new Image();
			
			if (!characters) characters = [];

			img.src = _value;
			characters.push(img);
			$(_node).css('background-image', 'url('+_value+')');
		}
	});
	
	this.playSound = function (_sound) {
		var delay;
	
		delay = $(_sound).attr('pl-delay');

		if (delay) {
			return this.delay(delay, _sound.play.bind(_sound));
		} else {
			return _sound.play();
		}
	};

	this.next = function () {
		var nextScreen, buttonSound;

		nextScreen = this.proto();
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');

		if (nextScreen) {
			this.leave();
			nextScreen.open();
			if (buttonSound) buttonSound.play();
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
			if (buttonSound) buttonSound.play();
		}

		return prevScreen;
	};

	this.start = function () {
		var bgSound, voSound;

		bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
		voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');
		fxSound = pl.util.resolvePath(this, 'audio.sfx.start');

		if (bgSound) {
			this.game.bgSound = bgSound;
			bgSound.play();
		}
		if(fxSound) fxSound.play();
		if (voSound && !voSound.hasAttribute("pl-dontautoplay")) this.playSound(voSound);

		if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();

		return this;
	};

	this.on('ui-open', function (_event) {
		if (this.isReady && this === _event.targetScope) {
			this.start();
		}

		if(this.properties.gameClass) {
			this.game.addClass(this.properties.gameClass);
		}

		if (!this.requiredQueue || (this.hasOwnProperty('requiredQueue') && !this.requiredQueue.length)) {
			this.complete();
		}
	});

	this.on('ui-leave', function (_event) {
		if(this.properties.gameClass) {
			this.game.removeClass(this.properties.gameClass);
		}

		if (this.isReady && this === _event.targetScope) {
			this.stop();
		}
	});

	this.on('ui-close', function (_event) {
		if(this.properties.gameClass) {
			this.game.removeClass(this.properties.gameClass);
		}

		if (this.isReady && this === _event.targetScope) {
			this.stop();
		}
	});

	this.on('ready', function () {
		if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
			this.requiredQueue.on('complete', this.bind(function () {
				var sfx;

				sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');

				if (sfx) sfx.play();
			}));
		}
	});
});
