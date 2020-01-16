import RenderPosition from "../../data/render-position";

export default (container, view, place = RenderPosition.BEFOREEND) => {
  const parentContainer = container.parentNode;
  const element = view.getElement();

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      parentContainer.insertBefore(element, container.nextSibling);
      break;
    case RenderPosition.BEFOREBEGIN:
      parentContainer.insertBefore(element, container);
      break;
  }
};
