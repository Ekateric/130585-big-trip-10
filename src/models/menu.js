import {MenuItems} from "../mock/menu";

export class MenuModel {
  constructor() {
    this.items = [];
  }

  createData() {
    this.items = MenuItems.map((itemName) => {
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
}
