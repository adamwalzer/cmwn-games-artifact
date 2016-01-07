pl.game.component('flip-card', function () {
	
	this.flip = function (_card) {
		console.log(_card);
	};

	this.behavior('select', function (_target) {
		var $target;

		if (this.event && !_target) {
			$target = $(this.event.target).closest('li');

			if (this.shouldSelect($target) !== false) {
				$target.is('li') && this.audio.sfx.correct.play();
				this.showSelect($target);
				return {
					message: $target.attr('class'),
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

	this.shouldSelect = function (_$target) {
		return !_$target.hasClass(this.screen.STATE.HIGHLIGHTED) && _$target.is('li');
	};

	this.showSelect = function(_$target) {
		var stateMethod;

		stateMethod = 'highlight';

		if (_$target) {
			this[stateMethod](_$target);
			this.items.correct.ready(_$target.attr('class').split(" ")[0]);
		}
	};

	this.ready = function () {
		var correct ,$net, zoom;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.screen.complete();
		}));

		this.items = this
			.find('.items li[pl-correct]')
			.map(function (_index, _node) {
				correct.add(_node.className);
				return _node;
			})
			.toArray();

		this.items.correct = correct;
	};
	
});