import ModelRenderer from './model-renderer';
import userInput from './user-input';

export default class Menu {

  constructor() {
    this.modelRenderer = new ModelRenderer();
    userInput.addListener({ name: '1'}, () => context.text(1, 3, 'Starting game...'));
  }

  render() {
    var color = [204, 0, 255];
    this.modelRenderer.renderModel('title/P', { x: 5, y: 3 }, color);
    this.modelRenderer.renderModel('title/i', { x: 15, y: 3}, color);
    this.modelRenderer.renderModel('title/n', { x: 18, y: 6}, color);
    this.modelRenderer.renderModel('title/g', { x: 25, y: 6}, color);

    this.modelRenderer.renderModel('title/P', { x: 9, y: 15 }, color);
    this.modelRenderer.renderModel('title/o', { x: 18, y: 18 }, color);
    this.modelRenderer.renderModel('title/n', { x: 25, y: 18 }, color);
    this.modelRenderer.renderModel('title/g', { x: 32, y: 18 }, color);
  }

  update() {
    // return start or ip address or null
  }
}
