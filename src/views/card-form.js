import Mode from "../data/mode";
import ButtonsText from "../data/buttons-text";
import AbstractSmartView from "./abstract-smart";
import makeFirstCharUpperCase from "../utils/common/makeFirstCharUpperCase";
import flatpickr from "flatpickr";
import he from "he";

const FORM_ERROR_CLASS = `event--error`;

const isFilledInput = (value) => {
  return typeof value !== `undefined`
    && value !== null
    && value.toString().replace(/^\s+|\s+$/g, ``).length > 0;
};

const isSelectedAtList = (selectedValue, list) => {
  return list.indexOf(selectedValue) !== -1;
};

const isIntegerPositiveValue = (value) => {
  return typeof value === `number`
    && Number.isFinite(value)
    && !(value % 1)
    && value >= 0;
};

const isBlockSaveButton = (cardData, allCities) => {
  const isFilledType = isFilledInput(cardData.type);
  const isFilledDestinationName = isFilledInput(cardData.destination.name);
  const isDestinationNameAtList = isSelectedAtList(cardData.destination.name, allCities);
  const isFilledDateFrom = isFilledInput(cardData.dateFrom);
  const isFilledDateTo = isFilledInput(cardData.dateTo);
  const isFilledPrice = isFilledInput(cardData.price);
  const isIntegerPrice = isIntegerPositiveValue(cardData.price);

  return !(isFilledType
    && isFilledDestinationName
    && isDestinationNameAtList
    && isFilledDateFrom
    && isFilledDateTo
    && isFilledPrice
    && isIntegerPrice);
};

