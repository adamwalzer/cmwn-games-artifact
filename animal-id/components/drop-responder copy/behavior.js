pl.game.component('drop-responder', function () {

	this.respond('drop', function (_event) {
		this.screen.complete();
		this.screen.reveal.item(_event.behaviorTarget.id());
	});

});