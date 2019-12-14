import createElement from "../services/utils/createElement";

const createOfferTemplate = (offer) => {
  const {name, price} = offer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

export const createCardTemplate = (card) => {
  const {type, icon, city, correctDateFrom, correctDateTo, price, offers, duration} = card;
  const offersTemplate = Array.from(offers)
    .map((offer) => createOfferTemplate(offer))
    .join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>
      
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${correctDateFrom.stringISO}">${correctDateFrom.time}</time>
            &mdash;
            <time class="event__end-time" datetime="${correctDateTo.stringISO}">${correctDateTo.time}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
      
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
      
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
      
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
     </li>`
  );
};

export default class CardView {
  constructor(card) {
    this._card = card;

    this._element = null;
  }

  setClickEditButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    return createCardTemplate(this._card);
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