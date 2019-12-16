export default class InfoModel {
  constructor(cities, cards) {
    this._cities = cities;
    this._cards = cards;
    this.title = this._calcInfoTitle();
    this.datesInterval = this._calcInfoDates();
    this.sum = 0;

    this.countTripSum();
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
    const dateFrom = this._cards[0].dateFrom;
    const dateTo = this._cards[this._cards.length - 1].dateTo;
    const dateFromCorrect = this._cards[0].correctDateFrom;
    let dateFromText = `${dateFromCorrect.monthText} ${dateFromCorrect.day}`;
    let intervalText = dateFromText;

    if (dateFrom.toString() !== dateTo.toString()) {
      const dateToCorrect = this._cards[this._cards.length - 1].correctDateTo;
      let dateToText = ``;

      if (dateFromCorrect.year === dateToCorrect.year) {
        if (dateFromCorrect.monthText === dateToCorrect.monthText) {
          dateToText = `${dateToCorrect.day}`;
        } else {
          dateToText = `${dateToCorrect.monthText} ${dateToCorrect.day}`;
        }
      } else {
        dateFromText += `, ${dateFromCorrect.year}`;
        dateToText = `${dateToCorrect.monthText} ${dateToCorrect.day}, ${dateToCorrect.year}`;
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
