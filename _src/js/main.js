import "focus-visible";
import "./functions/modernizr-webp-picture";
import ResizeObserver from "resize-observer-polyfill";
import {scrollingTo} from "./functions/scrollingTo";
import {headerDropdownInit} from "./functions/headerDropdownInit";
import {openNav} from "./functions/openNav";
import {searchOpen} from "./functions/searchOpen";
import {addScrollHeaderDropdown} from "./functions/addCustomScroll";
import {/* // TODO: editionsSliderInit, */
  gallerySliderInit,
  heroSliderInit /*// TODO:, partnersSliderInit */
} from "./functions/sliderInit";
// TODO: import {catalogTabsInit} from "./functions/catalogTabsInit";
// TODO: import {accordionInit} from "./functions/accordionInit";
// TODO: import {eventsOpen} from "./functions/eventsOpen";
// TODO: import {validateBookInfo} from "./functions/validateBookInfo";
// TODO: import {mapInit} from "./functions/mapInit";

document.addEventListener('DOMContentLoaded', () => {
  let isMobile = false;
  let isTablet = false;
  let isTabletMini = false;
  let isInitDropHeader = false;

  const hero = document.querySelector('.hero');
  const hoverElements = [];
  hoverElements.push.apply(hoverElements, document.querySelectorAll('a'));
  hoverElements.push.apply(hoverElements, document.querySelectorAll('button'));
  hoverElements.push.apply(hoverElements, document.querySelectorAll('.gallery-slider__item'));
  // TODO: hoverElements.push.apply(hoverElements, document.querySelectorAll('.editions__category-field'));
  hoverElements.forEach(el => el.setAttribute('data-hover', true));

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const menu = {
    burger: burger,
    nav: nav,
    textOpen: 'Открыть меню',
    textClose: 'Закрыть меню',
  }

  const loginBtn = nav.querySelector('.header__login');
  const headerTop = document.querySelector('.header__container--top');
  const headerBottom = document.querySelector('.header__container--bottom');

  const search = document.getElementById('search');
  search.btn = document.getElementById('search-button');
  search.input = document.getElementById('search-input');
  search.open = document.getElementById('search-open');
  search.close = document.getElementById('search-close');
  const headerSearchField = document.createElement('div');
  headerSearchField.classList.add('header__search-field');

  const gallery = document.querySelector('.gallery');
  const galleryFilter = document.querySelector('.section__filter');
  const galleryInfo = galleryFilter.querySelector('.gallery__info');

  /*TODO: const pruneTitles = document.querySelectorAll('[data-prune]');
  TODO: const pruneAuthors = document.querySelectorAll('[data-prune-author]');
  TODO: const bookPrices = document.querySelectorAll('[data-book-price]');
  TODO: let pruneTitlesText = [];
  TODO: pruneTitles.forEach(e => pruneTitlesText.push(e.innerText));
  TODO: let pruneAuthorsText = [];
  TODO: pruneAuthors.forEach(e => pruneAuthorsText.push(e.innerText));
  TODO:  const pruneT = {
    el: pruneTitles,
    text: pruneTitlesText
  }

  TODO: const pruneA = {
    el: pruneAuthors,
    text: pruneAuthorsText
  }
  TODO: const map = document.getElementById('map');*/

  // все ссылки для прокрктика до якоря
  let allLinks = [];
  allLinks.push.apply(allLinks, document.querySelectorAll('.nav__link'));
  allLinks.push.apply(allLinks, document.querySelectorAll('.logo'));
  // TODO: allLinks.push.apply(allLinks, document.querySelectorAll('[data-to-gallery]'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-hero-btn]'));

  // клик по ссылкам
  allLinks.forEach(link => {
    if (link.getAttribute('href')[0] === '#') {
      link.addEventListener('click', e => {
        scrollingTo(e);
        if(menu.isOpen) {
          menu.removeClass();
        }
      });
    }
  });

  // ===== метод обьекта String (для сокращения предложений) =====
  String.prototype.limit = function (limit, param) {
    let text = this;
    let options = {
      ending: '...', // что будет написано после обрезки
      trim: true, // удалить пробел в начале и в конце
      word: true, // соблюдать целостность слова (если что)
    }

    // проверка заданного лимита (целое, положительное число)
    if (limit !== parseInt(limit) || limit <= 0) {
      return this;
    }
    // применение заданных параметров
    if (typeof param === 'object') {
      for (let prop in param) {
        if (param.hasOwnProperty.call(param, prop)) {
          options.prop = param.prop;
        }
      }
    }
    // удаление пробелов в начале и в конце
    if (options.trim) {
      text = text.trim();
    }
    if (text.length <= limit) {
      return text;
    }

    text = text.slice(0, limit); // обрезка по заданному лимиту
    let lastSpace = text.lastIndexOf(' ');

    // условаия проверки на сохранение целостности слова
    if (options.word && lastSpace > 0) {
      text.substr(0, lastSpace);
    }
    return text + options.ending; // возварщем конечный результат
  }

  const moveEl = (to, el) => {
    if(!el.classList.contains('moved')) {
      to.append(el)
      el.classList.add('moved');
    } else  {
      to.append(el);
      el.classList.remove('moved');
    }
  }


  /* === TODO: ЖДЕТ ОПТИМИМЗАЦИИ ((( === */
  const viewportTracking = new ResizeObserver(entries => {
    for(let entry of entries) {
      const userViewport = entry.contentRect;

      if(userViewport.width <= 954) {
        if(!isTabletMini) {
          moveEl(gallery, galleryInfo);
          isTabletMini = true;
        }
      }

      if(userViewport.width > 954) {
        if(isTabletMini) {
          moveEl(galleryFilter, galleryInfo);
          isTabletMini = false;
        }
      }

      if(userViewport.width <= 1229) {
        if(!isTablet) {
          if(!isMobile) {
            hoverElements.forEach(el => el.setAttribute('data-hover', false));
            isMobile = true;
          }
          if(!loginBtn.classList.contains('btn')) {
            loginBtn.classList.add('btn', 'btn--long');
          }
          headerTop.append(headerSearchField);
          if(document.querySelector('.header__search-field')) {
            moveEl(headerSearchField, search);
          }
          // TODO: validateBookInfo(15, pruneT, pruneA, bookPrices, true); // отформатирования текста в изданиях
          isTablet = true;
        }
      }

      if(userViewport.width > 1229) {
        if(isTablet) {
          if(isMobile) {
            hoverElements.forEach(el => el.setAttribute('data-hover', true));
            isMobile = false;
          }
          if(loginBtn.classList.contains('btn')) {
            loginBtn.classList.remove('btn', 'btn--long');
          }
          if(menu.isOpen) {
            menu.removeClass();
          }
          if(search.isOpen) {
            search.removeClass();
          }
          moveEl(headerBottom, search);
          if(!headerSearchField.querySelector('.header__search')){
            headerSearchField.remove();
          }
          // TODO: validateBookInfo(20, pruneT, pruneA, bookPrices, false);
          isTablet = false;
        }
        if(!isInitDropHeader) {
          headerDropdownInit(); // инициализация открытия дропдауна
          addScrollHeaderDropdown(); // добавление скролла для дропдауна
          isInitDropHeader = true;
        }
      }
    }
  });
  if(hero.classList.contains('no-animate')) {
    hero.classList.remove('no-animate');
    hero.classList.add('animate');
    heroSliderInit();
  }

  viewportTracking.observe(document.body);
  /* TODO:  if(window.innerWidth > 1299 && !isTablet) {
    validateBookInfo(20, pruneT, pruneA, bookPrices, false); // отформатирования текста в изданиях
  } */
  openNav(menu);
  searchOpen(search, headerSearchField);
  gallerySliderInit(); // инициализация слайдер галерея
  // TODO: catalogTabsInit(); // инициализация табов каталога
  // TODO: accordionInit(); // инициализация аккордиона
  // TODO: eventsOpen(); // открытие событий
  // TODO: editionsSliderInit(); // инициалиазция слайдера изданий
  // TODO: partnersSliderInit(); // инициалиазция слайдера партнеры
  // TODO: mapInit(map); // инициалиазция карты
});