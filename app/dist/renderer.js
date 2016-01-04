"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	Wrapper class of the html5 canvas.
*/

var Renderer = (function () {
	function Renderer(canvas) {
		_classCallCheck(this, Renderer);

		this.canvas = canvas;
	}

	_createClass(Renderer, [{
		key: "strokeColor",
		value: function strokeColor(color) {
			this.canvas.strokeStyle = color;
		}
	}, {
		key: "fillColor",
		value: function fillColor(color) {
			this.canvas.fillStyle = color;
		}
	}, {
		key: "lineWidth",
		value: function lineWidth(width) {
			this.canvas.lineWidth = width;
		}
	}, {
		key: "box",
		value: function box(x, y, width, height) {
			this.canvas.rect(x, y, width, height);
			this.canvas.fill();
			this.canvas.stroke();

			this.canvas.beginPath();
		}
	}, {
		key: "text",
		value: function text(x, y, str) {
			var font = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

			if (font) {
				this.canvas.font = font;
			}

			this.canvas.fillText(str, x, y);
		}
	}, {
		key: "line",
		value: function line(startX, startY, endX, endY) {
			this.canvas.moveTo(startX, startY);
			this.canvas.lineTo(endX, endY);

			this.canvas.stroke();
			this.canvas.fill();
			this.canvas.beginPath();
		}
	}, {
		key: "circle",
		value: function circle(x, y, r) {
			this.canvas.arc(x, y, r, 0, Math.PI * 2);
			this.canvas.stroke();
			this.canvas.fill();

			this.canvas.beginPath();
		}
	}, {
		key: "clearArea",
		value: function clearArea(x, y, width, height) {
			this.canvas.clearRect(x, y, width, height);
		}
	}, {
		key: "clear",
		value: function clear() {
			this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
			this.canvas.beginPath();
		}
	}]);

	return Renderer;
})();

exports.default = Renderer;