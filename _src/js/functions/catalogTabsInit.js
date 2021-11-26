export const catalogTabsInit = () => {

  const buttons = document.querySelectorAll('.catalog__tabs-btn');
  const contents = document.querySelectorAll('.catalog__inner-item');


  buttons.forEach(el => {
    contents.forEach(item => {
      if(el.classList.contains('active') && el.dataset.country === item.dataset.country) {
        item.classList.add('active', 'visible');
      }
    })
    el.addEventListener('click', e => {
      const btn = e.currentTarget;
      buttons.forEach(el => {
        el.classList.remove('active')
        el.disabled = true;
      });
      btn.classList.add('active');
      contents.forEach(content => {
        if(btn.dataset.country === content.dataset.country){
          contents.forEach(el => {
            if(el.classList.contains('active')) {
              el.classList.remove('visible');
              setTimeout(() => {
                el.classList.remove('active');
              }, 500)
            }
          });
          content.classList.add('active');
          setTimeout(() => {
            content.classList.add('visible');
            buttons.forEach(el => {
              el.disabled = false;
            })
          }, 500)
        }
      });
    });
  });
}