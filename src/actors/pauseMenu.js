import userInput from '../user-input';
import GameConstants from '../game-constants';
import gameState from '../gameState';
import peer from '../peer';

export default class PauseMenu {

	constructor(renderer, options) {
		this.renderer = renderer;
		this.ipAddress = "";

    this.gameStateChangeCb = options.startGameCb;
    this.endGameCb = options.exitGameCb;

		peer.onCommand('pause', () => this.pauseGame());
	}

	render() {
		this.renderer.fillColor('#000000');
		this.renderer.strokeColor('#FFFFFF');
		this.renderer.box(150, 75, 550, 150);


		//Draw options
		this.renderer.fillColor('#FFFFFF');
		var font = '20pt "Courier New"';
		this.renderer.text(175, 100, "Press \'p\' to unpause.", font);
		this.renderer.text(175, 140, 'Press \'e\' to exit back to menu.', font)
	}

  pauseGame() {
    if (gameState.state == GameConstants.GameStates.play) {
      gameState.state = GameConstants.GameStates.pause;
    	userInput.addListener({ name: 'e' }, () =>  this.endGameCb());
    } else {
      gameState.state = GameConstants.GameStates.play;
    }
  }

  register() {
  	userInput.addListener({ name: 'p' }, () =>  {
			this.pauseGame()
			peer.sendCommand('pause');
		});
  }

	deregister() {
		userInput.removeListener('p');
		userInput.removeListener('e');
	}
}
