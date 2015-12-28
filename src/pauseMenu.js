import userInput from './user-input';
import GameConstants from './game-constants';
import gameState from './gameState';
import peer from './peer';

export default class PauseMenu {

	constructor(renderer, options) {
		this.renderer = renderer;
		this.ipAddress = "";

    this.gameStateChangeCb = options.startGameCb;
    this.endGameCb = options.exitGameCb;

		userInput.addListener({ name: 'p' }, () =>  {
			this.pauseGame()
			peer.sendCommand('pause');
		});

		peer.onCommand('pause', () => this.pauseGame());
	}

	render() {
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
