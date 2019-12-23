import SortView from "../views/sort";
import render from "../utils/render";

export default class SortController {
  constructor(sortModel, containerElement) {
    this._model = sortModel;
    this._model.checked = `event`;

    this._view = new SortView(this._model.items);
    this._containerElement = containerElement;
  }

  render() {
    render(this._containerElement, this._view);
  }
}
