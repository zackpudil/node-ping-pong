'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _userInput = require('../user-input');

var _userInput2 = _interopRequireDefault(_userInput);

var _gameConstants = require('../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

var _peer = require('../peer');

var _peer2 = _interopRequireDefault(_peer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PauseMenu = (function () {
	function PauseMenu(renderer, options) {
		var _this = this;

		_classCallCheck(this, PauseMenu);

		this.renderer = renderer;
		this.ipAddress = "";

		this.gameStateChangeCb = options.startGameCb;
		this.endGameCb = options.exitGameCb;

		_peer2.default.onCommand('pause', function () {
			return _this.pauseGame();
		});
	}

	_createClass(PauseMenu, [{
		key: 'render',
		value: function render() {
			this.renderer.fillColor('#000000');
			this.renderer.strokeColor('#FFFFFF');
			this.renderer.box(150, 75, 550, 150);

			//Draw options
			this.renderer.fillColor('#FFFFFF');
			var font = '20pt "Courier New"';
			this.renderer.text(175, 100, "Press \'p\' to unpause.", font);
			this.renderer.text(175, 140, 'Press \'e\' to exit back to menu.', font);
		}
	}, {
		key: 'pauseGame',
		value: function pauseGame() {
			var _this2 = this;

			if (_gameState2.default.state == _gameConstants2.default.GameStates.play) {
				_gameState2.default.state = _gameConstants2.default.GameStates.pause;
				_userInput2.default.addListener({ name: 'e' }, function () {
					return _this2.endGameCb();
				});
			} else {
				_gameState2.default.state = _gameConstants2.default.GameStates.play;
			}
		}
	}, {
		key: 'register',
		value: function register() {
			var _this3 = this;

			_userInput2.default.addListener({ name: 'p' }, function () {
				_this3.pauseGame();
				_peer2.default.sendCommand('pause');
			});
		}
	}, {
		key: 'deregister',
		value: function deregister() {
			_userInput2.default.removeListener('p');
			_userInput2.default.removeListener('e');
		}
	}]);

	return PauseMenu;
})();

exports.default = PauseMenu;