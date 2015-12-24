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
	}

	fg(r, g, b) {
		currentColor.fg = [r, g, b];
	}

	box(x, y, width, height) {
		this.canvas.rect(x, y, width, height);
		this.canvas.fill();

		this.canvas.beginPath();
	}

	text(x, y, str, font = null) {
		if(font)  {
			this.canvas.font = font
		}

		this.canvas.fillText(str, x, y);
	}

	line(startX, startY, endX, endY) {
		this.canvas.moveTo(startX, startY);
		this.canvas.lineTo(endX, endY);

		this.canvas.stroke();
		this.canvas.beginPath();
	}

	clearArea(x, y, width, height) {
		this.canvas.clearRect(x, y, width, height);
	}

	clear() {
		this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
		this.canvas.beginPath();
	}
}