import AbstractSmartView from "./abstract-smart";

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
  const {group, types} = typeGroup;
  const typesTemplate = types
    .map((type) => createTypeTemplate(type, currentType, cardId))
    .join(`\n`);

  return (
    `<fieldset class="event__type-group" data-type-group="${group}">
      <legend class="visually-hidden">${group}</legend>

      ${typesTemplate}
    </fieldset>`
  );
};

const createOptionTemplate = (value) => `<option value="${value}"></option>`;

const createOfferTemplate = (offer, isChecked, cardId) => {
  const {id, title, price} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
      id="event-offer-${cardId}-${id}"
      type="checkbox"
      name="event-offer-${cardId}"
      ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${cardId}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersSectionTemplate = (allOffers, offers, cardId) => {
  const offersListTemplate = allOffers
    .map((offer) => {
      const isChecked = offers.findIndex((checkedOffer) => checkedOffer.title === offer.title) > -1;

      return createOfferTemplate(offer, isChecked, cardId);
    })
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

const createCardFormTemplate = (card, data) => {
  const {id, type, icon, destination, correctDateFrom, correctDateTo, price, offers, isFavorite, placeholder} = card;
  const {name, description, pictures} = destination;
  const {allTypes, allCities, allOffers} = data;

  const typesGroupsTemplate = allTypes
    .map((typeGroup) => createTypesGroupTemplate(typeGroup, type, id))
    .join(`\n`);
  const citiesOptionsTemplate = allCities
    .map((item) => createOptionTemplate(item))
    .join(`\n`);
  const offersTemplate = allOffers.length ? createOffersSectionTemplate(allOffers, offers, id) : ``;
  const destinationTemplate = description.length ? createDestinationTemplate(description, pictures) : ``;

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
            ${type} ${placeholder}
          </label>
          <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
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

export default class CardFormView extends AbstractSmartView {
  constructor(card, data, methods) {
    super();

    this._card = card;
    this._data = data;

    this._eventTypeChange = methods.eventTypeChange;
    this._destinationChange = methods.destinationChange;

    this._clickUpButtonHandler = null;
    this._submitHandler = null;
    this._changeFavoriteHandler = null;

    this._subscribeOnEvents();
  }

  _onEventTypeChange() {
    const eventTypesInputs = this.getElement()
      .querySelectorAll(`.event__type-input`);

    Array.from(eventTypesInputs).forEach((input) => {
      input.addEventListener(`change`, (event) => {
        const newType = event.target.value;
        const newTypeGroup = event.target.closest(`.event__type-group`).dataset.typeGroup;

        this._eventTypeChange(newType, newTypeGroup);
        this.rerender();
      });
    });
  }

  _onDestinationChange() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, (event) => {
        this._destinationChange(event.target.value);
        this.rerender();
      });
  }

  _subscribeOnEvents() {
    this._onEventTypeChange();
    this._onDestinationChange();
  }

  getTemplate() {
    return createCardFormTemplate(this._card, this._data);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setClickUpButtonHandler(this._clickUpButtonHandler);
    this.setSubmitFormHandler(this._submitHandler);
    this.setChangeFavoriteInputHandler(this._changeFavoriteHandler);
  }

  setClickUpButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._clickUpButtonHandler = handler;
  }

  setSubmitFormHandler(handler) {
    this.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }

  setChangeFavoriteInputHandler(handler) {
    this.getElement()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, handler);

    this._changeFavoriteHandler = handler;
  }
}
