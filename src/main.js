import {createInfoTemplate} from "./components/info";
import {createMenuTemplate} from "./components/menu";
import {createFiltersTemplate} from "./components/filters";
import {createCardData} from "./mock/card";
import {createDaysListTemplate} from "./components/days-list";
import {createDayTemplate} from "./components/day";
import {createCardTemplate} from "./components/card";
import {createCardFormTemplate} from "./components/card-form";

const DAYS_COUNT = 3;
const CARDS_COUNT = 3;

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

for (let daysCounter = 0; daysCounter < DAYS_COUNT; daysCounter++) {
  const dayContentElement = document.createElement(`div`);
  render(dayContentElement, createDayTemplate());

  const dayEventsListElement = dayContentElement.querySelector(`.trip-events__list`);
  for (let eventsCounter = 0; eventsCounter < CARDS_COUNT; eventsCounter++) {
    render(dayEventsListElement, createCardTemplate(createCardData()));
  }
  render(eventsDaysElement, dayContentElement.innerHTML);
}


