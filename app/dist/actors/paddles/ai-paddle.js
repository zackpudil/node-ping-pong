'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gameConstants = require('../../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _paddle = require('./paddle');

var _paddle2 = _interopRequireDefault(_paddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AIPaddle = (function (_Paddle) {
	_inherits(AIPaddle, _Paddle);

	function AIPaddle(x, y, renderer, ball) {
		var scale = arguments.length <= 4 || arguments[4] === undefined ? 10 : arguments[4];
		var difficulty = arguments.length <= 5 || arguments[5] === undefined ? 3 : arguments[5];
		var onRightSide = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];

		_classCallCheck(this, AIPaddle);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AIPaddle).call(this, x, y, renderer, scale));

		_this.ball = ball;
		_this.maxTicks = 11 - Math.max(Math.min(difficulty, 11), 1);
		_this.ticks = 0;
		_this.onRightSide = onRightSide;
		return _this;
	}

	_createClass(AIPaddle, [{
		key: 'update',
		value: function update() {
			// Don't want the paddles to update it's position to ball's if ball is not on the same court side of the paddle.
			if (this.onRightSide && this.ball.pos.x < _gameConstants2.default.Bounds.maxX / 2) {
				return;
			} else if (!this.onRightSide && this.ball.pos.x > _gameConstants2.default.Bounds.maxX / 2) {
				return;
			}

			// Difficulty == delay between updates.
			if (this.ticks <= this.maxTicks) {
				this.ticks += 1;
				return;
			}

			// move position towards ball.
			if (this.pos.y < this.ball.pos.y && this.pos.y + 40 < this.ball.pos.y) {
				this.pos.y += 40;
			} else if (this.pos.y > this.ball.pos.y && this.pos.y + 40 > this.ball.pos.y) {
				this.pos.y -= 40;
			}

			this.ticks = 0;

			_get(Object.getPrototypeOf(AIPaddle.prototype), 'update', this).call(this);
		}
	}]);

	return AIPaddle;
})(_paddle2.default);

exports.default = AIPaddle;