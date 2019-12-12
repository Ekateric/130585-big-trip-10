import {MockTypes, MockCities, MockDescription, MockOffers} from "../mock/card";
import {getRandomInt, castTimeFormat, getCorrectTime} from "../helpers";

export class CardModel {
  constructor() {
    const typeGroupIndex = getRandomInt(0, MockTypes.length - 1);
    const typeIndex = getRandomInt(0, MockTypes[typeGroupIndex].types.length - 1);
    this.typeGroup = MockTypes[typeGroupIndex].group;
    this.type = MockTypes[typeGroupIndex].types[typeIndex].type;
    this.icon = MockTypes[typeGroupIndex].types[typeIndex].icon;
    this.city = MockCities[getRandomInt(0, MockCities.length - 1)];
    this.photos = this._getRandomPhotos();
    this.description = this._getRandomDescription(MockDescription);
    this.dateFrom = this._getRandomDate(new Date(), 25);
    this.dateTo = this._getRandomDate(this.dateFrom, 2);
    this.correctDateFrom = getCorrectTime(this.dateFrom);
    this.correctDateTo = getCorrectTime(this.dateTo);
    this.duration = this._countDuration();
    this.price = getRandomInt(0, 1000);
    this.offers = this._getRandomOffers(MockOffers);
    this.isFavorite = Math.random() > 0.5;
    this.isEdit = false;
  }

  _getRandomDate(fromDate, daysAfter) {
    // Получаем рандомную дату в промежутке между заданной датой fromDate
    // и заданным количеством дней после нее daysAfter
    let toDate = new Date(fromDate);

    toDate.setDate(toDate.getDate() + daysAfter);
    fromDate = fromDate.getTime();
    toDate = toDate.getTime();

    return new Date(getRandomInt(fromDate, toDate));
  }

  _getRandomPhotos() {
    return new Array(getRandomInt(0, 10))
      .fill(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  _getRandomDescription(paragraphs) {
    return new Array(getRandomInt(1, 3))
      .fill(``)
      .map(() => {
        return paragraphs[getRandomInt(0, paragraphs.length - 1)];
      }).join(`.`);
  }

  _getRandomOffers(offers) {
    return new Array(getRandomInt(0, 2))
      .fill(``)
      .map(() => {
        return offers[getRandomInt(0, offers.length - 1)];
      });
  }

  _countDuration() {
    let durationString = `00M`;
    const durationInMinutes = Math.floor((this.dateTo - this.dateFrom) / (1000 * 60));

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

  set edit(isEdit) {
    this.isEdit = isEdit;
  }
}

