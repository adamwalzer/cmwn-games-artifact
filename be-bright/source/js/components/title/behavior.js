pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		if(this.audio.background) this.audio.background.play();
	};

});
