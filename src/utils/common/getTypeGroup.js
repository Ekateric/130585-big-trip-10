export default (type) => {
  let group = `transfer`;

  if (type === `check-in` || type === `sightseeing` || type === `restaurant`) {
    group = `activity`;
  }

  return group;
};
