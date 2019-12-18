import InfoView from "../views/info";
import render from "../utils/render";

export default class InfoController {
  constructor(infoModel) {
    this._model = infoModel;
    this._view = new InfoView(this._model);
  }

  render(renderToElement, place) {
    render(renderToElement, this._view, place);
  }
}
