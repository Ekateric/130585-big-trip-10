import CardsMock from "../mock/cards";
import CardModel from "./card";
import {getAllCards, getCardById, getAllCities, getAllTypes} from "../services/api/index";

export default class CardsListModel {
  constructor() {
    this._mock = new CardsMock();
    this._allTypes = this.getAllTypes();
    this._allCities = this.getAllCities();
    this._cards = this._createCards(this.getAllCards());
    this._isEmpty = this._checkIsEmpty();
  }

  _createCards(data) {
    return data.map((card) => new CardModel(card));
  }

  _checkIsEmpty() {
    return this._cards.length === 0;
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

  sort() {
    this._cards.sort((cardOne, cardTwo) => cardOne.dateFrom - cardTwo.dateFrom);
  }

  updateModelById(modelId, newData) {
    const cardIndex = this._cards.findIndex((card) => card.id === modelId);
    let newCardModel = null;

    if (cardIndex > -1) {
      const oldCardModel = this._cards.find((card) => card.id === modelId);

      newCardModel = new CardModel(Object.assign({}, oldCardModel, newData));
      this._cards = [].concat(this._cards.slice(0, cardIndex), newCardModel, this._cards.slice(cardIndex + 1));
    }

    return newCardModel;
  }

  get cardsModels() {
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
}
