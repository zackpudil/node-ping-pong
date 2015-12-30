const GameStates = {
  menu: 'Menu',
  play: 'Play',
  pause: 'Pause'
};

const Interval = 10;

const KeyMap = {
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
  's': 83,
  'w': 87
};

let Bounds;

export default class GameConstants {
	static get GameStates() { return GameStates; }
	static get Interval() { return Interval; }
	static get KeyMap() { return KeyMap; }
	static get ScorePosition() { 
    return {
      x: GameConstants.Bounds.maxX/2,
      y: 45
    }; 
  }
  static get Bounds() {
    return Bounds;
  }
  static resetBounds(boundsObj) {
    boundsObj = boundsObj || {};
    let maxHeight = boundsObj.height || window.innerHeight;
    let maxWidth = boundsObj.width || window.innerWidth;
    let offset = 50;
    Bounds = { minX: 50, minY: 50, maxX: maxWidth - offset, maxY: maxHeight - offset };
  }
}

GameConstants.resetBounds();
