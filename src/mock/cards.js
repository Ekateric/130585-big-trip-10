import {CardModel} from "../models/card";

export const createCardsData = (cardsCount) => {
  return new Array(cardsCount)
    .fill(``)
    .map(() => new CardModel());
};
