pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		this.audio.background.play();
		this.delay(1500, function () {
			// this.image.addClass('animated '+this.image.attr('pl-animation'));
			this.complete();
		});
	};

});
