import userInput from '../user-input';
import peers from '../peer';
import smalltalk from 'smalltalk';
import GameConstants from '../game-constants';

export default class Menu {

	constructor(renderer) {
		this.renderer = renderer;
		this.ipAddress = "";
		this.isWaiting = false;

		userInput.addListener({ name: '1' }, () =>  {
			this.isWaiting = true;
			peers.create(() => {
				this.gameStartCb(false);
				peers.sendCommand('resizeWindow', { width: GameConstants.Bounds.maxX + 50, height: GameConstants.Bounds.maxY + 50 });
			});
		});

		userInput.addListener({ name: '2' }, () => {

			smalltalk.prompt('IPAddress', 'Please enter the ip address you wanna join.', 'localhost')
			.then(
				(value) => peers.join(value, () => this.gameStartCb(true)),
				() =>  this.gameEndCb());
		});

		userInput.addListener({ name: '3' }, () => this.gameEndCb());
	}

	render() {
		let font = 'italic 20pt Calibri';
		this.renderer.fillColor('#cc00ff');

		this.renderer.text(20, 250, 'Ping', 'italic 140pt Calibri');
		this.renderer.text(30, 400, 'Pong', 'italic 140pt Calibri');

		//Draw options
		this.renderer.text(20, 430, "Press 1 to start a game.", font);
		this.renderer.text(20, 460, "Press 2 to join a game.", font);
		this.renderer.text(20, 490, 'Press 3 to exit game.', font)

		if(this.isWaiting) {
			this.renderer.text(20, 520, 'Waiting for players to join.', font);
		}
	}

	onGameStart(options) {
		this.gameStartCb = options.startGameCb;
		this.gameEndCb = options.exitGameCb;
	}

	deregister() {
		userInput.removeListener('1');
		userInput.removeListener('2');
		userInput.removeListener('3');
	}
}
