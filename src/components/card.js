import {castTimeFormat, getCorrectTime} from "../helpers";

const countDuration = (dateFrom, dateTo) => {
  let durationString = `00M`;
  const durationInMinutes = Math.floor((dateTo - dateFrom) / (1000 * 60));

  if (durationInMinutes > 0) {
    durationString = `${castTimeFormat(durationInMinutes % 60)}M`;
  }

  if (durationInMinutes >= 60) {
    const durationInHours = Math.floor(durationInMinutes / 60);
    durationString = `${castTimeFormat(durationInHours % 24)}H ${durationString}`;

    if (durationInHours >= 24) {
      const durationInDays = Math.floor(durationInHours / 24);
      durationString = `${castTimeFormat(durationInDays)}D ${durationString}`;
    }
  }

  return durationString;
};

const createOffersTemplate = (offers) => {
  return Array.from(offers)
    .map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
      );
    }).join(`\n`);
};

export const createCardTemplate = (card) => {
  const {type, icon, city, dateFrom, dateTo, price, offers} = card;
  const correctDateFrom = getCorrectTime(dateFrom);
  const correctDateTo = getCorrectTime(dateTo);
  const duration = countDuration(dateFrom, dateTo);
  const offersTemplate = createOffersTemplate(offers);

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
