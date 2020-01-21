import getAllCards from "./getAllCards";
import getCardById from "./getCardById";
import getAllCities from "./getAllCities";
import getAllTypes from "./getAllTypes";
import getOffersByType from "./getOffersByType";

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

export {getAllCards, getCardById, getAllCities, getAllTypes, getOffersByType};
