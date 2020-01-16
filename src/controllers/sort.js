import SortTypes from "../data/sort-types";
import SortModel from "../models/sort";
import SortView from "../views/sort";
import render from "../utils/common/render";
import remove from "../utils/common/remove";

export default class SortController {
  constructor(containerElement, changeSortTypeHandler) {
    this._containerElement = containerElement;
    this._changeSortTypeHandler = changeSortTypeHandler;

    this._model = new SortModel(Object.values(SortTypes));
    this._model.checked = SortTypes.EVENT;
    this._view = new SortView(this._model.items, this._model.checked);
  }

  setHandlers() {
    this._view.setChangeSortHandler((sortType) => {
      if (this._model.checked !== sortType) {
        this._model.checked = sortType;
        this._changeSortTypeHandler();
      }
    });
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }

  destroy() {
    remove(this._view);
  }

  get checked() {
    return this._model.checked;
  }
}
