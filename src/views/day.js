import AbstractView from "./abstract";

const createDayTemplate = (date) => {
  const {formatString, day, monthText, halfYear} = date;

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="${formatString}">${monthText} ${halfYear}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

const createEmptyDayTemplate = () => {
  return (
    `<li class="trip-days__item day">
      <div class="day__info"></div>

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
    if (this._date) {
      return createDayTemplate(this._date);
    } else {
      return createEmptyDayTemplate();
    }
  }
}
