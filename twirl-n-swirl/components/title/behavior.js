pl.game.component('title', function () {
	
	this.start = function () {
		var delay = this.properties.delay;

		if (delay) {
			this.delay(this.properties.delay, this.animateSplashImage);
		} else {
			this.animateSplashImage();
		}
		
		return this;
	};

	this.animateSplashImage = function () {
		this.logo.addClass('animated ' + this.properties.anim);
		this.complete();
		return this;
	};

});
