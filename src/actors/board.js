import gameConstants from '../game-constants';
import gameState from '../gameState';

export default class Board {
	constructor(renderer) {
    this.renderer = renderer;
	}

	render() {
		let bounds = gameConstants.Bounds;

    this.renderer.strokeColor('#FFFFFF');
		this.renderer.fillColor('#000000');
		this.renderer.lineWidth(5);

		this.renderer.line(bounds.minX, bounds.minY, bounds.maxX, bounds.minY); // top line
		this.renderer.line(bounds.minX, bounds.minY, bounds.minX, bounds.maxY); // right line
		this.renderer.line(bounds.maxX, bounds.minY, bounds.maxX, bounds.maxY); // bottom line
		this.renderer.line(bounds.minX, bounds.maxY, bounds.maxX, bounds.maxY); // left line

		this.renderer.line(bounds.maxX / 2 + 25, bounds.minY, bounds.maxX / 2 + 25, bounds.maxY);

		this.renderer.circle(bounds.maxX / 2 + 25, bounds.maxY / 2 + 25, 25);

		this.renderer.lineWidth(1);
	}
}
