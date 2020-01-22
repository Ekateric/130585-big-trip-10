import getCorrectTime from "../utils/common/getCorrectTime";
import getTypeGroup from "../utils/common/getTypeGroup";
import getDurationText from "../utils/common/getDurationText";

export default class CardModel {
  constructor(card, allTypes, getDestinationInfo) {
    this.id = typeof card[`id`] !== `undefined` ? card[`id`] : Math.random().toString().slice(2);
    this.type = card[`type`];
    this.destination = {
      name: card[`destination`][`name`],
      description: card[`destination`][`description`],
      pictures: card[`destination`][`pictures`]
    };
    this.dateFrom = new Date(card[`date_from`]);
    this.dateTo = new Date(card[`date_to`]);
    this.price = card[`base_price`];
    this.offers = card[`offers`];
    this.isFavorite = Boolean(card[`is_favorite`]);

    this._allTypes = allTypes;
    this.getDestinationInfo = getDestinationInfo;

    this.correctDateFrom = getCorrectTime(this.dateFrom);
    this.correctDateTo = getCorrectTime(this.dateTo);
    this.duration = this._countDuration();
    this.durationText = this._getDurationText(this.duration);
    this.typeGroup = this.getTypeGroup(this.type);
    this.placeholder = this.getPlaceholder(this.typeGroup);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': {
        'name': this.destination.name,
        'description': this.destination.description,
        'pictures': this.destination.pictures
      },
      'date_from': this.dateFrom.toISOString(),
      'date_to': this.dateTo.toISOString(),
      'base_price': this.price,
      'offers': this.offers,
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
    return Date.parse(this.dateTo) - Date.parse(this.dateFrom);
  }

  static parseCard(card) {
    return new CardModel(card);
  }
}
