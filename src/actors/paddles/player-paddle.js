import ModelRenderer from '../../model-renderer';
import userInput from '../../user-input';
import GameConstants from '../../game-constants';

export default class PlayerPaddle {

	constructor(x, y, keyMaps = { up: 'up', down: 'down'}) {
		this.renderer = new ModelRenderer();
		this.pos = { x: x, y: y };

		userInput.addListener({ name: keyMaps.up, ctrl: false, shift: false }, () => {
			this.pos.y -= 3;
			this.dirY = -1;
		});

		userInput.addListener({ name: keyMaps.down, ctrl: false, shift: false }, () => {
			this.pos.y += 3;
			this.dirY = 1;
		});
	}

	render() {
		debugger;
		this.renderer.renderModel('paddle', { x: this.pos.x, y: this.pos.y }, [0, 204, 0]);
		this.dirY = 0;
	}

	update() {
		this.pos.y = Math.max(Math.min(this.pos.y, GameConstants.Bounds.maxY-7), GameConstants.Bounds.minY + 2);
	}
}