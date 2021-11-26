export const catalogTabsInit = () => {
  const catalogTabList = document.getElementById('catalog-tab-list');
  const catalogArtistInfo = document.getElementById('catalog-artist-info');

  const catalogTabListNodes = catalogTabList.querySelectorAll('.catalog__tabs-btn');
  const catalogArtistInfoNodes = catalogArtistInfo.querySelectorAll('.catalog__inner-item');

  for(let i = 0; i < catalogTabListNodes.length; i++) {
    catalogTabListNodes.forEach(e => {
      if(e.classList.contains('active') && e.dataset.country === catalogArtistInfoNodes[i].dataset.country) {
        catalogArtistInfoNodes[i].classList.add('active');
        catalogArtistInfoNodes[i].style.transform = `translateX(${i * (-catalogArtistInfoNodes[i].clientWidth)}px)`
      }
    });

    catalogTabListNodes[i].addEventListener('click', () => {
      catalogTabListNodes.forEach(e => {
        e.classList.remove('active');
      });
      catalogTabListNodes[i].classList.add('active');
      catalogArtistInfoNodes.forEach(e => {
        e.classList.remove('active');
      });
      catalogArtistInfoNodes[i].classList.add('active');
      catalogArtistInfoNodes.forEach(e => {
        e.style.transform = `translateX(${i * (-catalogArtistInfoNodes[i].clientWidth)}px)`
      });
    });
  }
}