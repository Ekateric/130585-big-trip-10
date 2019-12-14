import CardsMock from "../mock/cards";
import CardController from "../controllers/card";
import CardModel from "./card";
import {getAllCards, getCardById, getAllCities, getAllTypes} from "../services/api/index";

export default class CardsListModel {
  constructor() {
    this._mock = new CardsMock();
    this._allTypes = this.getAllTypes();
    this._allCities = this.getAllCities();
    this._cards = this._createCards(this.getAllCards());
    this._editCardId = null;
  }

  _createCards(data) {
    return data.map((card) => {
      const cardModel = new CardModel(card);
      return new CardController(cardModel, this._allTypes, this._allCities);
    });
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
    this._cards.sort((cardOne, cardTwo) => cardOne.model.dateFrom - cardTwo.model.dateFrom);
  }

  set editCardId(id) {
    if (this._editCardId && this._editCardId !== id) {
      this.unEditCard(this._editCardId);
    }
    this._editCardId = id;
    this._cards[id].model.edit = true;
  }

  set unEditCard(id) {
    this._editCardId = null;
    this._cards[id].model.edit = false;
  }

  get cardsControllers() {
    return this._cards;
  }

  get cardsModels() {
    return this._cards.map((card) => card.model);
  }
}
