pl.game.component('video', function () {

	this.start = function() {
		var self = this;
		this.video.on('ended', function() {
			self.screen.complete();
		});
		if(this.game.bgSound) this.game.bgSound.pause();
		this.video[0].play();
	};

	this.pause = function() {
		this.video[0].pause();
	};

});
