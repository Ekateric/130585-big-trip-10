import TypeModel from "./type";
import createTypesGroups from "../utils/common/createTypesGroups";

export default class TypesModel {
  constructor(types) {
    this.types = types;
    this.groups = createTypesGroups(this.types);
  }

  getOffersByType(type) {
    const offersItem = this.types.find((item) => item.type === type);
    const offers = offersItem ? offersItem.offers : [];

    offers.map((offer, index) => {
      offer.id = index;
      return offer;
    });

    return offers;
  }

  static parseTypes(types) {
    return new TypesModel(types.map(TypeModel.parseType));
  }
}
