import ModelRenderer from '../../model-renderer';
import GameConstants from '../../game-constants';

export default class AIPaddle {
	constructor(x, y, render, scale = 10) {
		this.pos = { x: x, y: y };
		this.scale = scale;
		this.modelRenderer = new ModelRenderer(render);
	}

	render() { 
		this.modelRenderer.renderModel('paddle', this.pos, '#00cc66', this.scale);
	}

	update() {
		this.pos.y += Math.random()*80 - 40;
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-(this.scale*6)), GameConstants.Bounds.minY+this.scale);
	}
}