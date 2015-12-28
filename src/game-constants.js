const GameStates = {
  menu: 'Menu',
  play: 'Play',
  pause: 'Pause'
};

const Interval = 10;

const KeyMap = {
	'up': 38,
	'down': 40,
	'e': 69,
	'd': 68,
	'1': 49,
	'2': 50,
  '3': 51,
  'm': 77,
  'p': 80,
  's': 83,
  'w': 87
};

const ScorePosition = {
  x: 375,
  y: 45
};

const Bounds = { minX: 50, minY: 50, maxX: 750, maxY: 550 };

export default class GameConstants {
	static get GameStates() { return GameStates; }
	static get Interval() { return Interval; }
	static get Bounds() { return Bounds; }
	static get KeyMap() { return KeyMap; }
	static get ScorePosition() { return ScorePosition; }
}
