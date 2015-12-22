import canvas from 'axel';

export default class ModelRenderer {

	renderModel(modelId, renderAt, rgb) {
		var model = require(`../models/${modelId}.json`);

		canvas.bg(...rgb);

		model.points.forEach(p => {
			canvas.point(renderAt.x + p.x, renderAt.y + p.y);
		});

		canvas.cursor.restore();
	}
}