'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _jsonSocket = require('json-socket');

var _jsonSocket2 = _interopRequireDefault(_jsonSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var peer = null;
var commandCallbackDicitionary = [];

var PeerCoordinator = (function () {
	function PeerCoordinator() {
		_classCallCheck(this, PeerCoordinator);
	}

	_createClass(PeerCoordinator, null, [{
		key: 'create',
		value: function create(cb) {
			// create a server that listens for incoming games.
			_net2.default.createServer(function (sock) {
				PeerCoordinator.peer = new _jsonSocket2.default(sock);
				PeerCoordinator.peer.on('message', function (message) {
					return PeerCoordinator.onMessage(message);
				});

				cb();
			}).listen(3000);
		}
	}, {
		key: 'join',
		value: function join(host, cb) {
			// connect to a server.
			PeerCoordinator.peer = new _jsonSocket2.default(new _net2.default.Socket());

			PeerCoordinator.peer.connect(3000, host);
			PeerCoordinator.peer.on('connect', function () {
				return cb();
			});
			PeerCoordinator.peer.on('message', function (message) {
				return PeerCoordinator.onMessage(message);
			});
		}
	}, {
		key: 'sendCommand',
		value: function sendCommand(name, data) {
			// send message to peer.
			if (PeerCoordinator.peer != null) PeerCoordinator.peer.sendMessage({ name: name, data: data });
		}
	}, {
		key: 'onCommand',
		value: function onCommand(name, callback) {
			// add callback for specific message to the singleton dicitionary
			PeerCoordinator.commandCallbackDicitionary.push({ name: name, cb: callback });
		}
	}, {
		key: 'onMessage',
		value: function onMessage(message) {
			// when the socket recieves a message, find it's callback and execute.
			PeerCoordinator.commandCallbackDicitionary.filter(function (x) {
				return x.name == message.name;
			})[0].cb(message.data);
		}
	}, {
		key: 'peer',
		get: function get() {
			return peer;
		},
		set: function set(value) {
			peer = value;
		}
	}, {
		key: 'commandCallbackDicitionary',
		get: function get() {
			return commandCallbackDicitionary;
		}
	}]);

	return PeerCoordinator;
})();

exports.default = PeerCoordinator;