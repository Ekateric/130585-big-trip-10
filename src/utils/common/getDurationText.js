import moment from "moment";
import castTimeFormat from "./castTimeFormat";

export default (milliseconds) => {
  const duration = moment.duration(milliseconds);
  let durationString = `00M`;

  const durationInMinutes = duration.asMinutes();

  if (durationInMinutes > 0) {
    durationString = `${castTimeFormat(duration.minutes())}M`;
  }

  if (durationInMinutes >= 60) {
    const durationInHours = duration.asHours();
    durationString = `${castTimeFormat(duration.hours())}H ${durationString}`;

    if (durationInHours >= 24) {
      const durationInDays = Math.floor(duration.asDays());
      durationString = `${castTimeFormat(durationInDays)}D ${durationString}`;
    }
  }

  return durationString;
};
