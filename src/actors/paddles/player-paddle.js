import userInput from '../../user-input';
import peer from '../../peer';

import Paddle from './paddle';

export default class PlayerPaddle extends Paddle {

	constructor(x, y, renderer, scale = 10, keyMaps = { up: 'up', down: 'down'}) {
		super(x, y, renderer, scale);

		userInput.addListener({ name: keyMaps.up, ctrl: false, shift: false }, () => {
			this.pos.y -= 40;
			peer.sendCommand('paddlePositionChange', -40);
		});

		userInput.addListener({ name: keyMaps.down, ctrl: false, shift: false }, () => {
			this.pos.y += 40;
			peer.sendCommand('paddlePositionChange', 40);
		});
	}
}