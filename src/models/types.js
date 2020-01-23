import TypeModel from "./type";
import createTypesGroups from "../utils/common/createTypesGroups";

export default class TypesModel {
  constructor(types) {
    this._types = types;
    this._groups = createTypesGroups(this._types);

    this.getOffersByType = this.getOffersByType.bind(this);
  }

  get types() {
    return this._types;
  }

  get groups() {
    return this._groups;
  }

  getOffersByType(type) {
    const offersItem = this._types.find((item) => item.type === type);
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
