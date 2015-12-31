import peer from '../../peer';
import Ball from './ball';

export default class NetworkBall extends Ball {

	constructor(x, y, renderer, scale = 10) {

		super(x, y, renderer, scale);

		peer.onCommand('scored', (playerWhoScored) => {
			super.scored(playerWhoScored);
		});

		peer.onCommand('ballUpdate', (pos) => {
			this.pos = pos;
		});
	}

	update() { }
}
