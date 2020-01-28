import moment from "moment";
import castTimeFormat from "./castTimeFormat";

export default (milliseconds) => {
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
