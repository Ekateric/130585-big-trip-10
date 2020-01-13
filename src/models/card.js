import getCorrectTime from "../utils/common/getCorrectTime";
import castTimeFormat from "../utils/common/castTimeFormat";
import moment from "moment";

export default class CardModel {
  constructor(data, allTypes, getDestinationInfo) {
    this.id = data.id;
    this.typeGroup = data.typeGroup;
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
    this.icon = this.getIcon(this.typeGroup, this.type);
    this.placeholder = this.getPlaceholder(this.type);

    this.getDestinationInfo = getDestinationInfo;
    this.getIcon = this.getIcon.bind(this);
  }

  _countDuration() {
    return Date.parse(this.dateTo) - Date.parse(this.dateFrom);
  }

  _getDurationText(milliseconds) {
    const duration = moment.duration(milliseconds);
    let durationString = `00M`;

    const durationInMinutes = duration.asMinutes();

    if (durationInMinutes > 0) {
      durationString = `${castTimeFormat(duration.minutes())}M`;
    }

    if (durationInMinutes >= 60) {
      const durationInHours = duration.asHours();
      durationString = `${castTimeFormat(duration.hours())}H ${durationString}`;

      if (durationInHours >= 24) {
        const durationInDays = Math.floor(duration.asDays());
        durationString = `${castTimeFormat(durationInDays)}D ${durationString}`;
      }
    }

    return durationString;
  }

  getIcon(typeGroup, type) {
    const foundTypeGroup = this._allTypes.find((groupItem) => groupItem.group === typeGroup);
    const foundType = foundTypeGroup.types.find((typeItem) => typeItem.type === type);

    return foundType.icon;
  }

  getPlaceholder(type) {
    switch (type) {
      case `Taxi`:
      case `Bus`:
      case `Train`:
      case `Ship`:
      case `Transport`:
      case `Drive`:
      case `Flight`:
        return `to`;

      case `Check`:
      case `Sightseeing`:
      case `Restaurant`:
        return `in`;

      default:
        return ``;
    }
  }
}
