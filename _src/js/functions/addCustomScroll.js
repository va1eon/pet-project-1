import SimpleBar from "simplebar";

export const addScrollHeaderDropdown = () => {
  document.querySelectorAll('.header__dropdown')
    .forEach(e => {
      new SimpleBar(e, {
        scrollbarMaxSize: 28,
        ariaLabel: '',
      });
      if(e.querySelector('.simplebar-content-wrapper')) {
        const wrapper = e.querySelector('.simplebar-content-wrapper');
        wrapper.removeAttribute('tabindex');
        wrapper.removeAttribute('aria-label');
        wrapper.removeAttribute('role');
      }
    });
}