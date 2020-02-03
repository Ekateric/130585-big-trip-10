import {RenderPosition} from "../data";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (containerElement, view, place = RenderPosition.BEFOREEND) => {
  const parentContainerElement = containerElement.parentNode;
  const element = view.getElement();

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(element);
      break;
    case RenderPosition.AFTEREND:
      parentContainerElement.insertBefore(element, containerElement.nextSibling);
      break;
    case RenderPosition.BEFOREBEGIN:
      parentContainerElement.insertBefore(element, containerElement);
      break;
  }
};

export const replace = (newView, oldView) => {
  const parentElement = oldView.getElement().parentElement;
  const newElement = newView.getElement();
  const oldElement = oldView.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (view) => {
  view.getElement().remove();
  view.removeElement();
};
