import Menu from './menu';
import Renderer from './renderer';
import userInput from './user-input';

import PlayerPaddle from './actors/paddles/player-paddle';
import AIPaddle from './actors/paddles/ai-paddle';

const GameStates = {
  menu: 'Menu',
  play: 'Play'
};

const Interval = 70;

export default class Engine {

  constructor() {
    this.renderer = new Renderer();
    this.menu = new Menu();
    this.actors = [
      new PlayerPaddle(10, 10),
      new AIPaddle(100, 10)
    ];

    // start game state as the menu
    this.gameState = GameStates.menu;

    // listen for ctrl+c to exit.
    userInput.addListener({ name: 'c', ctrl: true, shift: false}, () => { 
      this.renderer.bg(0, 0, 0);
      this.renderer.fg(255, 255, 255);

      this.renderer.clear();
      this.renderer.reset();

      clearInterval(this.gameLoop);

      process.exit();
    });
  }

  start() {
    this.menu.onGameStart(this.startGame.bind(this));
    this.tick();
  }

  startGame() {
    this.gameState = GameStates.play;
    this.gameLoop = setInterval(this.tick.bind(this), Interval);
  }

  tick() {
    // check game state to determine what to do.
    this.renderer.clear();

    if(this.gameState == GameStates.menu) {
      this.menu.render();
    } else if (this.gameState == GameStates.play) {
      this.actors.forEach(a => {
        a.update();
        a.render()
      });
    }

    this.renderer.reset();
  }
}
