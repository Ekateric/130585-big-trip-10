export default class SortModel {
  constructor(items) {
    this._items = this._createItems(items);
    this._checkedId = null;
  }

  get items() {
    return this._items;
  }

  get checked() {
    return this._checkedId;
  }

  set checked(id) {
    if (this._checkedId) {
      this._items.find((item) => item.id === this._checkedId).checked = false;
    }
    this._checkedId = id;
    this._items.find((item) => item.id === this._checkedId).checked = true;
  }

  _createItems(items) {
    return items.map((sortId) => {
      return {
        id: sortId,
        checked: false
      };
    });
  }
}
