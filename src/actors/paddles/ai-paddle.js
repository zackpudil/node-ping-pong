import ModelRenderer from '../../model-renderer';

export default class AIPaddle {
	constructor(x, y) {
		this.pos = { x: x, y: y };
		this.modelRenderer = new ModelRenderer();
	}

	render() { 
		this.modelRenderer.renderModel('paddle', this.pos, [255, 255, 255]);
	}

	update() {
		this.pos.y += Math.random()*2 - 1;

		this.pos.y = Math.max(Math.min(this.pos.y, 40), 5);
	}
}