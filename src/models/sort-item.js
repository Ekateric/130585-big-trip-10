export default class SortItemModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.isChecked = data.isChecked || false;
  }

  set checked(isChecked) {
    this.isChecked = isChecked;
  }
}
