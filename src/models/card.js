import getCorrectTime from "../utils/getCorrectTime";
import castTimeFormat from "../utils/castTimeFormat";

export default class CardModel {
  constructor(data) {
    this.id = data.id;
    this.typeGroup = data.typeGroup;
    this.type = data.type;
    this.icon = data.icon;
    this.city = data.city;
    this.photos = data.photos;
    this.description = data.description;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.price = data.price;
    this.offers = data.offers;
    this.isFavorite = data.isFavorite;

    this.correctDateFrom = getCorrectTime(this.dateFrom);
    this.correctDateTo = getCorrectTime(this.dateTo);
    this.duration = this._countDuration();
    this.durationText = this._getDurationText(this.duration);
  }

  _countDuration() {
    return this.dateTo - this.dateFrom;
  }

  _getDurationText() {
    let durationString = `00M`;
    const durationInMinutes = Math.floor(this.duration / (1000 * 60));

    if (durationInMinutes > 0) {
      durationString = `${castTimeFormat(durationInMinutes % 60)}M`;
    }

    if (durationInMinutes >= 60) {
      const durationInHours = Math.floor(durationInMinutes / 60);
      durationString = `${castTimeFormat(durationInHours % 24)}H ${durationString}`;

      if (durationInHours >= 24) {
        const durationInDays = Math.floor(durationInHours / 24);
        durationString = `${castTimeFormat(durationInDays)}D ${durationString}`;
      }
    }

    return durationString;
  }
}

