import {getCorrectTime} from "../helpers";

export const createDaysAndCities = (cards) => {
  let days = [];
  let cities = [];

  cards.forEach((card) => {
    const dateString = card.dateFrom.toDateString();

    if (typeof days.find((day) => day.string === dateString) === `undefined`) {
      const {day, month, monthText, year} = getCorrectTime(card.dateFrom);

      days.push({
        string: dateString,
        day,
        month,
        monthText,
        year
      });
    }

    const city = card.city;

    if (typeof city !== `undefined` && cities[cities.length - 1] !== city) {
      cities.push(city);
    }
  });
  return {days, cities};
};

export const createDaysListTemplate = () => `<ul class="trip-days"></ul>`;
