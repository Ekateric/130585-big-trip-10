import {Filters} from "../mock/filters";

export default class FiltersListModel {
  constructor() {
    this._items = this._createItems();
  }

  _createItems() {
    return Filters.map((filterName) => {
      return {
        name: filterName,
        isActive: false
      };
    });
  }

  checkActive(index) {
    // черновой вариант
    this.items[index].isActive = true;
  }

  get items() {
    return this._items;
  }
}
