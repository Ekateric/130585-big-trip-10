import {MenuModel} from "../models/menu";
import {createMenuTemplate} from "../components/menu";

export class MenuController {
  constructor() {
    this.menuModel = new MenuModel();
  }

  createMenuData() {
    this.menuModel.createData();
    this.menuModel.checkActive(0);
  }

  get listTemplate() {
    return createMenuTemplate(this.menuModel.items);
  }
}
