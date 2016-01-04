import userInput from '../../user-input';
import peer from '../../peer';

import Paddle from './paddle';

export default class PlayerPaddle extends Paddle {

	constructor(x, y, renderer, scale = 10, keyMaps = { up: 'up', down: 'down'}) {
		super(x, y, renderer, scale);

		this.upKeyisDown = false;
		this.downKeyisDown = false;

		userInput.addListener({ name: keyMaps.up }, () => this.upKeyisDown = true);
		userInput.addListener({ name: keyMaps.up }, () => this.upKeyisDown = false, 'up')

		userInput.addListener({ name: keyMaps.down }, () => this.downKeyisDown = true);
		userInput.addListener({ name: keyMaps.down }, () => this.downKeyisDown = false, 'up');
	}

	update() {
		var displacement = 0;

		if(this.upKeyisDown)
			displacement = -5;
		else if(this.downKeyisDown)
			displacement = 5;

		this.pos.y += displacement;

		if(displacement !== 0)
			peer.sendCommand('paddlePositionChange', this.pos);

		super.update();
	}
}