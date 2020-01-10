import FiltersView from "../views/filters";
import render from "../utils/common/render";

export default class FiltersController {
  constructor(filtersModel, cardsListModel, containerElement) {
    this._model = filtersModel;
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;

    this._model.checked = `everything`;
    this._view = new FiltersView(this._model.filters);

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  _changeFilterHandler(filterName) {
    if (this._model.checked !== filterName) {
      this._model.checked = filterName;
      this._cardsListModel.setFilter(filterName);
    }
  }

  setHandlers() {
    this._view.setChangeFilterHandler((filterTitle) => this._changeFilterHandler(filterTitle));
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }
}
