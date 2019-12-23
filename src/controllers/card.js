import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class CardController {
  constructor(cardModel, containerElement, types, cities) {
    this._model = cardModel;
    this._containerElement = containerElement;
    this._view = new CardView(this._model);

    this._allTypes = types;
    this._allCities = cities;
    this._formView = new CardFormView(this._model, this._allTypes, this._allCities);

    this._onExitForm = this._onExitForm.bind(this);
  }

  _replaceViewToEdit() {
    replace(this._formView, this._view);
  }

  _replaceEditToView() {
    replace(this._view, this._formView);
    document.removeEventListener(`keydown`, this._onExitForm);
  }

  _onExitForm(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToView();
    }
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }

  setHandlers() {
    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, this._onExitForm);
    });

    this._formView.setClickUpButtonHandler(() => {
      this._replaceEditToView();
    });
  }

  get model() {
    return this._model;
  }
}
