import 'focus-visible';
import './functions/modernizr-webp-picture';
import {headerDropdownInit} from "./functions/headerDropdownInit";
import {addScrollHeaderDropdown} from "./functions/addCustomScroll";
import {editionsSliderInit, gallerySliderInit, partnersSliderInit} from "./functions/sliderInit";
import {catalogTabsInit} from "./functions/catalogTabsInit";
import {accordionInit} from "./functions/accordionInit";
import {validateBookInfo} from "./functions/validateBookInfo";
import {mapInit} from "./functions/mapInit";

document.addEventListener('DOMContentLoaded', () => {
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
  const map = document.getElementById('map');

  headerDropdownInit();
  addScrollHeaderDropdown();
  gallerySliderInit();
  catalogTabsInit();
  accordionInit();
  editionsSliderInit();
  partnersSliderInit();
  validateBookInfo();
  mapInit(map);
});