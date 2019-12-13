import {getMenuItems} from "../services/api/index";

export default class MenuModel {
  constructor() {
    this._items = this._createItems(this.getMenuItems());
  }

  _createItems(data) {
    return data.map((itemName) => {
      return {
        name: itemName,
        isActive: false
      };
    });
  }

  getMenuItems() {
    return getMenuItems();
  }

  checkActive(index) {
    // черновой вариант
    this.items[index].isActive = true;
  }

  get items() {
    return this._items;
  }
}
