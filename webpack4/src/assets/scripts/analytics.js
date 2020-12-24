function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  let userClick = () => counter++;

  document.addEventListener("click", userClick);

  return {
    destroy() {
      document.removeEventListener("click", userClick);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed";
      }
      return counter;
    },
  };
}

window.analytics = createAnalytics();
