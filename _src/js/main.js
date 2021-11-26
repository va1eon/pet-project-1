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
  let allLinks = [];
  allLinks.push.apply(allLinks, document.querySelectorAll('.nav__link'));
  allLinks.push.apply(allLinks, document.querySelectorAll('.logo'));
  allLinks.push.apply(allLinks, document.querySelectorAll('[data-to-gallery]'));

  allLinks.forEach(link => {
    if(link.getAttribute('href')[0] === '#') {
      link.addEventListener('click', scrollingTo);
    }
  });

  String.prototype.limit = function (limit, param) {
    let text = this;
    let options = {
      ending: '...',
      trim: true,
      word: true,
    }

    if (limit !== parseInt(limit) || limit <= 0) {
      return this;
    }
    if (typeof param === 'object') {
      for (let prop in param) {
        if (param.hasOwnProperty.call(param, prop)) {
          options.prop = param.prop;
        }
      }
    }
    if (options.trim) {
      text = text.trim();
    }
    if (text.length <= limit) {
      return text;
    }

    text = text.slice(0, limit);
    let lastSpace = text.lastIndexOf(' ');
    if (options.word && lastSpace > 0) {
      text.substr(0, lastSpace);
    }
    return text + options.ending;
  }

  headerDropdownInit();
  addScrollHeaderDropdown();
  gallerySliderInit();
  catalogTabsInit();
  accordionInit();
  eventsOpen();
  editionsSliderInit();
  partnersSliderInit();
  validateBookInfo();
  mapInit(map);
});