import MenuItems from "./data/menu-items";
import CardsListModel from "./models/cards-list";
import MenuController from "./controllers/menu";
import FiltersController from "./controllers/filters";
import TripController from "./controllers/trip";
import StatsController from "./controllers/stats";
import RenderPosition from "./data/render-position";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const pageMainContainerElement = document.querySelector(`.page-main .page-body__container`);

const cardsListModel = new CardsListModel();
const tripController = new TripController(cardsListModel, pageMainContainerElement, tripMainElement);

const menuController = new MenuController(tripControlsElement.querySelector(`h2`));
const filtersController = new FiltersController(cardsListModel, tripControlsElement);

const statsController = new StatsController(pageMainContainerElement, cardsListModel);

menuController.render(RenderPosition.AFTEREND);
filtersController.render();
tripController.render();

menuController.setClickMenuHandler((menuItem) => {
  switch (menuItem) {
    case MenuItems.TABLE:
      statsController.hide();
      tripController.show();
      filtersController.show();
      break;
    case MenuItems.STATS:
      tripController.hide();
      filtersController.hide();
      statsController.show();
      break;
  }
});
