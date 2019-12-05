import {getCorrectTime} from "../helpers";

export const createDays = (cards) => {
  let days = [];

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
  });
  return days;
};

export const createDaysListTemplate = () => `<ul class="trip-days"></ul>`;
