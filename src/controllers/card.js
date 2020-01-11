import Mode from "../data/mode";
import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/common/render";
import replace from "../utils/common/replace";
import remove from "../utils/common/remove";

export default class CardController {
  constructor(cardModel, containerElement, options) {
    this._model = cardModel;
    this._containerElement = containerElement;

    this._onDataChange = options.onDataChange;
    this._onViewChange = options.onViewChange;
    this._getOffersByType = options.getOffersByType;
    this._data = {
      allTypes: options.allTypes,
      allCities: options.allCities,
      allOffers: this._getOffersByType(this._model.type)
    };

    this._formViewModel = null;
    this._view = null;
    this._formView = null;
    this._mode = Mode.DEFAULT;

    this._onExitForm = this._onExitForm.bind(this);
    this._eventTypeChange = this._eventTypeChange.bind(this);
    this._destinationChange = this._destinationChange.bind(this);
  }

  _replaceViewToEdit() {
    this._onViewChange();
    replace(this._formView, this._view);
    this._mode = Mode.EDIT;
  }

  _replaceEditToView() {
    this._resetFormData();
    replace(this._view, this._formView);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onExitForm);
  }

  _resetFormData() {
    this._formViewModel = Object.assign({}, this._model);
    this._data.allOffers = this._getOffersByType(this._model.type);
    this._formView.reset(this._formViewModel, this._data);
  }

  _onExitForm(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToView();
    }
  }

  _eventTypeChange(newType, newTypeGroup) {
    this._formViewModel.type = newType;
    this._formViewModel.placeholder = this._model.getPlaceholder(newType);
    this._formViewModel.icon = this._model.getIcon(newTypeGroup, newType);
    this._data.allOffers = this._getOffersByType(newType);
  }

  _destinationChange(name) {
    this._formViewModel.destination = this._model.getDestinationInfo(name);
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToView();
    }
  }

  render() {
    const oldCardView = this._view;
    const oldCardFormView = this._formView;

    this._formViewModel = Object.assign({}, this._model);
    this._view = new CardView(this._model);
    this._formView = new CardFormView(this._formViewModel, this._data, {
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

    this._formView.setSubmitFormHandler((event) => {
      event.preventDefault();
      this._replaceEditToView();
    });

    this._formView.setChangeFavoriteInputHandler(() => {
      this._onDataChange(this, {
        isFavorite: !this._model.isFavorite
      });
    });

    this._formView.setClickDeleteButtonHandler(() => this._onDataChange(this, null));
  }

  destroy() {
    remove(this._view);
    remove(this._formView);
    document.removeEventListener(`keydown`, this._onExitForm);
  }

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }
}
