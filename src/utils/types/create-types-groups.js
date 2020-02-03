import getTypeGroup from "./get-type-group";

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
  types.forEach((item) => {
    const group = getTypeGroup(item.type);

    typesGroups.find((typeGroup) => typeGroup.group === group).types.push(item.type);
  });

  return typesGroups;
};
