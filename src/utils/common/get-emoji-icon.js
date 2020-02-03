import emoji from "../../data/emoji";
import getRandomInt from "./get-random-int";

export default (name) => {
  let icon = emoji[name];

  if (typeof icon === `undefined`) {
    const allEmojis = Object.keys(emoji);
    const rndEmojiName = allEmojis[getRandomInt(0, allEmojis.length - 1)];

    icon = emoji[rndEmojiName];
  }

  return icon;
};
