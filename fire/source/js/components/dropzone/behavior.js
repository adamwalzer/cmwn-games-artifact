pl.game.component('dropzone', function () {
		
	this.entity('.area', function () {
		
		this.cache = null;

		this.respond('grab', function () {
			this.audio.sfx.drag.play();
			this.cache = {
				position: this.absolutePosition().dec(this.game.absolutePosition()),
				size: this.size().scale(this.game.transformScale().x)
			};
		});

		this.respond('release', function (_event) {
			var point, scale;

			if((scale = this.game.transformScale().x) !== 1) {
				point = [
							_event.state.start.point[0] + scale * _event.state.progress.distance[0],
							_event.state.start.point[1] + scale * _event.state.progress.distance[1]
						];
			} else {
				point = _event.state.progress.point;
			}

			if (point && this.isPointInBounds(point)) {
				if (this.takes(_event.state.$draggable.id())) {
					_event.state.$draggable.removeClass('PLUCKED').addClass('COMPLETE').attr('pl-draggable',null);
					_event.state.$helper.addClass('DROPED');
					
					this.drop(_event.state.$draggable);
					this.audio.sfx.correct.play();
					
					return;
				}

				else {
					this.audio.sfx.incorrect.play()
				}
			}

			_event.state.$helper.addClass('RETURN').css('transform', 'translateX(0px) translateY(0px)');
		});

	});

	this.init = function () {
		this.takes().forEach(this.bind(function (_id) {
			this.require(_id);
		}));
	};

	this.takes = function (_id) {
		var takes = this.properties.take.split(/\s+/);
		return arguments.length ? !!~takes.indexOf(_id) : takes;
	};

	this.isPointInBounds = function (_point, _y) {
		var point;

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
		console.log('*** In bounds!!', _$thing.id());
		
		this.requiredQueue.ready(_$thing.id());

		return {
			message: _$thing.id(),
			behaviorTarget: _$thing
		};
	});

});
