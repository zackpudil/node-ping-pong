'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modelRenderer = require('../../model-renderer');

var _modelRenderer2 = _interopRequireDefault(_modelRenderer);

var _gameConstants = require('../../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = (function () {
	function Paddle(x, y, renderer, scale) {
		_classCallCheck(this, Paddle);

		this.pos = { x: x, y: y };
		this.modelRenderer = new _modelRenderer2.default(renderer);
		this.scale = scale;
	}

	_createClass(Paddle, [{
		key: 'render',
		value: function render() {
			this.modelRenderer.renderModel('paddle', this.pos, '#FFFFFF', this.scale);
		}
	}, {
		key: 'update',
		value: function update() {
			this.pos.y = Math.max(this.pos.y, _gameConstants2.default.Bounds.minY + this.scale);
			this.pos.y = Math.min(this.pos.y, _gameConstants2.default.Bounds.maxY - this.scale * 6);
		}
	}]);

	return Paddle;
})();

exports.default = Paddle;