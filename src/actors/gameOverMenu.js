import gameConstants from '../game-constants';
import gameState from '../gameState';
import userInput from '../user-input';
import PlayerPaddle from './paddles/player-paddle';
import peer from '../peer';

export default class GameOverMenu {

	constructor(game, renderer) {
		this.renderer = renderer;
		this.game = game;

		peer.onCommand('playAgain', () => this.playAgain());
	}

	render() {
		let bounds = gameConstants.Bounds;
		var boxDim = {
			minX: bounds.minX + 100,
			minY: bounds.minY + 100,
			maxX: bounds.maxX - 100,
			maxY: bounds.maxY - 100
		};

		this.renderer.fillColor('#FFFFFF');
		this.renderer.strokeColor('#FFFFFF');

		this.renderer.line(boxDim.minX, boxDim.minY, boxDim.maxX, boxDim.minY); // top line
		this.renderer.line(boxDim.minX, boxDim.minY, boxDim.minX, boxDim.maxY); // left line
		this.renderer.line(boxDim.maxX, boxDim.minY, boxDim.maxX, boxDim.maxY); // right line
		this.renderer.line(boxDim.minX, boxDim.maxY, boxDim.maxX, boxDim.maxY); // bottom line;

		this.renderer.clearArea(boxDim.minX, boxDim.minY, boxDim.maxX - 150, boxDim.maxY - 150);

		this.renderer.text(bounds.maxX/2 - 110, boxDim.minY + 150, "Game Over", '40pt "Courier New"');

		var didWin = this.game.paddles[gameState.winningPlayerIndex] instanceof PlayerPaddle;

		if(didWin) {
			this.renderer.text(bounds.maxX/2 - 50, boxDim.minY + 200, "Ya lost", '25pt "Courier New"');
		} else {
			this.renderer.text(bounds.maxX/2 - 50, boxDim.minY + 200, "Ya won :)", '25pt "Courier New"');
		}

		this.renderer.text(boxDim.minX + 20, boxDim.minY + 250, "press 'p' to play again.", '12pt "Courier New"');
		this.renderer.text(boxDim.minX + 20, boxDim.minY + 300, "press 'e' to exit to menu.", '12pt "Courier New"');
	}

	register() {
		userInput.addListener({ name: 'p' }, () => {
			peer.sendCommand('playAgain');
			this.playAgain();
		});

		userInput.addListener({ name: 'e' }, () => {
			gameState.resetScore();
			gameState.state = gameConstants.GameStates.menu;
		});

	}

	deregister() {
		userInput.removeListener('p');
		userInput.removeListener('e');
	}

	playAgain() {
		gameState.resetScore();
		gameState.state = gameConstants.GameStates.play;
		this.game.ball.reset();
	}
}