import RenderPosition from "../../data/render-position";

export default (containerElement, view, place = RenderPosition.BEFOREEND) => {
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
