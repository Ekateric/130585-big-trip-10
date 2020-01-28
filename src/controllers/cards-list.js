import SortTypes from "../data/sort-types";
import RenderPosition from "../data/render-position";
import Mode from "../data/mode";
import DaysListView from "../views/days-list";
import DayView from "../views/day";
import CardController from "./card";
import render from "../utils/common/render";
import remove from "../utils/common/remove";

export default class CardsListController {
  constructor(cardsListModel, containerElement, handlers) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._handlers = handlers;

    this._cardsModels = []; // всегда отсортированы по дате
    this._sortedCardsModels = [];
    this._days = [];
    this._sortType = SortTypes.EVENT;
    this._showedCardsControllers = [];
    this._creatingCard = null;

    this._view = new DaysListView();
    this._element = null;

    this._cardControllerOptions = null;
  }

  _onDataChange(cardController, newCard, mode = Mode.EDIT, withRender = true) {
    if (mode === Mode.ADD) {
      this._creatingCard = null;

      if (newCard === null) {
        cardController.destroy();
        this._handlers.onDeleteCard();
        this._showedCardsControllers = this._showedCardsControllers.slice(1);

      } else {
        this._cardsListModel.addModel(newCard)
          .then(() => {
            cardController.destroy();
            this.updateCards();
            this._handlers.onAddCard();
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
          this._handlers.onDeleteCard();
        })
        .catch(() => {
          cardController.showError();
        });

    } else {
      this._cardsListModel.updateModelById(cardController.model.id, newCard)
        .then((newCardModel) => {
          if (newCardModel) {
            cardController.model = newCardModel;

            if (withRender) {
              cardController.render(Mode.DEFAULT);
            }

            this._updateCardsData();
            this._handlers.onUpdateCard();
          }
        })
        .catch(() => {
          cardController.showError();
        });
    }
  }

  _onViewChange() {
    this._showedCardsControllers.forEach((card) => card.setDefaultView());
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
      onDataChange: this._onDataChange.bind(this),
      onViewChange: this._onViewChange.bind(this)
    };
  }

  sort(sortType) {
    this._sortType = sortType;

    switch (sortType) {
      case SortTypes.EVENT:
        this._sortByEvent();
        break;

      case SortTypes.TIME:
        this._sortByTime();
        break;

      case SortTypes.PRICE:
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
    if (this._sortType === SortTypes.EVENT) {
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
    this._cardControllerOptions = this._getCardControllerOptions();
    this._updateCardsData();
    this._sortedCardsModels = this._cardsModels.slice();

    this.renderDays();

    render(this._containerElement, this._view);
  }

  destroy() {
    remove(this._view);
  }
}
