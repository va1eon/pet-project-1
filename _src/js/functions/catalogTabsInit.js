const TAB = {
  buttons: '.catalog__tabs-btn',
  contents: '.catalog__inner-item',
  cl: 'active',
  accordionCl: '.catalog__accordion',
  data: e => e.dataset.country
}


export const catalogTabsInit = () => {
  const btn = document.querySelectorAll(TAB.buttons);
  const content = document.querySelectorAll(TAB.contents);

  // получаем стили для transform
  const getStyleTransform = index => `translateX(${index * (-content[index].clientWidth)}px)`;

  // скрыт ли аккордион
  const checkDisplayNone = el => {
    if (el.querySelector(TAB.accordionCl).style.display === 'none') {
      el.querySelector(TAB.accordionCl).removeAttribute('style');
    }
  }

  // меням transform у элементов
  const changePositionEl = (el, index, classRemove = false) => {
    classRemove ? el.classList.remove(TAB.cl) : null; // удалаение класса (справедливо для выбранного элемента)
    el.querySelector(TAB.accordionCl).style.display = 'none';
    el.style.transform = getStyleTransform(index);

    // следить за изменением ширины вьюпорта (для responsive)
    window.addEventListener('resize', () => {
      el.style.transform = getStyleTransform(index);
    });
  }

  // добавить класс для выбранного элемента
  const addClassCurEl = (el, index, classRemove = false) => {
    el.forEach(e => {
      changePositionEl(e, index, classRemove);
    });
    el[index].classList.add(TAB.cl);
    checkDisplayNone(el[index]);
  }

  // перебор элементов
  for (let i = 0; i < btn.length; i++) {
    btn.forEach(e => {
      if (e.classList.contains(TAB.cl) && TAB.data(e) === TAB.data(content[i])) {
        addClassCurEl(content, i);
      }
    });

    // клик по кнопке
    btn[i].addEventListener('click', () => {
      btn.forEach(e => {
        e.classList.remove(TAB.cl);
      });
      btn[i].classList.add(TAB.cl);
      addClassCurEl(content, i, true);
    });
  }
}