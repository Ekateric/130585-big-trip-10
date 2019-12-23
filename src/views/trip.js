import AbstractView from "./abstract";

const createTripTemplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
};

export default class TripView extends AbstractView {
  getTemplate() {
    return createTripTemplate();
  }
}
