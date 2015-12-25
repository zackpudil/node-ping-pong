import GameConstants from './game-constants';

let instance = null
let inputHandlers = [];
let streamMode = false;

class UserInputCoordinator {

	// static list of the input handlers.
	static get inputHandlers() {
		return inputHandlers;
	}

	static get streamMode() { return streamMode; }
	static set streamMode(v) { streamMode = v; }

	constructor() {

		// A singleton instance
		if(!instance) {
			instance = this;
			document.onkeydown = this.handleInput;
		}

		return instance;
	}

	handleInput(e) {
		// if the app is expecting a string to be entered, don't run any handlers.
		if(UserInputCoordinator.streamMode)
			return;

		let activatedListeners = UserInputCoordinator.inputHandlers.filter(l => {
			return GameConstants.KeyMap[l.key.name] == e.keyCode
				&& l.key.ctrl == e.ctrlKey
				&& l.key.shift == e.shiftKey;
		});

		activatedListeners.forEach(l => l.handle());
	}

	addListener(key, handler) {
		// ctrl and shift are optional values, default to false if not passed.
		key.ctrl = key.ctrl || false;
		key.shift = key.shift || false;

		UserInputCoordinator.inputHandlers.push({
			key: key,
			handle: handler
		});
	}

	readStream(enterCb) {
		// NOT Supported by electron.
		//prompt("Please Enter Ip address to join.", enterCb);

		enterCb();
	}
}

var inputCoordinator = new UserInputCoordinator();

export default inputCoordinator;
