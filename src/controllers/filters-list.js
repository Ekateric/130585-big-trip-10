import FiltersView from "../views/filters";
import render from "../utils/render";

export default class FiltersListController {
  constructor(filtersListModel) {
    this._model = filtersListModel;
    this._model.checkActive(0);
    this._view = new FiltersView(this._model.items);
  }

  render(renderToElement) {
    render(renderToElement, this._view);
  }
}
