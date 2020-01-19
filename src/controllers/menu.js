import MenuItems from "../data/menu-items";
import MenuModel from "../models/menu";
import MenuView from "../views/menu";
import render from "../utils/common/render";

export default class MenuController {
  constructor(containerElement) {
    this._containerElement = containerElement;

    this._model = new MenuModel(Object.values(MenuItems));
    this._model.active = MenuItems.TABLE;
    this._view = new MenuView(this._model.items, this._model.active);
  }

  setClickMenuHandler(handler) {
    this._view.setClickMenuHandler((activeItem) => {
      if (this._model.active !== activeItem) {
        this._model.active = activeItem;
        this._view.setActiveItem(activeItem);
        handler(activeItem);
      }
    });
  }

  render(position) {
    render(this._containerElement, this._view, position);
  }

  get active() {
    return this._model.active;
  }
}
