pl.game.component('title', function () {

	this.start = function () {
		this.proto();
		this.showTitle();
	};

	this.showTitle = function () {
		this.image.addClass('animated '+this.image.attr('pl-animation'));
		this.complete();
	};

});
