import moment from "moment";

export default (dateValue) => {
  const date = moment(dateValue).format(`DD/MM/YYYY`);
  const time = moment(dateValue).format(`HH:mm`);

  return {
    date,
    time,
    string: `${date} ${time}`
  };
};
