import createElement from "../utils/createElement";

const createTypeTemplate = (typeItem, currentType, cardId) => {
  const {type, icon} = typeItem;
  const isChecked = type === currentType;
  const typeLowerCase = type.toLowerCase();

  return (
    `<div class="event__type-item">
      <input 
      id="event-type-${typeLowerCase}-${cardId}" 
      class="event__type-input visually-hidden" 
      type="radio" name="event-type" 
      value="${type}"
      ${isChecked ? `checked` : ``}>
      <label 
        class="event__type-label event__type-label--${icon}" 
        for="event-type-${typeLowerCase}-${cardId}">${type}</label>
    </div>`
  );
};

const createTypesGroupTemplate = (typeGroup, currentType, cardId) => {
  const {name, types} = typeGroup;
  const typesTemplate = types
    .map((type) => createTypeTemplate(type, currentType, cardId))
    .join(`\n`);

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${name}</legend>

      ${typesTemplate}
    </fieldset>`
  );
};

const createOptionTemplate = (value) => `<option value="${value}"></option>`;

const createOfferTemplate = (offer, cardId) => {
  const {type, name, price} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
      id="event-offer-${type}-${cardId}"
      type="checkbox"
      name="event-offer-${type}"
      checked>
      <label class="event__offer-label" for="event-offer-${type}-${cardId}">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersSectionTemplate = (offers, cardId) => {
  const offersListTemplate = offers
    .map((offer) => createOfferTemplate(offer, cardId))
    .join(`\n`);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`
  );
};

const createPhotoTemplate = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`;

const createDestinationTemplate = (description, photos) => {
  const photosListTemplate = photos
    .map((photo) => createPhotoTemplate(photo))
    .join(`\n`);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosListTemplate}
        </div>
      </div>
    </section>`
  );
};

const createCardFormTemplate = (card, types, cities) => {
  const {id, type, icon, city, correctDateFrom, correctDateTo, price, offers, description, photos, isFavorite} = card;
  const typesGroupsTemplate = types
    .map((typeGroup) => createTypesGroupTemplate(typeGroup, type, id))
    .join(`\n`);
  const citiesOptionsTemplate = cities
    .map((item) => createOptionTemplate(item))
    .join(`\n`);
  const offersTemplate = offers.length ? createOffersSectionTemplate(offers, id) : ``;
  const destinationTemplate = description.length ? createDestinationTemplate(description, photos) : ``;

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            ${typesGroupsTemplate}
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type} at
          </label>
          <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${citiesOptionsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${correctDateFrom.string}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${correctDateTo.string}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${id}" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite"${isFavorite ? ` checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${id}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${offersTemplate}

        ${destinationTemplate}
      </section>
    </form>`
  );
};

export default class CardFormView {
  constructor(card, types, allCities) {
    this._card = card;
    this._types = types;
    this._cities = allCities;

    this._element = null;
  }

  setClickUpButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    return createCardFormTemplate(this._card, this._types, this._cities);
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

