import userInput from './user-input';

export default class Menu {

  constructor(renderer) {
    this.renderer = renderer;
    this.ipAddress = "";

    userInput.addListener({ name: '1', ctrl: false, shift: false }, () =>  this.gameStartCb());

    userInput.addListener({ name: '2', ctrl: false, shift: false }, () => {
      userInput.readStream((str) => this.gameStartCb(str));
    });
  }

  render() {
    this.renderer.fillColor('#cc00ff');
    this.renderer.text(20, 250, 'Ping', 'italic 140pt Calibri');
    this.renderer.text(30, 400, 'Pong', 'italic 140pt Calibri');

    //Draw options
    this.renderer.text(20, 430, "Press 1 to start a game.", 'italic 20pt Calibri');
    this.renderer.text(20, 460, "Press 2 to join a game.", 'italic 20pt Calibri');
  }

  onGameStart(cb) {
    this.gameStartCb = cb;
  }
}
