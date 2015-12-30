import userInput from '../user-input';
import peers from '../peer';
import smalltalk from 'smalltalk';
import GameConstants from '../game-constants';
import electron from 'electron';

export default class Menu {

	constructor(renderer) {
		this.renderer = renderer;
		this.ipAddress = "";

		this.register();
	}

	render() {
		let font = '20pt "Courier New"';
		this.renderer.fillColor('#FFFFFF');
		this.renderer.strokeColor('#FFFFFF');

		this.renderer.text(20, 250, 'Pong', '140pt "Courier New"');

		//Draw options
		this.renderer.text(20, 430, 'Press 1 to start a game.', font);
		this.renderer.text(20, 460, 'Press 2 to join a game.', font);
		this.renderer.text(20, 490, 'Press 3 to exit game.', font);
		this.renderer.text(20, 520, 'Press 4 to play with AI.', font);
			
	}

	onGameStart(options) {
		this.joinGame = options.joinGameCb;
		this.createGame = options.createGameCb;
		this.aiGame = options.startAIGameCb;
		this.gameEnd = options.exitGameCb;
	}

	register() {
		userInput.addListener({ name: '1' }, () =>  {
			this.deregister();
			this.renderer.text(20, 550, 'Waiting for players to join.', 'italic 20pt Calibri');
			this.createGame();
		}, 'up');

		userInput.addListener({ name: '2' }, () => {
			this.deregister();
			smalltalk
				.prompt('IPAddress', 'Please enter the ip address you wanna join.', 'localhost')
				.then((value) => this.joinGame(value), () => this.register());
		}, 'up');

		userInput.addListener({ name: '3' }, () => this.gameEnd(), 'up');

		userInput.addListener({ name: '4' }, () => {
			this.deregister();
			smalltalk
				.prompt('AI Difficulty', 'Please choose AI difficulty (1 - 10).', '7')
				.then((value) => this.aiGame(value), () => this.register());
		}, 'up');
	}

	deregister() {
		userInput.removeListener('1');
		userInput.removeListener('2');
		userInput.removeListener('3');
		userInput.removeListener('4');
	}
}
