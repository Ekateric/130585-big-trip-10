export default (type) => {
  let group = ``;

  if (type) {
    if (type === `check-in` || type === `sightseeing` || type === `restaurant`) {
      group = `activity`;

    } else {
      group = `transfer`;
    }
  }

  return group;
};
