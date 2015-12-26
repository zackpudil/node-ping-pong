import ModelRenderer from '../model-renderer';
import GameConstants from '../game-constants';

export default class Ball {

	constructor(x, y, renderer, dir, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);

		this.startPos = { x: x, y: y };
		this.pos = { x: x, y: y };
		this.dir = { x: dir, y: -1 };
		this.speed = 1.5;

		this.scale = scale;

		this.scoreCb = () => { };
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#00cc66', this.scale)
	}

	update() {
		if(this.pos.y > GameConstants.Bounds.maxY-this.scale || this.pos.y < GameConstants.Bounds.minY) {
			this.dir.y *= -1;
		}

		if(this.pos.x > GameConstants.Bounds.maxX-this.scale || this.pos.x < GameConstants.Bounds.minY) {
			this.reset();
			this.scoreCb();
		}

		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;
	}

	didHit(pos, width, height) {
		if(this.pos.x < pos.x + width &&
			this.pos.x + this.scale > pos.x &&
			this.pos.y < pos.y + height &&
			this.pos.y + this.scale > pos.y) {

			this.speed += 0.5;
			this.dir.x *= -1
		}
	}

	reset() {
		this.pos = { x: this.startPos.x, y: this.startPos.y };
		this.dir.y = -1;
		this.speed = 1.5;
	}

	onScore(scoreCb) {
		this.scoreCb = scoreCb;
	}
}