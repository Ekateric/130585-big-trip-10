import Mode from "../data/mode";
import ButtonsText from "../data/buttons-text";
import CardModel from "../models/card";
import CardView from "../views/card";
import CardFormView from "../views/card-form";
import render from "../utils/render/render";
import replace from "../utils/render/replace";
import remove from "../utils/render/remove";
import shakeElement from "../utils/common/shakeElement";

const getCheckedOffers = (checkedOffers, allOffers) => {
  return checkedOffers.map((offer) => {
    return {
      title: offer,
      price: allOffers.find((item) => item.title === offer).price
    };
  })
    .filter((offer) => offer !== null);
};

const parseFormData = (formData, cardModel) => {
  return new CardModel({
    'type': formData.get(`event-type`),
    'destination': cardModel.getDestinationInfo(formData.get(`event-destination`)),
    'date_from': formData.get(`event-start-time`),
    'date_to': formData.get(`event-end-time`),
    'base_price': Number(formData.get(`event-price`)),
    'offers': getCheckedOffers(formData.getAll(`event-offer`), cardModel.allOffers),
    'is_favorite': !!formData.get(`event-favorite`)
  }, cardModel.allTypes, cardModel.getDestinationInfo, cardModel.getOffersByType);
};

export default class CardController {
  constructor(cardModel, options) {
    this._model = cardModel;

    this._dataChangeHandler = options.dataChangeHandler;
    this._viewChangeHandler = options.viewChangeHandler;
    this._extraInfo = {
      allTypes: options.allTypes,
      allCities: options.allCities
    };

    this._containerElement = null;
    this._position = null;
    this._formViewModel = null;
    this._view = null;
    this._formView = null;
    this._mode = Mode.DEFAULT;

    this._formExitHandler = this._formExitHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._eventOfferChangeHandler = this._eventOfferChangeHandler.bind(this);
  }

  _replaceViewToEdit() {
    this._viewChangeHandler();
    replace(this._formView, this._view);
    this._formView.applyFlatpickr();
    this._mode = Mode.EDIT;
  }

  _replaceEditToView() {
    if (this._mode === Mode.ADD) {
      this._dataChangeHandler(this, null, this._mode);

    } else {
      this._resetFormData();
      replace(this._view, this._formView);
      this._formView.destroyFlatpickr();
      this._mode = Mode.DEFAULT;
    }

    document.removeEventListener(`keydown`, this._formExitHandler);
  }

  _resetFormData() {
    this._formViewModel = Object.assign({}, this._model);
    this._formView.reset(this._formViewModel, this._extraInfo);
  }

  _formExitHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToView();
    }
  }

  _eventTypeChangeHandler(newType) {
    const newTypeGroup = this._model.getTypeGroup(newType);

    this._formViewModel.type = newType;
    this._formViewModel.typeGroup = newTypeGroup;
    this._formViewModel.placeholder = this._model.getPlaceholder(newTypeGroup);
    this._formViewModel.offers = [];
    this._formViewModel.allOffers = this._model.getOffersByType(newType);
  }

  _destinationChangeHandler(name) {
    this._formViewModel.destination = this._model.getDestinationInfo(name);
  }

  _eventOfferChangeHandler(offerTitle, offerIsChecked) {
    if (offerIsChecked) {
      const currentOffer = this._formViewModel.allOffers.find((offer) => offer.title === offerTitle);

      this._formViewModel.offers.push({
        title: offerTitle,
        price: currentOffer.price
      });

    } else {
      const currentOfferIndex = this._formViewModel.offers.findIndex((offer) => offer.title === offerTitle);

      this._formViewModel.offers = [...this._formViewModel.offers.slice(0, currentOfferIndex), ...this._formViewModel.offers.slice(currentOfferIndex + 1, this._formViewModel.offers.length)];
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToView();
    }
  }

  setHandlers() {
    this._view.setEditButtonClickHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, this._formExitHandler);
    });

    this._formView.setUpButtonClickHandler(() => {
      this._replaceEditToView();
    });

    this._formView.setFormSubmitHandler((evt) => {
      evt.preventDefault();

      const newCard = parseFormData(this._formView.getData(), this._formViewModel);

      this._dataChangeHandler(this, newCard, this._mode);
      this._formView.setButtonsText({
        save: ButtonsText.SAVE_LOADING,
      });
      this._formView.showError(false);
      this._formView.disableForm(true);
    });

    this._formView.setFavoriteInputChangeHandler(() => {
      const newCard = CardModel.clone(this._model);
      newCard.isFavorite = !newCard.isFavorite;
      this._formViewModel.isFavorite = !this._model.isFavorite;
      this._dataChangeHandler(this, newCard, this._mode, false);
    });

    this._formView.setDeleteButtonClickHandler(() => {
      this._dataChangeHandler(this, null, this._mode);
      this._formView.setButtonsText({
        deleteOnDefault: ButtonsText.DELETE_LOADING_ON_DEFAULT,
        deleteOnAdd: ButtonsText.DELETE_LOADING_ON_ADD
      });
      this._formView.showError(false);
      this._formView.disableForm(true);
    });
  }

  render(mode, containerElement, position) {
    this._containerElement = containerElement;
    this._position = position;

    const oldCardView = this._view;
    const oldCardFormView = this._formView;

    this._formViewModel = Object.assign({}, this._model);
    this._view = new CardView(this._model);
    this._formView = new CardFormView(this._formViewModel, this._extraInfo, mode, {
      eventTypeChangeHandler: this._eventTypeChangeHandler,
      destinationChangeHandler: this._destinationChangeHandler,
      eventOfferChangeHandler: this._eventOfferChangeHandler
    });

    this.setHandlers();

    switch (mode) {
      case Mode.DEFAULT:
        if (oldCardView && oldCardFormView) {
          replace(this._view, oldCardView);
          replace(this._formView, oldCardFormView);
          oldCardFormView.destroyFlatpickr();

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
        this._viewChangeHandler();
        render(this._containerElement, this._formView, this._position);
        this._formView.applyFlatpickr();
        document.addEventListener(`keydown`, this._formExitHandler);
        break;
    }

    this._mode = mode;
  }

  destroy() {
    remove(this._view);
    this._formView.destroyFlatpickr();
    remove(this._formView);
    document.removeEventListener(`keydown`, this._formExitHandler);
  }

  showError() {
    shakeElement(this._view.getElement());
    shakeElement(this._formView.getElement(), () => {
      this._formView.setButtonsText({
        deleteOnDefault: ButtonsText.DELETE_ON_DEFAULT,
        deleteOnAdd: ButtonsText.DELETE_ON_ADD,
        save: ButtonsText.SAVE
      });
      this._formView.showError(true);
    });
  }

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }
}
