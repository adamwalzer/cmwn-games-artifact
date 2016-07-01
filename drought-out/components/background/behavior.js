pl.game.component('background', function () {
	var characters;
	/**
	 * Nodes, including the node of this screen, with a
	 * attribute of pl-bg will get a background-image style
	 * and the resource preloaded and collected for watching.
	 */
	this.handleProperty({
		bg: function (_node, _name, _value) {
			var img = new Image();
			
			if (!characters) characters = [];

			img.src = _value;
			characters.push(img);
			$(_node).css('background-image', 'url('+_value+')');
		}
	});
});
