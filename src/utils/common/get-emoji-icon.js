import {Emoji} from "../../data";
import getRandomInt from "./get-random-int";

export default (name) => {
  let icon = Emoji[name];

  if (typeof icon === `undefined`) {
    const allEmojis = Object.keys(Emoji);
    const rndEmojiName = allEmojis[getRandomInt(0, allEmojis.length - 1)];

    icon = Emoji[rndEmojiName];
  }

  return icon;
};
