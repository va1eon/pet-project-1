import 'focus-visible';
import './functions/modernizr-webp-picture';
import {scrollingTo} from "./functions/scrollingTo";
import {headerDropdownInit} from "./functions/headerDropdownInit";
import {openNav} from "./functions/openNav";
import {addScrollHeaderDropdown} from "./functions/addCustomScroll";
import {editionsSliderInit, gallerySliderInit, partnersSliderInit} from "./functions/sliderInit";
import {catalogTabsInit} from "./functions/catalogTabsInit";
import {accordionInit} from "./functions/accordionInit";
import {eventsOpen} from "./functions/eventsOpen";
import {validateBookInfo} from "./functions/validateBookInfo";
import {mapInit} from "./functions/mapInit";

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const hoverElements = [];
  hoverElements.push.apply(hoverElements, document.querySelectorAll('a'));
  hoverElements.push.apply(hoverElements, document.querySelectorAll('button'));
  hoverElements.push.apply(hoverElements, document.querySelectorAll('.editions__category-field'));
  hoverElements.forEach(el => el.setAttribute('data-hover', true));
  let isMobile = false;

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
  const pruneTitles = document.querySelectorAll('[data-prune]');
  const pruneAuthors = document.querySelectorAll('[data-prune-author]');
  const bookPrices = document.querySelectorAll('[data-book-price]');
  let pruneTitlesText = [];
  pruneTitles.forEach(e => pruneTitlesText.push(e.innerText));
  let pruneAuthorsText = [];
  pruneAuthors.forEach(e => pruneAuthorsText.push(e.innerText));
  const pruneT = {
    el: pruneTitles,
    text: pruneTitlesText
  }

  const pruneA = {
    el: pruneAuthors,
    text: pruneAuthorsText
  }
  const map = document.getElementById('map');

  search.btn.addEventListener('click', () => {
    search.classList.toggle('open');
    search.input.addEventListener('input', e => {
      if (e.target.value) {
        search.btn.type = 'submit';
      } else {
        search.btn.type = 'button';
      }
    });
  });

  // все ссылки для прокрктика до якоря
  let allLinks = [];
  allLinks.push.apply(allLinks, document.querySelectorAll('.nav__link'));
  allLinks.push.apply(allLinks, document.querySelectorAll('.logo'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-to-gallery]'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-hero-btn]'));

  // клик по ссылкам
  allLinks.forEach(link => {
    if (link.getAttribute('href')[0] === '#') {
      link.addEventListener('click', e => {
        scrollingTo(e);
        if(menu.open) {
          menu.removeClass();
        }
      });
    }
  });

  // ===== метод обьекта String =====
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

  let isResize = false;
  let isInitDropHeader = false;

  const viewportTracking = new ResizeObserver(entries => {
    for(let entry of entries) {
      const userViewport = entry.contentRect;
      let viewport = entry.contentRect;

      if(userViewport.width <= 1229) {
        if(!isResize) {
          if(!isMobile) {
            hoverElements.forEach(el => el.setAttribute('data-hover', false));
            isMobile = true;
          }
          if(!loginBtn.classList.contains('btn')) {
            loginBtn.classList.add('btn', 'btn--long');
          }
          moveEl(headerTop, search);
          validateBookInfo(15, pruneT, pruneA, bookPrices, true); // отформатирования текста в изданиях
          search.btn.type = 'button';
          if (search.input.value !== '') {
            search.btn.type = 'submit'
          } else {
            search.btn.type = 'button'
          }
          isResize = true;
        }
      }

      if(userViewport.width > 1229) {
        if(isResize) {
          if(isMobile) {
            hoverElements.forEach(el => el.setAttribute('data-hover', true));
            isMobile = false;
          }
          if(loginBtn.classList.contains('btn')) {
            loginBtn.classList.remove('btn', 'btn--long');
          }
          if(menu.open) {
            menu.removeClass();
          }
          moveEl(headerBottom, search);
          validateBookInfo(20, pruneT, pruneA, bookPrices, false);
          if(search.btn.type === 'button') {
            search.btn.type = 'submit'
          }
          isResize = false;
        }
        if(!isInitDropHeader) {
          headerDropdownInit(); // инициализация открытия дропдауна
          addScrollHeaderDropdown(); // добавление скролла для дропдауна
          isInitDropHeader = true;
        }
      }

      if(userViewport.width !== viewport.width) {
        viewport = entry.contentRect;
      }
    }
  });

  viewportTracking.observe(document.body);
  if(window.innerWidth > 1299 && !isResize) {
    validateBookInfo(20, pruneT, pruneA, bookPrices, false); // отформатирования текста в изданиях
  }
  openNav(menu);
  gallerySliderInit(); // инициализация слайдер галерея
  catalogTabsInit(); // инициализация табов каталога
  accordionInit(); // инициализация аккордиона
  eventsOpen(); // открытие событий
  editionsSliderInit(); // инициалиазция слайдера изданий
  partnersSliderInit(); // инициалиазция слайдера партнеры
  if(hero.classList.contains('no-animate')) {
    setTimeout(() => {
      hero.classList.remove('no-animate');
      hero.classList.add('animate');
    }, 1000)
  }
  mapInit(map); // инициалиазция карты
});