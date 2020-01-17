import getCardsByType from "../utils/filter/getCardsByType";
import countSumByField from "../utils/common/countSumByField";

export default class StatsModel {
  constructor(cardsListModel) {
    this._cardsListModel = cardsListModel;

    this._cards = this._cardsListModel.allCards;
    this._typesGroups = this._cardsListModel.allTypes;

    this.moneyInfo = null;

    this.countStats();
  }

  _createMoneyInfo() {
    const types = this._typesGroups.reduce((acc, typesGroup) => acc.concat(typesGroup.types), []);
    const typesWithSums = types.map((type) => {
      const cardsByType = getCardsByType(this._cards, type);
      return [
        type,
        countSumByField(cardsByType, `price`)
      ];
    });

    typesWithSums.sort((itemOne, itemTwo) => itemTwo[1] - itemOne[1]);

    return {
      types: typesWithSums.reduce((acc, item) => item[1] > 0 ? acc.concat(item[0]) : acc, []),
      moneySums: typesWithSums.reduce((acc, item) => item[1] > 0 ? acc.concat(item[1]) : acc, [])
    };
  }

  countStats() {
    this.moneyInfo = this._createMoneyInfo();

  }
}
