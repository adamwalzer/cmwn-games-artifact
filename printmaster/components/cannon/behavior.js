pl.game.component('cannon', function () {

	this.isLaunchComplete = true;

	this.state('launch launched', '+LAUNCHED -RELOAD', {
		didSet: function () {
			this.playSFX('fire');
			this.isLaunchComplete = false;
			this.delay('1s',function() {
				this.isLaunchComplete = true;
			});
		}
	});

	this.state('reload', '+RELOAD -LAUNCHED', {
		shouldSet: function () {
			if (!this.isLaunchComplete) {
				return false;
			}
		}
	});

	this.behavior('fire', function () {
		if(this.isLaunchComplete) {
			this.launch(this.ball);
			return {
				message: this.cannon.properties.fire
			};
		}

		return false;
	});

	this.load = function() {
		this.reload(this.ball);
	};

	this.playSFX = function (_name) {
		var sfx;

		sfx = pl.util.resolvePath(this, 'audio.sfx.'+_name);

		if (sfx) sfx.play();

		return this;
	};

});
