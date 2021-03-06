import userInput from '../user-input';
import peers from '../peer';
import smalltalk from 'smalltalk';
import GameConstants from '../game-constants';
import electron from 'electron';

export default class Menu {

	constructor(renderer) {
		this.renderer = renderer;
		this.ipAddress = "";
	}

	render() {
		let font = '20pt "Courier New"';
		this.renderer.fillColor('#FFFFFF');
		this.renderer.strokeColor('#FFFFFF');

		// Draw title.
		this.renderer.text(20, 250, 'Pong', '140pt "Courier New"');

		//Draw options
		this.renderer.text(20, 380, 'Press 1 to start a game.', font);
		this.renderer.text(20, 410, 'Press 2 to join a game.', font);
		this.renderer.text(20, 440, 'Press 3 to play with AI.', font);
		this.renderer.text(20, 470, 'Press 4 for a show.', font);

		this.renderer.text(20, 500, 'Press q to exit game.', font);
			
	}

	onGameStart(options) {
		this.joinGame = options.joinGameCb;
		this.createGame = options.createGameCb;
		this.aiGame = options.startAIGameCb;
		this.gameEnd = options.exitGameCb;
		this.showGame = options.showGameCb;
	}

	register() {
		userInput.addListener({ name: '1' }, () =>  {

			require('dns').lookup(require('os').hostname(), (err, add, fam) => {
				this.renderer.text(20, 530, `Waiting for players to join to ${add}.`, 'italic 20pt Calibri');
			});

			this.createGame();
		}, 'up');

		userInput.addListener({ name: '2' }, () => {
			this.deregister();
			// need to get ip address.
			smalltalk
				.prompt('IPAddress', 'Please enter the ip address you wanna join.', 'localhost')
				.then((value) => this.joinGame(value), () => this.register());
		}, 'up');

		userInput.addListener({ name: '3' }, () => {
			this.deregister();
			// need to get difficulty
			smalltalk
				.prompt('AI Difficulty', 'Please choose AI difficulty (1 - 10).', '7')
				.then((value) => this.aiGame(value), () => this.register());
		}, 'up');

		userInput.addListener({ name: '4' }, () => this.showGame(), 'up');

		userInput.addListener({ name: 'q' }, () => this.gameEnd(), 'up');
	}

	deregister() {
		userInput.removeListener('1');
		userInput.removeListener('2');
		userInput.removeListener('3');
		userInput.removeListener('4');
		userInput.removeListener('5');
	}
}
