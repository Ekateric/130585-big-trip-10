import StatsView from "../views/stats";
import render from "../utils/common/render";

export default class StatsController {
  constructor(containerElement) {
    this._containerElement = containerElement;

    this._view = new StatsView();
    this._element = this._view.getElement();
  }

  render() {
    render(this._containerElement, this._view);
  }

  hide() {
    this._view.hide();
  }

  show() {
    this._view.show();
  }
}
