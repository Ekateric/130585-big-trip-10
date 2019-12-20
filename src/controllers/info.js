import InfoView from "../views/info";
import render from "../utils/render";

export default class InfoController {
  constructor(infoModel, containerElement) {
    this._model = infoModel;
    this._view = new InfoView(this._model);
    this._containerElement = containerElement;
  }

  render(place) {
    render(this._containerElement, this._view, place);
  }
}
