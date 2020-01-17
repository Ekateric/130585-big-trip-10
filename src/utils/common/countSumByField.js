export default (arr, fieldName) => {
  return arr.reduce((acc, item) => {
    return acc + item[fieldName];
  }, 0);
};
