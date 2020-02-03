import Filters from "../data/filters";
import EmptyCard from "../data/empty-card";
import CardModel from "./card";
import TypesModel from "./types";
import DestinationsModel from "./destinations";
import DayModel from "./day";
import getFilteredCards from "../utils/filter/getFilteredCards";
import moment from "moment";

export default class CardsListModel {
  constructor(api) {
    this._api = api;

    this._typesModel = null;
    this._typesGroups = [];
    this._destinationsModel = null;
    this._allCities = [];

    this.getDestinationInfo = null;
    this.getOffersByType = null;

    this._cards = [];
    this._filteredCards = [];
    this._filter = Filters.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._dataLoadHandlers = [];
  }

  get filteredCards() {
    this._filteredCards = getFilteredCards(this._cards, this._filter);

    return this._filteredCards;
  }

  get cards() {
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

  get days() {
    return this._createDays();
  }

  set cards(cards) {
    this._cards = this._createCards(Array.from(cards));
    this._filteredCards = this._cards;
    this._callHandlers(this._dataChangeHandlers);
    this.sort();
  }

  set types(types) {
    this._typesModel = TypesModel.parseTypes(types);
    this._typesGroups = this._typesModel.groups;
    this.getOffersByType = this._typesModel.getOffersByType;
  }

  set destinations(destinations) {
    this._destinationsModel = DestinationsModel.parseDestinations(destinations);
    this._allCities = this._destinationsModel.cities;
    this.getDestinationInfo = this._destinationsModel.getDestinationInfo;
  }

  getAllData() {
    this._api.getAllData()
      .then(([cards, types, destinations]) => {
        this.types = types;
        this.destinations = destinations;
        this.cards = cards;

        this._callHandlers(this._dataLoadHandlers);
      });
  }

  getOffersByType(type) {
    return this._typesModel.getOffersByType(type);
  }

  getDestinationInfo(name) {
    return this._destinationsModel.getDestinationInfo(name);
  }

  setFilter(filterName) {
    this._filter = filterName;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataLoadHandler(handler) {
    this._dataLoadHandlers.push(handler);
  }

  sort() {
    this._cards.sort((cardOne, cardTwo) => Date.parse(cardOne.dateFrom) - Date.parse(cardTwo.dateFrom));
  }

  updateModelById(modelId, sendCardModel) {
    return this._api.updateCard(modelId, sendCardModel)
      .then((newCardData) => {
        let newCardModel = null;
        const cardIndex = this._cards.findIndex((card) => card.id === modelId);

        if (cardIndex > -1) {
          // потому что данные с сервера могут прийти обновлённые
          newCardModel = new CardModel(newCardData, this._typesGroups, this.getDestinationInfo, this.getOffersByType);
          this._cards = [].concat(this._cards.slice(0, cardIndex), newCardModel, this._cards.slice(cardIndex + 1));
          this.sort();
        }

        return newCardModel;
      });
  }

  deleteModelById(id) {
    return this._api.deleteCard(id)
      .then(() => {
        const deletedCardIndex = this._cards.findIndex((card) => card.id === id);

        if (deletedCardIndex > -1) {
          this._cards = [].concat(this._cards.slice(0, deletedCardIndex), this._cards.slice(deletedCardIndex + 1));
          this._callHandlers(this._dataChangeHandlers);
        }
      });
  }

  createEmptyCardModel() {
    return new CardModel(EmptyCard, this._typesGroups, this.getDestinationInfo, this.getOffersByType);
  }

  addModel(sendCardModel) {
    return this._api.addCard(sendCardModel)
      .then((newCardData) => {
        const newCardModel = new CardModel(newCardData, this._typesGroups, this.getDestinationInfo, this.getOffersByType);

        this._cards = [].concat(newCardModel, this._cards);
        this.sort();
        this._callHandlers(this._dataChangeHandlers);
      });
  }

  _createCards(cards) {
    return cards.map((card) => new CardModel(card, this._typesGroups, this.getDestinationInfo, this.getOffersByType));
  }

  _checkIsEmpty() {
    return this._cards.length === 0;
  }

  _createDays() {
    let days = [];
    let counter = 1;

    this._filteredCards.forEach((card) => {
      const currentDay = card.correctDateFrom.date;

      if (days.find((day) => day.string === currentDay) === undefined) {
        if (days.length) {
          const previousDay = days[days.length - 1].string;
          const dayMoment = moment(currentDay, `DD/MM/YYYY`);
          const previousDayMoment = moment(previousDay, `DD/MM/YYYY`);
          const daysBetween = dayMoment.diff(previousDayMoment, `days`);

          counter += daysBetween;
        }
        days.push(new DayModel(currentDay, counter));
      }
    });

    return days;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
