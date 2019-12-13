import {MenuItems} from "../mock/menu";

export default class MenuModel {
  constructor() {
    this._items = this._createItems();
  }

  _createItems() {
    return MenuItems.map((itemName) => {
      return {
        name: itemName,
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
