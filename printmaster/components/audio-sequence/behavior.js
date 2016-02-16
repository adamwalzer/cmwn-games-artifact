pl.game.component('audio-sequence', function () {
	
	var sounds = null;

	this.on('ready', function(_event) {
		var self = this;

		if (!this.is(_event.target)) return;

		sounds = this.find("> audio");
		sounds.each(function(i, audio) {
			audio.onended = function() {
				if(sounds[i+1]) self.screen.playSound(sounds[i+1]);
			};
		});
		if(typeof this.properties.loop !== 'undefined') {
			sounds[sounds.length-1].onended = this.start.bind(this);
		}
	});

	this.start = function() {
		if(sounds[0] && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound(sounds[0]);
	};
});
