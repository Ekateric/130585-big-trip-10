import {InfoModel} from "../models/info";
import {createInfoTemplate} from "../components/info";

export class InfoController {
  constructor(cities, cards) {
    this.InfoModel = new InfoModel(cities, cards);
  }

  get infoTemplate() {
    return createInfoTemplate(this.InfoModel);
  }
}
