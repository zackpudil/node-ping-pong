import peer from '../../peer';
import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class NetworkPaddle {
	constructor(x, y, renderer, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);
		this.pos = { x: x, y: y };
		this.scale = scale;

		peer.onCommand('paddlePositionChange', (y) => {
			this.pos.y += y;
		});
	}

	update() {
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-(this.scale*6)), GameConstants.Bounds.minY + this.scale);
	}

	render() {
		this.modelRenderer.renderModel('paddle', this.pos, '#00cc66', this.scale);
	}
}