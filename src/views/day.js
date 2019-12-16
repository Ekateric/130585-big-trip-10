import castTimeFormat from "../utils/castTimeFormat";
import createElement from "../utils/createElement";

const createDayTemplate = (date) => {
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

export default class DayView {
  constructor(date) {
    this._date = date;

    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

