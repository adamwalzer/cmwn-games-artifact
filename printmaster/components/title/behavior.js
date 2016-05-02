pl.game.component('title', function () {

	this.ready = function () {
		this.open();
		this.delay(1750, function () {
			this.complete();
		});
	};

});
