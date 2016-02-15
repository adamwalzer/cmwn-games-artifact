pl.game.component('slides', function () {
	
	this.slides = null;

	this.ready = function () {
		this.slides = this.find('> div').scope();
	};

	this.start = function () {
		var current, i, n;

		current = this.current();

		if (current) {
			current.start();
		}

		else if (this.slides.length) {
			this.slides[0].open();
			for(i = 1, n = this.slides.length; i < n; i++) {
				this.slides[i] && this.slides[i].close();
			}
		}
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

		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
		index = this.slides.indexOf(this);

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

		buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
		index = this.slides.indexOf(this);

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
