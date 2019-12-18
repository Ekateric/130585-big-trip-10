export default (newView, oldView) => {
  const parentElement = oldView.getElement().parentElement;
  const newElement = newView.getElement();
  const oldElement = oldView.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
