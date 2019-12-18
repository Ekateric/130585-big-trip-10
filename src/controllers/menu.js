import MenuView from "../views/menu";
import render from "../utils/render";

export default class MenuController {
  constructor(menuModel) {
    this._model = menuModel;
    this._model.checkActive(0);
    this._view = new MenuView(this._model.items);
  }

  render(renderToElement, place) {
    render(renderToElement, this._view, place);
  }
}
