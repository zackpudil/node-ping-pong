'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _peer = require('../../peer');

var _peer2 = _interopRequireDefault(_peer);

var _ball = require('./ball');

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetworkBall = (function (_Ball) {
	_inherits(NetworkBall, _Ball);

	function NetworkBall(x, y, renderer) {
		var scale = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];

		_classCallCheck(this, NetworkBall);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NetworkBall).call(this, x, y, renderer, scale));

		_this.networkPosition = null;

		_peer2.default.onCommand('scored', function (playerWhoScored) {
			_get(Object.getPrototypeOf(NetworkBall.prototype), 'scored', _this).call(_this, playerWhoScored);
		});

		_peer2.default.onCommand('ballUpdate', function (pos) {
			_this.networkPosition = pos;
		});
		return _this;
	}

	_createClass(NetworkBall, [{
		key: 'update',
		value: function update() {
			this.pos = this.networkPosition || this.pos;
		}
	}]);

	return NetworkBall;
})(_ball2.default);

exports.default = NetworkBall;