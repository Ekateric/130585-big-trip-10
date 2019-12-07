import {FiltersListModel} from "../models/filters-list";
import {createFiltersTemplate} from "../components/filters";

export class FiltersListController {
  constructor() {
    this.filtersListModel = new FiltersListModel();
  }

  createFiltersData() {
    this.filtersListModel.createData();
    this.filtersListModel.checkActive();
  }

  get listTemplate() {
    return createFiltersTemplate(this.filtersListModel.items);
  }
}
