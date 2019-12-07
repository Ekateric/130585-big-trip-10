import {createInfoTemplate} from "./components/info";
import {createMenuData} from "./mock/menu";
import {createMenuTemplate} from "./components/menu";
import {createFilterData} from "./mock/filters";
import {createFiltersTemplate} from "./components/filters";
import {CardsListController} from "./controllers/cards-list";
import {createDaysListTemplate} from "./components/days-list";
import {createCardFormTemplate} from "./components/card-form";
import {getRandomInt, render} from "./helpers";

const CARDS_COUNT = getRandomInt(1, 10);

const menuItems = createMenuData();
const filters = createFilterData();
const cardsController = new CardsListController();

cardsController.createCardsData(CARDS_COUNT);
cardsController.sortCards();
cardsController.createDaysAndCities();

const siteHeaderElement = document.querySelector(`.page-header`);
const headerInfoElement = siteHeaderElement.querySelector(`.trip-info`);
//render(headerInfoElement, createInfoTemplate(cities, cards), `afterbegin`);

const headerControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
render(headerControlsElement.querySelector(`h2`), createMenuTemplate(menuItems), `afterend`);
render(headerControlsElement, createFiltersTemplate(filters));

const eventsElement = document.querySelector(`.trip-events`);
render(eventsElement, createCardFormTemplate());
render(eventsElement, createDaysListTemplate());

const eventsDaysElement = eventsElement.querySelector(`.trip-days`);
render(eventsDaysElement, cardsController.listTemplate);

