import AbstractView from "./abstract";

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

export default class MenuView extends AbstractView {
  constructor(items) {
    super();

    this._items = items;
  }

  getTemplate() {
    return createMenuTemplate(this._items);
  }
}
