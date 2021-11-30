const easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}

const smoothScroll = e => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

export const scrollingTo = (e) => {
  smoothScroll(e);
}