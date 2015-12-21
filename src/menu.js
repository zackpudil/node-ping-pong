import context from 'axel';

export default class Menu {
  constructor() {
    process.stdin.on('keypress', this.checkInput);
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

  checkInput(ch, key) {
    // if key is enter, check if value is 1 or 2
    // if 1 start, if 2 get ip address
  }
}
