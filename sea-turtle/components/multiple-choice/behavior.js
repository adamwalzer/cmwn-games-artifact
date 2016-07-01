pl.game.component('multiple-choice', function () {

	function validateAnswer (_$selected) {
		var index;

		if (this.properties.correct) {
			index = _$selected.index();

			if (this.correct.has(index)) {
				this.correct.ready(index);
				return true;
			}
		}

		else if (_$selected) {
			if (_$selected.is('[pl-correct]') && this.correct.has(_$selected[0])) {
				this.correct.ready(_$selected[0]);
				return true;
			}
		}

		return false;
	}

	this.correct = null;

	this.handleProperty({
		correct: function (_node, _name, _value) {
			var answers;

			if (!this.correct) {
				this.correct = pl.Queue.create();
				this.correct.on('complete', this.bind(function (_event) {
					this.complete();
				}));
			}

			if (this.is(_node)) {
				answers = this.properties.correct.split(/\s*,\s*/);
				answer.forEach(this.bind(function (_index) {
					this.correct.add(Number(_index));
				}));
			}

			else {
				this.correct.add(_node);
			}
		}
	});

	this.behavior('answer', function (_$target) {
		var isCorrect;

		if (!this.isComplete && this.select(_$target)) {
			isCorrect = validateAnswer.call(this, _$target);
		}

		return {
			message: isCorrect ? 'correct' : 'incorrect',
			behaviorTarget: _$target
		};
	});

});
