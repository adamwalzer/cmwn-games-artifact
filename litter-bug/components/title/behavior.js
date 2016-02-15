pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		if(this.audio.background[0]) {
			this.audio.background[0].play();
		} else if(this.audio.background) {
			this.audio.background.play();
		}
		this.delay(1500, function () {
			this.image.addClass('animated '+(this.image.attr('pl-animation')||''));
			this.complete();
		});
	};

});
