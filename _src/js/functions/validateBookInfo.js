export const validateBookInfo = () => {
  const pruneTitles = document.querySelectorAll('[data-prune]');
  pruneTitles.forEach(e => e.innerText = e.innerText.limit(22, {words: false}))

  const bookPrices = document.querySelectorAll('[data-book-price]');
  let str = '';
  const validatedPrice = (inputElement, number, outputElement) => {
    if(inputElement.length > number) {
      for(let i = 0; i < inputElement.length; i++) {
        str += inputElement[i];
        if(number < 6) {
          if(i === number - 3) {
            str += '\u2009';
          }
        } else {
          if(i === number - 6) {
            str += '\u2009';
          }
          if(i === number - 3) {
            str += '\u2009';
          }
        }
      }
      outputElement.children[0].innerText = `${str} руб`;
      str = '';
    }
  }

  bookPrices.forEach(price => {
    const el = parseInt(price.children[0].innerText).toString();
    validatedPrice(el, 3, price);
  });
}