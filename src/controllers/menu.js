import MenuView from "../views/menu";
import render from "../utils/common/render";

export default class MenuController {
  constructor(menuModel, containerElement) {
    this._model = menuModel;
    this._model.checkActive(0);
    this._view = new MenuView(this._model.items);
    this._containerElement = containerElement;
  }

  render(place) {
    render(this._containerElement, this._view, place);
  }
}
