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

export const createInfoTemplate = (cities, dateFrom, dateTo) => {
  const infoTitle = calcInfoTitle(cities);
  const infoDates = calcInfoDates(dateFrom, dateTo);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>
  
      <p class="trip-info__dates">${infoDates}</p>
    </div>`
  );
};
