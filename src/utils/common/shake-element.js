const SHAKE_ANIMATION_TIMEOUT = 600;
const ANIMATION_CLASS = `animation-shake`;

export default (element, onEndHandler) => {
  element.classList.add(ANIMATION_CLASS);

  setTimeout(() => {
    element.classList.remove(ANIMATION_CLASS);

    if (onEndHandler) {
      onEndHandler();
    }
  }, SHAKE_ANIMATION_TIMEOUT);
};
