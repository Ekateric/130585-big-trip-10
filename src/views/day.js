import AbstractView from "./abstract";
import castTimeFormat from "../utils/castTimeFormat";

export const createDayTemplate = (date) => {
  const {day, month, monthText, year} = date;
  const castMonth = castTimeFormat(month);
  const halfYear = String(year).slice(2);

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="${year}-${castMonth}-${day}">${monthText} ${halfYear}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class DayView extends AbstractView {
  constructor(date) {
    super();

    this._date = date;
  }

  getTemplate() {
    return createDayTemplate(this._date);
  }
}
