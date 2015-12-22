import ModelRenderer from './model-renderer';
import userInput from './user-input';
import Renderer from './renderer';

export default class Menu {

  constructor() {
    this.renderer = new Renderer();
    this.modelRenderer = new ModelRenderer();

    userInput.addListener({ name: '1', ctrl: false, shift: false }, () =>  {
      this.renderer.text(5, 32, 'Starting game...');

      // some where in here start the game.
      this.gameStartCb();
    });

    userInput.addListener({ name: '2', ctrl: false, shift: false }, () => {
      this.renderer.text(5, 32, "Enter IP Address to join: ");

      // grab user input for ip address.
      userInput.readStream((ipAddress) => {
        this.renderer.text(5, 33, `Joining ${ipAddress}....`);

        // some where in here start the game.

      }, { x: 33, y: 32 });

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

  }

  onGameStart(cb) {
    this.gameStartCb = cb;
  }
}
