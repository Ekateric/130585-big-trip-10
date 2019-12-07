import {Filters} from "../mock/filters";

export class FiltersListModel {
  constructor() {
    this.items = [];
  }

  createData() {
    this.items = Filters.map((filterName) => {
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
}
