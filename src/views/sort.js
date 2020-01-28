import AbstractView from "./abstract";

const createSortItemTemplate = (sortItem) => {
  const {id, checked} = sortItem;

  return (
    `<div class="trip-sort__item  trip-sort__item--${id}">
      <input
        id="sort-${id}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="${id}"
        ${checked ? `checked` : ``}>
      <label
        class="trip-sort__btn"
        for="sort-${id}"
      >${id}</label>
    </div>`
  );
};

const createSortTemplate = (sortItems, checkedId) => {
  const sortItemsTemplate = sortItems
    .map((item) => createSortItemTemplate(item))
    .join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day">${checkedId === `event` ? `Day` : ``}</span>
      ${sortItemsTemplate}
      <span class="trip-sort__item trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortView extends AbstractView {
  constructor(items, checkedId) {
    super();

    this._items = items;
    this._checkedId = checkedId;
    this._inputsElements = this.getElement().querySelectorAll(`.trip-sort__input`);
  }

  getTemplate() {
    return createSortTemplate(this._items, this._checkedId);
  }

  setChangeSortHandler(handler) {
    [...this._inputsElements].forEach((input) => {
      input.addEventListener(`change`, (evt) => handler(evt.target.value));
    });
  }
}
