import GameConstants from './game-constants';

let instance = null
let inputHandlers = [];
let streamMode = false;

class UserInputCoordinator {

	constructor() {

		// A singleton instance
		if(!instance) {
			instance = this;

			// differenciate between 'up' and 'down' inputHandlers.
			document.onkeyup = (e) => this.handleInput(e, 'up');
			document.onkeydown = (e) => this.handleInput(e, 'down');
		}

		return instance;
	}

	handleInput(e, pressType) {
		let activatedListeners = inputHandlers.filter(l => {
			return GameConstants.KeyMap[l.key.name] == e.keyCode
				&& l.key.ctrl == e.ctrlKey
				&& l.key.shift == e.shiftKey
				&& l.pressType == pressType;
		});

		activatedListeners.forEach(l => l.handle());
	}

	addListener(key, handler, pressType = 'down') {
		// ctrl and shift are optional values, default to false if not passed.
		key.ctrl = key.ctrl || false;
		key.shift = key.shift || false;

		inputHandlers.push({
			key: key,
			handle: handler,
			pressType: pressType
		});
	}

	removeListener(key) {
		var inputListenerIndex = inputHandlers.findIndex((input) => {
			return input.key.name === key;
		});

		if (inputListenerIndex > -1) {
			inputHandlers.splice(inputListenerIndex, 1);
		}
	}
}

var inputCoordinator = new UserInputCoordinator();

export default inputCoordinator;
