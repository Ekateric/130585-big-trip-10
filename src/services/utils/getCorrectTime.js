import MONTHS from "../const/months";
import castTimeFormat from "./castTimeFormat";

export default (date) => {
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
