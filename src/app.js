import Renderer from './renderer';
import Engine from './engine';

export default function start(canvas) {
	let engine = new Engine(new Renderer(canvas));
	engine.start();
}