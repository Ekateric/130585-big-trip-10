import getCardsByType from "../utils/filter/getCardsByType";
import countSumByField from "../utils/common/countSumByField";

const prepareStatsData = (statsData) => {
  statsData.sort((itemOne, itemTwo) => itemTwo[1] - itemOne[1]);

  return {
    labels: statsData.reduce((acc, item) => item[1] > 0 ? acc.concat(item[0]) : acc, []),
    data: statsData.reduce((acc, item) => item[1] > 0 ? acc.concat(item[1]) : acc, [])
  };
};

export default class StatsModel {
  constructor(cardsListModel) {
    this._cardsListModel = cardsListModel;

    this._cards = this._cardsListModel.allCards;
    this._typesGroups = this._cardsListModel.allTypes;

    this.moneyInfo = null;
    this.transportInfo = null;

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

    return prepareStatsData(typesWithSums);
  }

  _createTransportInfo() {
    const types = this._typesGroups.find((typeGroup) => typeGroup.group === `transfer`).types;
    const typesWithCounts = types.map((type) => {
      const cardsByTypeLength = getCardsByType(this._cards, type).length;
      return [
        type,
        cardsByTypeLength
      ];
    });

    return prepareStatsData(typesWithCounts);
  }

  countStats() {
    this.moneyInfo = this._createMoneyInfo();
    this.transportInfo = this._createTransportInfo();
  }
}
