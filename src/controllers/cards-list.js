import {SortType, RenderPosition, Mode} from "../data";
import DaysListView from "../views/days-list";
import DayView from "../views/day";
import CardController from "./card";
import render from "../utils/render/render";
import remove from "../utils/render/remove";
import moment from "moment";

export default class CardsListController {
  constructor(cardsListModel, containerElement, handlers) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._handlers = handlers;

    this._cardsModels = []; // всегда отсортированы по дате
    this._sortedCardsModels = [];
    this._days = [];
    this._sortType = SortType.EVENT;
    this._showedCardsControllers = [];
    this._creatingCard = null;

    this._view = new DaysListView();
    this._element = null;

    this._cardControllerOptions = null;
  }

  sort(sortType) {
    this._sortType = sortType;

    switch (sortType) {
      case SortType.EVENT:
        this._sortByEvent();
        break;

      case SortType.TIME:
        this._sortByTime();
        break;

      case SortType.PRICE:
        this._sortByPrice();
        break;
    }
  }

  clear() {
    this._showedCardsControllers = [];
    this._element.innerHTML = ``;
  }

  updateCards() {
    this.clear();
    this._updateCardsData();
    this.sort(this._sortType);
    this.renderDays();
  }

  createCard(containerElement = this._element, position = RenderPosition.BEFOREBEGIN) {
    if (!this._creatingCard) {
      const emptyCardModel = this._cardsListModel.createEmptyCardModel();

      this._creatingCard = new CardController(emptyCardModel, this._cardControllerOptions);
      this._creatingCard.render(Mode.ADD, containerElement, position);
      this._showedCardsControllers = [].concat(this._creatingCard, this._showedCardsControllers);
    }
  }

  renderDays() {
    if (this._sortType === SortType.EVENT) {
      this._days.forEach((day) => {
        const dayCardModels = this._sortedCardsModels.filter((cardModel) => cardModel.correctDateFrom.date === day.string);

        this._renderDayItem(day, dayCardModels);
      });

    } else {
      this._renderDayItem(null, this._sortedCardsModels);
    }
  }

  render() {
    this._element = this._view.getElement();
    this._updateCardsData();
    this._sortedCardsModels = this._cardsModels.slice();

    this.renderDays();

    render(this._containerElement, this._view);
  }

  destroy() {
    remove(this._view);
  }

  init() {
    this._cardControllerOptions = this._getCardControllerOptions();
  }

  _renderDayItem(dayData, dayCardModels) {
    const dayView = new DayView(dayData);
    const dayEventsListElement = dayView.getElement().querySelector(`.trip-events__list`);

    dayCardModels.forEach((cardModel) => {
      const cardController = new CardController(cardModel, this._cardControllerOptions);

      cardController.render(Mode.DEFAULT, dayEventsListElement);
      this._showedCardsControllers.push(cardController);
    });

    render(this._element, dayView);
  }

  _sortByEvent() {
    this._sortedCardsModels = this._cardsModels.slice();
  }

  _sortByTime() {
    this._sortedCardsModels = this._cardsModels
      .slice()
      .sort((cardOne, cardTwo) => cardTwo.duration - cardOne.duration);
  }

  _sortByPrice() {
    this._sortedCardsModels = this._cardsModels
      .slice()
      .sort((cardOne, cardTwo) => cardTwo.price - cardOne.price);
  }

  _updateCardsData() {
    this._cardsModels = this._cardsListModel.filteredCards;
    this._days = this._cardsListModel.days;
  }

  _getCardControllerOptions() {
    return {
      allTypes: this._cardsListModel.allTypes,
      allCities: this._cardsListModel.allCities,
      dataChangeHandler: this._dataChangeHandler.bind(this),
      viewChangeHandler: this._viewChangeHandler.bind(this)
    };
  }

  _dataChangeHandler(cardController, newCard, mode = Mode.EDIT, withRender = true) {
    if (mode === Mode.ADD) {
      this._creatingCard = null;

      if (newCard === null) {
        cardController.destroy();
        this._handlers.cardDeleteHandler();
        this._showedCardsControllers = this._showedCardsControllers.slice(1);

      } else {
        this._cardsListModel.addModel(newCard)
          .then(() => {
            cardController.destroy();

            if (this._cardsModels.length) {
              this.updateCards();
            }

            this._handlers.cardAddHandler();
          })
          .catch(() => {
            cardController.showError();
          });
      }

    } else if (newCard === null) {
      this._cardsListModel.deleteModelById(cardController.model.id)
        .then(() => {
          cardController.destroy();
          this.updateCards();
          this._handlers.cardDeleteHandler();
        })
        .catch(() => {
          cardController.showError();
        });

    } else {
      this._cardsListModel.updateModelById(cardController.model.id, newCard)
        .then((newCardModel) => {
          if (newCardModel) {
            const isRenderAllList = (cardController.model.price !== newCardModel.price && this._sortType === SortType.PRICE)
              || (moment(cardController.model.dateFrom).diff(moment(newCardModel.dateFrom)))
              || (moment(cardController.model.dateTo).diff(moment(newCardModel.dateTo)) && this._sortType === SortType.TIME);

            cardController.model = newCardModel;

            if (isRenderAllList) {
              this.updateCards();

            } else {
              if (withRender) {
                cardController.render(Mode.DEFAULT);
              }

              this._updateCardsData();
            }

            this._handlers.cardUpdateHandler();
          }
        })
        .catch(() => {
          cardController.showError();
        });
    }
  }

  _viewChangeHandler() {
    this._showedCardsControllers.forEach((card) => card.setDefaultView());
  }
}
