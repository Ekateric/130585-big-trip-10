import {createElement} from "../utils/render";

const createNoCardsTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoCardsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoCardsTemplate();
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
