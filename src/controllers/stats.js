import StatsModel from "../models/stats";
import StatsView from "../views/stats";
import {render} from "../utils/render";

export default class StatsController {
  constructor(containerElement, cardsListModel) {
    this._containerElement = containerElement;
    this._cardsListModel = cardsListModel;

    this._model = null;
    this._view = null;
  }

  render() {
    this._model = new StatsModel(this._cardsListModel);
    this._view = new StatsView(this._model);

    render(this._containerElement, this._view);
  }

  hide() {
    if (this._view) {
      this._view.hide();
    }
  }

  show() {
    if (!this._view) {
      this.render();

    } else {
      this._model.countStats();
      this._view.rerender();
    }

    this._view.show();
  }
}
