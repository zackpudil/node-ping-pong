import Menu from './menu';
import Renderer from './renderer';
import userInput from './user-input';
import GameConstants from './game-constants';

import PlayerPaddle from './actors/paddles/player-paddle';
import AIPaddle from './actors/paddles/ai-paddle';
import Ball from './actors/ball';

export default class Engine {

  constructor() {
    this.renderer = new Renderer();
    this.menu = new Menu();
    this.ball = new Ball(50, 20);
    this.paddles = [
      new PlayerPaddle(10, 10),
      new PlayerPaddle(100, 10, { up: 'e', down: 'd'}),
    ];

    // start game state as the menu
    this.gameState = GameConstants.GameStates.menu;

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
    this.gameLoop = setInterval(this.tick.bind(this), GameConstants.Interval);
  }

  startGame() {
    this.gameState = GameConstants.GameStates.play;
  }

  renderBounds() {
    this.renderer.bg(0, 204, 0);
    let bounds = GameConstants.Bounds;

    this.renderer.line(bounds.minX, bounds.minY, bounds.maxX, bounds.minY);
    this.renderer.line(bounds.minX, bounds.minY, bounds.minX, bounds.maxY);
    this.renderer.line(bounds.maxX, bounds.minY, bounds.maxX, bounds.maxY);
    this.renderer.line(bounds.minX, bounds.maxY, bounds.maxX, bounds.maxY);
  }

  tick() {
    // check game state to determine what to do.
    this.renderer.clear();

   if(this.gameState == GameConstants.GameStates.menu) {
      this.menu.render();
    } else if (this.gameState == GameConstants.GameStates.play) {

      this.renderBounds();
      this.ball.update();

      this.paddles.forEach(p => {
        p.update();
        this.ball.didHit(p.pos, 2, 5);
        p.render()
      });

      this.ball.render();
    }

    this.renderer.reset();
  }
}
