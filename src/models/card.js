import {getCorrectTime, getDurationText} from "../utils/common";
import {getTypeGroup} from "../utils/types";

export default class CardModel {
  constructor(card, allTypes, getDestinationInfo, getOffersByType) {
    this.id = typeof card[`id`] !== `undefined` ? card[`id`] : Math.random().toString().slice(2);
    this.type = card[`type`];
    this.destination = {
      name: card[`destination`][`name`],
      description: card[`destination`][`description`],
      pictures: card[`destination`][`pictures`]
    };
    this.dateFrom = card[`date_from`] ? new Date(card[`date_from`]) : ``;
    this.dateTo = card[`date_to`] ? new Date(card[`date_to`]) : ``;
    this.price = card[`base_price`];
    this.offers = card[`offers`];
    this.isFavorite = Boolean(card[`is_favorite`]);

    this._allTypes = allTypes;
    this.getDestinationInfo = getDestinationInfo;
    this.getOffersByType = getOffersByType;

    this.correctDateFrom = getCorrectTime(this.dateFrom);
    this.correctDateTo = getCorrectTime(this.dateTo);
    this.duration = this._countDuration();
    this.durationText = this._getDurationText(this.duration);
    this.typeGroup = this.getTypeGroup(this.type);
    this.placeholder = this.getPlaceholder(this.typeGroup);
    this.allOffers = this.getOffersByType(this.type);
  }

  get allTypes() {
    return this._allTypes;
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': {
        'name': this.destination.name,
        'description': this.destination.description,
        'pictures': [...this.destination.pictures]
      },
      'date_from': this.dateFrom instanceof Date ? this.dateFrom.toISOString() : this.dateFrom,
      'date_to': this.dateTo instanceof Date ? this.dateTo.toISOString() : this.dateTo,
      'base_price': this.price,
      'offers': [...this.offers],
      'is_favorite': this.isFavorite
    };
  }

  getTypeGroup(type) {
    return getTypeGroup(type);
  }

  getPlaceholder(typeGroup) {
    switch (typeGroup) {
      case `transfer`:
        return `to`;
      case `activity`:
        return `in`;
      default:
        return ``;
    }
  }

  _getDurationText(milliseconds) {
    return getDurationText(milliseconds);
  }

  _countDuration() {
    return this.correctDateTo.dateMoment.diff(this.correctDateFrom.dateMoment);
  }

  static clone(card) {
    return new CardModel(card.toRAW(), card.allTypes, card.getDestinationInfo, card.getOffersByType);
  }
}
