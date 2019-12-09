const createTypesTemplate = (types, currentType) => {
  return types
    .map((typeItem) => {
      const isChecked = typeItem.type === currentType;
      const typeLowerCase = typeItem.type.toLowerCase();

      return (
        `<div class="event__type-item">
          <input 
          id="event-type-${typeLowerCase}-1" 
          class="event__type-input visually-hidden" 
          type="radio" name="event-type" 
          value="${typeItem.type}"
          ${isChecked ? `checked` : ``}>
          <label 
            class="event__type-label event__type-label--${typeItem.icon}" 
            for="event-type-${typeLowerCase}-1">${typeItem.type}</label>
        </div>`
      );
    }).join(`\n`);
};

const createTypesGroupsTemplate = (typesGroups, currentType) => {
  return typesGroups
    .map((typeGroup) => {
      const typesTemplate = createTypesTemplate(typeGroup.types, currentType);
      return (
        `<fieldset class="event__type-group">
          <legend class="visually-hidden">${typeGroup.name}</legend>

          ${typesTemplate}
        </fieldset>`
      );
    }).join(`\n`);
};

const createCitiesOptionsTemplate = (cities) => {
  return cities
    .map((city) => `<option value="${city}"></option>`)
    .join(`\n`);
};

const createOffersTemplate = (offers) => {
  return offers
    .map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" 
          id="event-offer-${offer.type}-1" 
          type="checkbox" 
          name="event-offer-${offer.type}" 
          checked>
          <label class="event__offer-label" for="event-offer-${offer.type}-1">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
};

const createOffersSectionTemplate = (offers) => {
  const offersListTemplate = createOffersTemplate(offers);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`
  );
};

const createPhotosListTemplate = (photos) => {
  return photos
    .map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)
    .join(`\n`);
};

const createDestinationTemplate = (description, photos) => {
  const photosListTemplate = createPhotosListTemplate(photos);
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

export const createCardFormTemplate = (card, types, cities) => {
  const {type, icon, city, correctDateFrom, correctDateTo, price, offers, description, photos, isFavorite} = card;
  const typesGroupsTemplate = createTypesGroupsTemplate(types, type);
  const citiesOptionsTemplate = createCitiesOptionsTemplate(cities);
  const offersTemplate = offers.length ? createOffersSectionTemplate(offers) : ``;
  const destinationTemplate = description.length ? createDestinationTemplate(description, photos) : ``;

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
          <div class="event__type-list">
            ${typesGroupsTemplate}
          </div>
        </div>
  
        <div class="event__field-group event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} at
          </label>
          <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesOptionsTemplate}
          </datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${correctDateFrom.string}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${correctDateTo.string}">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
  
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        
        <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite"${isFavorite ? ` checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
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
