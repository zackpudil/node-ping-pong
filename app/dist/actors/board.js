'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gameConstants = require('../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = (function () {
	function Board(renderer) {
		_classCallCheck(this, Board);

		this.renderer = renderer;
	}

	_createClass(Board, [{
		key: 'render',
		value: function render() {
			var bounds = _gameConstants2.default.Bounds;

			this.renderer.strokeColor('#FFFFFF');
			this.renderer.fillColor('#000000');
			this.renderer.lineWidth(5);

			this.renderer.line(bounds.minX, bounds.minY, bounds.maxX, bounds.minY); // top line
			this.renderer.line(bounds.minX, bounds.minY, bounds.minX, bounds.maxY); // right line
			this.renderer.line(bounds.maxX, bounds.minY, bounds.maxX, bounds.maxY); // bottom line
			this.renderer.line(bounds.minX, bounds.maxY, bounds.maxX, bounds.maxY); // left line

			this.renderer.line(bounds.maxX / 2 + 25, bounds.minY, bounds.maxX / 2 + 25, bounds.maxY);

			this.renderer.circle(bounds.maxX / 2 + 25, bounds.maxY / 2 + 25, 25);

			this.renderer.lineWidth(1);
		}
	}]);

	return Board;
})();

exports.default = Board;