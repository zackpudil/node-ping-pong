import GameConstants from '../game-constants';
import gameState from '../gameState';
import peers from '../peer';
import electron from 'electron';

export default class Board {
	constructor(renderer) {
    this.renderer = renderer;
    this.bounds = GameConstants.Bounds;

		peers.onCommand('resizeWindow', this.resizeWindow);
	}

	resizeWindow(boundsObject) {
		console.log('board resize', boundsObject);
		electron.ipcRenderer.send('resizeWindow', boundsObject);
		this.bounds = GameConstants.Bounds;
	}

	render() {
    this.renderer.strokeColor('#000000');
		this.renderer.fillColor('#FFFFFF');

		this.renderer.line(this.bounds.minX, this.bounds.minY, this.bounds.maxX, this.bounds.minY); // top line
		this.renderer.line(this.bounds.minX, this.bounds.minY, this.bounds.minX, this.bounds.maxY); // right line
		this.renderer.line(this.bounds.maxX, this.bounds.minY, this.bounds.maxX, this.bounds.maxY); // bottom line
		this.renderer.line(this.bounds.minX, this.bounds.maxY, this.bounds.maxX, this.bounds.maxY); // left line

		this.renderer.line(this.bounds.maxX / 2 + 25, this.bounds.minY, this.bounds.maxX / 2 + 25, this.bounds.maxY);

		this.renderer.circle(this.bounds.maxX / 2 + 25, this.bounds.maxY / 2 + 25, 25);
	}

	// update() {
  //   this.renderScore();
	// }
  //
  // renderScore() {
  //   this.renderer.fillColor('#000000');
	// 	var font = '20pt Calibri';
  //   this.renderer.text(this.pos.x, this.pos.y, this.getScore(), font);
  // }
  //
  // getScore() {
  //   let score = gameState.score;
  //   return score.one + ' : ' + score.two;
  // }
}
