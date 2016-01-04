'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gameConstants = require('../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

var _userInput = require('../user-input');

var _userInput2 = _interopRequireDefault(_userInput);

var _playerPaddle = require('./paddles/player-paddle');

var _playerPaddle2 = _interopRequireDefault(_playerPaddle);

var _peer = require('../peer');

var _peer2 = _interopRequireDefault(_peer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameOverMenu = (function () {
	function GameOverMenu(game, renderer) {
		var _this = this;

		_classCallCheck(this, GameOverMenu);

		this.renderer = renderer;
		this.game = game;

		_peer2.default.onCommand('playAgain', function () {
			return _this.playAgain();
		});
	}

	_createClass(GameOverMenu, [{
		key: 'render',
		value: function render() {
			var bounds = _gameConstants2.default.Bounds;
			var boxDim = {
				minX: bounds.minX + 100,
				minY: bounds.minY + 100,
				maxX: bounds.maxX - 100,
				maxY: bounds.maxY - 100
			};

			this.renderer.fillColor('#FFFFFF');
			this.renderer.strokeColor('#FFFFFF');

			this.renderer.line(boxDim.minX, boxDim.minY, boxDim.maxX, boxDim.minY); // top line
			this.renderer.line(boxDim.minX, boxDim.minY, boxDim.minX, boxDim.maxY); // left line
			this.renderer.line(boxDim.maxX, boxDim.minY, boxDim.maxX, boxDim.maxY); // right line
			this.renderer.line(boxDim.minX, boxDim.maxY, boxDim.maxX, boxDim.maxY); // bottom line;

			this.renderer.clearArea(boxDim.minX, boxDim.minY, boxDim.maxX - 150, boxDim.maxY - 150);

			this.renderer.text(bounds.maxX / 2 - 110, boxDim.minY + 150, "Game Over", '40pt "Courier New"');

			var didWin = this.game.paddles[_gameState2.default.winningPlayerIndex] instanceof _playerPaddle2.default;

			if (didWin) {
				this.renderer.text(bounds.maxX / 2 - 50, boxDim.minY + 200, "Ya lost", '25pt "Courier New"');
			} else {
				this.renderer.text(bounds.maxX / 2 - 50, boxDim.minY + 200, "Ya won :)", '25pt "Courier New"');
			}

			this.renderer.text(boxDim.minX + 20, boxDim.minY + 250, "press 'p' to play again.", '12pt "Courier New"');
			this.renderer.text(boxDim.minX + 20, boxDim.minY + 300, "press 'e' to exit to menu.", '12pt "Courier New"');
		}
	}, {
		key: 'register',
		value: function register() {
			var _this2 = this;

			_userInput2.default.addListener({ name: 'p' }, function () {
				_peer2.default.sendCommand('playAgain');
				_this2.playAgain();
			});

			_userInput2.default.addListener({ name: 'e' }, function () {
				_gameState2.default.resetScore();
				_gameState2.default.state = _gameConstants2.default.GameStates.menu;
			});
		}
	}, {
		key: 'deregister',
		value: function deregister() {
			_userInput2.default.removeListener('p');
			_userInput2.default.removeListener('e');
		}
	}, {
		key: 'playAgain',
		value: function playAgain() {
			this.isWaiting = false;
			_gameState2.default.resetScore();
			_gameState2.default.state = _gameConstants2.default.GameStates.play;
			this.game.ball.reset();
		}
	}]);

	return GameOverMenu;
})();

exports.default = GameOverMenu;