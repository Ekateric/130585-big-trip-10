import FiltersView from "../views/filters";
import render from "../utils/render";

export default class FiltersListController {
  constructor(filtersListModel, containerElement) {
    this._model = filtersListModel;
    this._model.checkActive(0);
    this._view = new FiltersView(this._model.items);
    this._containerElement = containerElement;
  }

  render() {
    render(this._containerElement, this._view);
  }
}
