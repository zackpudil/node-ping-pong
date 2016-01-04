'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = start;

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(canvas) {
	var engine = new _engine2.default(new _renderer2.default(canvas));
	engine.start();
}