export const searchOpen = (search, field) => {
  search.isOpen = false;
  if(field) {
    search.field = field;
  }
  search.addClass = () => {
    search.field.classList.add('open');
    search.open.classList.add('open');
    search.isOpen = true;
  }

  search.removeClass = () => {
    search.field.classList.remove('open');
    search.open.classList.remove('open');
    search.isOpen = false;
  }

  search.open.addEventListener('click', search.addClass);
  search.close.addEventListener('click', search.removeClass)

  document.addEventListener('click', e => {
    if(search.field.classList.contains('open')) {
      if(!e.target.closest('.header__search-field') && !e.target.closest('#search-open')) {
        search.removeClass();
      }
    }
  });
}