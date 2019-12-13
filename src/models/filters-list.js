import {getFilters} from "../services/api/index";

export default class FiltersListModel {
  constructor() {
    this._items = this._createItems(this.getFilters());
  }

  _createItems(data) {
    return data.map((filterName) => {
      return {
        name: filterName,
        isActive: false
      };
    });
  }

  getFilters() {
    return getFilters();
  }

  checkActive(index) {
    // черновой вариант
    this.items[index].isActive = true;
  }

  get items() {
    return this._items;
  }
}
