const events = {
  btnID: 'button-all-events',
  items: '.events__item'
}


export const eventsOpen = () => {
  const btn = document.getElementById(events.btnID);
  const items = document.querySelectorAll(events.items);
  for(let i = 0; i < items.length; i++) {
    if(i > 2) {
      items[i].classList.add('hidden');
    }
  }
  btn.addEventListener('click', () => {
    items.forEach(item => {
      if(item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
      btn.parentElement.remove();
    })
  })
}