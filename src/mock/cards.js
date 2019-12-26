import getRandomInt from "../utils/getRandomInt";
import {Types, Cities, Description, Offers} from "./const/index";

export default class CardsMock {
  constructor() {
    this._cardsCount = getRandomInt(0, 10);
    this._data = this.createCardsData(this._cardsCount);
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

  createCardData(index) {
    const typeGroupIndex = getRandomInt(0, Types.length - 1);
    const typeIndex = getRandomInt(0, Types[typeGroupIndex].types.length - 1);
    const dateFrom = this._getRandomDate(new Date(), 25);
    const dateTo = this._getRandomDate(dateFrom, 2);

    return {
      id: index,
      typeGroup: Types[typeGroupIndex].group,
      type: Types[typeGroupIndex].types[typeIndex].type,
      destination: {
        name: Cities[getRandomInt(0, Cities.length - 1)],
        description: this._getRandomDescription(Description),
        pictures: this._getRandomPhotos(),
      },
      dateFrom,
      dateTo,
      price: getRandomInt(0, 1000),
      offers: this._getRandomOffers(Offers),
      isFavorite: Math.random() > 0.5
    };
  }

  createCardsData(cardsCount) {
    return new Array(cardsCount)
      .fill(``)
      .map((el, index) => this.createCardData(index));
  }

  getCardById(id) {
    return this._data.find((el) => el.id === id);
  }

  get data() {
    return this._data;
  }
}
