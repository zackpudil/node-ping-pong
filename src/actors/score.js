import gameConstants from '../game-constants';
import gameState from '../gameState';

export default class Score {
	constructor(renderer, scale = 10) {
    this.renderer = renderer;
    this.scale = scale;
	}

	render() {
    this.renderScore();
	}

	update() {
    this.renderScore();
	}

  renderScore() {
    this.renderer.fillColor('#FFFFFF');
		var font = '20pt Calibri';
    this.renderer.text(gameConstants.ScorePosition.x, gameConstants.ScorePosition.y, this.getScore(), font);
  }

  getScore() {
    let score = gameState.score;
    return score.one + ' : ' + score.two;
  }
}
