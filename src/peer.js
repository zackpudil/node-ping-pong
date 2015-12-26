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

	static onMove(cb) {
		PeerCoordinator.peer.on('data', (data) => {
			cb(JSON.parse(data));
		});
	}

	static move(y) {
		PeerCoordinator.peer.write(JSON.stringify({ y: y }));
	}
}