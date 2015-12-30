import ModelRenderer from '../../model-renderer';
import peer from '../../peer';
import gameState from '../../gameState';

export default class NetworkBall {

	constructor(x, y, renderer, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);
		this.startX = x;

		this.pos = { x: x, y: y };

		this.scale = scale;

		peer.onCommand('scored', (playerWhoScored) => {
			this.scored(playerWhoScored);
		});

		peer.onCommand('ballPositionChange', (pos) => {
			this.pos = pos;
		});
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#FFFFFF', this.scale)
	}

	update() { }

	didHit(pos, width, height) {

	}

	scored(sideThatScored) {
		gameState.score = sideThatScored;
	}
}
