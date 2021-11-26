import 'focus-visible';
import './functions/modernizr-webp-picture';
import {scrollingTo} from "./functions/scrollingTo";
import {headerDropdownInit} from "./functions/headerDropdownInit";
import {addScrollHeaderDropdown} from "./functions/addCustomScroll";
import {editionsSliderInit, gallerySliderInit, partnersSliderInit} from "./functions/sliderInit";
import {catalogTabsInit} from "./functions/catalogTabsInit";
import {accordionInit} from "./functions/accordionInit";
import {eventsOpen} from "./functions/eventsOpen";
import {validateBookInfo} from "./functions/validateBookInfo";
import {mapInit} from "./functions/mapInit";

document.addEventListener('DOMContentLoaded', () => {

  const map = document.getElementById('map');
  // все ссылки для прокрктика до якоря
  let allLinks = [];
  allLinks.push.apply(allLinks, document.querySelectorAll('.nav__link'));
  allLinks.push.apply(allLinks, document.querySelectorAll('.logo'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-to-gallery]'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-hero-btn]'));

  // клик по ссылкам
  allLinks.forEach(link => {
    if (link.getAttribute('href')[0] === '#') {
      link.addEventListener('click', scrollingTo);
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

  headerDropdownInit(); // инициализация открытия дропдауна
  addScrollHeaderDropdown(); // добавление скролла для дропдауна
  gallerySliderInit(); // инициализация слайдер галерея
  catalogTabsInit(); // инициализация табов каталога
  accordionInit(); // инициализация аккордиона
  eventsOpen(); // открытие событий
  editionsSliderInit(); // инициалиазция слайдера изданий
  partnersSliderInit(); // инициалиазция слайдера партнеры
  validateBookInfo(); // отформатирования для текста в изданиях
  mapInit(map); // инициалиазция карты
});