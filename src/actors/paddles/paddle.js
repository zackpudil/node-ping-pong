import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class Paddle {
	constructor(x, y, renderer, scale) {
		this.pos = { x: x, y: y };
		this.modelRenderer = new ModelRenderer(renderer);
		this.scale = scale;
	}

	render() {
		this.modelRenderer.renderModel('paddle', this.pos, '#FFFFFF', this.scale);
	}

	update() {
		this.pos.y = Math.max(this.pos.y, GameConstants.Bounds.minY + this.scale);
		this.pos.y = Math.min(this.pos.y, GameConstants.Bounds.maxY-(this.scale*6));
	}
}