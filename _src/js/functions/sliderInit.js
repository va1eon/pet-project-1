import Swiper, {A11y, Grid, Lazy, Navigation, Pagination} from 'swiper';

export const gallerySliderInit = () => {
  const gallerySlider = new Swiper('.gallery-slider', {
    modules: [Navigation, Pagination, Grid, Lazy],
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    wrapperClass: 'gallery-slider__list',
    slideClass: 'gallery-slider__item',
    preloadImages: false,
    lazy: {
      elementClass: 'slider-lazy',
      preloaderClass: 'slider-lazy-preloader',
      checkInView: true,
      loadPrevNext: true,
      loadPrevNextAmount: 24,
    },
    navigation: {
      prevEl: '.gallery-slider-btn-prev',
      nextEl: '.gallery-slider-btn-next',
    },
    pagination: {
      el: '.gallery-slider__pagination',
      type: 'fraction'
    },
    spaceBetween: 50,
    observer: true,
  });
}

export const editionsSliderInit = () => {
  const editionsSlider = new Swiper('.editions-slider', {
    modules: [Navigation, Pagination, Lazy, A11y],
    slidesPerView: 'auto',
    wrapperClass: 'editions-slider__list',
    slideClass: 'editions-slider__item',
    preloadImages: false,
    lazy: {
      elementClass: 'slider-lazy',
      preloaderClass: 'slider-lazy-preloader',
      checkInView: true,
      loadPrevNext: true,
      loadPrevNextAmount: 7,
    },
    navigation: {
      prevEl: '.editions-slider-btn-prev',
      nextEl: '.editions-slider-btn-next',
    },
    pagination: {
      el: '.editions-slider__pagination',
      type: 'fraction'
    },
    spaceBetween: 40,
    observer: true,
  });
}

export const partnersSliderInit = () => {
  const partnersSlider = new Swiper('.partners__slider', {
    modules: [Navigation, Lazy],
    slidesPerView: 3,
    wrapperClass: 'partners__list',
    slideClass: 'partners__item',
    preloadImages: false,
    lazy: {
      elementClass: 'slider-lazy',
      preloaderClass: 'slider-lazy-preloader',
      checkInView: true,
    },
    navigation: {
      prevEl: '.partners-btn-prev',
      nextEl: '.partners-btn-next',
    },
    spaceBetween: 50,
    observer: true,
  });
}