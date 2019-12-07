import {CardsListModel} from "../models/cards-list";
import {DayModel} from "../models/day";
import {createDaysListTemplate} from "../components/days-list";
import {createDayTemplate} from "../components/day";
import {createCardTemplate} from "../components/card";
import {render} from "../helpers";

export class CardsListController {
  constructor() {
    this.cardsModel = new CardsListModel();
    this.days = [];
    this.cities = [];
  }

  createCardsData(count) {
    this.cardsModel.createData(count);
  }

  sortCards() {
    this.cardsModel.sort();
  }

  createDaysAndCities() {
    let days = [];
    let cities = [];

    this.cardsModel.cards.forEach((card) => {
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

    this.days = days;
    this.cities = cities;
  }

  get cards() {
    return this.cardsModel.cards;
  }

  get listTemplate() {
    const listContentElement = document.createElement(`div`);
    render(listContentElement, createDaysListTemplate());

    const eventsDaysElement = listContentElement.querySelector(`.trip-days`);

    this.days.forEach((day) => {
      const dayContentElement = document.createElement(`div`);
      render(dayContentElement, createDayTemplate(day));

      const dayEventsListElement = dayContentElement.querySelector(`.trip-events__list`);
      this.cardsModel.cards
        .filter((card) => card.dateFrom.toDateString() === day.string)
        .forEach((card) => render(dayEventsListElement, createCardTemplate(card)));

      render(eventsDaysElement, dayContentElement.innerHTML);
    });

    return listContentElement.innerHTML;
  }
}
