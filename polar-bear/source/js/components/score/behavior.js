pl.game.component('score', function () {

	this.value = 0;

	this.entity('board', function () {
		
		this.template = null;

		this.ready = function () {
			this.template = this.counter.html();
		};

		this.render = function () {
			this.counter.html(this.template.replace('{{score}}', this.value));
			return this;
		};

	});

	this.ready = function () {
		this.attr('value',this.value);
		this.board.render();
	};

	this.up = function (_count) {
		this.value+= _count || 1;

		this.attr('value',this.value);
		this.board.render();

		console.log('score', this.value, this.properties.max)

		if (this.value >= this.properties.max) {
			console.log('oh word');
			this.complete();
		}

		return this;
	};

	this.down = function (_count) {
		this.value-= _count || 1;

		this.attr('value',this.value);
		this.board.render();
		
		if (this.value >= this.properties.max) {
			this.complete();
		}

		return this;
	};

});
