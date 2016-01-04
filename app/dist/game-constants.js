'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStates = {
  menu: 'Menu',
  play: 'Play',
  pause: 'Pause',
  over: 'GameOver'
};

var Interval = 10;

var KeyMap = {
  'up': 38,
  'down': 40,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  'e': 69,
  'd': 68,
  'm': 77,
  'p': 80,
  'q': 81,
  's': 83,
  'w': 87
};

var Bounds = undefined;

var GameConstants = (function () {
  function GameConstants() {
    _classCallCheck(this, GameConstants);
  }

  _createClass(GameConstants, null, [{
    key: 'resetBounds',
    value: function resetBounds(boundsObj) {
      // updates the global and singleton Bounds var with passed dimensions or window's dimensions.
      boundsObj = boundsObj || {};
      var maxHeight = boundsObj.height || window.innerHeight;
      var maxWidth = boundsObj.width || window.innerWidth;

      // the offset is the padding between the game court and the end of window.
      var offset = 50;
      Bounds = { minX: 50, minY: 50, maxX: maxWidth - offset, maxY: maxHeight - offset };
    }
  }, {
    key: 'GameStates',
    get: function get() {
      return GameStates;
    }
  }, {
    key: 'Interval',
    get: function get() {
      return Interval;
    }
  }, {
    key: 'KeyMap',
    get: function get() {
      return KeyMap;
    }
  }, {
    key: 'ScorePosition',
    get: function get() {
      return {
        x: GameConstants.Bounds.maxX / 2,
        y: 45
      };
    }
  }, {
    key: 'Bounds',
    get: function get() {
      return Bounds;
    }
  }]);

  return GameConstants;
})();

exports.default = GameConstants;

GameConstants.resetBounds();