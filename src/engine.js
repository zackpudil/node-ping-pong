import Menu from './menu';
import context from 'axel';
import userInput from './user-input';

const gameStates = {
  menu: 'Menu',
  play: 'Play'
};

const Interval = 100;

export default class Engine {

  constructor() {
    // start game state as the menu
    debugger;
    this.gameState = gameStates.menu;

    // start tick
    this.menu = new Menu();
  }

  start() {
    userInput.addListener({ name: 'c', ctrl: true, shift: false}, process.exit);
    // this.gameLoop = setInterval(this.tick, Interval);
    this.tick();
  }

  tick() {
    // check game state to determine what to do.
    context.clear();
    this.menu.render();
  }
}
