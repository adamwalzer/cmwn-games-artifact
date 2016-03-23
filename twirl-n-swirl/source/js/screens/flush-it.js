/**
 * Twirl n Swirl - Toilet Flush Game
 */
export default function flushIt () {
	/**
	 * Adds behavior to the bins with draggable items.
	 * We add a native event listener so we can handle
	 * events on the capture phase and prevent the DnD
	 * behavior never fires.
	 */
	this.entity('.draggables', function () {
		this.listen('mousedown', true, function (_event) {
			var $target = $(_event.target);

			if (this.state(this.STATE.DISABLED) || $target.is('[pl-draggable]') && $target.state(this.STATE.DISABLED)) {
				_event.stopPropagation();
			}
		});
	});

	/**
	 * Adds behavior to the reveal modal.
	 * @todo Create a modal component which handles its layering.
	 */
	this.entity('modal-reveal', function () {
		/**
		 * Expose reveal component method
		 */
		this.item = function (_id) {
			this
				.removeClass('LAYER')
				.open();
			this.reveal.item(_id);
		};
		/**
		 * Close the modal and play the standard button sound.
		 * @override
		 */
		this.close = function () {
			var so = pl.util.resolvePath(this, 'game.audio.sfx.button');

			if (this.screen.state(this.STATE.VOICE_OVER) && !this.screen.completed()) return;
			if (so) so.play();

			this.screen.enable('.draggables');
			
			return this.sup();
		};
		/**
		 * Watches for completion of state change tranisions and puts the view in a LAYER state.
		 * We want to re-layer the view after it finishes transitioning out.
		 * @see ~/source/css/flush-it.scss:134
		 */
		this.on('transitionend', function (_event) {
			if (!this.is(_event.target)) return;
			if (!this.state(this.STATE.OPEN)) {
				this.addClass('LAYER').removeClass('PROGRESS');
			} else {
				this.addClass('PROGRESS');
			}
		});

	});
	/**
	 * Adds an ability for the screen to respond to items droped in the
	 * toilet bowl. Its responsibility is to show the reveal via the
	 * dropped item's ID and disable draggable bins.
	 */
	this.respond('drop', function (_event) {
		var id = _event.behaviorTarget.id();

		this.toilet.reveal.item(id);
		this.disable('.draggables');
	});
	/**
	 * Show the instructional modal when the screen starts.
	 */
	this.start = function () {
		this.modalReveal.item(0);
	};
	/**
	 * The flush button action.
	 * Here we animate the dropped item flushing and display the modal
	 * by the item's ID.
	 */
	this.flush = function () {
		var current = this.reveal.currentItem();
		var sfx = pl.util.resolvePath(this, 'game.audio.sfx.flush');
		
		if (sfx) sfx.play();
		
		if (!current) return;

		current.addClass('FLUSH');
		this.disable($('.draggables [pl-id='+current.id()+']'));

		this.delay('2s', function () {
			this.modalReveal.item(current.id());
		});
	};

}
