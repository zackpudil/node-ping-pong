import Menu from './menu';
import context from 'axel';

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
    // this.gameLoop = setInterval(this.tick, Interval);
    this.tick();
  }

  tick() {
    // check game state to determine what to do.
    context.clear();
    this.menu.render();
    while(true) { }
  }
}
