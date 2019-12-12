export default (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
