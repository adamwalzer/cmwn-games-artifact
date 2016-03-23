pl.game.component('multiple-choice', function () {

	function validateAnswer (_scope) {
		var answers;

		if (_scope.properties.correct) {
			answers = _scope.properties.correct.split(/\s*,\s*/);

			if (~answers.indexOf(String(_scope.getSelected().index()))) {
				if(_scope.audio.sfx.correct) _scope.audio.sfx.correct.play();
				_scope.complete();
			} else {
				if(_scope.audio.sfx.incorrect) _scope.audio.sfx.incorrect.play();
			}
		}

		return false;
	}

	this.behavior('answer', function () {
		var $li;
		if (this.event) {
			$li = $(this.event.target).closest('li');

			if (!this.isComplete && this.select($li)) {
				validateAnswer(this);
			}

			return {
				behaviorTarget: $li,
				message: $li.id(),
			};
		}

		return false;
	});

});
