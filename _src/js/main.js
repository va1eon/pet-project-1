import 'focus-visible';
import './functions/modernizr-webp-picture';
import {editionsSliderInit, gallerySliderInit, partnersSliderInit} from "./functions/sliderInit";
import {accordionInit} from "./functions/accordionInit";
import init from "./functions/mapInit";
import {headerDropdownInit} from "./functions/headerDropdownInit";
import {addScrollHeaderDropdown} from "./functions/addCustomScroll";

document.addEventListener('DOMContentLoaded', () => {
  headerDropdownInit();
  addScrollHeaderDropdown();
  gallerySliderInit();
  accordionInit();
  editionsSliderInit();
  partnersSliderInit();
  ymaps.ready(init);






});