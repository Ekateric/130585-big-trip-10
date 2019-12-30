import moment from "moment";

export default class InfoModel {
  constructor(cities, cards) {
    this._cities = cities;
    this._cards = cards;
    this.title = null;
    this.datesInterval = null;
    this.sum = 0;

    if (this._cards.length > 0) {
      this.title = this._calcInfoTitle();
      this.datesInterval = this._calcInfoDates();
      this.countTripSum();
    }
  }

  _calcInfoTitle() {
    const pointsLength = this._cities.length;
    let title = ``;

    if (pointsLength > 3) {
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

  countTripSum() {
    this.sum = this._cards.reduce((cardsAccumulator, currentCard) => {
      const offersSum = currentCard.offers.reduce((offersAccumulator, currentOffer) => {
        return offersAccumulator + currentOffer.price;
      }, 0);

      return cardsAccumulator + currentCard.price + offersSum;
    }, 0);

    return this.sum;
  }
}
