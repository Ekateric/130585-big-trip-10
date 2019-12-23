import getSortTypes from "../services/api/getSortTypes";

export default class SortModel {
  constructor() {
    this._items = this._createItems(this.getSortTypes());
    this.checkedId = null;
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
    if (this.checkedId && this.checkedId !== id) {
      this._items.find((item) => item.id === this.checkedId).checked = false;
    }
    this.checkedId = id;
    this._items.find((item) => item.id === id).checked = true;
  }
}
