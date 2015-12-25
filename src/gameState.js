import GameConstants from './game-constants';

let state = null;

class GameState {
  static get state() {
    return state;
  }

  static set state(newState) {
    state = newState;
  }
}

var gameState = new GameState();

export default gameState;
