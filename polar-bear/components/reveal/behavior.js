pl.game.component('reveal', function () {

	this.on('transitionend', function (_event) {
		if (!this.opened()) {
			this.addClass('ANIM-DONE');
		}
	});

	this.item = function (_id) {
		var vo, index;

		this.removeClass('ANIM-DONE');
		this.open();

		if (typeof _id === 'number') {
			this.select('li:nth-child('+_id+')');
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
	};

});
