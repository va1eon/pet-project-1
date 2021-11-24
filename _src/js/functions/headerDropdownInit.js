import {accessClose, accessOpen} from "./accessibilityAria";

const DROPDOWN = {
  selector: '.header__bottom-list-item',
  btn: '.header__bottom-btn',
  content: '.header__dropdown',
  btnCl: 'active',
  contentCl: 'open'
}


export const headerDropdownInit = () => {
  const headerBottomItems = document.querySelectorAll(DROPDOWN.selector);

  const addClass = item => {
    headerBottomItems.forEach(e => {
      e.btn.classList.remove(DROPDOWN.btnCl);
      e.dropdownList.classList.remove(DROPDOWN.contentCl);
      accessClose(e.btn, e.dropdownList);
    });

    item.btn.blur();
    item.btn.classList.toggle(DROPDOWN.btnCl);
    item.dropdownList.classList.toggle(DROPDOWN.contentCl);
    accessOpen(item.btn, item.dropdownList);
  }

  const removeClass = item => {
    item.btn.classList.remove(DROPDOWN.btnCl);
    item.dropdownList.classList.remove(DROPDOWN.contentCl);
    accessClose(item.btn, item.dropdownList);
  }

  headerBottomItems.forEach(item => {
    item.btn = item.querySelector(DROPDOWN.btn);
    item.dropdownList = item.querySelector(DROPDOWN.content);
    

    item.btn.addEventListener('click', () => {
      item.btn.classList.contains(DROPDOWN.btnCl) ? removeClass(item) : addClass(item);
    })

    document.addEventListener('click', e => {
      if(e.target !== item.btn) {
        if (item.btn.classList.contains(DROPDOWN.btnCl)) {
          removeClass(item);
        }
      }
    })

    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') {
        if (item.btn.classList.contains(DROPDOWN.btnCl)) {
          removeClass(item);
        }
      }
    })
  });
}