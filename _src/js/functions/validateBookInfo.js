export const validateBookInfo = (lim, titles, authors, prices, isTablet) => {
  // обрезка предложения
  for(let i = 0; i < titles.el.length; i++) {
    titles.el[i].innerText = titles.text[i].limit(lim, {words: false});
  }
  for (let i = 0; i < authors.el.length; i++) {
    if (isTablet) {
      authors.el[i].innerText = authors.text[i].limit(lim, {words: false});
    } else {
      authors.el[i].innerText = authors.text[i];
    }
  }

  let str = '';
  const validatedPrice = (inputElement, number, outputElement) => {
    if (inputElement.length > number) {
      for (let i = 0; i < inputElement.length; i++) {
        str += inputElement[i];
        if (number < 6) {
          if (i === number - 3) {
            str += '\u2009';
          }
        } else {
          if (i === number - 6) {
            str += '\u2009';
          }
          if (i === number - 3) {
            str += '\u2009';
          }
        }
      }
      outputElement.children[0].innerText = `${str} руб`;
      str = '';
    }
  }

  // отформатирование цены
  prices.forEach(price => {
    const el = parseInt(price.children[0].innerText).toString();
    validatedPrice(el, 3, price);
  });
}