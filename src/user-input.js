import keypress from 'keypress';

let instance = null
let inputHandlers = [];

class UserInputCoordinator {

	static get inputHandlers() {
		return inputHandlers;
	}

	constructor() {

		if(!instance) {
			instance = this;
			process.stdin.setRawMode(true);

		    keypress(process.stdin);
		    process.stdin.resume();

			process.stdin.on('keypress', this.handleInput);
		}

		return instance;
	}

	handleInput(ch, key) {
		let activatedListeners = UserInputCoordinator.inputHandlers.filter(l => {
			var keyMatches = key 
				&& l.key.name == key.name 
				&& l.key.ctrl == key.ctrl 
				&& l.key.shift == key.shift;

			return keyMatches || l.key.name == ch;
		});

		activatedListeners.forEach(l => l.handle());
	}

	addListener(key, handler) {
		UserInputCoordinator.inputHandlers.push({
			key: key,
			handle: handler
		});
	}
}

var inputCoordinator = new UserInputCoordinator();

export default inputCoordinator;