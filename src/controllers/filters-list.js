import FiltersView from "../views/filters";
import render from "../services/utils/render";

export default class FiltersListController {
  constructor(filtersListModel) {
    this._model = filtersListModel;
    this._model.checkActive(0);
    this._view = new FiltersView(this._model.items);
    this._element = this._view.getElement();
  }

  render(renderToElement) {
    render(renderToElement, this._element);
  }

  get element() {
    return this._element;
  }
}
