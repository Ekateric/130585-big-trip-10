export default class FiltersModel {
  constructor(filtersNames) {
    this._filters = this._createFilters(Object.values(filtersNames));
    this._checkedId = null;
  }

  get filters() {
    return this._filters;
  }

  get checked() {
    return this._checkedId;
  }

  set checked(name) {
    if (this._checkedId && this._checkedId !== name) {
      this._filters.find((filter) => filter.name === this._checkedId).checked = false;
    }
    this._checkedId = name;
    this._filters.find((filter) => filter.name === name).checked = true;
  }

  _createFilters(filtersNames) {
    return filtersNames.map((filterName) => {
      return {
        name: filterName,
        checked: false
      };
    });
  }
}
