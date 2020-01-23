import Filters from "../data/filters";
import EmptyCard from "../data/empty-card";
import CardsMock from "../mock/cards";
import CardModel from "./card";
import TypesModel from "./types";
import {getCardById, getAllCities} from "../services/api/index";
import getFilteredCards from "../utils/filter/getFilteredCards";

export default class CardsListModel {
  constructor(api) {
    this._api = api;
    this._typesModel = null;
    this._typesGroups = [];
    this._mock = new CardsMock();
    this._allCities = this.getAllCities();

    this.getDestinationInfo = this.getDestinationInfo.bind(this);
    this.getOffersByType = this.getOffersByType.bind(this);

    this._cards = [];
    this._filter = Filters.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._dataLoadHandlers = [];
  }

  _createCards(cards) {
    return cards.map((card) => new CardModel(card, this._typesGroups, this.getDestinationInfo, this.getOffersByType));
  }

  _checkIsEmpty() {
    return this._cards.length === 0;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getAllData() {
    this._api.getAllData()
      .then(([cards, types]) => {
        this.types = types;
        this.cards = cards;

        this._callHandlers(this._dataLoadHandlers);
      });
  }

  getCardById(id) {
    return getCardById(id, this._mock);
  }

  getAllCities() {
    return getAllCities();
  }

  getOffersByType(type) {
    return this._typesModel.getOffersByType(type);
  }

  getDestinationInfo(name) {
    return this._mock.getDestinationInfo(name);
  }

  sort() {
    this._cards.sort((cardOne, cardTwo) => Date.parse(cardOne.dateFrom) - Date.parse(cardTwo.dateFrom));
  }

  updateModelById(modelId, newCardData) {
    const cardIndex = this._cards.findIndex((card) => card.id === modelId);
    let newCardModel = null;

    if (cardIndex > -1) {
      const oldCardModel = this._cards.find((card) => card.id === modelId);

      newCardModel = new CardModel(Object.assign({}, oldCardModel, newCardData), this._typesGroups, this.getDestinationInfo, this.getOffersByType);
      newCardModel.destination = this.getDestinationInfo(newCardModel.destination.name);
      this._cards = [].concat(this._cards.slice(0, cardIndex), newCardModel, this._cards.slice(cardIndex + 1));
    }

    return newCardModel;
  }

  deleteModelById(modelId) {
    const cardIndex = this._cards.findIndex((card) => card.id === modelId);
    let isDeleted = false;

    if (cardIndex > -1) {
      this._cards = [].concat(this._cards.slice(0, cardIndex), this._cards.slice(cardIndex + 1));
      this._callHandlers(this._dataChangeHandlers);

      isDeleted = true;
    }

    return isDeleted;
  }

  createEmptyCardModel() {
    return new CardModel(EmptyCard, this._typesGroups, this.getDestinationInfo, this.getOffersByType);
  }

  addModel(cardData) {
    const newCardModel = new CardModel(Object.assign({}, cardData), this._typesGroups, this.getDestinationInfo, this.getOffersByType);

    newCardModel.destination = this.getDestinationInfo(newCardModel.destination.name);
    this._cards = [].concat(newCardModel, this._cards);
    this.sort();
    this._callHandlers(this._dataChangeHandlers);

    return newCardModel;
  }

  setFilter(filterName) {
    this._filter = filterName;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setDataLoadHandler(handler) {
    this._dataLoadHandlers.push(handler);
  }

  get cards() {
    return getFilteredCards(this._cards, this._filter);
  }

  get allCards() {
    return this._cards;
  }

  get isEmpty() {
    return this._checkIsEmpty();
  }

  get allTypes() {
    return this._typesGroups;
  }

  get allCities() {
    return this._allCities;
  }

  set cards(cards) {
    this._cards = this._createCards(Array.from(cards));
    this._callHandlers(this._dataChangeHandlers);
    this.sort();
  }

  set types(types) {
    this._typesModel = TypesModel.parseTypes(types);
    this._typesGroups = this._typesModel.groups;
  }
}
