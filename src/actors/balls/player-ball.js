import GameConstants from '../../game-constants';
import gameState from '../../gameState';
import peer from '../../peer';

import Ball from './ball';

export default class PlayerBall extends Ball {

	constructor(x, y, renderer, scale = 10) {
		super(x, y, renderer, scale);
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

		super.update();

		// send pos to the network ball.
		peer.sendCommand('ballUpdate', this.pos);
	}

	collide(pos, width, height) {
		//  AABB collision detection.
		if(super.collide(pos, width, height)) {

			this.speed = Math.min(this.speed+0.5, 10);
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
		super.scored(sideThatScored);
		peer.sendCommand('scored', sideThatScored);
	}
}
