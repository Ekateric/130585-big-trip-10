import DaysListView from "../views/days-list";
import DayModel from "../models/day";
import DayView from "../views/day";
import render from "../services/utils/render";

export default class CardsListController {
  constructor(cardsListModel) {
    this._cardsListModel = cardsListModel;
    this.sortCards();

    this._cardsControllers = this._cardsListModel.cardsControllers;
    this._cardsModels = this._cardsListModel.cardsModels;
    this._view = new DaysListView();
    this._element = this._view.getElement();

    this._days = [];
    this._tripCities = [];
    this.createDaysAndCities();
  }

  sortCards() {
    this._cardsListModel.sort();
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

  render(renderToElement) {
    this._days.forEach((day) => {
      const dayView = new DayView(day);
      const dayElement = dayView.getElement();
      const dayEventsListElement = dayElement.querySelector(`.trip-events__list`);

      this._cardsControllers
        .filter((card) => card.model.dateFrom.toDateString() === day.string)
        .forEach((card) => card.render(dayEventsListElement));

      render(this._element, dayElement);
    });
    render(renderToElement, this._element);
  }

  set editCardId(index) {
    this._cardsListModel.editCardId = index;
  }

  get cards() {
    return this._cardsModels;
  }

  get tripCities() {
    return this._tripCities;
  }
}
