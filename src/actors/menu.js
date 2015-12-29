import userInput from '../user-input';
import peers from '../peer';
import smalltalk from 'smalltalk';
import GameConstants from '../game-constants';
import electron from 'electron';

export default class Menu {

	constructor(renderer) {
		this.renderer = renderer;
		this.ipAddress = "";

		userInput.addListener({ name: '1' }, () =>  {
			this.renderer.text(20, 520, 'Waiting for players to join.', 'italic 20pt Calibri');
			this.createGame();
		}, 'up');

		userInput.addListener({ name: '2' }, () => {

			smalltalk.prompt('IPAddress', 'Please enter the ip address you wanna join.', 'localhost')
				.then((value) => this.joinGame(value));

		}, 'up');

		userInput.addListener({ name: '3' }, () => this.gameEnd(), 'up');
	}

	render() {
		let font = 'italic 20pt Calibri';
		this.renderer.fillColor('#cc00ff');
		this.renderer.strokeColor('#cc00ff');

		this.renderer.text(20, 250, 'Ping', 'italic 140pt Calibri');
		this.renderer.text(30, 400, 'Pong', 'italic 140pt Calibri');

		//Draw options
		this.renderer.text(20, 430, "Press 1 to start a game.", font);
		this.renderer.text(20, 460, "Press 2 to join a game.", font);
		this.renderer.text(20, 490, 'Press 3 to exit game.', font)
			
	}

	onGameStart(options) {
		this.joinGame = options.joinGameCb;
		this.createGame = options.createGameCb; 
		this.gameEnd = options.exitGameCb;
	}

	deregister() {
		userInput.removeListener('1');
		userInput.removeListener('2');
		userInput.removeListener('3');
	}
}
