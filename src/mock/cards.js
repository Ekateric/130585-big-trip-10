import getRandomInt from "../utils/common/getRandomInt";
import {Types, Cities, Description, Offers} from "./const/index";

export default class CardsMock {
  constructor() {
    this._cardsCount = getRandomInt(0, 10);
    this._data = this.createCardsData(this._cardsCount);
  }

  _getRandomDate(currentDate, daysBefore, daysAfter) {
    // Получаем рандомную дату в промежутке между заданным количеством дней до daysBefore
    // заданной даты currentDate и заданным количеством дней после нее daysAfter
    let fromDate = new Date(currentDate);
    let toDate = new Date(currentDate);

    fromDate.setDate(fromDate.getDate() + daysBefore);
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

  _getRandomOffers(offers, type) {
    const typeOffers = offers.find((offersItem) => offersItem.type === type);
    let randomOffers = [];

    if (typeof typeOffers !== `undefined` && typeOffers.offers.length) {
      randomOffers = new Array(getRandomInt(0, 2))
        .fill(``)
        .map(() => {
          return typeOffers.offers[getRandomInt(0, typeOffers.offers.length - 1)];
        });
    }

    return randomOffers;
  }

  getDestinationInfo(name) {
    return {
      name,
      description: this._getRandomDescription(Description),
      pictures: this._getRandomPhotos(),
    };
  }

  createCardData(index) {
    const typeGroupIndex = getRandomInt(0, Types.length - 1);
    const typeIndex = getRandomInt(0, Types[typeGroupIndex].types.length - 1);
    const typeGroup = Types[typeGroupIndex].group;
    const type = Types[typeGroupIndex].types[typeIndex].type;
    const dateFrom = this._getRandomDate(new Date(), -10, 10);
    const dateTo = this._getRandomDate(dateFrom, 0, 5);
    const city = Cities[getRandomInt(0, Cities.length - 1)];

    return {
      id: index,
      typeGroup,
      type,
      destination: this.getDestinationInfo(city),
      dateFrom,
      dateTo,
      price: getRandomInt(0, 1000),
      offers: this._getRandomOffers(Offers, type),
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
