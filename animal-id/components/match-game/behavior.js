pl.game.component('match-game', function () {

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

	this.shouldSelect = function(_$target) {
		return !_$target.hasClass(this.STATE.HIGHLIGHTED) && !_$target.parent().hasClass('show-all');
	};

	this.start = function() {
		var $items, self = this;
		
		$items = this.find('.items').addClass('show-all');

		setTimeout(function() {
			$items.removeClass('show-all');
		}, 5000);

		this.$currentCard = null;

		this.find('li').each(function() {
			self.unhighlight($(this));
		});
	};

	this.showSelect = function(_$target) {
		var stateMethod, undoStateMethod;

		stateMethod = this.properties.selectState || 'select';
		if(stateMethod === 'select') undoStateMethod = 'deselect';
		if(stateMethod === 'highlight') undoStateMethod = 'unhighlight';

		if (_$target) {
			this[stateMethod](_$target);

			if(!this.$currentCard) {
				this.$currentCard = _$target;
			}

			else if(this.$currentCard.id() === _$target.id()) {
				this.$currentCard = null;
				return true;
			}

			else {
				setTimeout(function() {
					this[undoStateMethod](_$target);
					this[undoStateMethod](this.$currentCard);
					this.$currentCard = null;
				}.bind(this), 1000);
			}
		}

		return false;
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