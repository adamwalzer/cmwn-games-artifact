pl.game.component('screen-quit', function () {

	var characters;
	/**
	 * Nodes, including the node of this screen, with a
	 * attribute of pl-bg will get a background-image style
	 * and the resource preloaded and collected for watching.
	 */
	this.handleProperty({
		bg: function (_node, _name, _value) {
			var img = new Image();
			characters = characters || [];

			img.src = _value;
			characters.push(img);
			$(_node).css('background-image', 'url('+_value+')');
		}
	});

	// TODO: Make an automated way to handle this
	this.on('transitionend', function (_event) {
		if (this.state(this.STATE.LEAVE)) {
			this.addClass('LEAVE-END');	
		}
	});

	this.on('ui-open', function (_event) {
		this.game.addClass('QUIT-SCREEN');
		this.removeClass('LEAVE-END');
	});

	this.on('ui-leave', function () {
		this.game.removeClass('QUIT-SCREEN');
	});

	this.init = function () {
		this.addClass('LEAVE LEAVE-END');
	};
	
	this.okay = function () {
		this.game.exit();
	};

	this.cancel = function () {
		this.leave();
	};

});
