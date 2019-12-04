import {getRandomInt} from "../helpers";

const MockTypes = [
  {
    type: `Taxi`,
    icon: `taxi`
  },
  {
    type: `Bus`,
    icon: `bus`
  },
  {
    type: `Train`,
    icon: `train`
  },
  {
    type: `Ship`,
    icon: `ship`
  },
  {
    type: `Flight`,
    icon: `flight`
  },
  {
    type: `Drive`,
    icon: `drive`
  },
  {
    type: `Transport`,
    icon: `transport`
  },
  {
    type: `Check`,
    icon: `check-in`
  },
  {
    type: `Sightseeing`,
    icon: `sightseeing`
  },
  {
    type: `Restaurant`,
    icon: `restaurant`
  }
];

const MockCities = [
  `Rome`,
  `Genoa`,
  `Verona`,
  `Parma`,
  `Syracuse`,
  `La Spezia`
];

const MockDescription = (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, 
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius 
  viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum 
  sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu 
  luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc 
  fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`)
  .replace(/\r?\n/g, ``)
  .split(`.`);

const getRandomPhotos = () => {
  return new Array(getRandomInt(0, 10))
    .fill(`http://picsum.photos/300/150?r=${Math.random()}`);
};

const getRandomDescription = (paragraphs) => {
  return new Array(getRandomInt(1, 3))
    .fill(``)
    .map(() => {
      return paragraphs[getRandomInt(0, paragraphs.length - 1)];
    }).join(`.`);
};

// Получаем рандомную дату в промежутке между заданной датой fromDate и заданным количеством дней после нее daysAfter
const getRandomDate = (fromDate, daysAfter) => {
  let toDate = new Date(fromDate);

  toDate.setDate(toDate.getDate() + daysAfter);
  fromDate = fromDate.getTime();
  toDate = toDate.getTime();

  return new Date(getRandomInt(fromDate, toDate));
};

export const createCardData = () => {
  const typeIndex = getRandomInt(0, MockTypes.length - 1);
  const dateFrom = getRandomDate(new Date(), 25);
  const dateTo = getRandomDate(dateFrom, 2);

  return {
    type: MockTypes[typeIndex].type,
    icon: MockTypes[typeIndex].icon,
    city: MockCities[getRandomInt(0, MockCities.length - 1)],
    photos: getRandomPhotos(),
    description: getRandomDescription(MockDescription),
    dateFrom,
    dateTo,
    price: getRandomInt(0, 1000)
  };
};