const createTypeTemplate = (type, currentType, cardId) => {
  const isChecked = type === currentType;
  const firstCharUpperCaseType = makeFirstCharUpperCase(type);

  return (
    `<div class="event__type-item">
      <input
      id="event-type-${type}-${cardId}"
      class="event__type-input visually-hidden"
      type="radio" name="event-type"
      value="${type}"
      ${isChecked ? `checked` : ``}>
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-${cardId}">${firstCharUpperCaseType}</label>
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
      name="event-offer"
      value="${title}"
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

const createPhotoTemplate = (picture) => {
  const {src, description} = picture;

  return `<img class="event__photo" src="${src}" alt="${description}">`;
};

const createDestinationTemplate = (description, pictures) => {
  const photosListTemplate = pictures
    .map((picture) => createPhotoTemplate(picture))
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

const createCardFormInnerTemplate = (card, extraInfo, mode, buttonsText) => {
  const {id, type, destination, offers, isFavorite, placeholder, allOffers} = card;
  let {dateFrom, dateTo, price} = card;
  const {description, pictures} = destination;
  let {name} = destination;
  const {allTypes, allCities} = extraInfo;

  const firstCharUpperCaseType = makeFirstCharUpperCase(type);

  name = he.encode(name.toString());
  dateFrom = dateFrom ? he.encode(dateFrom.toString()) : ``;
  dateTo = dateTo ? he.encode(dateTo.toString()) : ``;
  price = he.encode(price.toString());

  const typesGroupsTemplate = allTypes
    .map((typeGroup) => createTypesGroupTemplate(typeGroup, type, id))
    .join(`\n`);
  const citiesOptionsTemplate = allCities
    .map((item) => createOptionTemplate(item))
    .join(`\n`);
  const offersTemplate = allOffers.length ? createOffersSectionTemplate(allOffers, offers, id) : ``;
  const destinationTemplate = (description && description.length) ? createDestinationTemplate(description, pictures) : ``;
  const isShowDetailsSection = offersTemplate || destinationTemplate;
  const isDisabledSaveButton = isBlockSaveButton(card, allCities);
  const deleteButtonText = mode === Mode.DEFAULT ? buttonsText.deleteOnDefault : buttonsText.deleteOnAdd;
  const saveButtonText = buttonsText.save;

  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : `trip`}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          ${typesGroupsTemplate}
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-${id}">
          ${type ? firstCharUpperCaseType : `Destination`} ${placeholder}
        </label>
        <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}" placeholder="choose...">
        <datalist id="destination-list-${id}">
          ${citiesOptionsTemplate}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">
          From
        </label>
        <input class="event__input event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom}" placeholder="Date from">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">
          To
        </label>
        <input class="event__input event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo}" placeholder="Date to">
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn btn btn--blue" type="submit"${isDisabledSaveButton ? ` disabled` : ``}>${saveButtonText}</button>
      <button class="event__reset-btn" type="button">${deleteButtonText}</button>

      ${mode === Mode.DEFAULT ? `
        <input id="event-favorite-${id}" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite"${isFavorite ? ` checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${id}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>` : ``}

      ${isShowDetailsSection && mode === Mode.DEFAULT ? `
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ``}
    </header>
    ${isShowDetailsSection ? `
      <section class="event__details">
        ${offersTemplate}

        ${destinationTemplate}
      </section>` : ``}`
  );
};

const createCardFormTemplate = (card, extraInfo, mode, buttonsText) => {
  const cardFormInnerTemplate = createCardFormInnerTemplate(card, extraInfo, mode, buttonsText);

  if (mode === Mode.ADD) {
    return `<form class="trip-events__item event event--edit" action="#" method="post">
      ${cardFormInnerTemplate}
    </form>`;

  } else {
    return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${cardFormInnerTemplate}
      </form>
    </li>`;
  }
};

export default class CardFormView extends AbstractSmartView {
  constructor(card, extraInfo, mode, methods) {
    super();

    this._card = card;
    this._extraInfo = extraInfo;
    this._mode = mode;
    this._flatpickr = null;
    this._buttonsText = {
      deleteOnDefault: ButtonsText.DELETE_ON_DEFAULT,
      deleteOnAdd: ButtonsText.DELETE_ON_ADD,
      save: ButtonsText.SAVE
    };

    this._eventTypeChange = methods.eventTypeChange;
    this._destinationChange = methods.destinationChange;

    this._clickUpButtonHandler = null;
    this._submitHandler = null;
    this._clickDeleteButtonHandler = null;
    this._changeFavoriteHandler = null;

    this._subscribeOnEvents();
  }

  _getForm() {
    let cardForm = this.getElement();

    if (this._mode === Mode.DEFAULT) {
      cardForm = cardForm.querySelector(`form`);
    }

    return cardForm;
  }

  applyFlatpickr() {
    this.destroyFlatpickr();

    this._flatpickr = {};

    const dateStartElement = this.getElement().querySelector(`#event-start-time-${this._card.id}`);
    const dateEndElement = this.getElement().querySelector(`#event-end-time-${this._card.id}`);
    const commonOptions = {
      altInput: true,
      enableTime: true,
      minuteIncrement: 1,
      dateFormat: `Z`,
      altFormat: `d/m/y H:i`
    };

    this._flatpickr.from = flatpickr(dateStartElement,
        Object.assign({},
            commonOptions,
            {
              defaultDate: this._card.dateFrom,
              maxDate: this._card.dateTo,
              maxTime: this._card.dateTo,
              onChange: (selectedDates) => {
                this._card.dateFrom = selectedDates[0];
                this._flatpickr.to.config.minDate = selectedDates[0];
                this._flatpickr.to.config.minTime = selectedDates[0];
                this._checkSaveButton();
              }
            }
        )
    );

    this._flatpickr.to = flatpickr(dateEndElement,
        Object.assign({},
            commonOptions,
            {
              defaultDate: this._card.dateTo,
              minDate: this._card.dateFrom,
              minTime: this._card.dateFrom,
              onChange: (selectedDates) => {
                this._card.dateTo = selectedDates[0];
                this._flatpickr.from.config.maxDate = selectedDates[0];
                this._flatpickr.from.config.maxTime = selectedDates[0];
                this._checkSaveButton();
              }
            }
        )
    );
  }

  destroyFlatpickr() {
    if (this._flatpickr) {
      if (this._flatpickr.from) {
        this._flatpickr.from.destroy();
        this._flatpickr.from = null;
      }

      if (this._flatpickr.to) {
        this._flatpickr.to.destroy();
        this._flatpickr.to = null;
      }
    }
  }

  _onEventTypeChange() {
    const eventTypesInputs = this.getElement()
      .querySelectorAll(`.event__type-input`);

    [...eventTypesInputs].forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const newType = evt.target.value;

        this._eventTypeChange(newType);
        this.rerender();
      });
    });
  }

  _onDestinationChange() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._destinationChange(evt.target.value);
        this.rerender();
      });
  }

  _onPriceChange() {
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._card.price = Number(evt.target.value);
        this._checkSaveButton();
      });
  }

  _subscribeOnEvents() {
    this._onEventTypeChange();
    this._onDestinationChange();
    this._onPriceChange();
  }

  _checkSaveButton() {
    const saveButtonElement = this.getElement().querySelector(`.event__save-btn`);

    saveButtonElement.disabled = isBlockSaveButton(this._card, this._extraInfo.allCities);
  }

  getTemplate() {
    return createCardFormTemplate(this._card, this._extraInfo, this._mode, this._buttonsText);
  }

  getData() {
    const cardForm = this._getForm();

    return new FormData(cardForm);
  }

  setButtonsText(buttonsText) {
    this._buttonsText = Object.assign({}, this._buttonsText, buttonsText);
    this.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setClickUpButtonHandler(this._clickUpButtonHandler);
    this.setSubmitFormHandler(this._submitHandler);
    this.setClickDeleteButtonHandler(this._clickDeleteButtonHandler);
    this.setChangeFavoriteInputHandler(this._changeFavoriteHandler);
  }

  setClickUpButtonHandler(handler) {
    const clickUpButtonElement = this.getElement().querySelector(`.event__rollup-btn`);

    if (clickUpButtonElement) {
      clickUpButtonElement.addEventListener(`click`, handler);

      this._clickUpButtonHandler = handler;
    }
  }

  setSubmitFormHandler(handler) {
    this.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }

  setClickDeleteButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._clickDeleteButtonHandler = handler;
  }

  setChangeFavoriteInputHandler(handler) {
    const favoriteInputElement = this.getElement().querySelector(`.event__favorite-checkbox`);

    if (favoriteInputElement) {
      favoriteInputElement.addEventListener(`change`, handler);

      this._changeFavoriteHandler = handler;
    }
  }

  rerender() {
    super.rerender();

    this.applyFlatpickr();
  }

  reset(card, extraInfo) {
    this._card = card;
    this._extraInfo = extraInfo;
    this.rerender();
  }

  disableForm(isDisable) {
    const cardForm = this._getForm();
    const cardFormInputs = cardForm.querySelectorAll(`input`);
    const cardFormButtons = cardForm.querySelectorAll(`button`);

    [...cardFormInputs].forEach((input) => {
      input.disabled = isDisable;
    });

    [...cardFormButtons].forEach((button) => {
      button.disabled = isDisable;
    });
  }

  showError(isError) {
    const cardForm = this._getForm();

    if (isError) {
      cardForm.classList.add(FORM_ERROR_CLASS);
    } else {
      cardForm.classList.remove(FORM_ERROR_CLASS);
    }
  }
}
