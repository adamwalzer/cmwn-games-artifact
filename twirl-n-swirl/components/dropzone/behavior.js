pl.game.component('dropzone', function () {

	function deQ (_id) {
		if (this.requiredQueue && this.isMemberSafe('requiredQueue') && this.requiredQueue.has(_id)) {
			return this.requiredQueue.ready(_id);
		}
	}
		
	this.entity('.area', function () {
		
		this.cache = null;

		this.respond('grab', function () {
			var sfx = pl.util.resolvePath(this, 'audio.sfx.drag');
			
			if (sfx) sfx.play();

			this.cache = {
				position: this.position(),
				size: this.size()
			};
		});

		this.respond('release', function (_event) {
			var sfx;

			sfx = {
				correct: pl.util.resolvePath(this, 'audio.sfx.correct'),
				incorrect: pl.util.resolvePath(this, 'audio.sfx.incorrect')
			};

			if (_event.state.progress.point && this.isPointInBounds(_event.state.progress.point)) {
				if (this.takes(_event.state.$draggable.id())) {
					_event.state.$draggable.removeClass('PLUCKED');
					_event.state.$helper.addClass('DROPED');
					
					this.drop(_event.state.$draggable);
					
					if (sfx.correct) sfx.correct.play()
					
					return;
				}

				else if (sfx.incorrect) {
					sfx.incorrect.play()
				}
			}

			_event.state.$helper.addClass('RETURN');
		});

	});

	this.on('initialize', function () {
		this.takes().forEach(this.bind(function (_id) {
			this.require(_id);
		}));
	});

	this.takes = function (_id) {
		var takes = this.properties.take;
		// if no pl-take attribute is defined then
		// the dropzone will take any draggable.
		if (!takes) return _id != null ? true : [];

		return arguments.length ? !!~takes.indexOf(_id) : takes;
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

	this.behavior('drop', function (_$thing) {
		var sfx = pl.util.resolvePath(this, 'audio.sfx.drop');
			
		if (sfx) sfx.play();

		deQ.call(this, _$thing.id());
		
		return {
			behaviorTarget: _$thing
		};
	});

});
