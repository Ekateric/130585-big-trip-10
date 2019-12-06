const createMenuItemTemplate = (itemName) => {
  const activeClass = itemName === `Table` ? `trip-tabs__btn--active` : ``;
  return `<a class="trip-tabs__btn ${activeClass}" href="#">${itemName}</a>`;
};

export const createMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems.map((itemName) => createMenuItemTemplate(itemName)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuItemsTemplate}
    </nav>`
  );
};
