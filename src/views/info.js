import AbstractView from "./abstract";

export const createInfoTemplate = (info) => {
  const {title, datesInterval, sum} = info;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
    
        <p class="trip-info__dates">${datesInterval}</p>
      </div>
    
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
