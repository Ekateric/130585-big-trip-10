import StatsModel from "../models/stats";
import StatsView from "../views/stats";
import render from "../utils/common/render";

export default class StatsController {
  constructor(containerElement, cardsListModel) {
    this._containerElement = containerElement;
    this._cardsListModel = cardsListModel;

    this._model = new StatsModel(this._cardsListModel);
    this._view = new StatsView(this._model);
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
