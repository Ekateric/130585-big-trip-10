export default class MenuModel {
  constructor(items) {
    this._items = this._createItems(items);
    this._active = null;
  }

  get items() {
    return this._items;
  }

  get active() {
    return this._active;
  }

  set active(name) {
    if (this._active) {
      this._items.find((item) => item.name === this._active).isActive = false;
    }
    this._active = name;
    this._items.find((item) => item.name === this._active).isActive = true;
  }

  _createItems(items) {
    return items.map((itemName) => {
      return {
        name: itemName,
        isActive: false
      };
    });
  }
}
