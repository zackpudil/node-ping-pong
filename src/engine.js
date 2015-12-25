import Menu from './menu';
import PauseMenu from './pauseMenu';
import userInput from './user-input';
import GameConstants from './game-constants';

import gameState from './gameState';
import PlayerPaddle from './actors/paddles/player-paddle';
import AIPaddle from './actors/paddles/ai-paddle';
import Ball from './actors/ball';
import electron from 'electron';

let Bounds = GameConstants.Bounds;

export default class Engine {
	constructor(renderer) {
		this.renderer = renderer;
		this.menu = new Menu(renderer);
		this.ball = new Ball(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, renderer);
		this.paddles = [
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, renderer),
			new PlayerPaddle(Bounds.maxX - 20, Bounds.maxX/2, renderer, { up: 'w', down: 's'}),
		];

		// start game state as the menu
		gameState.state = GameConstants.GameStates.menu;
	}

	start() {
		this.menu.onGameStart({
			startGameCb: this.startGame.bind(this),
			exitGameCb: this.endGame.bind(this)
		});
		this.gameLoop = setInterval(this.tick.bind(this), GameConstants.Interval);
	}

	startGame() {
		gameState.state = GameConstants.GameStates.play;
		this.menu.deregister();
		this.pauseMenu = new PauseMenu(this.renderer, {
			startGameCb: this.startGame.bind(this),
			exitGameCb: this.endGame.bind(this)
		});
	}

	endGame() {
		// signal to the main process that we want to close the app.
		electron.ipcRenderer.send('exitApp');
	}

	renderBounds() {
		this.renderer.strokeColor('#000000');
		this.renderer.fillColor('#FFFFFF');

		this.renderer.line(Bounds.minX, Bounds.minY, Bounds.maxX, Bounds.minY);
		this.renderer.line(Bounds.minX, Bounds.minY, Bounds.minX, Bounds.maxY);
		this.renderer.line(Bounds.maxX, Bounds.minY, Bounds.maxX, Bounds.maxY);
		this.renderer.line(Bounds.minX, Bounds.maxY, Bounds.maxX, Bounds.maxY);

		this.renderer.line(Bounds.maxX/2 + 25, Bounds.minY, Bounds.maxX/2 + 25, Bounds.maxY);

		this.renderer.circle(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, 25);
	}

	tick() {
		// check game state to determine what to do.
		if (gameState.state != GameConstants.GameStates.pause) {
			this.renderer.clear();
		} else {
			this.pauseMenu.render();
		}

	 if(gameState.state == GameConstants.GameStates.menu) {
			this.menu.render();
		} else if (gameState.state == GameConstants.GameStates.play) {
			this.renderBounds();

			this.paddles.forEach(p => {
				p.update();
				this.ball.didHit(p.pos, p.scale, p.scale*6);
				p.render()
			});

			this.ball.update();
			this.ball.render();
		}
	}
}
