import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class CardController {
  constructor(cardModel, containerElement, types, cities, onDataChange) {
    this._model = cardModel;
    this._containerElement = containerElement;
    this._allTypes = types;
    this._allCities = cities;
    this._onDataChange = onDataChange;

    this._view = null;
    this._formView = null;

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
    const oldCardView = this._view;
    const oldCardFormView = this._formView;

    this._view = new CardView(this._model);
    this._formView = new CardFormView(this._model, this._allTypes, this._allCities);

    this.setHandlers();

    if (oldCardView && oldCardFormView) {
      replace(this._view, oldCardView);
      replace(this._formView, oldCardFormView);

    } else {
      render(this._containerElement, this._view);
    }
  }

  setHandlers() {
    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, this._onExitForm);
    });

    this._formView.setClickUpButtonHandler(() => {
      this._replaceEditToView();
    });

    this._formView.setChangeFavoriteInput(() => {
      this._onDataChange(this, {
        isFavorite: !this._model.isFavorite
      });
    });
  }

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }
}
