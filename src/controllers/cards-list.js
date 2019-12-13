import DaysListView from "../views/days-list";
import DayModel from "../models/day";
import DayView from "../views/day";
import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../services/utils/render";

export default class CardsListController {
  constructor(cardsListModel) {
    this._cardsListModel = cardsListModel;
    this._days = [];
    this._tripCities = [];
    this._types = this._cardsListModel.getAllTypes();
    this._allCities = this._cardsListModel.getAllCities();
  }

  sortCards() {
    this._cardsListModel.sort();
  }

  createDaysAndCities() {
    let days = [];
    let cities = [];

    this._cardsListModel.cards.forEach((card) => {
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

  set editCardId(index) {
    this._cardsListModel.editCardId = index;
  }

  get cards() {
    return this._cardsListModel.cards;
  }

  get tripCities() {
    return this._tripCities;
  }

  get listTemplate() {
    const listContentElement = document.createElement(`div`);
    render(listContentElement, (new DaysListView()).getElement());

    const eventsDaysElement = listContentElement.querySelector(`.trip-days`);

    this._days.forEach((day) => {
      const dayContentElement = document.createElement(`div`);
      render(dayContentElement, (new DayView(day)).getElement());

      const dayEventsListElement = dayContentElement.querySelector(`.trip-events__list`);
      this._cardsListModel.cards
        .filter((card) => card.dateFrom.toDateString() === day.string)
        .forEach((card) => {
          if (card.isEdit) {
            render(dayEventsListElement, (new CardFormView(card, this._types, this._allCities)).getElement());
          } else {
            render(dayEventsListElement, (new CardView(card)).getElement());
          }
        });

      render(eventsDaysElement, dayContentElement.firstElementChild);
    });

    return listContentElement.firstElementChild;
  }
}
