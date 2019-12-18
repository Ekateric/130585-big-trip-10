import CardsListModel from "./models/cards-list";
import CardsListController from "./controllers/cards-list";
import InfoModel from "./models/info";
import InfoController from "./controllers/info";
import MenuModel from "./models/menu";
import MenuController from "./controllers/menu";
import FiltersListModel from "./models/filters-list";
import FiltersListController from "./controllers/filters-list";
import RenderPosition from "./data/render-position";

const eventsElement = document.querySelector(`.trip-events`);
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const cardsListModel = new CardsListModel();
const cardsController = new CardsListController(cardsListModel, eventsElement);

const infoModel = new InfoModel(cardsController.tripCities, cardsController.cards);
const infoController = new InfoController(infoModel, tripMainElement);

const menuModel = new MenuModel();
const menuController = new MenuController(menuModel, tripControlsElement.querySelector(`h2`));

const filtersModel = new FiltersListModel();
const filtersController = new FiltersListController(filtersModel, tripControlsElement);

infoController.render(RenderPosition.AFTERBEGIN);
menuController.render(RenderPosition.AFTEREND);
filtersController.render();
cardsController.render();

