import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';
import gameState from '../../gameState';
import peer from '../../peer';

export default class PlayerBall {

	constructor(x, y, renderer, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);

		this.startPos = { x: x, y: y };
		this.pos = { x: x, y: y };
		this.dir = { x: -1, y: -1 };
		this.speed = 1.5;
		this.scale = scale;

		this.updateNetworkBall();
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#00cc66', this.scale)
	}

	update() {
		if(this.pos.y > GameConstants.Bounds.maxY-this.scale || this.pos.y < GameConstants.Bounds.minY) {
			this.dir.y *= -1;
			this.updateNetworkBall();
		}

		if(this.pos.x > GameConstants.Bounds.maxX-this.scale || this.pos.x < GameConstants.Bounds.minY) {
			let sideThatScored = this.pos.x > GameConstants.Bounds.maxX-this.scale ? 'two' : 'one';
			this.scored(sideThatScored);
			this.reset();
		}

		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;
	}

	updateNetworkBall() {
		peer.sendCommand('ballUpdate', {
			speed: this.speed,
			dir: this.dir,
			pos: this.pos
		});
	}

	didHit(pos, width, height) {
		if(this.pos.x < pos.x + width &&
			this.pos.x + this.scale > pos.x &&
			this.pos.y < pos.y + height &&
			this.pos.y + this.scale > pos.y) {

			this.speed += 0.5;
			this.dir.x *= -1

			this.updateNetworkBall();
		}
	}

	reset() {
		this.pos = { x: this.startPos.x, y: this.startPos.y };
		this.dir.y = -1;
		this.speed = 1.5;

		this.updateNetworkBall();
	}

	scored(sideThatScored) {
		gameState.score = sideThatScored;
		peer.sendCommand('scored', sideThatScored);
	}
}
