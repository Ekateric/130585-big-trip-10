import AbstractView from "./abstract";

const createDaysListTemplate = () => `<ul class="trip-days"></ul>`;

export default class DaysListView extends AbstractView {
  getTemplate() {
    return createDaysListTemplate();
  }
}
