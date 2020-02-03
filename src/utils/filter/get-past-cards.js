import moment from "moment";

export default (cards, time) => cards.filter((card) => card.correctDateTo.dateMoment.diff(moment(time)) < 0);
