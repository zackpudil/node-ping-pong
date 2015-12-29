import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class AIPaddle {
	constructor(x, y, render, ball, scale = 10, difficulty = 7) {
		this.pos = { x: x, y: y };
		this.scale = scale;
		this.modelRenderer = new ModelRenderer(render);

		this.ball = ball;
		this.difficulty = difficulty
		this.ticks = 0;
	}

	render() { 
		this.modelRenderer.renderModel('paddle', this.pos, '#00cc66', this.scale);
	}

	update() {

		if(this.ticks <= this.difficulty) {
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