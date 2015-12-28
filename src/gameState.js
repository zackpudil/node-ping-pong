import GameConstants from './game-constants';

let state = null;
let score = {
  one: 0,
  two: 0
};

class GameState {
  get state() {
    return state;
  }

  set state(newState) {
    state = newState;
  }

  get score() {
    return score;
  }

  set score(player) {
    score[player] += 1;
  }

  resetScore() {
    score = {
      one: 0,
      two: 0
    };
  }
}

var gameState = new GameState();

export default gameState;
