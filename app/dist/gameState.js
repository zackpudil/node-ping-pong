'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameConstants = require('./game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var state = null;
var score = {
  one: 0,
  two: 0
};

var GameState = (function () {
  function GameState() {
    _classCallCheck(this, GameState);
  }

  _createClass(GameState, [{
    key: 'resetScore',
    value: function resetScore() {
      score = {
        one: 0,
        two: 0
      };
    }
  }, {
    key: 'state',
    get: function get() {
      return state;
    },
    set: function set(newState) {
      state = newState;
    }
  }, {
    key: 'score',
    get: function get() {
      return score;
    },
    set: function set(player) {
      score[player] += 1;
      if (score[player] >= 5) state = _gameConstants2.default.GameStates.over;
    }
  }, {
    key: 'winningPlayerIndex',
    get: function get() {
      if (score.one < score.two) return 0;else return 1;
    }
  }]);

  return GameState;
})();

var gameState = new GameState();

exports.default = gameState;