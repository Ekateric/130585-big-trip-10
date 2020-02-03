import {MenuItem, RenderPosition} from "./data";
import Api from "./services/api";
import CardsListModel from "./models/cards-list";
import MenuController from "./controllers/menu";
import FiltersController from "./controllers/filters";
import TripController from "./controllers/trip";
import StatsController from "./controllers/stats";
import "flatpickr/dist/flatpickr.css";

const AUTHORIZATION = `Basic eo0w580ik28889a=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const api = new Api(END_POINT, AUTHORIZATION);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const pageMainContainerElement = document.querySelector(`.page-main .page-body__container`);

const cardsListModel = new CardsListModel(api);
const tripController = new TripController(cardsListModel, pageMainContainerElement, tripMainElement);

const menuController = new MenuController(tripControlsElement.querySelector(`h2`));
const filtersController = new FiltersController(cardsListModel, tripControlsElement);
const statsController = new StatsController(pageMainContainerElement, cardsListModel);

cardsListModel.setDataLoadHandler(() => {
  filtersController.render();
  tripController.render();
});
cardsListModel.getAllData();

menuController.render(RenderPosition.AFTEREND);
menuController.setMenuClickHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statsController.hide();
      tripController.show();
      filtersController.show();
      break;
    case MenuItem.STATS:
      tripController.hide();
      filtersController.hide();
      statsController.show();
      break;
  }
});
