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

export const createCardData = () => {
  return {
    type: MockTypes[getRandomInt(0, MockTypes.length - 1)]
  };
};
