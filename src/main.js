import {CardsListModel} from "./models/cards-list";
import {CardsListController} from "./controllers/cards-list";
import {InfoController} from "./controllers/info";
import {MenuController} from "./controllers/menu";
import {FiltersListController} from "./controllers/filters-list";
import render from "./services/utils/render";

const cardsListModel = new CardsListModel();
const cardsController = new CardsListController(cardsListModel);

cardsController.sortCards();
cardsController.createDaysAndCities();
cardsController.editCardId = 0;

const infoController = new InfoController(cardsController.tripCities, cardsController.cards);
const menuController = new MenuController();
menuController.createMenuData();

const filtersController = new FiltersListController();
filtersController.createFiltersData();

const siteHeaderElement = document.querySelector(`.page-header`);
const headerInfoElement = siteHeaderElement.querySelector(`.trip-info`);
render(headerInfoElement, infoController.infoTemplate, `afterbegin`);

const headerControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
render(headerControlsElement.querySelector(`h2`), menuController.listTemplate, `afterend`);
render(headerControlsElement, filtersController.listTemplate);

const eventsElement = document.querySelector(`.trip-events`);
render(eventsElement, cardsController.listTemplate);

