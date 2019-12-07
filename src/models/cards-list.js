import {CardModel} from "./card";

export class CardsListModel {
  constructor() {
    this.cardsList = [];
  }

  createData(count) {
    this.cardsList = new Array(count)
      .fill(``)
      .map(() => new CardModel());
  }

  sort() {
    this.cardsList.sort((cardOne, cardTwo) => cardOne.dateFrom - cardTwo.dateFrom);
  }

  get cards() {
    return this.cardsList;
  }
}
