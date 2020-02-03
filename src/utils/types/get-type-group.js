export default (type) => {
  let group = ``;

  if (type) {
    group = (type === `check-in` || type === `sightseeing` || type === `restaurant`) ? `activity` : `transfer`;
  }

  return group;
};
