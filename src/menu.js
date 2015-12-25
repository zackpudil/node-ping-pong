import userInput from './user-input';

export default class Menu {

	constructor(renderer) {
		this.renderer = renderer;
		this.ipAddress = "";

		userInput.addListener({ name: '1' }, () =>  this.gameStartCb());

		userInput.addListener({ name: '2' }, () => {
			userInput.readStream((str) => this.gameStartCb(str));
		});

		userInput.addListener({ name: '3' }, () => this.gameEndCb());
	}

	render() {
		this.renderer.fillColor('#cc00ff');
		this.renderer.text(20, 250, 'Ping', 'italic 140pt Calibri');
		this.renderer.text(30, 400, 'Pong', 'italic 140pt Calibri');

		//Draw options
		var font = 'italic 20pt Calibri';
		this.renderer.text(20, 430, "Press 1 to start a game.", font);
		this.renderer.text(20, 460, "Press 2 to join a game.", font);
		this.renderer.text(20, 490, 'Press 3 to exit game.', font)
	}

	onGameStart(options) {
		this.gameStartCb = options.startGameCb;
		this.gameEndCb = options.exitGameCb;
	}
}
