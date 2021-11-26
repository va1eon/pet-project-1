export const eventsOpen = () => {
  const allEventsBtn = document.getElementById('button-all-events');
  const eventsItemsNodes = document.querySelectorAll('.events__item');
  for(let i = 0; i < eventsItemsNodes.length; i++) {
    if(i > 2) {
      eventsItemsNodes[i].classList.add('hidden');
    }
  }
  allEventsBtn.addEventListener('click', () => {
    eventsItemsNodes.forEach(item => {
      if(item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
      allEventsBtn.parentElement.remove();
    })
  })
}