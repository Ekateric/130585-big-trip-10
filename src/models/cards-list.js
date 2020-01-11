import Filters from "../data/filters";
import CardsMock from "../mock/cards";
import CardModel from "./card";
import {getAllCards, getCardById, getAllCities, getAllTypes, getOffersByType} from "../services/api/index";
import getFilteredCards from "../utils/filter/getFilteredCards";

export default class CardsListModel {
  constructor() {
    this._mock = new CardsMock();
    this._allTypes = this.getAllTypes();
    this._allCities = this.getAllCities();

    this.getDestinationInfo = this.getDestinationInfo.bind(this);

    this._cards = this._createCards(this.getAllCards());
    this._isEmpty = this._checkIsEmpty();

    this._filter = Filters.EVERYTHING;
    this._filterChangeHandlers = [];
  }

  _createCards(data) {
    return data.map((card) => new CardModel(card, this._allTypes, this.getDestinationInfo));
  }

  _checkIsEmpty() {
    return this._cards.length === 0;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getAllCards() {
    return getAllCards(this._mock);
  }

  getCardById(id) {
    return getCardById(id, this._mock);
  }

  getAllCities() {
    return getAllCities();
  }

  getAllTypes() {
    return getAllTypes();
  }

  getOffersByType(type) {
    const offers = getOffersByType(type);

    offers.map((offer, index) => {
      offer.id = index;
      return offer;
    });

    return offers;
  }

  getDestinationInfo(name) {
    return this._mock.getDestinationInfo(name);
  }

  sort() {
    this._cards.sort((cardOne, cardTwo) => cardOne.dateFrom - cardTwo.dateFrom);
  }

  updateModelById(modelId, newData) {
    const cardIndex = this._cards.findIndex((card) => card.id === modelId);
    let newCardModel = null;

    if (cardIndex > -1) {
      const oldCardModel = this._cards.find((card) => card.id === modelId);

      newCardModel = new CardModel(Object.assign({}, oldCardModel, newData), this._allTypes, this.getDestinationInfo);
      this._cards = [].concat(this._cards.slice(0, cardIndex), newCardModel, this._cards.slice(cardIndex + 1));
    }

    return newCardModel;
  }

  setFilter(filterName) {
    this._filter = filterName;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  get cards() {
    return getFilteredCards(this._cards, this._filter);
  }

  get allCards() {
    return this._cards;
  }

  get isEmpty() {
    return this._isEmpty;
  }

  get allTypes() {
    return this._allTypes;
  }

  get allCities() {
    return this._allCities;
  }

  set cards(cards) {
    this._cards = this._createCards(Array.from(cards));
  }
}
