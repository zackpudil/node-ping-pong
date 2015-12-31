import peer from '../../peer';

import Paddle from './paddle';

export default class NetworkPaddle extends Paddle {
	constructor(x, y, renderer, scale = 10) {
		super(x, y, renderer, scale);

		peer.onCommand('paddlePositionChange', (y) => {
			// when ever the other paddle sends his/her's move updates over the write, we change it's position.
			this.pos.y += y;
		});
	}
}