import userInput from './user-input';
import GameConstants from './game-constants';
import gameState from './gameState';

import Menu from './actors/menu';
import PauseMenu from './actors/pauseMenu';
import PlayerPaddle from './actors/paddles/player-paddle';
import AIPaddle from './actors/paddles/ai-paddle';
import Score from './actors/score';
import NetworkPaddle from './actors/paddles/network-paddle';
import Ball from './actors/balls/player-ball';
import NetworkBall from './actors/balls/network-ball';
import Board from './actors/board';

import electron from 'electron';
import peer from './peer';

let Bounds = GameConstants.Bounds;

export default class Engine {
	constructor(renderer) {
		this.renderer = renderer;
		this.menu = new Menu(renderer);
		this.score = new Score(renderer);

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

	startGame(joined) {
		this.ball = joined ?
			new NetworkBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer) :
			new Ball(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = joined ?
		[
			new NetworkPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new PlayerPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		] :
		[
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new NetworkPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];

		this.board = new Board(this.renderer);

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
			this.board.render();
			// this.renderBounds();
			this.score.render();

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
