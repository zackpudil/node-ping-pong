import ModelRenderer from '../../model-renderer';
import peer from '../../peer';

export default class NetworkBall {

	constructor(x, y, renderer, scale = 10) {
		this.modelRenderer = new ModelRenderer(renderer);
		this.startX = x;

		this.pos = { x: x, y: y };

		this.scale = scale;

		this.scoreCb = () => { };

		peer.onBallPosition((pos) => {
			this.pos = pos;
		});
	}

	render() {
		this.modelRenderer.renderModel("ball", this.pos, '#00cc66', this.scale)
	}

	update() { }

	didHit(pos, width, height) {

	}

	onScore(scoreCb) {
		this.scoreCb = scoreCb;
	}
}