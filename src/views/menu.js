import createElement from "../utils/createElement";

const createMenuItemTemplate = (item) => {
  const {name, isActive} = item;
  const activeClass = isActive ? `trip-tabs__btn--active` : ``;

  return `<a class="trip-tabs__btn ${activeClass}" href="#">${name}</a>`;
};

const createMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems
    .map((item) => createMenuItemTemplate(item))
    .join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuItemsTemplate}
    </nav>`
  );
};

export default class MenuView {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._items);
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
