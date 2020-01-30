import AbstractView from "./abstract";

const createButtonAddTemplate = () => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;

export default class ButtonAddView extends AbstractView {
  set disabled(isDisabled) {
    this.getElement().disabled = isDisabled;
  }

  getTemplate() {
    return createButtonAddTemplate();
  }

  setButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
