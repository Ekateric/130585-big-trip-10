import DaysListView from "../views/days-list";
import DayModel from "../models/day";
import DayView from "../views/day";
import CardController from "./card";
import render from "../utils/render";

export default class CardsListController {
  constructor(cardsListModel, containerElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;

    this._cardsListModel.sort();

    this._cardsModels = this._cardsListModel.cardsModels; // всегда отсортированы по дате
    this._sortedCardsModels = this._cardsModels.slice();
    this._showedCardsControllers = [];

    this._view = new DaysListView();
    this._element = this._view.getElement();

    this._allTypes = this._cardsListModel.allTypes;
    this._allCities = this._cardsListModel.allCities;
    this._days = [];
    this._tripCities = [];
    this.createDaysAndCities();

    this._onDataChange = this._onDataChange.bind(this);
  }

  _onDataChange(cardController, newData) {
    const newTaskModel = this._cardsListModel.updateModelById(cardController.model.id, newData);

    if (newTaskModel) {
      cardController.model = newTaskModel;
      cardController.render();
      this._cardsModels = this._cardsListModel.cardsModels;
    }
  }

  _renderDayItem(dayData, dayCardModels) {
    const dayView = new DayView(dayData);
    const dayEventsListElement = dayView.getElement().querySelector(`.trip-events__list`);

    dayCardModels.forEach((cardModel) => {
      const cardController = new CardController(cardModel, dayEventsListElement, this._allTypes, this._allCities, this._onDataChange);

      cardController.render();
      this._showedCardsControllers.push(cardController);
    });

    render(this._element, dayView);
  }

  _renderDays() {
    this._days.forEach((day) => {
      const dayCardModels = this._sortedCardsModels.filter((cardModel) => cardModel.dateFrom.toDateString() === day.string);

      this._renderDayItem(day, dayCardModels);
    });
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

  createDaysAndCities() {
    let days = [];
    let cities = [];

    this._cardsModels.forEach((card) => {
      const dateString = card.dateFrom.toDateString();

      if (days.find((day) => day.string === dateString) === undefined) {
        days.push(new DayModel({
          string: dateString,
          day: card.correctDateFrom.day,
          month: card.correctDateFrom.month,
          monthText: card.correctDateFrom.monthText,
          year: card.correctDateFrom.year
        }));
      }

      const city = card.city;

      if (typeof city !== `undefined` && cities[cities.length - 1] !== city) {
        cities.push(city);
      }
    });

    this._days = days;
    this._tripCities = cities;
  }

  sort(sortType) {
    this._showedCardsControllers = [];
    this.clear();

    switch (sortType) {
      case `event`:
        this._sortByEvent();
        this._renderDays();
        break;

      case `time`:
        this._sortByTime();
        this._renderDayItem(null, this._sortedCardsModels);
        break;

      case `price`:
        this._sortByPrice();
        this._renderDayItem(null, this._sortedCardsModels);
        break;
    }
  }

  clear() {
    this._element.innerHTML = ``;
  }

  render() {
    this._renderDays();
    render(this._containerElement, this._view);
  }

  get cardsModels() {
    return this._cardsModels;
  }

  get tripCities() {
    return this._tripCities;
  }
}
