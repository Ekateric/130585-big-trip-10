const createFilterTemplate = (title) => {
  const isChecked = title === `everything`;
  return (
    `<div class="trip-filters__filter">
      <input 
      id="filter-${title}" 
      class="trip-filters__filter-input  visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="${title}" 
      ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
    </div>`
  );
};

export const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
