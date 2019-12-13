import createElement from "../services/utils/createElement";

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

export default class InfoView {
  constructor(info) {
    this._info = info;

    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._info);
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
