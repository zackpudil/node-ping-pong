import context from 'axel';
import userInput from './user-input';

export default class Menu {

  constructor() {
    userInput.addListener({ name: '1'}, () => context.text(1, 3, 'Starting game...'));
  }

  render() {
    // add first option
    context.text(1, 1, '1. Start Game');

    // add second option
    context.text(1, 2, '2. Join Game');

    context.cursor.restore();
  }

  update() {
    // return start or ip address or null
  }
}
