pl.game.component('screen-quit', function () {

	function playButtonSFX (_direction) {
		var so;

		if (_direction === "next") {
			so = pl.util.resolvePath(this, 'audio.sfx.nextScreen');
		}

		if (!so) {
			so = pl.util.resolvePath(this, 'game.audio.sfx.button');
		}
		if (so) so.play();
	}

	// TODO: Make an automated way to handle this
	this.on('transitionend', function (_event) {
		if (this.state(this.STATE.LEAVE)) {
			this.addClass('LEAVE-END');	
		}
	});
	
	this.on('ui-open', function (_event) {
		this.game.addClass('QUIT-SCREEN');
		this.removeClass('LEAVE-END');
	});

	this.on('ui-leave', function () {
		this.game.removeClass('QUIT-SCREEN');
	});
	
	this.okay = function () {
		playButtonSFX.call(this);
		this.game.exit();
	};

	this.cancel = function () {
		playButtonSFX.call(this);
		this.leave();
	};

});
