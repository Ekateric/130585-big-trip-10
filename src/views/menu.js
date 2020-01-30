import AbstractView from "./abstract";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createMenuItemTemplate = (item) => {
  const {name, isActive} = item;
  const activeClass = isActive ? ` ${ACTIVE_CLASS}` : ``;

  return `<a class="trip-tabs__btn${activeClass}" data-name="${name}" href="#">${name}</a>`;
};

const createMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems
    .map((item) => createMenuItemTemplate(item))
    .join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs trip-tabs">
      ${menuItemsTemplate}
    </nav>`
  );
};

export default class MenuView extends AbstractView {
  constructor(items, activeItem) {
    super();

    this._items = items;
    this._active = activeItem;
    this._itemsElements = this.getElement().querySelectorAll(`.trip-tabs__btn`);
  }

  getTemplate() {
    return createMenuTemplate(this._items);
  }

  setActiveItem(newActiveItem) {
    const oldActive = [...this._itemsElements].find((item) => item.dataset.name === this._active);
    const newActive = [...this._itemsElements].find((item) => item.dataset.name === newActiveItem);

    if (oldActive) {
      oldActive.classList.remove(ACTIVE_CLASS);
    }

    if (newActive) {
      newActive.classList.add(ACTIVE_CLASS);
      this._active = newActiveItem;
    }
  }

  setMenuClickHandler(handler) {
    [...this._itemsElements].forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.dataset.name !== this._active) {
          handler(evt.target.dataset.name);
        }
      });
    });
  }
}
