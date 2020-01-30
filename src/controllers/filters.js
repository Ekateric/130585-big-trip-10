import Filters from "../data/filters";
import FiltersModel from "../models/filters";
import FiltersView from "../views/filters";
import render from "../utils/render/render";

export default class FiltersController {
  constructor(cardsListModel, containerElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;

    this._model = new FiltersModel(Filters);
    this._model.checked = Filters.EVERYTHING;
    this._view = new FiltersView(this._model.filters);

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  _filterChangeHandler(filterName) {
    if (this._model.checked !== filterName) {
      this._model.checked = filterName;
      this._cardsListModel.setFilter(filterName);
    }
  }

  setHandlers() {
    this._view.setFilterChangeHandler((filterTitle) => this._filterChangeHandler(filterTitle));
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }

  hide() {
    this._view.hide();
  }

  show() {
    this._view.show();
  }
}
