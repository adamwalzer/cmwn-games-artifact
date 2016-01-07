pl.game.component('reveal', function () {

	this.respond('select', function (_event) {
		var vo, index;

		index = _event.message;
		this.closeAll();

		if(typeof index !== 'undefined') {
			if (typeof index === 'number') {
				this.open(this.find('li').eq(index));
				this.audio.voiceOver[index].play();
			}
				
			else if (typeof index === 'string') {
				if (this[index]) {
					this.open(this[index]);
					this.items.correct.ready(index);

					if (this.audio) {
						index = this[index].index();
						vo = this.audio.voiceOver ? this.audio.voiceOver[index] : null;
						
						if (vo) vo.play();
					}
				}
			}
		}
	});

	this.item = function (_id) {
		var vo, index;

		this.closeAll();

		if(typeof _id !== 'undefined') {
			if (typeof _id === 'number') {
				this.open('li:nth-child('+_id+')');
				this.audio.voiceOver[_id].play();
			}
				
			else if (typeof _id === 'string') {
				if (this[_id]) {
					this.open(this[_id]);

					if (this.audio) {
						index = this[_id].index();
						vo = this.audio.voiceOver ? this.audio.voiceOver[index] : null;
						
						if (vo) vo.play();
					}
				}
			}
		}
	};

	this.closeAll = function() {
		if(!this.screen.state(this.screen.STATE.VOICE_OVER)) {
			this.close(this.find('li.OPEN'));
		}
	};

	this.handleCloseClick = function() {
		this.closeAll();
		this.screen.next();
	};

	this.ready = function () {
		var correct;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.screen.complete();
		}));

		this.items = this
			.find('[pl-required]')
			.map(function (_index, _node) {
				correct.add(_node.getAttribute("pl-id"));
				return _node;
			})
			.toArray();

		this.items.correct = correct;
	};

});