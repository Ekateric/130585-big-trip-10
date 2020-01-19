import getCorrectTime from "../utils/common/getCorrectTime";
import getTypeGroup from "../utils/common/getTypeGroup";
import getDurationText from "../utils/common/getDurationText";

export default class CardModel {
  constructor(data, allTypes, getDestinationInfo) {
    this.id = typeof data.id !== `undefined` ? data.id : Math.random().toString().slice(2);
    this.type = data.type;
    this.destination = data.destination;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.price = data.price;
    this.offers = data.offers;
    this.isFavorite = data.isFavorite;
    this._allTypes = allTypes;

    this.correctDateFrom = getCorrectTime(this.dateFrom);
    this.correctDateTo = getCorrectTime(this.dateTo);
    this.duration = this._countDuration();
    this.durationText = this._getDurationText(this.duration);
    this.typeGroup = this.getTypeGroup(this.type);
    this.placeholder = this.getPlaceholder(this.typeGroup);

    this.getDestinationInfo = getDestinationInfo;
  }

  _countDuration() {
    return Date.parse(this.dateTo) - Date.parse(this.dateFrom);
  }

  _getDurationText(milliseconds) {
    return getDurationText(milliseconds);
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
}
