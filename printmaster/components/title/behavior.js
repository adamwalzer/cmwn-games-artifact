pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		this.audio.background.play();
		this.delay(1500, function () {
			this.complete();
		});
	};

});
