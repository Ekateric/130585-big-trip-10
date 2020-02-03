import {Filter} from "../data";
import moment from "moment";

export const getCardsByType = (cards, type) => cards.filter((card) => card.type === type);

export const getFutureCards = (cards, time) => cards.filter((card) => card.correctDateFrom.dateMoment.diff(moment(time)) > 0);

export const getPastCards = (cards, time) => cards.filter((card) => card.correctDateTo.dateMoment.diff(moment(time)) < 0);

export const getFilteredCards = (cards, filterTitle) => {
  switch (filterTitle) {
    case Filter.EVERYTHING:
      return cards;
    case Filter.FUTURE:
      return getFutureCards(cards, Date.now());
    case Filter.PAST:
      return getPastCards(cards, Date.now());
    default:
      return cards;
  }
};
