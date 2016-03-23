pl.game.component('reveal', function () {

	function playSound (_sound) {
		var delay;

		delay = $(_sound).attr('pl-delay');

		if (delay) {
			return this.delay(delay, _sound.play.bind(_sound));
		} else {
			return _sound.play();
		}
	}

	this.item = function (_id) {
		var vo, index;

		this.close(this.find('li.OPEN'));

		if (typeof _id === 'number') {
			this.open(this.find('li').eq(_id));
			playSound.call(this, this.audio.voiceOver[_id]);
		}
			
		else if (typeof _id === 'string') {
			if (this[_id]) {
				this.open(this[_id]);

				if (this.audio) {
					index = this[_id].index();
					vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
					
					if (vo) playSound.call(this, vo);
				}
			}
		}
	};

	this.closeAll = function(_$target) {
		if(_$target.state(this.STATE.ENABLED) || this.game.demoMode) {
			if(this.game.audio.sfx.button) this.game.audio.sfx.button.play();
			this.close(this.find('li.OPEN'));
		}
	};
});
