import {SortType} from "../data";
import SortModel from "../models/sort";
import SortView from "../views/sort";
import render from "../utils/render/render";
import remove from "../utils/render/remove";

export default class SortController {
  constructor(containerElement, sortTypeChangeHandler) {
    this._containerElement = containerElement;
    this._sortTypeChangeHandler = sortTypeChangeHandler;

    this._model = new SortModel(Object.values(SortType));
    this._model.checked = SortType.EVENT;
    this._view = new SortView(this._model.items, this._model.checked);
  }

  get checked() {
    return this._model.checked;
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }

  destroy() {
    remove(this._view);
  }

  setHandlers() {
    this._view.setSortChangeHandler((sortType) => {
      if (this._model.checked !== sortType) {
        this._model.checked = sortType;
        this._sortTypeChangeHandler();
      }
    });
  }
}
