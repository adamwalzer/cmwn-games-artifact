pl.game.component('cannon', function () {

	this.entity('ball', function () {
		
		this.reloadRequest = false;
		this.isLaunchComplete = false;

		this.willInit = function () {
			if (this.cannon.properties.ball) {
				this.attr('src', this.cannon.properties.ball);
				// I shouldn't have to do this
				this.on('load', function () {
					this.assetQueue.ready(this.node().src);
					this.off('load');
				})
			}
		};

		this.on('transitionend', function () {
			this.log('transitionend');

			this.isLaunchComplete = true;

			if (this.launched()) {
				this.playSFX('hit');

				if (this.reloadRequest) {
					this.reload();
				}
			}
		});

		this.state('launch launched', '+LAUNCHED -RELOAD', {
			didSet: function () {
				this.playSFX('fire');
				this.isLaunchComplete = false;
			}
		});

		this.state('reload', '+RELOAD -LAUNCHED', {
			shouldSet: function () {
				if (!this.isLaunchComplete) {
					this.reloadRequest = true;
					return false;
				}
			},

			didSet: function () {
				this.reloadRequest = false;
			}
		});
	});

	this.behavior('fire', function () {
		this.ball.launch();
		return {
			message: this.cannon.properties.fire
		};
	});

	this.reload = function () {
		this.ball.reload();
	};

	this.playSFX = function (_name) {
		var sfx;

		sfx = pl.util.resolvePath(this, 'audio.sfx.'+_name);

		if (sfx) sfx.play();

		return this;
	};

});
