'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameConstants = require('../game-constants');

var _gameConstants2 = _interopRequireDefault(_gameConstants);

var _gameState = require('../gameState');

var _gameState2 = _interopRequireDefault(_gameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = (function () {
  function Score(renderer) {
    var scale = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

    _classCallCheck(this, Score);

    this.renderer = renderer;
    this.scale = scale;
  }

  _createClass(Score, [{
    key: 'render',
    value: function render() {
      this.renderScore();
    }
  }, {
    key: 'update',
    value: function update() {
      this.renderScore();
    }
  }, {
    key: 'renderScore',
    value: function renderScore() {
      this.renderer.fillColor('#FFFFFF');
      var font = '20pt Calibri';
      this.renderer.text(_gameConstants2.default.ScorePosition.x, _gameConstants2.default.ScorePosition.y, this.getScore(), font);
    }
  }, {
    key: 'getScore',
    value: function getScore() {
      var score = _gameState2.default.score;
      return score.one + ' : ' + score.two;
    }
  }]);

  return Score;
})();

exports.default = Score;