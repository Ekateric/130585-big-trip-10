import DestinationModel from "./destination";

export default class DestinationsModel {
  constructor(destinations) {
    this._destinations = destinations;
    this._cities = this._createCities();

    this.getDestinationInfo = this.getDestinationInfo.bind(this);
  }

  get cities() {
    return this._cities;
  }

  getDestinationInfo(name) {
    return this._destinations.find((item) => item.name === name) || new DestinationModel({name});
  }

  _createCities() {
    return this._destinations.map((item) => item.name);
  }

  static parseDestinations(destinations) {
    return new DestinationsModel(destinations.map(DestinationModel.parseDestination));
  }
}
