import ModelRenderer from '../../model-renderer';
import userInput from '../../user-input';
import GameConstants from '../../game-constants';

export default class PlayerPaddle {

	constructor(x, y, renderer, keyMaps = { up: 'up', down: 'down'}) {
		this.renderer = new ModelRenderer(renderer);
		this.pos = { x: x, y: y };

		userInput.addListener({ name: keyMaps.up, ctrl: false, shift: false }, () => {
			this.pos.y -= 40;
		});

		userInput.addListener({ name: keyMaps.down, ctrl: false, shift: false }, () => {
			this.pos.y += 40;
		});
	}

	render() {
		this.renderer.renderModel('paddle', { x: this.pos.x, y: this.pos.y }, [0, 204, 0], 10);
	}

	update() {
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-60), GameConstants.Bounds.minY + 10);
	}
}