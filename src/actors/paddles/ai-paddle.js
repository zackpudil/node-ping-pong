import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class AIPaddle {
	constructor(x, y, render, ball, scale = 10, difficulty = 3, onRightSide = true) {
		this.pos = { x: x, y: y };
		this.scale = scale;
		this.modelRenderer = new ModelRenderer(render);

		this.ball = ball;
		this.maxTicks = 11 - Math.max(Math.min(difficulty, 10), 1);
		this.ticks = 0;
		this.onRightSide = onRightSide;
	}

	render() { 
		this.modelRenderer.renderModel('paddle', this.pos, '#FFFFFF', this.scale);
	}

	update() {

		if(this.onRightSide && this.ball.pos.x < GameConstants.Bounds.maxX/2)
			return;
		else if(!this.onRightSide && this.ball.pos.x > GameConstants.Bounds.maxX/2)
			return;

		if(this.ticks <= this.maxTicks) {
			this.ticks += 1;
			return;
		}

		if(this.pos.y < this.ball.pos.y && this.pos.y+40 < this.ball.pos.y) {
			this.pos.y += 40;
		} else if(this.pos.y > this.ball.pos.y && this.pos.y+40 > this.ball.pos.y) {
			this.pos.y -= 40;
		}

		this.ticks = 0;

		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-(this.scale*6)), GameConstants.Bounds.minY+this.scale);
	}
}