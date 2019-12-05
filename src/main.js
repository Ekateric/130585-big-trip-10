import {createInfoTemplate} from "./components/info";
import {createMenuTemplate} from "./components/menu";
import {createFiltersTemplate} from "./components/filters";
import {createCardsData} from "./mock/cards";
import {createDays, createDaysListTemplate} from "./components/days-list";
import {createDayTemplate} from "./components/day";
import {createCardTemplate} from "./components/card";
import {createCardFormTemplate} from "./components/card-form";
import {getRandomInt} from "./helpers";

const CARDS_COUNT = getRandomInt(1, 10);

const cards = createCardsData(CARDS_COUNT);
cards.sort((cardOne, cardTwo) => cardOne.dateFrom - cardTwo.dateFrom);
const days = createDays(cards);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const headerInfoElement = siteHeaderElement.querySelector(`.trip-info`);
render(headerInfoElement, createInfoTemplate(), `afterbegin`);

const headerControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
render(headerControlsElement.querySelector(`h2`), createMenuTemplate(), `afterend`);
render(headerControlsElement, createFiltersTemplate());

const eventsElement = document.querySelector(`.trip-events`);
render(eventsElement, createCardFormTemplate());
render(eventsElement, createDaysListTemplate());

const eventsDaysElement = eventsElement.querySelector(`.trip-days`);

days.forEach((day) => {
  const dayContentElement = document.createElement(`div`);
  render(dayContentElement, createDayTemplate(day));

  const dayEventsListElement = dayContentElement.querySelector(`.trip-events__list`);
  cards
    .filter((card) => card.dateFrom.toDateString() === day.string)
    .forEach((card) => render(dayEventsListElement, createCardTemplate(card)));

  render(eventsDaysElement, dayContentElement.innerHTML);
});

