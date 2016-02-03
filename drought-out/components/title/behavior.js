pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		this.audio.background.play();
		this.delay(3000, function () {
			this.complete();
		});
	};

});
