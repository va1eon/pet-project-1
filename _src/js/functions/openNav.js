export const openNav = (menu) => {
  menu.open = false;

  menu.classToggle = () => {
    menu.burger.classList.toggle('active');
    menu.burger.setAttribute('aria-label', menu.textClose);
    menu.nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
    menu.open = !menu.open;
    menu.open ? menu.burger.setAttribute('aria-label', menu.textClose) : menu.burger.setAttribute('aria-label', menu.textOpen);
  }

  menu.removeClass = () => {
    menu.burger.classList.remove('active');
    menu.nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menu.open = false;
    menu.burger.setAttribute('aria-label', menu.textOpen);
  }

  menu.burger.addEventListener('click', () => menu.classToggle());
}