import ModelRenderer from '../../model-renderer';
import gameState from '../../gameState';

export default class Ball {
	constructor(x, y, renderer, scale) {
		this.modelRenderer = new ModelRenderer(renderer);

		this.startPos = { x: x, y: y };
		this.pos = { x: x, y: y };
		this.dir = { x: -1, y: -1 };
		this.speed = 1.5;
		this.scale = scale;
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#FFFFFF', this.scale)
	}

	update() {
		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;
	}

	collide(pos, width, height) {
		return this.pos.x < pos.x + width &&
			this.pos.x + this.scale > pos.x &&
			this.pos.y < pos.y + height &&
			this.pos.y + this.scale > pos.y
	}

	scored(sideThatScored) {
		gameState.score = sideThatScored;
	}
}