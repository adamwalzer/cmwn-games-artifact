pl.game.component('selectable-reveal', function () {
	
	this.respond('select', function (_event) {
		var index, stateMethod;

		index = _event.message;
		stateMethod = this.properties.selectState || 'select';

		if (Number.isInteger(index) && ~index) {
			this[stateMethod](_event.behaviorTarget);
			this.reveal.item(index);
		}
	});

	this.entity('selectable', function () {
		
		this.shouldSelect = function (_$target) {
			if (_$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0) {
				return !this.screen.state(this.STATE.VOICE_OVER);
			}

			return false; 
		};

	});

});
