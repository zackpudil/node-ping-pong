import Board from './actors/board';
import Score from './actors/score';
import PlayerBall from './actors/balls/player-ball';
import NetworkBall from './actors/balls/network-ball';
import AIPaddle from './actors/paddles/ai-paddle';
import PlayerPaddle from './actors/paddles/player-paddle';
import NetworkPaddle from './actors/paddles/network-paddle';
import gameConstants from './game-constants';
import peer from './peer';

export default class Game {

	constructor(renderer) {
		this.renderer = renderer;

		this.paddles = [];
		this.ball = null;

		this.board = new Board(renderer);
		this.score = new Score(renderer);
	}

	createActorsForHostedGame() {
		let Bounds = gameConstants.Bounds;
		this.ball = new PlayerBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			// You are on the left
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			// other player on the right.
			new NetworkPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];
	}

	createActorsForJoinedGame() {
		let Bounds = gameConstants.Bounds;
		// You're ball is puppeted by server ball.
		this.ball = new NetworkBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			// other player on the left.
			new NetworkPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			// you are on the right.
			new PlayerPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];
	}

	createActorsForAIGame(difficulty) {
		let Bounds = gameConstants.Bounds;
		this.ball = new PlayerBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new AIPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer, this.ball, 10, difficulty)
		];
	}

	createActorsForShow() {
		let Bounds = gameConstants.Bounds;
		this.ball = new PlayerBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			new AIPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer, this.ball, 10, 11, false),
			new AIPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer, this.ball, 10, 11)
		];
	}
}
