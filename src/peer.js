import net from 'net';
import JsonSocket from 'json-socket';

let peer = null;

export default class PeerCoordinator {

	static get peer() { return peer; }
	static set peer(value) { peer = value; }

	static create(cb) {
		net.createServer((sock) => {
			PeerCoordinator.peer = new JsonSocket(sock);
			cb();
		}).listen(3000);
	}	

	static join(host, cb) {
		PeerCoordinator.peer = new JsonSocket(new net.Socket());

		PeerCoordinator.peer.connect(3000, host, () => {
			cb();
		});
	}

	static ballPosition(pos) {
		PeerCoordinator.peer.sendMessage({ pos: pos, message: 'ball' });
	}

	static onBallPosition(cb) {
		PeerCoordinator.peer.on('message', (data) => {
			if(data.message === 'ball')
				cb(data.pos);
		});
	}

	static onMove(cb) {
		PeerCoordinator.peer.on('message', (data) => {
			if(data.message === 'move')
				cb(data.y);
		});
	}

	static move(y) {
		PeerCoordinator.peer.sendMessage({ message: 'move', y: y });
	}
}