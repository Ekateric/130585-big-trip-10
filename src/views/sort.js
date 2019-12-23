import AbstractView from "./abstract";

const createSortItemTemplate = (sortItem) => {
  const {id, isChecked} = sortItem;

  return (
    `<div class="trip-sort__item  trip-sort__item--${id}">
      <input 
        id="sort-${id}" 
        class="trip-sort__input visually-hidden" 
        type="radio" 
        name="trip-sort" 
        value="sort-${id}" 
        ${isChecked ? `checked` : ``}>
      <label 
        class="trip-sort__btn" 
        for="sort-${id}"
      >${id}</label>
    </div>`
  );
};

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((item) => createSortItemTemplate(item))
    .join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day">Day</span>
      ${sortItemsTemplate}
      <span class="trip-sort__item trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortView extends AbstractView {
  constructor(items) {
    super();

    this._items = items;
  }

  getTemplate() {
    return createSortTemplate(this._items);
  }
}
