export function createArray(count, fill) {
  return Array.from(new Array(count)).map(_ => typeof fill === "function" ? fill() : fill);
}

export function randomNumber(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

export function randomOf(elements) {
  const index = randomNumber(0, elements.length - 1);

  return elements[index];
}

export function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  return function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
}
