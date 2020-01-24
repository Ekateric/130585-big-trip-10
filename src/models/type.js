export default class TypeModel {
  constructor(typeItem) {
    this.type = typeItem.type;
    this.offers = typeItem.offers;
  }

  static parseType(type) {
    return new TypeModel(type);
  }
}
