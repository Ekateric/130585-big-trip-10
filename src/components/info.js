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

export const createInfoTemplate = (days, cities) => {
  const infoTitle = calcInfoTitle(cities);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>
  
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`
  );
};
