import emoji from "../../data/emoji";
import getRandomInt from "./getRandomInt";

export default (name) => {
  let icon = emoji[name];

  if (typeof icon === `undefined`) {
    icon = emoji[getRandomInt(0, Object.keys(emoji).length - 1)];
  }

  return icon;
};
