import moment from "moment";

export default class DayModel {
  constructor(dayString) {
    this.string = dayString;

    this._moment = moment(this.string, `DD/MM/YYYY`);
    this.formatString = this._moment.format(`YYYY-MM-DD`);
    this.day = this._moment.format(`DD`);
    this.monthText = this._moment.format(`MMM`);
    this.halfYear = this._moment.format(`YY`);
  }
}
