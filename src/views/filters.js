import createElement from "../services/utils/createElement";

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

const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters
    .map((filter) => createFilterTemplate(filter.name, filter.isActive))
    .join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersView {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
