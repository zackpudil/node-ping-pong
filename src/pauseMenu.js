import userInput from './user-input';
import GameConstants from './game-constants';
import gameState from './gameState';

export default class PauseMenu {

	constructor(renderer, options) {
		this.renderer = renderer;
		this.ipAddress = "";

    this.gameStateChangeCb = options.startGameCb;
    this.endGameCb = options.exitGameCb;

		userInput.addListener({ name: 'p' }, () =>  this.pauseGame());
	}

	render() {
    // let color = '#D70404';
    // this.renderer.strokeColor(color);
		// this.renderer.line(150, 75, 350, 75);
		// this.renderer.line(350, 75, 350, 150);
		// this.renderer.line(350, 150, 150, 150);
		// this.renderer.line(150, 150, 150, 75);

    this.renderer.fillColor('#0497D7');
    this.renderer.box(150, 75, 450, 150);

		//Draw options
    this.renderer.fillColor('#D70404');
		var font = 'italic 20pt Calibri';
		this.renderer.text(175, 100, "Press \'p\' to unpause.", font);
		this.renderer.text(175, 140, 'Press \'e\' to exit game.', font)
	}

  pauseGame() {
    if (gameState.state == GameConstants.GameStates.play) {
      gameState.state = GameConstants.GameStates.pause;
    } else {
      gameState.state = GameConstants.GameStates.play;
    }

    userInput.addListener({ name: 'e' }, () =>  this.endGameCb());
  }

	deregister() {
		userInput.removeListener('p');
		userInput.removeListener('e');
	}
}
