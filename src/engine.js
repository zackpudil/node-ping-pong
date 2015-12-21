import Menu from './menu';
import context from 'axel';
import keypress from 'keypress';

const gameStates = {
  menu: 'Menu',
  play: 'Play'
};
const Interval = 100;

export default class Engine {

  constructor() {
    // start game state as the menu
    this.gameState = gameStates.menu;

    // start tick
    this.menu = new Menu();
  }

  start() {
    process.stdin.setRawMode(true);
    keypress(process.stdin);

    process.stdin.resume();
    process.stdin.on('keypress', this.menu.checkInput); 
    // this.gameLoop = setInterval(this.tick, Interval);
    this.tick();
  }

  tick() {
    // check game state to determine what to do.
    context.clear();
    this.menu.render();
  }
}
