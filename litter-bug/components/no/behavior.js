pl.game.component('no', function () {

	this.next = function () {
		var buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.no');
		if (this.screen.next() && buttonSound) buttonSound.play();
	};

});
