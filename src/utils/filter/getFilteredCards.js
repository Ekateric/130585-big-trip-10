import Filters from "../../data/filters";
import getFutureCards from "./getFutureCards";
import getPastCards from "./getPastCards";

export default (cards, filterTitle) => {
  switch (filterTitle) {
    case Filters.EVERYTHING:
      return cards;
    case Filters.FUTURE:
      return getFutureCards(cards, Date.now());
    case Filters.PAST:
      return getPastCards(cards, Date.now());
    default:
      return cards;
  }
};
