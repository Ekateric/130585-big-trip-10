import {getRandomInt} from "../helpers";

const MockTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `flight`,
  `drive`,
  `transport`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const MockCities = [
  `Rome`,
  `Genoa`,
  `Verona`,
  `Parma`,
  `Syracuse`,
  `La Spezia`
];

const getRandomPhotos = () => {
  return new Array(getRandomInt(0, 10)).fill(`http://picsum.photos/300/150?r=${Math.random()}`);
};

export const createCardData = () => {
  return {
    type: MockTypes[getRandomInt(0, MockTypes.length - 1)],
    city: MockCities[getRandomInt(0, MockCities.length - 1)],
    photos: getRandomPhotos()
  };
};
