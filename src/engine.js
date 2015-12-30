import userInput from './user-input';
import GameConstants from './game-constants';
import gameState from './gameState';

import Menu from './actors/menu';
import PauseMenu from './actors/pauseMenu';

import electron from 'electron';
import peer from './peer';

import Game from './game';

export default class Engine {
	constructor(renderer) {
		this.renderer = renderer;
		this.menu = new Menu(renderer);
		this.game = new Game(renderer);

		// start game state as the menu
		gameState.state = GameConstants.GameStates.menu;
	}

	start() {
		this.menu.onGameStart({
			createGameCb: this.createGame.bind(this),
			joinGameCb: this.joinGame.bind(this),
			startAIGameCb: (diff) => {
				this.game.createActorsForAIGame(diff);
				this.startGame();
			},
			exitGameCb: () => electron.ipcRenderer.send('exitApp'),
			showGameCb: () => {
				this.game.createActorsForShow();
				this.startGame();
			}
		});

		this.menu.render();
	}

	joinGame(ipAddress) {
		peer.join(ipAddress, () => {
			peer.onCommand('resizeWindow', (bounds) => {

				electron.ipcRenderer.send('resizeWindow', bounds);
				GameConstants.resetBounds(bounds);

				this.game.createActorsForJoinedGame();

				this.startGame()
			});
		})
	}

	createGame() {
		peer.create(() => {
				peer.sendCommand('resizeWindow', { width: GameConstants.Bounds.maxX + 50, height: GameConstants.Bounds.maxY + 50 });

				this.game.createActorsForHostedGame();
				this.startGame();
			});
	}

	startGame() {
		this.pauseMenu = new PauseMenu(this.renderer, {
			startGameCb: this.startGame.bind(this),
			exitGameCb: this.endGame.bind(this)
		});

		gameState.state = GameConstants.GameStates.play;
		this.menu.deregister();

		this.gameLoop = setInterval(this.tick.bind(this), GameConstants.Interval);
	}

	endGame() {
		// signal to the main process that we want to close the app.
		
	}

	tick() {
		// check game state to determine what to do.
	 	if(gameState.state == GameConstants.GameStates.pause) {
	 		this.pauseMenu.render();
	 	} else if (gameState.state == GameConstants.GameStates.play) {
			this.renderer.clear();

			this.game.board.render();
			this.game.score.render();

			this.game.paddles.forEach(p => {
				p.update();
				this.game.ball.didHit(p.pos, p.scale, p.scale*6);
				p.render()
			});

			this.game.ball.update();
			this.game.ball.render();
		}
	}
}
