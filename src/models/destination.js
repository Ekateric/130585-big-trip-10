export default class DestinationModel {
  constructor(destination) {
    this.name = destination.name;
    this.description = destination.description || ``;
    this.pictures = destination.pictures || [];
  }

  static parseDestination(destination) {
    return new DestinationModel(destination);
  }
}
