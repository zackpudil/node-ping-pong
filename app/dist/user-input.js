'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gameConstants = require('./game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;
var inputHandlers = [];
var streamMode = false;

var UserInputCoordinator = (function () {
	function UserInputCoordinator() {
		var _this = this;

		_classCallCheck(this, UserInputCoordinator);

		// A singleton instance
		if (!instance) {
			instance = this;

			// differenciate between 'up' and 'down' inputHandlers.
			document.onkeyup = function (e) {
				return _this.handleInput(e, 'up');
			};
			document.onkeydown = function (e) {
				return _this.handleInput(e, 'down');
			};
		}

		return instance;
	}

	_createClass(UserInputCoordinator, [{
		key: 'handleInput',
		value: function handleInput(e, pressType) {
			var activatedListeners = inputHandlers.filter(function (l) {
				return _gameConstants2.default.KeyMap[l.key.name] == e.keyCode && l.key.ctrl == e.ctrlKey && l.key.shift == e.shiftKey && l.pressType == pressType;
			});

			activatedListeners.forEach(function (l) {
				return l.handle();
			});
		}
	}, {
		key: 'addListener',
		value: function addListener(key, handler) {
			var pressType = arguments.length <= 2 || arguments[2] === undefined ? 'down' : arguments[2];

			// ctrl and shift are optional values, default to false if not passed.
			key.ctrl = key.ctrl || false;
			key.shift = key.shift || false;

			inputHandlers.push({
				key: key,
				handle: handler,
				pressType: pressType
			});
		}
	}, {
		key: 'removeListener',
		value: function removeListener(key) {
			var inputListenerIndex = inputHandlers.findIndex(function (input) {
				return input.key.name === key;
			});

			if (inputListenerIndex > -1) {
				inputHandlers.splice(inputListenerIndex, 1);
			}
		}
	}, {
		key: 'clearListeners',
		value: function clearListeners() {
			inputHandlers = [];
		}
	}]);

	return UserInputCoordinator;
})();

var inputCoordinator = new UserInputCoordinator();

exports.default = inputCoordinator;