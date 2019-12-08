import {MONTHS} from "./const";

export const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getCorrectTime = (date) => {
  const day = castTimeFormat(date.getDate());
  const monthIndex = date.getMonth();
  const month = castTimeFormat(monthIndex + 1);
  const year = date.getFullYear();
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return {
    day,
    month,
    year,
    monthText: MONTHS[monthIndex],
    time: `${hours}:${minutes}`,
    string: `${day}/${month}/${year} ${hours}:${minutes}`,
    stringISO: `${year}-${month}-${day}T${hours}:${minutes}`
  };
};

export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
