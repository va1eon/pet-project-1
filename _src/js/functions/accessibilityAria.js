export const accessOpen = (btnElement, contentElement) => {
  btnElement.setAttribute('aria-expanded', 'true');
  contentElement.setAttribute('aria-hidden', 'false');
}

export const accessClose = (btnElement, contentElement) => {
  btnElement.setAttribute('aria-expanded', 'false');
  contentElement.setAttribute('aria-hidden', 'true');
}