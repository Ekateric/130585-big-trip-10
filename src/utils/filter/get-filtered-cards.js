import {Filter} from "../../data";
import getFutureCards from "./get-future-cards";
import getPastCards from "./get-past-cards";

export default (cards, filterTitle) => {
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
