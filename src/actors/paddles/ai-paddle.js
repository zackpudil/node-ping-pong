import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class AIPaddle {
	constructor(x, y, render) {
		this.pos = { x: x, y: y };
		this.modelRenderer = new ModelRenderer(render);
	}

	render() { 
		this.modelRenderer.renderModel('paddle', this.pos, [0, 204, 0], 10);
	}

	update() {
		this.pos.y += Math.random()*2 - 1;
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-5), GameConstants.Bounds.minY);
	}
}