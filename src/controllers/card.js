import Mode from "../data/mode";
import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/common/render";
import replace from "../utils/common/replace";
import remove from "../utils/common/remove";

export default class CardController {
  constructor(cardModel, options) {
    this._model = cardModel;

    this._onDataChange = options.onDataChange;
    this._onViewChange = options.onViewChange;
    this._data = {
      allTypes: options.allTypes,
      allCities: options.allCities
    };

    this._containerElement = null;
    this._position = null;
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
    if (this._mode === Mode.ADD) {
      this._onDataChange(this, null, this._mode);

    } else {
      this._resetFormData();
      replace(this._view, this._formView);
      this._mode = Mode.DEFAULT;
    }

    document.removeEventListener(`keydown`, this._onExitForm);
  }

  _resetFormData() {
    this._formViewModel = Object.assign({}, this._model);
    this._formView.reset(this._formViewModel, this._data);
  }

  _onExitForm(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToView();
    }
  }

  _eventTypeChange(newType) {
    const newTypeGroup = this._model.getTypeGroup(newType);

    this._formViewModel.type = newType;
    this._formViewModel.typeGroup = newTypeGroup;
    this._formViewModel.placeholder = this._model.getPlaceholder(newTypeGroup);
    this._formViewModel.allOffers = this._model.getOffersByType(newType);
  }

  _destinationChange(name) {
    this._formViewModel.destination = this._model.getDestinationInfo(name);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToView();
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

      const formData = this._formView.getData();
      this._onDataChange(this, formData, this._mode);
    });

    this._formView.setChangeFavoriteInputHandler(() => {
      this._formViewModel.isFavorite = !this._model.isFavorite;
      this._onDataChange(this, {
        isFavorite: !this._model.isFavorite
      }, this._mode, false);
    });

    this._formView.setClickDeleteButtonHandler(() => this._onDataChange(this, null, this._mode));
  }

  render(mode, containerElement, position) {
    this._containerElement = containerElement;
    this._position = position;

    const oldCardView = this._view;
    const oldCardFormView = this._formView;

    this._formViewModel = Object.assign({}, this._model);
    this._view = new CardView(this._model);
    this._formView = new CardFormView(this._formViewModel, this._data, mode, {
      eventTypeChange: this._eventTypeChange,
      destinationChange: this._destinationChange
    });

    this.setHandlers();

    switch (mode) {
      case Mode.DEFAULT:
        if (oldCardView && oldCardFormView) {
          replace(this._view, oldCardView);
          replace(this._formView, oldCardFormView);

          if (this._mode === Mode.EDIT) {
            this._replaceEditToView();
          }

        } else {
          render(this._containerElement, this._view, this._position);
        }
        break;

      case Mode.ADD:
        if (oldCardView && oldCardFormView) {
          remove(oldCardView);
          remove(oldCardFormView);
        }
        this._onViewChange();
        render(this._containerElement, this._formView, this._position);
        document.addEventListener(`keydown`, this._onExitForm);
        break;
    }

    this._mode = mode;
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
