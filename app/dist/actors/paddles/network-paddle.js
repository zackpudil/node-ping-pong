'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _peer = require('../../peer');

var _peer2 = _interopRequireDefault(_peer);

var _paddle = require('./paddle');

var _paddle2 = _interopRequireDefault(_paddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetworkPaddle = (function (_Paddle) {
	_inherits(NetworkPaddle, _Paddle);

	function NetworkPaddle(x, y, renderer) {
		var scale = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];

		_classCallCheck(this, NetworkPaddle);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NetworkPaddle).call(this, x, y, renderer, scale));

		_peer2.default.onCommand('paddlePositionChange', function (y) {
			// when ever the other paddle sends his/her's move updates over the write, we change it's position.
			_this.pos.y += y;
		});
		return _this;
	}

	return NetworkPaddle;
})(_paddle2.default);

exports.default = NetworkPaddle;