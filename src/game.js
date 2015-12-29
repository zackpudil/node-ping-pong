import Board from './actors/board';
import Score from './actors/score';
import PlayerBall from './actors/balls/player-ball';
import NetworkBall from './actors/balls/network-ball';
import AIPaddle from './actors/paddles/ai-paddle';
import PlayerPaddle from './actors/paddles/player-paddle';
import NetworkPaddle from './actors/paddles/network-paddle';

import gameConstants from './game-constants';
import peer from './peer';

let Bounds = gameConstants.Bounds;

export default class Game {

	constructor(renderer) {
		this.renderer = renderer;

		this.paddles = [];
		this.ball = null;

		this.board = new Board(renderer);
		this.score = new Score(renderer);
	}

	createActorsForHostedGame() {
		this.ball = new PlayerBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new NetworkPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];
	}

	createActorsForJoinedGame() {

		this.ball = new NetworkBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			new NetworkPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new PlayerPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];
	}

	createActorsForAIGame() {
		this.ball = new PlayerBall(Bounds.maxX/2 + 25, Bounds.maxY/2 + 25, this.renderer);

		this.paddles = [
			new PlayerPaddle(Bounds.minX + 10, Bounds.maxY/2, this.renderer),
			new AIPaddle(Bounds.maxX - 20, Bounds.maxY/2, this.renderer)
		];
	}
}
