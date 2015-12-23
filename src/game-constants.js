const GameStates = {
  menu: 'Menu',
  play: 'Play'
};

const Interval = 70;

const MenuStates = {
  initial: 'Initial',
  readingInput: 'ReadingInput',
};

const Bounds = { minX: 5, minY: 3, maxX: 110, maxY: 36 };

export default class GameConstants {
	static get GameStates() { return GameStates; }
	static get Interval() { return Interval; }
	static get MenuStates() { return MenuStates; }
	static get Bounds() { return Bounds; }
}