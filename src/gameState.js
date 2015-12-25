import GameConstants from './game-constants';

let state = null;

class GameState {
  static get state() {
    console.log('get state', state);
    return state;
  }

  static set state(newState) {
    console.log('set state from', state, 'to', newState);
    state = newState;
  }

  // constructor() {
  //   state = GameConstants.GameStates.menu;
  // }
}

var gameState = new GameState();

export default gameState;
