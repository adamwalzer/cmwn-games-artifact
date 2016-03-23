export default function infoQuestion () {
	/**
	 * Plays the flush sound with a delay.
	 * I may want move this to the screen component.
	 * @todo Create a mechanism to attach sounds to actions.
	 */
	this.next = function () {
		var nextScreen, so;

		if (!this.completed()) return;

		nextScreen = this.sup();
		so = pl.util.resolvePath(this, 'game.audio.sfx.flush');

		if (so) so.play();

		this.delay('2s', function () {
			this.leave();
			nextScreen.open();
		});

		return nextScreen;
	};

}
