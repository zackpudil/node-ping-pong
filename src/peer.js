import net from 'net';
import JsonSocket from 'json-socket';

let peer = null;
let commandCallbackDicitionary = [];

export default class PeerCoordinator {

	static get peer() { return peer; }
	static set peer(value) { peer = value; }

	static get commandCallbackDicitionary() { return commandCallbackDicitionary; }

	static create(cb) {
		// create a server that listens for incoming games.
		net.createServer((sock) => {
			PeerCoordinator.peer = new JsonSocket(sock);
			PeerCoordinator.peer.on('message', (message) => PeerCoordinator.onMessage(message));

			cb();
		}).listen(3000);
	}	

	static join(host, cb) {
		// connect to a server.
		PeerCoordinator.peer = new JsonSocket(new net.Socket());

		PeerCoordinator.peer.connect(3000, host);
		PeerCoordinator.peer.on('connect', () => cb());
		PeerCoordinator.peer.on('message', (message) => PeerCoordinator.onMessage(message));
	}

	static sendCommand(name, data) {
		// send message to peer.
		if(PeerCoordinator.peer != null)
			PeerCoordinator.peer.sendMessage({ name: name, data: data });
	}

	static onCommand(name, callback) {
		// add callback for specific message to the singleton dicitionary
		PeerCoordinator.commandCallbackDicitionary.push({ name: name, cb: callback });
	}

	static onMessage(message) {
		// when the socket recieves a message, find it's callback and execute.
		PeerCoordinator.commandCallbackDicitionary.filter(x => x.name == message.name)[0].cb(message.data);
	}
}