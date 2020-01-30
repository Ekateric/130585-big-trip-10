import RenderPosition from "../data/render-position";
import TripView from "../views/trip";
import CardsListController from "./cards-list";
import InfoController from "./info";
import ButtonAddView from "../views/buttonAdd";
import SortController from "./sort";
import NoCardsView from "../views/no-cards";
import render from "../utils/render/render";
import remove from "../utils/render/remove";

export default class TripController {
  constructor(cardsListModel, containerElement, tripMainElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._tripMainElement = tripMainElement;

    this._view = new TripView();
    this._element = this._view.getElement();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._cardsControllerHandlers = {
      cardDeleteHandler: this._cardDeleteHandler.bind(this),
      cardAddHandler: this._cardAddHandler.bind(this),
      cardUpdateHandler: this._cardUpdateHandler.bind(this)
    };

    this._sortController = null;
    this._noCardsView = null;
    this._cardsController = new CardsListController(this._cardsListModel, this._element, this._cardsControllerHandlers);
    this._infoController = new InfoController(this._cardsListModel, this._tripMainElement);
    this._buttonAddView = new ButtonAddView();

    this._cardsListModel.setFilterChangeHandler(this._filterChangeHandler);
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

  hide() {
    this._view.hide();
    this._setButtonAddDisabled(true);
  }

  show() {
    this._view.show();
    this._setButtonAddDisabled(false);
  }

  setHandlers() {
    this._buttonAddView.setButtonClickHandler(() => {
      this._setButtonAddDisabled(true);

      if (this._cardsListModel.isEmpty) {
        this._cardsController.createCard(this._element, RenderPosition.BEFOREEND);
        this._removeNoCards();

      } else {
        this._cardsController.createCard();
      }
    });
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

  _setButtonAddDisabled(isDisabled) {
    this._buttonAddView.disabled = isDisabled;
  }

  _renderSort() {
    this._sortController = new SortController(this._element, this._sortTypeChangeHandler);
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

  _sortTypeChangeHandler() {
    if (this._sortController) {
      this._cardsController.clear();
      this._cardsController.sort(this._sortController.checked);
      this._cardsController.renderDays();
    }
  }

  _filterChangeHandler() {
    this._cardsController.updateCards();
  }

  _cardDeleteHandler() {
    this._updateInfo();
    this._setButtonAddDisabled(false);

    if (this._cardsListModel.isEmpty) {
      this._removeSort();
      this._removeCardsList();
      this._renderNoCards();
    }
  }

  _cardAddHandler() {
    this._updateInfo();
    this._setButtonAddDisabled(false);

    if (this._cardsListModel.cards.length === 1) {
      this._removeNoCards();
      this._renderSort();
      this._renderCardsList();
    }
  }

  _cardUpdateHandler() {
    this._updateInfo();
  }
}
