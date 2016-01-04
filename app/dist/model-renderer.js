'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelRenderer = (function () {
	function ModelRenderer(renderer) {
		_classCallCheck(this, ModelRenderer);

		this.renderer = renderer;
	}

	_createClass(ModelRenderer, [{
		key: 'renderModel',
		value: function renderModel(modelId, renderAt, color) {
			var _this = this;

			var scale = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

			// grab the json model that corresponds to the id.
			var model = require('../models/' + modelId + '.json');

			// set the background color.
			// console.log(color);
			this.renderer.fillColor(color);
			this.renderer.strokeColor(color);

			// loop through the points to render the box at each pos.
			model.points.forEach(function (p) {
				// the x, y coords of the points are relative to 0, 0. Hence starting pos.
				_this.renderer.box(renderAt.x + p.x * scale, renderAt.y + p.y * scale, scale, scale);
			});
		}
	}]);

	return ModelRenderer;
})();

exports.default = ModelRenderer;