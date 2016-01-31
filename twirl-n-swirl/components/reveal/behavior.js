pl.game.component('reveal', function () {
	
	this.items = null;
	this.currentAudio = null;

	this.on('ready', function () {
		this.items = this.findOwn('li')
	});

	this.item = function (_id) {
		var vo, index;

		if (this.shouldRevealItem(_id) === false) return false;

		if (typeof _id === 'number') {
			this.select(this.items[_id]);
			this.audio.voiceOver[_id].play();
			this.currentAudio = this.audio.voiceOver[_id];
		}
			
		else if (typeof _id === 'string') {
			if (this[_id]) {
				this.select(this[_id]);

				if (this.audio && this.audio.voiceOver) {
					index = this[_id].index();
					vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
				}
			} else {
				this.select(_id);

				index = this.findOwn(_id).index();
				vo = pl.util.resolvePath(this, 'audio.voiceOver['+index+']');
			}

			if (vo) (this.currentAudio = vo).play();
		}

		return this;
	};

	this.shouldRevealItem = function () {
		return true;
	};

	this.currentItem = function () {
		return this.findOwn('li.SELECTED');
	};

});
