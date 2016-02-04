pl.game.component('screen-title', function () {

	/**
	 * this is necessary to allow the screen to progress
	 * even when the animation has already completed
	 */
	var passed = false;

	this.on('ready', function () {
		this.delay(0, this.open);
		this.close(this.game.loader);
	});

	/**
	 * Start the title screen logo animation when the screen opens.
	 */
	this.on('ui-open', function () {
		var so, delay = this.properties.delay;

		so = pl.util.resolvePath(this, 'audio.background[0]?');

		if (so) so.play();

		if (delay) {
			this.delay(this.properties.delay, this.animateSplashImage);
		} else {
			this.animateSplashImage();
		}

		this.game.setWallpaper(this.properties.wallpaper);
		
		return this;
	});

	this.next = function () {
		var nextScreen, so, animate;
		
		function leave () {
			this.screen.leave();
			nextScreen.open();
		}

		nextScreen = this.proto();
		so = pl.util.resolvePath(this, 'audio.sfx.nextScreen');
		animate = passed ? false : this.properties.animOut || '';

		if (!so) {
			so = pl.util.resolvePath(this, 'game.audio.sfx.button');
		}

		if (nextScreen) {
			if (animate) {
				this.logo
					.on('animationend', leave.bind(this))
					.addClass(animate);
			} else {
				leave.call(this);
			}
				
			if (so) so.play();
		}

		passed = true;

		return nextScreen;
	};

	this.animateSplashImage = function () {
		this.logo.addClass('animated ' + (this.properties.anim || ''));
		this.complete();
		return this;
	};

});
