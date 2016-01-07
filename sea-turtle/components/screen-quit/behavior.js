pl.game.component('screen-quit', function () {

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
		this.screen.audio.sfx.play();
		this.game.exit();
	};

	this.cancel = function () {
		this.screen.audio.sfx.play();
		this.leave();
	};

});