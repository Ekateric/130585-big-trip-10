import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class CardController {
  constructor(cardModel, types, cities) {
    this._model = cardModel;
    this._view = new CardView(this._model);
    this._allTypes = types;
    this._allCities = cities;
    this._formView = new CardFormView(this._model, this._allTypes, this._allCities);
    this._parentElement = null;
  }

  _replaceViewToEdit() {
    replace(this._formView, this._view);
  }

  _replaceEditToView() {
    replace(this._view, this._formView);
  }

  render(renderToElement) {
    render(renderToElement, this._view);
    this._parentElement = renderToElement;
    this.setHandlers();
  }

  setHandlers() {
    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();
    });

    this._formView.setClickUpButtonHandler(() => {
      this._replaceEditToView();
    });
  }

  get model() {
    return this._model;
  }
}
