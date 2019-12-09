const createFilterTemplate = (title, isChecked) => {
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
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter.name, filter.isActive)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
