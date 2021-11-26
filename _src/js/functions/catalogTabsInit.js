export const catalogTabsInit = () => {
  const catalogTabList = document.getElementById('catalog-tab-list');
  const catalogArtistInfo = document.getElementById('catalog-artist-info');

  const catalogTabListNodes = catalogTabList.querySelectorAll('.catalog__tabs-btn');
  const catalogArtistInfoNodes = catalogArtistInfo.querySelectorAll('.catalog__inner-item');

  const getStyleTransform = (el, index) => el.style.transform = `translateX(${index * (-catalogArtistInfoNodes[index].clientWidth)}px)`;

  const checkDisplayNone = el => {
    if(el.querySelector('.catalog__accordion').style.display === 'none') {
      el.querySelector('.catalog__accordion').removeAttribute('style');
    }
  }

  const changePositionEl = (el, index, classRemove = false) =>{
    classRemove ? el.classList.remove('active') : null;
    el.querySelector('.catalog__accordion').style.display = 'none';
    getStyleTransform(el, index);
    window.addEventListener('resize', () => getStyleTransform(el, index))
  }

  const addClassCurEl = (el, index, classRemove = false) => {
    el.forEach(e => {
      changePositionEl(e, index, classRemove);
    });
    el[index].classList.add('active');
    checkDisplayNone(el[index]);
  }

  for(let i = 0; i < catalogTabListNodes.length; i++) {
    catalogTabListNodes.forEach(e => {
      if(e.classList.contains('active') && e.dataset.country === catalogArtistInfoNodes[i].dataset.country) {
        addClassCurEl(catalogArtistInfoNodes, i);
      }
    });

    catalogTabListNodes[i].addEventListener('click', () => {
      catalogTabListNodes.forEach(e => {
        e.classList.remove('active');
      });
      catalogTabListNodes[i].classList.add('active');
      addClassCurEl(catalogArtistInfoNodes, i, true);
    });
  }
}