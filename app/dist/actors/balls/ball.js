'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modelRenderer = require('../../model-renderer');

var _modelRenderer2 = _interopRequireDefault(_modelRenderer);

var _gameState = require('../../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = (function () {
	function Ball(x, y, renderer, scale) {
		_classCallCheck(this, Ball);

		this.modelRenderer = new _modelRenderer2.default(renderer);

		this.startPos = { x: x, y: y };
		this.pos = { x: x, y: y };
		this.dir = { x: -1, y: -1 };
		this.speed = 1.5;
		this.scale = scale;
	}

	_createClass(Ball, [{
		key: 'render',
		value: function render() {
			this.modelRenderer.renderModel("ball", this.pos, '#FFFFFF', this.scale);
		}
	}, {
		key: 'update',
		value: function update() {
			this.pos.x += this.dir.x * this.speed;
			this.pos.y += this.dir.y * this.speed;
		}
	}, {
		key: 'collide',
		value: function collide(pos, width, height) {
			return this.pos.x < pos.x + width && this.pos.x + this.scale > pos.x && this.pos.y < pos.y + height && this.pos.y + this.scale > pos.y;
		}
	}, {
		key: 'scored',
		value: function scored(sideThatScored) {
			_gameState2.default.score = sideThatScored;
		}
	}]);

	return Ball;
})();

exports.default = Ball;