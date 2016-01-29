pl.game.component('selectable', function () {

	this.behavior('select', function (_target) {
		var $target, message;

		if (this.event) {
			$target = $(this.event.target).closest('li');
			message = $target.id() || $target.index();

			if (this.shouldSelect($target) !== false) {
				return {
					message,
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
		return !this.screen.state(this.STATE.VOICE_OVER);
	};

});
