import moment from "moment";

const MAX_CITIES_INFO_COUNT = 3;

export default class InfoModel {
  constructor(cardsListModel) {
    this._cardsListModel = cardsListModel;

    this._cards = [];
    this._cities = [];
    this.title = null;
    this.datesInterval = null;
    this.sum = 0;
  }

  countInfo() {
    this._cards = this._cardsListModel.cards;

    if (this._cards.length > 0) {
      this._cities = this._createCities();
      this.title = this._calcInfoTitle();
      this.datesInterval = this._calcInfoDates();
      this.sum = this._countTripSum();

    } else {
      this._cities = [];
      this.title = null;
      this.datesInterval = null;
      this.sum = 0;
    }
  }

  _createCities() {
    const cities = [];

    this._cards.forEach((card) => {
      const city = card.destination.name;

      if (typeof city !== `undefined` && cities[cities.length - 1] !== city) {
        cities.push(city);
      }
    });

    return cities;
  }

  _calcInfoTitle() {
    const pointsLength = this._cities.length;
    let title = ``;

    if (pointsLength > MAX_CITIES_INFO_COUNT) {
      title = `${this._cities[0]} &mdash; ... &mdash; ${this._cities[pointsLength - 1]}`;

    } else {
      title = this._cities.join(` &mdash; `);
    }

    return title;
  }

  _calcInfoDates() {
    const dateFrom = this._cards[0].correctDateFrom.date;
    const dateTo = this._cards[this._cards.length - 1].correctDateTo.date;
    const dateFromMoment = moment(dateFrom, `DD/MM/YYYY`);
    const dateToMoment = moment(dateTo, `DD/MM/YYYY`);

    let dateFromText = dateFromMoment.format(`MMM DD`);
    let intervalText = ``;

    if (dateFrom === dateTo) {
      intervalText = dateFromText;

    } else {
      let dateToText = ``;

      if (dateFromMoment.year() === dateToMoment.year()) {
        if (dateFromMoment.month() === dateToMoment.month()) {
          dateToText = dateToMoment.format(`DD`);

        } else {
          dateToText = dateToMoment.format(`MMM DD`);
        }

      } else {
        dateFromText = dateFromMoment.format(`MMM DD, YYYY`);
        dateToText = dateToMoment.format(`MMM DD, YYYY`);
      }

      intervalText = `${dateFromText}&nbsp;&mdash;&nbsp;${dateToText}`;
    }

    return intervalText;
  }

  _countTripSum() {
    return this._cards.reduce((cardsAccumulator, currentCard) => {
      const offersSum = currentCard.offers.reduce((offersAccumulator, currentOffer) => {
        const realOfferCost = currentCard.allOffers.find((realOffer) => realOffer.title === currentOffer.title).price;

        return offersAccumulator + realOfferCost;
      }, 0);

      return cardsAccumulator + currentCard.price + offersSum;
    }, 0);
  }
}
