import moment from "moment";

export default (dateValue) => {
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
