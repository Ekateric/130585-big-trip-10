import {Emoji} from "../data";
import moment from "moment";

export const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const makeFirstCharUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const countSumByField = (items, fieldName) => {
  return items.reduce((acc, item) => {
    return acc + item[fieldName];
  }, 0);
};

export const getCorrectTime = (dateValue) => {
  const dateMoment = moment(dateValue);
  const date = dateMoment.format(`DD/MM/YYYY`);
  const time = dateMoment.format(`HH:mm`);

  return {
    dateMoment,
    date,
    time,
    string: `${date} ${time}`
  };
};

export const getDurationText = (milliseconds) => {
  const duration = moment.duration(milliseconds);
  let durationText = `00M`;

  const durationInMinutes = duration.asMinutes();

  if (durationInMinutes > 0) {
    durationText = `${castTimeFormat(duration.minutes())}M`;
  }

  if (durationInMinutes >= 60) {
    const durationInHours = duration.asHours();
    durationText = `${castTimeFormat(duration.hours())}H ${durationText}`;

    if (durationInHours >= 24) {
      const durationInDays = Math.floor(duration.asDays());
      durationText = `${castTimeFormat(durationInDays)}D ${durationText}`;
    }
  }

  return durationText;
};

export const getEmojiIcon = (name) => {
  let icon = Emoji[name];

  if (typeof icon === `undefined`) {
    const allEmojis = Object.keys(Emoji);
    const rndEmojiName = allEmojis[getRandomInt(0, allEmojis.length - 1)];

    icon = Emoji[rndEmojiName];
  }

  return icon;
};

const SHAKE_ANIMATION_TIMEOUT = 600;
const ANIMATION_CLASS = `animation-shake`;

export const shakeElement = (element, onEndHandler) => {
  element.classList.add(ANIMATION_CLASS);

  setTimeout(() => {
    element.classList.remove(ANIMATION_CLASS);

    if (onEndHandler) {
      onEndHandler();
    }
  }, SHAKE_ANIMATION_TIMEOUT);
};
