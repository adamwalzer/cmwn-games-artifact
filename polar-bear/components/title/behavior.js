pl.game.component('title', function () {

	this.start = function () {
		var bgAudio;

		bgAudio = pl.util.resolvePath(this, 'audio.background[0]?');

		this
			.open()
			.delay(1500, this.showTitle);

		if (bgAudio) bgAudio.play();
	};

	this.showTitle = function () {
		this.image.addClass('animated '+this.image.attr('pl-animation'));
		this.complete();
	};

});