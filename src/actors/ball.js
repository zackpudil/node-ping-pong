import ModelRenderer from '../model-renderer';
import GameConstants from '../game-constants';

export default class Ball {

	constructor(x, y) {
		this.modelRenderer = new ModelRenderer();

		this.startPos = { x: x, y: y };
		this.pos = { x: x, y: y };
		this.dir = { x: -1, y: -1 };
		this.speed = 2;

		this.scoreCb = () => { };
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, [0, 204, 0])
	}

	update() {
		if(this.pos.y > GameConstants.Bounds.maxY-2 || this.pos.y < GameConstants.Bounds.minY+2) {
			this.dir.y *= -1;
		}

		if(this.pos.x > GameConstants.Bounds.maxX-2 || this.pos.x < GameConstants.Bounds.minY+2) {
			this.reset();
			this.scoreCb();
		}

		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;
	}

	didHit(pos, width, height) {
		if(this.pos.x < pos.x + width &&
			this.pos.x + 2 > pos.x &&
			this.pos.y < pos.y + height &&
			this.pos.y + 2 > pos.y) {

			this.speed = Math.max(this.speed + 0.25, 2);
			this.dir.x *= -1
		}
	}

	reset() {
		this.pos = { x: this.startPos.x, y: this.startPos.y };
		this.dir.y = Math.random()*10 < 5 ? -1 : 1;
		this.speed = 1;
	}

	onScore(scoreCb) {
		this.scoreCb = scoreCb;
	}
}