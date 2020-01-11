import SortTypes from "../data/sort-types";
import SortView from "../views/sort";
import render from "../utils/common/render";

export default class SortController {
  constructor(sortModel, containerElement, changeSortTypeHandler) {
    this._model = sortModel;
    this._model.checked = SortTypes.EVENT;
    this._changeSortTypeHandler = changeSortTypeHandler;

    this._view = new SortView(this._model.items, this._model.checked);
    this._containerElement = containerElement;
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
}
