'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _board = require('./actors/board');

var _board2 = _interopRequireDefault(_board);

var _score = require('./actors/score');

var _score2 = _interopRequireDefault(_score);

var _playerBall = require('./actors/balls/player-ball');

var _playerBall2 = _interopRequireDefault(_playerBall);

var _networkBall = require('./actors/balls/network-ball');

var _networkBall2 = _interopRequireDefault(_networkBall);

var _aiPaddle = require('./actors/paddles/ai-paddle');

var _aiPaddle2 = _interopRequireDefault(_aiPaddle);

var _playerPaddle = require('./actors/paddles/player-paddle');

var _playerPaddle2 = _interopRequireDefault(_playerPaddle);

var _networkPaddle = require('./actors/paddles/network-paddle');

var _networkPaddle2 = _interopRequireDefault(_networkPaddle);

var _gameConstants = require('./game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _peer = require('./peer');

var _peer2 = _interopRequireDefault(_peer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
	function Game(renderer) {
		_classCallCheck(this, Game);

		this.renderer = renderer;

		this.paddles = [];
		this.ball = null;

		this.board = new _board2.default(renderer);
		this.score = new _score2.default(renderer);
	}

	_createClass(Game, [{
		key: 'createActorsForHostedGame',
		value: function createActorsForHostedGame() {
			var Bounds = _gameConstants2.default.Bounds;
			this.ball = new _playerBall2.default(Bounds.maxX / 2 + 25, Bounds.maxY / 2 + 25, this.renderer);

			this.paddles = [
			// You are on the left
			new _playerPaddle2.default(Bounds.minX + 10, Bounds.maxY / 2, this.renderer),
			// other player on the right.
			new _networkPaddle2.default(Bounds.maxX - 20, Bounds.maxY / 2, this.renderer)];
		}
	}, {
		key: 'createActorsForJoinedGame',
		value: function createActorsForJoinedGame() {
			var Bounds = _gameConstants2.default.Bounds;
			// You're ball is puppeted by server ball.
			this.ball = new _networkBall2.default(Bounds.maxX / 2 + 25, Bounds.maxY / 2 + 25, this.renderer);

			this.paddles = [
			// other player on the left.
			new _networkPaddle2.default(Bounds.minX + 10, Bounds.maxY / 2, this.renderer),
			// you are on the right.
			new _playerPaddle2.default(Bounds.maxX - 20, Bounds.maxY / 2, this.renderer)];
		}
	}, {
		key: 'createActorsForAIGame',
		value: function createActorsForAIGame(difficulty) {
			var Bounds = _gameConstants2.default.Bounds;
			this.ball = new _playerBall2.default(Bounds.maxX / 2 + 25, Bounds.maxY / 2 + 25, this.renderer);

			this.paddles = [new _playerPaddle2.default(Bounds.minX + 10, Bounds.maxY / 2, this.renderer), new _aiPaddle2.default(Bounds.maxX - 20, Bounds.maxY / 2, this.renderer, this.ball, 10, difficulty)];
		}
	}, {
		key: 'createActorsForShow',
		value: function createActorsForShow() {
			var Bounds = _gameConstants2.default.Bounds;
			this.ball = new _playerBall2.default(Bounds.maxX / 2 + 25, Bounds.maxY / 2 + 25, this.renderer);

			this.paddles = [new _aiPaddle2.default(Bounds.minX + 10, Bounds.maxY / 2, this.renderer, this.ball, 10, 11, false), new _aiPaddle2.default(Bounds.maxX - 20, Bounds.maxY / 2, this.renderer, this.ball, 10, 11)];
		}
	}]);

	return Game;
})();

exports.default = Game;