import RenderPosition from "../../data/render-position";

export default (container, view, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(view.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(view.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(view.getElement());
      break;
  }
};
