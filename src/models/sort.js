import getSortTypes from "../services/api/getSortTypes";

export default class SortModel {
  constructor() {
    this._items = this._createItems(this.getSortTypes());
    this._checkedId = null;
  }

  _createItems(data) {
    return data.map((sortId) => {
      return {
        id: sortId,
        isChecked: false
      };
    });
  }

  getSortTypes() {
    return getSortTypes();
  }

  get items() {
    return this._items;
  }

  set checked(id) {
    if (this._checkedId && this._checkedId !== id) {
      this._items.find((item) => item.id === this._checkedId).isChecked = false;
    }
    this._checkedId = id;
    this._items.find((item) => item.id === this._checkedId).isChecked = true;
  }

  get checked() {
    return this._checkedId;
  }
}
