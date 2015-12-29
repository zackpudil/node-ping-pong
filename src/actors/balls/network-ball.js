import ModelRenderer from '../../model-renderer';
import peer from '../../peer';
import gameState from '../../gameState';

export default class NetworkBall {

	constructor(x, y, renderer, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);
		this.startX = x;

		this.pos = { x: x, y: y };
		this.speed = 0;
		this.dir = { x: 0, y: 0 };

		this.scale = scale;

		peer.onCommand('scored', (playerWhoScored) => {
			this.scored(playerWhoScored);
		});

		peer.onCommand('ballUpdate', (ball) => {
			this.speed = ball.speed;
			this.dir = ball.dir;
			this.pos = ball.pos;
		});
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#00cc66', this.scale)
	}

	update() { 
		this.pos.x += this.dir.x*this.speed;
		this.pos.y += this.dir.y*this.speed;
	}

	didHit(pos, width, height) {

	}

	scored(sideThatScored) {
		gameState.score = sideThatScored;
	}
}
