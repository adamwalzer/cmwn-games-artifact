pl.game.component('selectable-remove', function () {
	
	this.behavior('select', function (_target) {
		var $target, stateMethod;

		if (this.event && !_target) {
			$target = $(this.event.target).closest('li');

			if (this.shouldSelect($target) !== false) {

				if($target.is('li')) {
					this.audio.sfx.correct.play();
					stateMethod = this.properties.selectState || 'select';
					this[stateMethod]($target);
					this.items.correct.ready($target.index());
				}

				return {
					message: $target.index(),
					behaviorTarget: $target
				};
			}

			else {
				if(this.audio.sfx.incorrect) this.audio.sfx.incorrect.play();
			}
		}

		else {
			this.proto(_target);
		}

		return false;
	});

	this.shouldSelect = function (_target) {
		var $target = $(_target);
		if (!$target.hasClass(this.STATE.HIGHLIGHTED) && !$target.is('[pl-incorrect]')) {
			return !this.screen.state(this.STATE.VOICE_OVER);
		}

		return false;
	};

	this.ready = function () {
		var correct;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.complete();
			this.game.addClass('sun');
		}));

		this.items = this
			.find('.items li:not([pl-incorrect])')
			.map(function (_index, _node) {
				correct.add(_index);
				return _node;
			})
			.toArray();

		this.items.correct = correct;
	};

});
