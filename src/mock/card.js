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

const getRandomDate = () => {
  let dateFrom = new Date();
  let dateTo = new Date();

  /* Стартовой датой делаем дату, идущую после сегодняшнего дня в диапазоне 30 дней.
  * Далее устанавливаем диапазон для поиска конечной даты от 1 до 5 дней от стартовой.
  * В конце ищем рандомное количество миллисекунд в заданном диапазоне для конечной даты
  * */
  dateFrom.setDate(dateFrom.getDate() + getRandomInt(0, 30));
  dateTo.setDate(dateFrom.getDate() + getRandomInt(1, 5));
  dateTo = new Date(getRandomInt(dateFrom.getTime(), dateTo.getTime()));

  return {dateFrom, dateTo};
};

export const createCardData = () => {
  const {dateFrom, dateTo} = getRandomDate();
  return {
    type: MockTypes[getRandomInt(0, MockTypes.length - 1)],
    city: MockCities[getRandomInt(0, MockCities.length - 1)],
    photos: getRandomPhotos(),
    description: getRandomDescription(MockDescription),
    dateFrom,
    dateTo
  };
};
