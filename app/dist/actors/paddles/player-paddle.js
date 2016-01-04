'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _userInput = require('../../user-input');

var _userInput2 = _interopRequireDefault(_userInput);

var _peer = require('../../peer');

var _peer2 = _interopRequireDefault(_peer);

var _paddle = require('./paddle');

var _paddle2 = _interopRequireDefault(_paddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerPaddle = (function (_Paddle) {
	_inherits(PlayerPaddle, _Paddle);

	function PlayerPaddle(x, y, renderer) {
		var scale = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];
		var keyMaps = arguments.length <= 4 || arguments[4] === undefined ? { up: 'up', down: 'down' } : arguments[4];

		_classCallCheck(this, PlayerPaddle);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerPaddle).call(this, x, y, renderer, scale));

		_this.upKeyisDown = false;
		_this.downKeyisDown = false;

		_userInput2.default.addListener({ name: keyMaps.up }, function () {
			return _this.upKeyisDown = true;
		});
		_userInput2.default.addListener({ name: keyMaps.up }, function () {
			return _this.upKeyisDown = false;
		}, 'up');

		_userInput2.default.addListener({ name: keyMaps.down }, function () {
			return _this.downKeyisDown = true;
		});
		_userInput2.default.addListener({ name: keyMaps.down }, function () {
			return _this.downKeyisDown = false;
		}, 'up');
		return _this;
	}

	_createClass(PlayerPaddle, [{
		key: 'update',
		value: function update() {
			var displacement = 0;

			if (this.upKeyisDown) displacement = -5;else if (this.downKeyisDown) displacement = 5;

			this.pos.y += displacement;

			if (displacement !== 0) _peer2.default.sendCommand('paddlePositionChange', displacement);

			_get(Object.getPrototypeOf(PlayerPaddle.prototype), 'update', this).call(this);
		}
	}]);

	return PlayerPaddle;
})(_paddle2.default);

exports.default = PlayerPaddle;