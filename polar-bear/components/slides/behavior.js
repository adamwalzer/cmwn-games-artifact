pl.game.component('slides', function () {
	
	this.slides = null;

	this.ready = function () {
		this.slides = this.find('> *').scope();
	};

	this.start = function () {
		var current;

		if (current = this.current()) current.close();
		if (this.slides.length) this.slides[0].open();
	};

	this.current = function () {
		return this.find('> .OPEN').scope();
	};

	/*
	 * @this {frame-component-scope} called by the next button in a frame component.
	 */
	this.next = function () {
		var index, nextSlide, buttonSound;

		if (!this.completed()) return false;

		index = this.slides.indexOf(this);
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');

		if (~index) nextSlide = this.slides[index+1];
		
		if (nextSlide) {
			this.leave();
			nextSlide.open();

			if (buttonSound) buttonSound.play();

			return nextSlide;
		}

		else {
			return this.proto();
		}
	};

	/*
	 * @this {frame-component-scope} called by the next button in a frame component.
	 */
	this.prev = function () {
		var index, prevSlide, buttonSound;

		index = this.slides.indexOf(this);
		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');

		if (~index) prevSlide = this.slides[index-1];
		
		if (prevSlide) {
			this.close();
			prevSlide.open();

			if (buttonSound) buttonSound.play();

			return prevSlide;
		}

		else {
			return this.proto();
		}
	};
});
