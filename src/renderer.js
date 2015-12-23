import canvas from 'axel';

let currentColor = {
	fg: [255, 255, 255],
	bg: [0, 0, 0]
};

/*
	Wrapper class of the axel canvas. Initial need was for pushing/poping colors.
*/
export default class Renderer {

	get currentColor() { return currentColor; }

	bg(r, g, b) {
		currentColor.bg = [r, g, b];
		canvas.bg(...currentColor.bg);
	}

	fg(r, g, b) {
		currentColor.fg = [r, g, b];
		canvas.fg(...currentColor.fg);
	}

	box(x, y, width, height) {
		canvas.box(x, y, width, height);
	}

	text(x, y, str) {
		canvas.text(x, y, str);
	}

	line(startX, startY, endX, endY) {
		canvas.line(startX, startY, endX, endY);
	}

	clearArea(x, y, width, height) {
		canvas.fg(0, 0, 0); 
		canvas.bg(0, 0, 0);
		
		canvas.scrub(x, y, width, height);

		canvas.bg(...currentColor.bg);
		canvas.fg(...currentColor.fg);
	}

	clear() {
		canvas.clear();
	}

	reset() {
		canvas.cursor.reset();
	}
}