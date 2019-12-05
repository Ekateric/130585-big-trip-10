import {createCardData} from "./card";

export const createCardsData = (cardsCount) => {
  return new Array(cardsCount)
    .fill(``)
    .map(createCardData);
};
