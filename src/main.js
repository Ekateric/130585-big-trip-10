import Filters from "./data/filters";
import CardsListModel from "./models/cards-list";
import MenuModel from "./models/menu";
import MenuController from "./controllers/menu";
import FiltersModel from "./models/filters";
import FiltersController from "./controllers/filters";
import TripController from "./controllers/trip";
import StatsController from "./controllers/stats";
import RenderPosition from "./data/render-position";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const pageMainContainerElement = document.querySelector(`.page-main .page-body__container`);

const cardsListModel = new CardsListModel();
const tripController = new TripController(cardsListModel, pageMainContainerElement, tripMainElement);

const menuModel = new MenuModel();
const menuController = new MenuController(menuModel, tripControlsElement.querySelector(`h2`));

const filtersModel = new FiltersModel(Filters);
const filtersController = new FiltersController(filtersModel, cardsListModel, tripControlsElement);

const statsController = new StatsController(pageMainContainerElement);

menuController.render(RenderPosition.AFTEREND);
filtersController.render();
tripController.render();
statsController.render();
statsController.hide();

