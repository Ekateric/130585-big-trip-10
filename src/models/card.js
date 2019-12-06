import {MockTypes, MockCities, MockDescription, MockOffers} from "../mock/card";
import {getRandomInt} from "../helpers";

export class CardModel {
  constructor() {
    const typeIndex = getRandomInt(0, MockTypes.length - 1);
    this.type = MockTypes[typeIndex].type;
    this.icon = MockTypes[typeIndex].icon;
    this.city = MockCities[getRandomInt(0, MockCities.length - 1)];
    this.photos = this._getRandomPhotos();
    this.description = this._getRandomDescription(MockDescription);
    this.dateFrom = this._getRandomDate(new Date(), 25);
    this.dateTo = this._getRandomDate(this.dateFrom, 2);
    this.price = getRandomInt(0, 1000);
    this.offers = this._getRandomOffers(MockOffers);
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
}

