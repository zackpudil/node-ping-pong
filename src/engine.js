import Menu from './menu';
import Renderer from './renderer';
import userInput from './user-input';

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
    this.renderer = new Renderer();

    // listen for ctrl+c to exit.
    userInput.addListener({ name: 'c', ctrl: true, shift: false}, () => { 
      this.renderer.bg(0, 0, 0);
      this.renderer.fg(255, 255, 255);

      process.exit();
    });
  }

  start() {
    // this.gameLoop = setInterval(this.tick, Interval);
    this.tick();
  }

  tick() {
    // check game state to determine what to do.
    this.renderer.clear();
    this.menu.render();
  }
}
