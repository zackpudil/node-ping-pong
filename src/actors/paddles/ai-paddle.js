import GameConstants from '../../game-constants';
import Paddle from './paddle';

export default class AIPaddle extends Paddle {
	constructor(x, y, renderer, ball, scale = 10, difficulty = 3, onRightSide = true) {
		super(x, y, renderer, scale);

		this.ball = ball;
		this.maxTicks = 11 - Math.max(Math.min(difficulty, 11), 1);
		this.ticks = 0;
		this.onRightSide = onRightSide;
	}

	update() {
		// Don't want the paddles to update it's position to ball's if ball is not on the same court side of the paddle.
		if(this.onRightSide && this.ball.pos.x < GameConstants.Bounds.maxX/2) {
			return;
		} else if(!this.onRightSide && this.ball.pos.x > GameConstants.Bounds.maxX/2) {
			return;
		}

		// Difficulty == delay between updates.
		if(this.ticks <= this.maxTicks) {
			this.ticks += 1;
			return;
		}

		// move position towards ball.
		if(this.pos.y < this.ball.pos.y && this.pos.y+40 < this.ball.pos.y) {
			this.pos.y += 40;
		} else if(this.pos.y > this.ball.pos.y && this.pos.y+40 > this.ball.pos.y) {
			this.pos.y -= 40;
		}

		this.ticks = 0;

		super.update();
	}
}