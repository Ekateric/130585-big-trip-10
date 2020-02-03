import {MenuItem} from "../data";
import MenuModel from "../models/menu";
import MenuView from "../views/menu";
import render from "../utils/render/render";

export default class MenuController {
  constructor(containerElement) {
    this._containerElement = containerElement;

    this._model = new MenuModel(Object.values(MenuItem));
    this._model.active = MenuItem.TABLE;
    this._view = new MenuView(this._model.items, this._model.active);
  }

  get active() {
    return this._model.active;
  }

  render(position) {
    render(this._containerElement, this._view, position);
  }

  setMenuClickHandler(handler) {
    this._view.setMenuClickHandler((activeItem) => {
      if (this._model.active !== activeItem) {
        this._model.active = activeItem;
        this._view.setActiveItem(activeItem);
        handler(activeItem);
      }
    });
  }
}
