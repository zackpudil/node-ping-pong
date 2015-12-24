let currentColor = {
	fg: [255, 255, 255],
	bg: [0, 0, 0]
};

/*
	Wrapper class of the axel canvas. Initial need was for pushing/poping colors.
*/
export default class Renderer {

	constructor(canvas) {
		this.canvas = canvas;
	}

	get currentColor() { return currentColor; }

	bg(r, g, b) {
		currentColor.bg = [r, g, b];
		this.canvas.bg(...currentColor.bg);
	}

	fg(r, g, b) {
		currentColor.fg = [r, g, b];
		this.canvas.fg(...currentColor.fg);
	}

	box(x, y, width, height) {
		this.canvas.box(x, y, width, height);
	}

	text(x, y, str) {
		this.canvas.text(x, y, str);
	}

	line(startX, startY, endX, endY) {
		this.canvas.line(startX, startY, endX, endY);
	}

	clearArea(x, y, width, height) {
		this.canvas.fg(0, 0, 0); 
		this.canvas.bg(0, 0, 0);
		
		this.canvas.scrub(x, y, width, height);

		this.canvas.bg(...currentColor.bg);
		this.canvas.fg(...currentColor.fg);
	}

	clear() {
		this.canvas.clear();
	}
}