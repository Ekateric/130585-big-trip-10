import Offers from "../../mock/const/offers";

export default (type) => {
  const offersItem = Offers.find((offerItem) => offerItem.type === type);

  return offersItem ? offersItem.offers : [];
};
