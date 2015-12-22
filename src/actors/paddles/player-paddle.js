import ModelRenderer from '../../model-renderer';
import userInput from '../../user-input';

export default class PlayerPaddle {

	constructor(x, y) {
		this.renderer = new ModelRenderer();
		this.pos = { x: x, y: y };

		userInput.addListener({ name: 'up', ctrl: false, shift: false }, () => {
			this.pos.y -= 3;
		});

		userInput.addListener({ name: 'down', ctrl: false, shift: false }, () => {
			this.pos.y += 3;
		});
	}

	render() {
		debugger;
		this.renderer.renderModel('paddle', { x: this.pos.x, y: this.pos.y }, [0, 204, 0]);
	}

	update() {
		this.pos.y = Math.max(Math.min(this.pos.y, 40), 5);
	}
}