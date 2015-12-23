import keypress from 'keypress';

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
			
			// Feed all input to our handler, not to stdout
			process.stdin.setRawMode(true);
			// init keypress on stdin.
		    keypress(process.stdin);
		    // this pauses the application.  If there's no code being run, this will force the app to wait for user input.
		    process.stdin.resume();
		    // handle.
			process.stdin.on('keypress', this.handleInput);
		}

		return instance;
	}

	handleInput(ch, key) {
		// if the app is expecting a string to be entered, don't run any handlers.
		if(UserInputCoordinator.streamMode)
			return;

		let activatedListeners = UserInputCoordinator.inputHandlers.filter(l => {
			// if ch is not undefined, then key is undefined.
			// ch = str.  key = { name: str, ctrl: bool, shift: bool }
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

	readStream(keyPressedCb, enterCb) {
		var str = "";
		UserInputCoordinator.streamMode = true;

		process.stdin.on('keypress', (ch, key) => {
			if(!UserInputCoordinator.streamMode)
				return;

			if(key && (key.name == 'enter' || key.name == 'return')) {
				//if enter pressed, pass string to caller, set stream mode to false and return.
				UserInputCoordinator.streamMode = false;

				enterCb(str);
			} else if(key && key.name == 'backspace') {
				str = str.slice(0, -1);
				// update cursor position.
				keyPressedCb(str);
			} else { 

				str += ch || key.name;
				keyPressedCb(str);
			}
		});
	}
}

var inputCoordinator = new UserInputCoordinator();

export default inputCoordinator;