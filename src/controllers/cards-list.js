import SortTypes from "../data/sort-types";
import RenderPosition from "../data/render-position";
import Mode from "../data/mode";
import DaysListView from "../views/days-list";
import DayModel from "../models/day";
import DayView from "../views/day";
import CardController from "./card";
import render from "../utils/common/render";
import remove from "../utils/common/remove";

export default class CardsListController {
  constructor(cardsListModel, containerElement, onDeleteCard, onAddCard) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;
    this._onDeleteCard = onDeleteCard;
    this._onAddCard = onAddCard;

    this._cardsListModel.sort();

    this._cardsModels = this._cardsListModel.cards; // всегда отсортированы по дате
    this._sortedCardsModels = this._cardsModels.slice();
    this._sortType = SortTypes.EVENT;
    this._showedCardsControllers = [];
    this._creatingCard = null;

    this._view = new DaysListView();
    this._element = this._view.getElement();

    this._days = this._createDays();
    this._tripCities = this._createCities();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._getOffersByType = this._cardsListModel.getOffersByType;

    this._cardControllerOptions = {
      allTypes: this._cardsListModel.allTypes,
      allCities: this._cardsListModel.allCities,
      onDataChange: this._onDataChange,
      onViewChange: this._onViewChange,
      getOffersByType: this._getOffersByType
    };
  }

  _onDataChange(cardController, newData, mode = Mode.EDIT) {
    if (mode === Mode.ADD) {
      this._creatingCard = null;

      if (newData === null) {
        cardController.destroy();
        this._onDeleteCard();

      } else {
        this._onAddCard();
        this._cardsListModel.addModel(newData);

        cardController.destroy();
        this.updateCards();
      }

    } else if (newData === null) {
      const isDeleted = this._cardsListModel.deleteModelById(cardController.model.id);

      if (isDeleted) {
        this.updateCards();
        this._onDeleteCard();
      }

    } else {
      const newCardModel = this._cardsListModel.updateModelById(cardController.model.id, newData);

      if (newCardModel) {
        cardController.model = newCardModel;
        cardController.render(Mode.DEFAULT);
        this._cardsModels = this._cardsListModel.cards;
      }
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

  _createDays() {
    let days = [];

    this._cardsModels.forEach((card) => {
      const dateString = card.correctDateFrom.date;

      if (days.find((day) => day.string === dateString) === undefined) {
        days.push(new DayModel(dateString));
      }
    });

    return days;
  }

  _createCities() {
    let cities = [];

    this._cardsModels.forEach((card) => {
      const city = card.destination.name;

      if (typeof city !== `undefined` && cities[cities.length - 1] !== city) {
        cities.push(city);
      }
    });

    return cities;
  }

  _updateCardsData() {
    this._cardsModels = this._cardsListModel.cards;
    this._days = this._createDays();
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
    this.renderDays();
    render(this._containerElement, this._view);
  }

  destroy() {
    remove(this._view);
  }

  get cardsModels() {
    return this._cardsModels;
  }

  get tripCities() {
    return this._tripCities;
  }
}
