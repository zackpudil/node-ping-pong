import Renderer from './renderer';

export default class ModelRenderer {

	constructor(renderer) {
		this.renderer = renderer;
	}

	renderModel(modelId, renderAt, color, scale = 1) {
		// grab the json model that corresponds to the id.
		var model = require(`../models/${modelId}.json`);

		// set the background color.
		console.log(color);
		this.renderer.fillColor(color);
		this.renderer.strokeColor(color);

		// loop through the points to render the box at each pos.
		model.points.forEach(p => {
			// the x, y coords of the points are relative to 0, 0. Hence starting pos.
			this.renderer.box(renderAt.x + (p.x * scale), renderAt.y + (p.y * scale), scale, scale);
		});
	}
}