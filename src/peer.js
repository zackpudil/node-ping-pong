import net from 'net';

let peer = null;

export default class PeerCoordinator {

	static get peer() { return peer; }
	static set peer(value) { peer = value; }

	static create(cb) {
		net.createServer((sock) => {
			PeerCoordinator.peer = sock;
			cb();
		}).listen(3000, 'localhost');
	}	

	static join(host, port, cb) {
		PeerCoordinator.peer = new net.Socket();

		PeerCoordinator.peer.connect(port, host, () => {
			cb();
		});
	}

	static ballPosition(pos) {
		PeerCoordinator.peer.write(JSON.stringify({ pos: pos, message: 'ball' }));
	}

	static onBallPosition(cb) {
		PeerCoordinator.peer.on('data', (data) => {
			let dataParsed = JSON.parse(data);

			if(dataParsed.message === 'ball')
				cb(dataParsed.pos);
		})
	}

	static onMove(cb) {
		PeerCoordinator.peer.on('data', (data) => {
			let dataParsed = JSON.parse(data);

			if(dataParsed.message === 'move')
				cb(dataParsed.y);
		});
	}

	static move(y) {
		PeerCoordinator.peer.write(JSON.stringify({ message: 'move', y: y }));
	}
}