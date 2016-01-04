'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _userInput = require('../user-input');

var _userInput2 = _interopRequireDefault(_userInput);

var _peer = require('../peer');

var _peer2 = _interopRequireDefault(_peer);

var _smalltalk = require('smalltalk');

var _smalltalk2 = _interopRequireDefault(_smalltalk);

var _gameConstants = require('../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = (function () {
	function Menu(renderer) {
		_classCallCheck(this, Menu);

		this.renderer = renderer;
		this.ipAddress = "";
	}

	_createClass(Menu, [{
		key: 'render',
		value: function render() {
			var font = '20pt "Courier New"';
			this.renderer.fillColor('#FFFFFF');
			this.renderer.strokeColor('#FFFFFF');

			// Draw title.
			this.renderer.text(20, 250, 'Pong', '140pt "Courier New"');

			//Draw options
			this.renderer.text(20, 380, 'Press 1 to start a game.', font);
			this.renderer.text(20, 410, 'Press 2 to join a game.', font);
			this.renderer.text(20, 440, 'Press 3 to play with AI.', font);
			this.renderer.text(20, 470, 'Press 4 for a show.', font);

			this.renderer.text(20, 500, 'Press q to exit game.', font);
		}
	}, {
		key: 'onGameStart',
		value: function onGameStart(options) {
			this.joinGame = options.joinGameCb;
			this.createGame = options.createGameCb;
			this.aiGame = options.startAIGameCb;
			this.gameEnd = options.exitGameCb;
			this.showGame = options.showGameCb;
		}
	}, {
		key: 'register',
		value: function register() {
			var _this = this;

			_userInput2.default.addListener({ name: '1' }, function () {

				require('dns').lookup(require('os').hostname(), function (err, add, fam) {
					_this.renderer.text(20, 530, 'Waiting for players to join to ' + add + '.', 'italic 20pt Calibri');
				});

				_this.createGame();
			}, 'up');

			_userInput2.default.addListener({ name: '2' }, function () {
				_this.deregister();
				// need to get ip address.
				_smalltalk2.default.prompt('IPAddress', 'Please enter the ip address you wanna join.', 'localhost').then(function (value) {
					return _this.joinGame(value);
				}, function () {
					return _this.register();
				});
			}, 'up');

			_userInput2.default.addListener({ name: '3' }, function () {
				_this.deregister();
				// need to get difficulty
				_smalltalk2.default.prompt('AI Difficulty', 'Please choose AI difficulty (1 - 10).', '7').then(function (value) {
					return _this.aiGame(value);
				}, function () {
					return _this.register();
				});
			}, 'up');

			_userInput2.default.addListener({ name: '4' }, function () {
				return _this.showGame();
			}, 'up');

			_userInput2.default.addListener({ name: 'q' }, function () {
				return _this.gameEnd();
			}, 'up');
		}
	}, {
		key: 'deregister',
		value: function deregister() {
			_userInput2.default.removeListener('1');
			_userInput2.default.removeListener('2');
			_userInput2.default.removeListener('3');
			_userInput2.default.removeListener('4');
			_userInput2.default.removeListener('5');
		}
	}]);

	return Menu;
})();

exports.default = Menu;