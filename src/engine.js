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
		// start is called first.  It creates and shows the menu.
		this.menu.onGameStart({
			createGameCb: this.createGame.bind(this),
			joinGameCb: this.joinGame.bind(this),
			startAIGameCb: (diff) => {
				// if ai game is chosen, create the actors and start the game.
				this.game.createActorsForAIGame(diff);
				this.startGame();
			},
			exitGameCb: () => electron.ipcRenderer.send('exitApp'),
			showGameCb: () => {
				// if show is chosen, create the actors and start the game.
				this.game.createActorsForShow();
				this.startGame();
			}
		});

		this.menu.render();
	}

	createGame() {
		// listen for other players.
		peer.create(() => {
				// whence other players join, tell them about your window size.
				peer.sendCommand('resizeWindow', { width: GameConstants.Bounds.maxX + 50, height: GameConstants.Bounds.maxY + 50 });

				// create the actors and start the game.
				this.game.createActorsForHostedGame();
				this.startGame();
			});
	}

	joinGame(ipAddress) {
		// join player listening at ipAddress
		peer.join(ipAddress, () => {
			// listen for server's window dimensions.
			peer.onCommand('resizeWindow', (bounds) => {

				// update oyour window.
				electron.ipcRenderer.send('resizeWindow', bounds);
				GameConstants.resetBounds(bounds);

				// create the actors and start the game.
				this.game.createActorsForJoinedGame();
				this.startGame()
			});
		})
	}

	startGame() {
		// create the pause menu, change state of game, start game Loop.
		this.pauseMenu = new PauseMenu(this.renderer, {
			startGameCb: this.startGame.bind(this),
			exitGameCb: () => electron.ipcRenderer.send('exitApp')
		});

		gameState.state = GameConstants.GameStates.play;
		this.menu.deregister();

		this.gameLoop = setInterval(this.tick.bind(this), GameConstants.Interval);
	}

	tick() {
		// Main game Loop, called every tick.

		// just render pause screen if game is paused.
	 	if(gameState.state == GameConstants.GameStates.pause) {
	 		this.pauseMenu.render();
	 	} else if (gameState.state == GameConstants.GameStates.play) {
			this.renderer.clear();

	 		// update (if needed) and render all actors
			this.game.board.render();
			this.game.score.render();

			this.game.paddles.forEach(p => {
				p.update();
				// update ball if it is colliding with this paddle.
				this.game.ball.collide(p.pos, p.scale, p.scale*6);
				p.render()
			});

			this.game.ball.update();
			this.game.ball.render();
		}
	}
}
