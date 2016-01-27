pl.game.component('modal', function () {
	
	this.close = function() {
		if(!this.screen.state(this.screen.STATE.VOICE_OVER)) {
			this.removeClass('OPEN');
		}
	};
});
