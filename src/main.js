import CardsListModel from "./models/cards-list";
import CardsListController from "./controllers/cards-list";
import InfoModel from "./models/info";
import InfoController from "./controllers/info";
import MenuModel from "./models/menu";
import MenuController from "./controllers/menu";
import FiltersListModel from "./models/filters-list";
import FiltersListController from "./controllers/filters-list";
import render from "./services/utils/render";
import RenderPosition from "./services/const/render-position";

const cardsListModel = new CardsListModel();
const cardsController = new CardsListController(cardsListModel);

const infoModel = new InfoModel(cardsController.tripCities, cardsController.cards);
const infoController = new InfoController(infoModel);

const menuModel = new MenuModel();
const menuController = new MenuController(menuModel);

const filtersModel = new FiltersListModel();
const filtersController = new FiltersListController(filtersModel);

const tripMainElement = document.querySelector(`.trip-main`);
infoController.render(tripMainElement, RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
menuController.render(tripControlsElement.querySelector(`h2`), RenderPosition.AFTEREND);
filtersController.render(tripControlsElement);

const eventsElement = document.querySelector(`.trip-events`);
render(eventsElement, cardsController.listTemplate);

