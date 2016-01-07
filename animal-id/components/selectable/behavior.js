pl.game.component('selectable', function () {

	this.behavior('select', function (_target) {
		var $target;

		if (this.event && !_target) {
			$target = $(this.event.target).closest('li');

			if (this.shouldSelect($target) !== false) {
				$target.is('li') && this.audio.sfx.correct.play();
				if(this.showSelect($target)) {
					return {
						message: $target.id(),
						behaviorTarget: $target
					};
				}
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
		return _$target.is(this.screen.SELECTOR.CORRECT);
	};

	this.showSelect = function(_$target) {
		var stateMethod;

		stateMethod = this.properties.selectState || 'select';

		if (_$target) {
			this[stateMethod](_$target);
			this.items.correct.ready(_$target.id());
		}

		return true;
	};

	this.populateList = function(_$bin) {
		var $items, $bin, random;

		$items = this.find(".items");
		$bin = _$bin;

		while($bin.length) {
			random = Math.floor(_$bin.length*Math.random());
			$bin.eq(random).remove().appendTo($items);
			$bin = this.find('.bin li');
		}
	};

	this.ready = function () {
		var correct, $bin;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.screen.complete();
		}));

		this.items = this
			.find('.items li[pl-correct]')
			.map(function (_index, _node) {
				correct.add(_node.getAttribute("pl-id"));
				return _node;
			})
			.toArray();

		this.items.correct = correct;

		$bin = this.find('.bin li');

		if($bin.length) this.populateList($bin);
	};

});