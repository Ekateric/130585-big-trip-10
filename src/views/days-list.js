import createElement from "../services/utils/createElement";

const createDaysListTemplate = () => `<ul class="trip-days"></ul>`;

export default class DaysListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

