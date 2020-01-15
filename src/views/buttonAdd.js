import AbstractView from "./abstract";

const createButtonAddTemplate = () => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;

export default class ButtonAddView extends AbstractView {
  getTemplate() {
    return createButtonAddTemplate();
  }

  setClickButtonHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  set disabled(isDisabled) {
    this.getElement().disabled = isDisabled;
  }
}
