export default (items, fieldName) => {
  return items.reduce((acc, item) => {
    return acc + item[fieldName];
  }, 0);
};
