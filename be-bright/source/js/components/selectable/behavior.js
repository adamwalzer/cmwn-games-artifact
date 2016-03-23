pl.game.component('selectable', function () {

	this.behavior('select', function (_target) {
		var $target;

		if (this.event) {
			$target = $(this.event.target).closest('li');

			if (this.shouldSelect($target) !== false) {
				if(this.game.audio.sfx.correct) this.game.audio.sfx.correct.play();
				return {
					message: $target.index(),
					behaviorTarget: $target
				};
			}	
		}

		else {
			this.proto(_target);
		}

		return false;
	});

	this.shouldSelect = function (_target) {
		return true;
	};

});
