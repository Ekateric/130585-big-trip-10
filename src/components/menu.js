const createMenuItemTemplate = (itemName, isActive) => {
  const activeClass = isActive ? `trip-tabs__btn--active` : ``;

  return `<a class="trip-tabs__btn ${activeClass}" href="#">${itemName}</a>`;
};

export const createMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems.map((item) => createMenuItemTemplate(item.name, item.isActive)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuItemsTemplate}
    </nav>`
  );
};
