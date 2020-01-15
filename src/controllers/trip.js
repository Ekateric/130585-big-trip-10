import SortTypes from "../data/sort-types";
import RenderPosition from "../data/render-position";
import TripView from "../views/trip";
import CardsListController from "./cards-list";
import InfoController from "./info";
import ButtonAddView from "../views/buttonAdd";
import SortModel from "../models/sort";
import SortController from "./sort";
import NoCardsView from "../views/no-cards";
import render from "../utils/common/render";
import remove from "../utils/common/remove";

export default class TripController {
  constructor(cardsListModel, containerElement, tripMainElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._tripMainElement = tripMainElement;

    this._view = new TripView();
    this._element = this._view.getElement();

    this._sortController = null;
    this._noCardsView = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._cardsControllerHandlers = {
      onDeleteCard: this._onDeleteCard.bind(this),
      onAddCard: this._onAddCard.bind(this),
      onUpdateCard: this._onUpdateCard.bind(this)
    };

    this._cardsController = new CardsListController(this._cardsListModel, this._element, this._cardsControllerHandlers);
    this._infoController = new InfoController(this._cardsListModel, this._tripMainElement);
    this._buttonAddView = new ButtonAddView();

    this._cardsListModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderInfo() {
    this._infoController.render(RenderPosition.AFTERBEGIN);
  }

  _updateInfo() {
    this._infoController.update();
  }

  _renderButtonAdd() {
    render(this._tripMainElement, this._buttonAddView);
  }

  _renderSort() {
    this._sortController = new SortController(this._element, this._onSortTypeChange);
    this._sortController.render();
  }

  _removeSort() {
    this._sortController.destroy();
    this._sortController = null;
  }

  _renderCardsList() {
    this._cardsController.render();
  }

  _removeCardsList() {
    this._cardsController.destroy();
  }

  _renderNoCards() {
    this._noCardsView = new NoCardsView();
    render(this._element, this._noCardsView);
  }

  _removeNoCards() {
    remove(this._noCardsView);
  }

  _onSortTypeChange() {
    if (this._sortController) {
      this._cardsController.clear();
      this._cardsController.sort(this._sortController.checked);
      this._cardsController.renderDays();
    }
  }

  _onFilterChange() {
    this._cardsController.updateCards();
  }

  _onDeleteCard() {
    this._updateInfo();

    if (this._cardsListModel.isEmpty) {
      this._removeSort();
      this._removeCardsList();
      this._renderNoCards();
    }
  }

  _onAddCard() {
    this._updateInfo();

    if (this._cardsListModel.allCards.length === 1) {
      this._removeNoCards();
      this._renderSort();
      this._renderCardsList();
    }
  }

  _onUpdateCard() {
    this._updateInfo();
  }

  setHandlers() {
    this._buttonAddView.setClickButtonHandler(() => {
      if (this._cardsListModel.isEmpty) {
        this._cardsController.createCard(this._element, RenderPosition.BEFOREEND);
        this._removeNoCards();

      } else {
        this._cardsController.createCard();
      }
    });
  }

  render() {
    this._renderInfo();
    this._renderButtonAdd();

    if (this._cardsListModel.isEmpty) {
      this._renderNoCards();

    } else {
      this._renderSort();
      this._renderCardsList();
    }

    this.setHandlers();

    render(this._containerElement, this._view);
  }
}
