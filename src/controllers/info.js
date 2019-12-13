import InfoView from "../views/info";
import render from "../services/utils/render";

export default class InfoController {
  constructor(infoModel) {
    this._model = infoModel;
    this._view = new InfoView(this._model);
    this._element = this._view.getElement();
  }

  render(renderToElement, place) {
    render(renderToElement, this._element, place);
  }

  get element() {
    return this._element;
  }
}
