import Menu from './menu';
import userInput from './user-input';
import GameConstants from './game-constants';

import PlayerPaddle from './actors/paddles/player-paddle';
import AIPaddle from './actors/paddles/ai-paddle';
import Ball from './actors/ball';

export default class Engine {

	constructor(renderer) {
		this.renderer = renderer;
		this.menu = new Menu(renderer);
		this.ball = new Ball(300, 300, renderer);
		this.paddles = [
			new PlayerPaddle(60, 10, renderer),
			new PlayerPaddle(720, 10, renderer, { up: 'e', down: 'd'}),
		];

		// start game state as the menu
		this.gameState = GameConstants.GameStates.menu;
	}

	start() {
		this.menu.onGameStart({
			startGameCb: this.startGame.bind(this),
			exitGameCb: this.endGame.bind(this)
		});
		this.gameLoop = setInterval(this.tick.bind(this), GameConstants.Interval);
	}

	startGame() {
		this.gameState = GameConstants.GameStates.play;
	}

	endGame() {
		// this will close the electron window.
		window.close();
	}

	renderBounds() {
		this.renderer.strokeColor('#000000');
		let bounds = GameConstants.Bounds;

		this.renderer.line(bounds.minX, bounds.minY, bounds.maxX, bounds.minY);
		this.renderer.line(bounds.minX, bounds.minY, bounds.minX, bounds.maxY);
		this.renderer.line(bounds.maxX, bounds.minY, bounds.maxX, bounds.maxY);
		this.renderer.line(bounds.minX, bounds.maxY, bounds.maxX, bounds.maxY);
	}

	tick() {
		// check game state to determine what to do.
		this.renderer.clear();

	 if(this.gameState == GameConstants.GameStates.menu) {
			this.menu.render();
		} else if (this.gameState == GameConstants.GameStates.play) {

			this.renderBounds();
			this.ball.update();

			this.paddles.forEach(p => {
				p.update();
				this.ball.didHit(p.pos, 10, 50);
				p.render()
			});

			this.ball.render();
		}
	}
}
