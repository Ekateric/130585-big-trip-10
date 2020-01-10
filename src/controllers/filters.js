import FiltersView from "../views/filters";
import render from "../utils/render";

export default class FiltersController {
  constructor(filtersModel, containerElement) {
    this._model = filtersModel;
    this._containerElement = containerElement;

    this._model.checked = `everything`;
    this._view = new FiltersView(this._model.filters);
  }

  render() {
    render(this._containerElement, this._view);
  }
}
