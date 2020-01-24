import AbstractView from "./abstract";
import makeFirstCharUpperCase from "../utils/common/makeFirstCharUpperCase";
import he from "he";

const createOfferTemplate = (offer) => {
  const {title, price} = offer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createCardTemplate = (card) => {
  const {type, destination, correctDateFrom, correctDateTo, offers, durationText, placeholder, allOffers} = card;
  let {dateFrom, dateTo, price} = card;
  const firstCharUpperCaseType = makeFirstCharUpperCase(type);

  const offersTemplate = Array.from(offers)
    .map((offer) => {
      // потому что цены могут отличаться
      offer = allOffers.find((item) => item.title === offer.title);
      return createOfferTemplate(offer);
    })
    .join(`\n`);

  const name = he.encode(destination.name.toString());
  dateFrom = dateFrom ? he.encode(dateFrom.toString()) : ``;
  dateTo = dateTo ? he.encode(dateTo.toString()) : ``;
  price = he.encode(price.toString());

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type ? type : `trip`}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${firstCharUpperCaseType} ${placeholder} ${name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${correctDateFrom.time}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${correctDateTo.time}</time>
          </p>
          <p class="event__duration">${durationText}</p>
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

export default class CardView extends AbstractView {
  constructor(card) {
    super();

    this._card = card;
  }

  setClickEditButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }
}
