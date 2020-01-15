import AbstractView from "./abstract";

const createMainInfoTemplate = (title, datesInterval) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${datesInterval}</p>
    </div>`
  );
};

const createInfoTemplate = (info) => {
  const {title, datesInterval, sum} = info;
  const mainInfoTemplate = (title && datesInterval) ? createMainInfoTemplate(title, datesInterval) : ``;

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${mainInfoTemplate}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
      </p>
    </section>`
  );
};

export default class InfoView extends AbstractView {
  constructor(info) {
    super();

    this._info = info;
  }

  getTemplate() {
    return createInfoTemplate(this._info);
  }
}
