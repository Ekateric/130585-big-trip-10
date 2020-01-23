import getCardById from "./getCardById";
import getAllCities from "./getAllCities";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getCards() {
    return this._load({url: `points`})
      .then((response) => response.json());
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json());
  }

  getAllData() {
    return Promise.all([this.getCards(), this.getOffers()]);
  }

  createCard(card) {

  }

  updateCard(id, data) {

  }

  deleteCard(id) {

  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export {getCardById, getAllCities};
