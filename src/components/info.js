export const createInfoTemplate = (info) => {
  const {title, datesInterval, sum} = info;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
  
      <p class="trip-info__dates">${datesInterval}</p>
    </div>
    
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`
  );
};
