import {getCorrectTime} from "../helpers";

const calcInfoTitle = (points) => {
  const pointsLength = points.length;
  let title = ``;

  if (pointsLength > 3) {
    title = `${points[0]} &mdash; ... &mdash; ${points[pointsLength - 1]}`;

  } else {
    title = points.join(` &mdash; `);
  }

  return title;
};

const calcInfoDates = (dateFrom, dateTo) => {
  const dateFromCorrect = getCorrectTime(dateFrom);
  let dateFromText = `${dateFromCorrect.monthText} ${dateFromCorrect.day}`;
  let intervalText = dateFromText;

  if (dateFrom.toString() !== dateTo.toString()) {
    const dateToCorrect = getCorrectTime(dateTo);
    let dateToText = ``;

    if (dateFromCorrect.year === dateToCorrect.year) {
      if (dateFromCorrect.monthText === dateToCorrect.monthText) {
        dateToText = `${dateToCorrect.day}`;
      } else {
        dateToText = `${dateToCorrect.monthText} ${dateToCorrect.day}`;
      }
    } else {
      dateFromText += `, ${dateFromCorrect.year}`;
      dateToText = `${dateToCorrect.monthText} ${dateToCorrect.day}, ${dateToCorrect.year}`;
    }

    intervalText = `${dateFromText}&nbsp;&mdash;&nbsp;${dateToText}`;
  }

  return intervalText;
};

const countTripSum = (cards) => {
  let tripSum = 0;

  cards.forEach((card) => {
    tripSum += card.price;

    card.offers.forEach((offer) => {
      tripSum += offer.price;
    });
  });

  return tripSum;
};

export const createInfoTemplate = (cities, cards) => {
  const infoTitle = calcInfoTitle(cities);
  const infoDates = calcInfoDates(cards[0].dateFrom, cards[cards.length - 1].dateTo);
  const tripSum = countTripSum(cards);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>
  
      <p class="trip-info__dates">${infoDates}</p>
    </div>
    
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripSum}</span>
    </p>`
  );
};
