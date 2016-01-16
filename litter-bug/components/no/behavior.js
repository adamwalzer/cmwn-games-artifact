pl.game.component('no', function () {

	this.next = function () {
		var nextScreen, buttonSound;

		nextScreen = this.proto();
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.no');

		if (nextScreen) {
			this.screen.leave();
			nextScreen.open();
			if (buttonSound) buttonSound.play();
		}

		return nextScreen;
	};

});
