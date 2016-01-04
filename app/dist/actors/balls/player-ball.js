'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gameConstants = require('../../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('../../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

var _peer = require('../../peer');

var _peer2 = _interopRequireDefault(_peer);

var _ball = require('./ball');

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerBall = (function (_Ball) {
	_inherits(PlayerBall, _Ball);

	function PlayerBall(x, y, renderer) {
		var scale = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];

		_classCallCheck(this, PlayerBall);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerBall).call(this, x, y, renderer, scale));
	}

	_createClass(PlayerBall, [{
		key: 'update',
		value: function update() {
			// if the ball hits the top or bottom walls, reverse the y direction.
			if (this.pos.y > _gameConstants2.default.Bounds.maxY - this.scale || this.pos.y < _gameConstants2.default.Bounds.minY) {
				this.dir.y *= -1;
			}

			//if the ball hits the right or left walls, then the ball needs to be reset, and the score calculated.
			if (this.pos.x > _gameConstants2.default.Bounds.maxX - this.scale || this.pos.x < _gameConstants2.default.Bounds.minY) {
				var sideThatScored = this.pos.x > _gameConstants2.default.Bounds.maxX - this.scale ? 'one' : 'two';
				this.scored(sideThatScored);
				this.reset();
			}

			_get(Object.getPrototypeOf(PlayerBall.prototype), 'update', this).call(this);

			// send pos to the network ball.
			_peer2.default.sendCommand('ballUpdate', this.pos);
		}
	}, {
		key: 'collide',
		value: function collide(pos, width, height) {
			//  AABB collision detection.
			if (_get(Object.getPrototypeOf(PlayerBall.prototype), 'collide', this).call(this, pos, width, height)) {

				this.speed = Math.min(this.speed + 0.5, 10);
				this.dir.x *= -1;

				// push ball out of collision before next collision check.
				if (this.pos.x < _gameConstants2.default.Bounds.maxY) {
					this.pos.x += 10;
				} else {
					this.pos.x -= 10;
				}
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			// put ball back at the center, with default speed, but keep current the x direction.
			this.pos = { x: this.startPos.x, y: this.startPos.y };
			this.dir.y = -1;
			this.speed = 1.5;
		}
	}, {
		key: 'scored',
		value: function scored(sideThatScored) {
			_get(Object.getPrototypeOf(PlayerBall.prototype), 'scored', this).call(this, sideThatScored);
			_peer2.default.sendCommand('scored', sideThatScored);
		}
	}]);

	return PlayerBall;
})(_ball2.default);

exports.default = PlayerBall;