export class InfoModel {
  constructor(cities, cards) {
    this.cities = cities;
    this.cards = cards;
    this.title = this._calcInfoTitle();
    this.datesInterval = this._calcInfoDates();

    this.countTripSum();
  }

  _calcInfoTitle() {
    const pointsLength = this.cities.length;
    let title = ``;

    if (pointsLength > 3) {
      title = `${this.cities[0]} &mdash; ... &mdash; ${this.cities[pointsLength - 1]}`;

    } else {
      title = this.cities.join(` &mdash; `);
    }

    return title;
  }

  _calcInfoDates() {
    const dateFrom = this.cards[0].dateFrom;
    const dateTo = this.cards[this.cards.length - 1].dateTo;
    const dateFromCorrect = this.cards[0].correctDateFrom;
    let dateFromText = `${dateFromCorrect.monthText} ${dateFromCorrect.day}`;
    let intervalText = dateFromText;

    if (dateFrom.toString() !== dateTo.toString()) {
      const dateToCorrect = this.cards[this.cards.length - 1].correctDateTo;
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
    this.sum = this.cards.reduce((cardsAccumulator, currentCard) => {
      const offersSum = currentCard.offers.reduce((offersAccumulator, currentOffer) => {
        return offersAccumulator + currentOffer.price;
      }, 0);

      return cardsAccumulator + currentCard.price + offersSum;
    }, 0);

    return this.sum;
  }
}
