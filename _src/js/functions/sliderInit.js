import Swiper, {A11y, Autoplay, EffectFade, Grid, Lazy, Navigation, Pagination} from 'swiper';

export const heroSliderInit = () => {
  const heroSlider = new Swiper('.hero__slider', {
    modules: [EffectFade, Autoplay],
    wrapperClass: 'hero__slider-wrapper',
    slideClass: 'hero__slider-slide',
    effect: 'fade',
    speed: 2500,
    autoplay: {
      delay: 2500
    },
    loop: true,
    slidesPerView: 1,
    allowTouchMove: false,
    observer: true,
  })
}

export const gallerySliderInit = () => {
  const gallerySlider = new Swiper('.gallery-slider', {
    modules: [Navigation, Pagination, Grid, Lazy],
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
    observer: true,
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
      461: {
        spaceBetween: 34,
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
      },

      1471: {
        spaceBetween: 50,
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
      }
    }
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
    slidesPerView: 2,
    spaceBetween: 50,
    observer: true,

    breakpoints: {
      1230: {
        slidesPerView: 3,
      }
    }
  });
}