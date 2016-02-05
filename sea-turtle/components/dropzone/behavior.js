pl.game.component('dropzone', function () {

	/**
	 * Handler for a dropzone behavior.
	 * @insatnce
	 */
	function reportState (_state) {
		return {
			state: _state,
			behaviorTarget: _state.$draggable
		};
	}
		
	this.entity('.area', function () {
		
		this.cache = null;

		/**
		 * This is the area entities' ability to respond to the "grab" behavior
		 * of a draggable's scope somewhere on `this.screen`.
		 * -------------------
		 * Caches the position and size of the area.
		 */
		this.respond('grab', function () {
			this.cache = {
				position: this.absolutePosition().dec(this.game.absolutePosition()),
				size: this.size()
			};
		});

		/**
		 * This is the area entities' ability to respond to the "release" behavior
		 * of a draggable's scope somewhere on `this.screen`.
		 * -------------------
		 * Tests if the location of the drop falls in bounds of the area.
		 * Also validates if our dropzone takes the draggable as defined
		 * by the `pl-take` attribute on the component node.
		 */
		this.respond('release', function (_event) {
			if (_event.state.progress.point && this.isPointInBounds(_event.state.progress.point)) {
				if (this.takes(_event.state.$draggable.id())) {
					_event.state.$draggable.removeClass('PLUCKED');
					_event.state.$helper.addClass('DROPED');
					
					this.drop(_event.state.$draggable);
					
					return;
				}
				this.reject(_event.state);
			}

			this.missed(_event.state);

			_event.state.$helper.addClass('RETURN');
		});

	});

	this.init = function () {
		this.takes().forEach(this.bind(function (_id) {
			this.require(_id);
		}));
	};

	this.takes = function (_id) {
		var takes

		// if no pl-take attribute is defined then
		// the dropzone will take any draggable.
		if (!this.properties.take) return _id != null ? true : [];

		takes = this.properties.take.split(/\s+/);
		return _id != null ? !!~takes.indexOf(_id) : takes;
	};

	this.isPointInBounds = function (_point, _y) {
		var point, position;

		point = pl.Point.create(arguments);

		if (point.x >= this.cache.position.x && point.x <= this.cache.position.x+this.cache.size.width) {
			if (point.y >= this.cache.position.y && point.y <= this.cache.position.y+this.cache.size.height) {
				return true;
			}
		}

		return false;
	};

	this.isBoxInBounds = function (_point, _size) {
		// comming soon!
	};

	this.behavior('drop', function (_$draggable) {
		if (_$draggable.id()) this.requiredQueue.ready(_$draggable.id());

		return {
			behaviorTarget: _$draggable
		};
	});

	/**
	 * Performed when a draggable is in bounds of the area and
	 * is rejected; or out of bounds of the dropzone area.
	 */
	this.behavior('missed', reportState);

	/**
	 * Performed when a draggable is droped in bounds of the area but
	 * the component does not "take" it.
	 */
	this.behavior('reject', reportState);

});
