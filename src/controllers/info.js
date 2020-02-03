import InfoModel from "../models/info";
import InfoView from "../views/info";
import {render, replace} from "../utils/render";

export default class InfoController {
  constructor(cardsListModel, containerElement) {
    this._cardsListModel = cardsListModel;
    this._containerElement = containerElement;

    this._model = new InfoModel(this._cardsListModel);
    this._view = null;
    this._position = null;
  }

  render(position) {
    this._model.countInfo();

    const oldView = this._view;

    this._position = position;
    this._view = new InfoView(this._model);

    if (oldView) {
      replace(this._view, oldView);

    } else {
      render(this._containerElement, this._view, this._position);
    }
  }

  update() {
    this.render(this._position);
  }
}
