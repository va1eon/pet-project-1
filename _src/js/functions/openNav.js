export const openNav = (menu) => {
  menu.isOpen = false;

  menu.classToggle = () => {
    menu.burger.classList.toggle('active');
    menu.burger.setAttribute('aria-label', menu.textClose);
    menu.nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
    menu.isOpen = !menu.isOpen;
    menu.isOpen
      ? menu.burger.setAttribute('aria-label', menu.textClose)
      : menu.burger.setAttribute('aria-label', menu.textOpen);
  }

  menu.removeClass = () => {
    menu.burger.classList.remove('active');
    menu.nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menu.isOpen = false;
    menu.burger.setAttribute('aria-label', menu.textOpen);
  }

  menu.burger.addEventListener('click', menu.classToggle);
}