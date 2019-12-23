import CardsListModel from "./models/cards-list";
import MenuModel from "./models/menu";
import MenuController from "./controllers/menu";
import FiltersListModel from "./models/filters-list";
import FiltersListController from "./controllers/filters-list";
import TripController from "./controllers/trip";
import RenderPosition from "./data/render-position";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const pageMainContainerElement = document.querySelector(`.page-main .page-body__container`);

const cardsListModel = new CardsListModel();
const tripController = new TripController(cardsListModel, pageMainContainerElement, tripMainElement);

const menuModel = new MenuModel();
const menuController = new MenuController(menuModel, tripControlsElement.querySelector(`h2`));

const filtersModel = new FiltersListModel();
const filtersController = new FiltersListController(filtersModel, tripControlsElement);

menuController.render(RenderPosition.AFTEREND);
filtersController.render();
tripController.render();

