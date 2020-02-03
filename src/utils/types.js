const typesGroups = [
  {
    group: `transfer`,
    types: []
  },
  {
    group: `activity`,
    types: []
  }
];

export const getTypeGroup = (type) => {
  let group = ``;

  if (type) {
    group = (type === `check-in` || type === `sightseeing` || type === `restaurant`) ? `activity` : `transfer`;
  }

  return group;
};

export const createTypesGroups = (types) => {
  types.forEach((item) => {
    const group = getTypeGroup(item.type);

    typesGroups.find((typeGroup) => typeGroup.group === group).types.push(item.type);
  });

  return typesGroups;
};
