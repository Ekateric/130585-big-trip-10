import {FilterModel} from "./filter";
import {Filters} from "../mock/filters";

export class FiltersListModel {
  constructor() {
    this.items = [];
  }

  createData() {
    this.items = Filters.map((filterName) => new FilterModel(filterName));
  }

  checkActive() {
    // черновой вариант
    this.items[0].isActive = true;
  }
}
