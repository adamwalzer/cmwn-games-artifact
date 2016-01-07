pl.game.component('class-switcher', function () {

	this.start = function() {
		var target, add, remove;

		target = this.properties.target || "body";
		add = this.properties.add || "";
		remove = this.properties.remove || "";

		$(target).addClass(add).removeClass(remove);
	};

});