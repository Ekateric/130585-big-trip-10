import moment from "moment";

export default (cards, time) => cards.filter((card) => card.correctDateFrom.dateMoment.diff(moment(time)) > 0);
