pl.game.component('multiple-choice', function () {

	function validateAnswer (_scope) {
		var answers;

		if (_scope.properties.correct) {
			answers = _scope.properties.correct.split(/\s*,\s*/);

			if (~answers.indexOf(String(_scope.getSelected().index()))) {
				_scope.complete();
				if(_scope.audio.sfx.correct) _scope.audio.sfx.correct.play();
				if(_scope.audio.voiceOver.correct) _scope.audio.voiceOver.correct.play();
			} else {
				if(_scope.audio.sfx.incorrect) _scope.audio.sfx.incorrect.play();
				if(_scope.audio.voiceOver.incorrect) _scope.audio.voiceOver.incorrect.play();
			}
		}

		return false;
	}

	this.answer = function () {
		if (this.event) {
			$li = $(this.event.target).closest('li');

			if (!this.isComplete && this.select($li)) {
				validateAnswer(this);
			}
		}
	};

});
