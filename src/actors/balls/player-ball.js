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
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#FFFFFF', this.scale)
	}

	update() {
		// if the ball hits the top or bottom walls, reverse the y direction.
		if(this.pos.y > GameConstants.Bounds.maxY-this.scale || this.pos.y < GameConstants.Bounds.minY) {
			this.dir.y *= -1;
		}

		//if the ball hits the right or left walls, then the ball needs to be reset, and the score calculated.
		if(this.pos.x > GameConstants.Bounds.maxX-this.scale || this.pos.x < GameConstants.Bounds.minY) {
			let sideThatScored = this.pos.x > GameConstants.Bounds.maxX-this.scale ? 'one' : 'two';
			this.scored(sideThatScored);
			this.reset();
		}

		// position += direction * speed
		// direction*speed = velocity
		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;

		// send pos to the network ball.
		peer.sendCommand('ballPositionChange', this.pos);
	}

	collide(pos, width, height) {
		//  AABB collision detection.
		if(this.pos.x < pos.x + width &&
			this.pos.x + this.scale > pos.x &&
			this.pos.y < pos.y + height &&
			this.pos.y + this.scale > pos.y) {

			this.speed = Math.min(this.speed+0.5, 15);
			this.dir.x *= -1

			// push ball out of collision before next collision check.
			if(this.pos.x < GameConstants.Bounds.maxY) {
				this.pos.x += 10;
			} else {
				this.pos.x -= 10;
			}
		}
	}

	reset() {
		// put ball back at the center, with default speed, but keep current the x direction.
		this.pos = { x: this.startPos.x, y: this.startPos.y };
		this.dir.y = -1;
		this.speed = 1.5;
	}

	scored(sideThatScored) {
		gameState.score = sideThatScored;
		peer.sendCommand('scored', sideThatScored);
	}
}
