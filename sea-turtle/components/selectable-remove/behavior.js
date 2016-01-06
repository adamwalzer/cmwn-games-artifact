pl.game.component('selectable-remove', function () {
	
	this.behavior('select', function (_target) {
		var $target;

		if (this.event && !_target) {
			$target = $(this.event.target).closest('li');

			if (this.shouldSelect($target) !== false) {
				$target.is('li') && this.audio.sfx.correct.play();
				return {
					message: $target.attr('class'),
					behaviorTarget: $target
				};
			}

			else {
				this.audio.sfx.incorrect.play();
			}
		}

		else {
			this.proto(_target);
		}

		return false;
	});

	this.respond('select', function (_event) {
		var index, stateMethod;

		index = _event.message;
		stateMethod = this.properties.selectState || 'select';

		if (index) {
			this[stateMethod](_event.behaviorTarget);
			this.items.correct.ready(index);
		}
	});

	this.shouldSelect = function (_target) {
		var $target = $(_target);
		if (!$target.hasClass(this.STATE.HIGHLIGHTED) && !$target.is('[pl-incorrect]')) {
			return !this.screen.state(this.STATE.VOICE_OVER);
		}

		return false;
	};


	this.ready = function () {
		var correct ,$net, zoom;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.complete();
		}));

		this.items = this
			.find('.items li:not([pl-incorrect])')
			.map(function (_index, _node) {
				correct.add(_node.className);
				return _node;
			})
			.toArray();

		this.items.correct = correct;

		$net = $('.selectable-remove-component .net');
		zoom = this.game.zoom;

		$('.selectable-remove-component .center').mousemove(function(e){
           	$net.css({left: e.clientX / zoom - 85, top: e.clientY / zoom - 65});
      	});
	};

});