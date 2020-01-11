import TripView from "../views/trip";
import CardsListController from "./cards-list";
import InfoModel from "../models/info";
import InfoController from "./info";
import SortModel from "../models/sort";
import SortController from "./sort";
import NoCardsView from "../views/no-cards";
import render from "../utils/common/render";
import RenderPosition from "../data/render-position";

export default class TripController {
  constructor(cardsListModel, containerElement, tripMainElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._tripMainElement = tripMainElement;

    this._view = new TripView();
    this._element = this._view.getElement();

    this._sortModel = null;
    this._sortController = null;
    this._noCardsView = null;

    this._cardsController = new CardsListController(this._cardsListModel, this._element);
    this._infoModel = new InfoModel(this._cardsController.tripCities, this._cardsController.cardsModels);
    this._infoController = new InfoController(this._infoModel, this._tripMainElement);

     this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._cardsListModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderInfo() {
    this._infoController.render(RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    this._sortModel = new SortModel();
    this._sortController = new SortController(this._sortModel, this._element, this._onSortTypeChange);
    this._sortController.render();
  }

  _renderCardsList() {
    this._cardsController.render();
  }

  _renderNoCards() {
    this._noCardsView = new NoCardsView();
    render(this._element, this._noCardsView);
  }

  _onSortTypeChange() {
    if (this._sortModel) {
      this._cardsController.clear();
      this._cardsController.sort(this._sortModel.checked);
    }
  }

  _onFilterChange() {
    this._cardsController.clear();
    this._cardsController.updateCardsData();
  }

  render() {
    this._renderInfo();

    if (this._cardsListModel.isEmpty) {
      this._renderNoCards();

    } else {
      this._renderSort();
      this._renderCardsList();
    }

    render(this._containerElement, this._view);
  }
}
