import {CardsListController} from "./controllers/cards-list";
import {InfoController} from "./controllers/info";
import {MenuController} from "./controllers/menu";
import {FiltersListController} from "./controllers/filters-list";
import {createCardFormTemplate} from "./components/card-form";
import {getRandomInt, render} from "./helpers";

const CARDS_COUNT = getRandomInt(1, 10);
const cardsController = new CardsListController();

cardsController.createCardsData(CARDS_COUNT);
cardsController.sortCards();
cardsController.createDaysAndCities();

const infoController = new InfoController(cardsController.cities, cardsController.cards);
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
render(eventsElement, createCardFormTemplate());
render(eventsElement, cardsController.listTemplate);

