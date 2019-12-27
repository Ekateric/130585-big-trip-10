import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class CardController {
  constructor(cardModel, containerElement, options) {
    this._model = cardModel;
    this._containerElement = containerElement;

    this._onDataChange = options.onDataChange;
    this._getOffersByType = options.getOffersByType;
    this._data = {
      allTypes: options.allTypes,
      allCities: options.allCities,
      allOffers: this._getOffersByType(this._model.type)
    };

    this._viewModel = null;
    this._view = null;
    this._formView = null;

    this._onExitForm = this._onExitForm.bind(this);
    this._eventTypeChange = this._eventTypeChange.bind(this);
    this._destinationChange = this._destinationChange.bind(this);
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

  _eventTypeChange(newType, newTypeGroup) {
    this._viewModel.type = newType;
    this._viewModel.placeholder = this._model.getPlaceholder(newType);
    this._viewModel.icon = this._model.getIcon(newTypeGroup, newType);
    this._data.allOffers = this._getOffersByType(newType);
  }

  _destinationChange(name) {
    this._viewModel.destination = this._model.getDestinationInfo(name);
  }

  render() {
    const oldCardView = this._view;
    const oldCardFormView = this._formView;

    this._viewModel = Object.assign({}, this._model);
    this._view = new CardView(this._viewModel);
    this._formView = new CardFormView(this._viewModel, this._data, {
      eventTypeChange: this._eventTypeChange,
      destinationChange: this._destinationChange
    });

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
