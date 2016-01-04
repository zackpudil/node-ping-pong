'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _userInput = require('./user-input');

var _userInput2 = _interopRequireDefault(_userInput);

var _gameConstants = require('./game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('./gameState');

var _gameState2 = _interopRequireDefault(_gameState);

var _menu = require('./actors/menu');

var _menu2 = _interopRequireDefault(_menu);

var _pauseMenu = require('./actors/pauseMenu');

var _pauseMenu2 = _interopRequireDefault(_pauseMenu);

var _gameOverMenu = require('./actors/gameOverMenu');

var _gameOverMenu2 = _interopRequireDefault(_gameOverMenu);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _peer = require('./peer');

var _peer2 = _interopRequireDefault(_peer);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = (function () {
	function Engine(renderer) {
		_classCallCheck(this, Engine);

		this.renderer = renderer;
		this.menu = new _menu2.default(renderer);
		this.game = new _game2.default(renderer);

		// start game state as the menu
		_gameState2.default.state = _gameConstants2.default.GameStates.menu;
	}

	_createClass(Engine, [{
		key: 'start',
		value: function start() {
			var _this = this;

			_userInput2.default.clearListeners();
			// start is called first.  It creates and shows the menu.
			this.menu.onGameStart({
				createGameCb: this.createGame.bind(this),
				joinGameCb: this.joinGame.bind(this),
				startAIGameCb: function startAIGameCb(diff) {
					// if ai game is chosen, create the actors and start the game.
					_this.game.createActorsForAIGame(diff);
					_this.startGame();
				},
				exitGameCb: function exitGameCb() {
					return _electron2.default.ipcRenderer.send('exitApp');
				},
				showGameCb: function showGameCb() {
					// if show is chosen, create the actors and start the game.
					_this.game.createActorsForShow();
					_this.startGame();
				}
			});

			this.menu.register();
			this.menu.render();
		}
	}, {
		key: 'createGame',
		value: function createGame() {
			var _this2 = this;

			// listen for other players.
			_peer2.default.create(function () {
				// whence other players join, tell them about your window size.
				_peer2.default.sendCommand('resizeWindow', { width: _gameConstants2.default.Bounds.maxX + 50, height: _gameConstants2.default.Bounds.maxY + 50 });

				// create the actors and start the game.
				_this2.game.createActorsForHostedGame();
				_this2.startGame();
			});
		}
	}, {
		key: 'joinGame',
		value: function joinGame(ipAddress) {
			var _this3 = this;

			// join player listening at ipAddress
			_peer2.default.join(ipAddress, function () {
				// listen for server's window dimensions.
				_peer2.default.onCommand('resizeWindow', function (bounds) {

					// update oyour window.
					_electron2.default.ipcRenderer.send('resizeWindow', bounds);
					_gameConstants2.default.resetBounds(bounds);

					// create the actors and start the game.
					_this3.game.createActorsForJoinedGame();
					_this3.startGame();
				});
			});
		}
	}, {
		key: 'startGame',
		value: function startGame() {
			this.menu.deregister();
			// create the pause menu, change state of game, start game Loop.
			this.pauseMenu = new _pauseMenu2.default(this.renderer, {
				startGameCb: this.startGame.bind(this),
				exitGameCb: function exitGameCb() {
					return _gameState2.default.state = _gameConstants2.default.GameStates.menu;
				}
			});
			this.pauseMenu.register();

			this.overMenu = new _gameOverMenu2.default(this.game, this.renderer);

			_gameState2.default.state = _gameConstants2.default.GameStates.play;
			this.menu.deregister();

			this.gameLoop = setInterval(this.tick.bind(this), _gameConstants2.default.Interval);
		}
	}, {
		key: 'tick',
		value: function tick() {
			var _this4 = this;

			// Main game Loop, called every tick.

			// just render pause screen if game is paused.
			if (_gameState2.default.state == _gameConstants2.default.GameStates.pause) {

				this.pauseMenu.render();
			} else if (_gameState2.default.state == _gameConstants2.default.GameStates.over) {

				this.pauseMenu.deregister();
				this.overMenu.register();
				this.overMenu.render();
			} else if (_gameState2.default.state == _gameConstants2.default.GameStates.menu) {

				clearInterval(this.gameLoop);
				this.renderer.clear();
				this.start();
			} else if (_gameState2.default.state == _gameConstants2.default.GameStates.play) {
				this.pauseMenu.register();
				this.overMenu.deregister();

				this.renderer.clear();

				// update (if needed) and render all actors
				this.game.board.render();
				this.game.score.render();

				this.game.paddles.forEach(function (p) {
					p.update();
					// update ball if it is colliding with this paddle.
					_this4.game.ball.collide(p.pos, p.scale, p.scale * 6);
					p.render();
				});

				this.game.ball.update();
				this.game.ball.render();
			}
		}
	}]);

	return Engine;
})();

exports.default = Engine;