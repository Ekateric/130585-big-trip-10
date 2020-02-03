import {Filter} from "../data";
import FiltersModel from "../models/filters";
import FiltersView from "../views/filters";
import render from "../utils/render/render";

export default class FiltersController {
  constructor(cardsListModel, containerElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;

    this._model = new FiltersModel(Filter);
    this._model.checked = Filter.EVERYTHING;
    this._view = new FiltersView(this._model.filters);

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
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

  setHandlers() {
    this._view.setFilterChangeHandler((filterTitle) => this._filterChangeHandler(filterTitle));
  }

  _filterChangeHandler(filterName) {
    if (this._model.checked !== filterName) {
      this._model.checked = filterName;
      this._cardsListModel.setFilter(filterName);
    }
  }
}
