pl.game.component('modal', function () {

	this.item = function(_id) {
		this.select(this);
		this.reveal.item(_id);
	};
	
	this.close = function() {
		if(this.screen.shouldProceed()) {
			this.deselect(this);
		}
	};
});
