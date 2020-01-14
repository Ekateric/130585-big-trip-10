import getTypeGroup from "./getTypeGroup";

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

export default (types) => {
  types.forEach((type) => {
    const group = getTypeGroup(type);

    typesGroups.find((typeGroup) => typeGroup.group === group).types.push(type);
  });

  return typesGroups;
};
