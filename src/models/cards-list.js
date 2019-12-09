import {CardModel} from "./card";

export class CardsListModel {
  constructor() {
    this.cardsList = [];
    this.editCardIndex = null;
  }

  createData(count) {
    this.cardsList = new Array(count)
      .fill(``)
      .map(() => new CardModel());
  }

  sort() {
    this.cardsList.sort((cardOne, cardTwo) => cardOne.dateFrom - cardTwo.dateFrom);
  }

  set editCard(index) {
    if (this.editCardIndex && this.editCardIndex !== index) {
      this.unEditCard(this.editCardIndex);
    }
    this.editCardIndex = index;
    this.cardsList[index].edit = true;
  }

  set unEditCard(index) {
    this.editCardIndex = null;
    this.cardsList[index].edit = false;
  }

  get cards() {
    return this.cardsList;
  }
}
