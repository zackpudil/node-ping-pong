import ModelRenderer from '../../model-renderer';
import userInput from '../../user-input';
import GameConstants from '../../game-constants';
import peer from '../../peer';

export default class PlayerPaddle {

	constructor(x, y, renderer, keyMaps = { up: 'up', down: 'down'}, scale = 10) {
		this.renderer = new ModelRenderer(renderer);
		this.pos = { x: x, y: y };
		this.scale = 10;

		userInput.addListener({ name: keyMaps.up, ctrl: false, shift: false }, () => {
			this.pos.y -= 40;
			peer.move(-40);
		});

		userInput.addListener({ name: keyMaps.down, ctrl: false, shift: false }, () => {
			this.pos.y += 40;
			peer.move(40);
		});
	}

	render() {
		this.renderer.renderModel('paddle', this.pos, '#00cc66', this.scale);
	}

	update() {
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-(this.scale*6)), GameConstants.Bounds.minY + this.scale);
	}
}