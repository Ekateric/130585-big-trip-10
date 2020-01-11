import AbstractView from "./abstract";

const createFilterTemplate = (filter) => {
  const {name, checked} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${name}"
      ${checked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters
    .map((filter) => createFilterTemplate(filter))
    .join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersView extends AbstractView {
  constructor(filters) {
    super();

    this._filters = filters;
    this._filtersElements = this.getElement().querySelectorAll(`.trip-filters__filter-input`);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setChangeFilterHandler(handler) {
    [...this._filtersElements].forEach((input) => {
      input.addEventListener(`change`, function (event) {
        handler(event.target.value);
      });
    });
  }
}
