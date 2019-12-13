import CardModel from "./card";
import CardsMock from "../mock/cards";
import {getAllCards, getCardById, getAllCities, getAllTypes} from "../services/api/index";

export default class CardsListModel {
  constructor() {
    this._mock = new CardsMock();
    this._cards = this._createCards(this.getAllCards());
    this._editCardId = null;
  }

  _createCards(data) {
    // return data.map((card) => new CardController(new CardModel(card)));
    return data.map((card) => new CardModel(card));
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

  set editCardId(id) {
    if (this._editCardId && this._editCardId !== id) {
      this.unEditCard(this._editCardId);
    }
    this._editCardId = id;
    this._cards[id].edit = true;
  }

  set unEditCard(id) {
    this._editCardId = null;
    this._cards[id].edit = false;
  }

  get cards() {
    return this._cards;
  }
}
