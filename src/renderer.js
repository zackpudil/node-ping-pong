/*
	Wrapper class of the html5 canvas.
*/
export default class Renderer {

	constructor(canvas) {
		this.canvas = canvas;
	}

	strokeColor(color) {
		this.canvas.strokeStyle= color;
	}

	fillColor(color) {
		this.canvas.fillStyle = color;
	}

	lineWidth(width) {
		this.canvas.lineWidth = width;
	}

	box(x, y, width, height) {
		this.canvas.rect(x, y, width, height);
		this.canvas.fill();
		this.canvas.stroke();

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
		this.canvas.fill();
		this.canvas.beginPath();
	}

	circle(x, y, r) {
		this.canvas.arc(x, y, r, 0, Math.PI*2);
		this.canvas.stroke();
		this.canvas.fill();

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
