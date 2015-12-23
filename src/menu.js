import ModelRenderer from './model-renderer';
import userInput from './user-input';
import Renderer from './renderer';
import GameConstants from './game-constants';

export default class Menu {

  constructor() {
    this.renderer = new Renderer();
    this.modelRenderer = new ModelRenderer();
    this.menuState = GameConstants.MenuStates.initial;
    this.ipAddress = "";

    userInput.addListener({ name: '1', ctrl: false, shift: false }, () =>  this.gameStartCb());

    userInput.addListener({ name: '2', ctrl: false, shift: false }, () => {
      this.menuState = GameConstants.MenuStates.readingInput;
      debugger;

      // grab user input for ip address.
      var startPos = { x: 33, y: 32 };
      userInput.readStream(
        (str) => this.ipAddress = str,
        (str) => this.gameStartCb(str));

    });
  }

  render() {
    var color = [204, 0, 255];
    // Draw Ping
    this.modelRenderer.renderModel('title/P', { x: 5, y: 3 }, color);
    this.modelRenderer.renderModel('title/i', { x: 15, y: 3}, color);
    this.modelRenderer.renderModel('title/n', { x: 18, y: 6}, color);
    this.modelRenderer.renderModel('title/g', { x: 25, y: 6}, color);

    // Draw Pong
    this.modelRenderer.renderModel('title/P', { x: 9, y: 15 }, color);
    this.modelRenderer.renderModel('title/o', { x: 18, y: 18 }, color);
    this.modelRenderer.renderModel('title/n', { x: 25, y: 18 }, color);
    this.modelRenderer.renderModel('title/g', { x: 32, y: 18 }, color);

    //Draw options
    this.renderer.bg(0, 0, 0);
    this.renderer.fg(...color);
    this.renderer.text(5, 30, "Press 1 to start a game.");
    this.renderer.text(5, 31, "Press 2 to join a game.");

    if(this.menuState == GameConstants.MenuStates.readingInput) {
      this.renderer.text(5, 32, "Enter IP Address to join: ");
      this.renderer.text(33, 32, this.ipAddress);
    }
  }

  onGameStart(cb) {
    this.gameStartCb = cb;
  }
}
