pl.game.component('reveal', function () {
	
	this.items = null;

	this.on('ready', function () {
		this.items = this.findOwn('li')
	});

	this.item = function (_id) {
		var vo, index;

		if (this.shouldRevealItem(_id) === false) return false;

		if (typeof _id === 'number') {
			this.select(this.items[_id]);
			this.audio.voiceOver[_id].play();

		}
			
		else if (typeof _id === 'string') {
			if (this[_id]) {
				this.select(this[_id]);

				if (this.audio) {
					index = this[_id].index();
					vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
					
					if (vo) vo.play();
				}
			}
		}

		return this;
	};

	this.shouldRevealItem = function () {
		return true;
	};

});
