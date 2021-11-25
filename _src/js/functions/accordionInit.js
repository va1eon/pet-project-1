import {accessClose, accessOpen} from "./accessibilityAria";

const ACCORDION = {
  data: '[data-accordion]',
  item: '.catalog__accordion-item',
  trigger: '.catalog__accordion-trigger',
  content: '.catalog__accordion-content',
  activeCl: 'active',
}

export const accordionInit = () => {
  const accordions = document.querySelectorAll(ACCORDION.data);

  accordions.forEach(accordion => {
    const accordionItems = accordion.querySelectorAll(ACCORDION.item);

    const removeClassActive = e => {
      const content = e.querySelector(ACCORDION.content);
      e.classList.remove(ACCORDION.activeCl);
      accessClose(e.querySelector(ACCORDION.trigger), content);
      content.style.maxHeight = null;
    }

    const addClassActive = e => {
      const content = e.querySelector(ACCORDION.content);
      accordionItems.forEach(item => {
        const content = item.querySelector(ACCORDION.content);
        item.classList.remove(ACCORDION.activeCl);
        accessClose(item.querySelector(ACCORDION.trigger), content)
        content.style.maxHeight = null;
      })
      e.classList.add('active')
      accessOpen(e.querySelector(ACCORDION.trigger), content)
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    accordionItems.forEach(item => {
      const accordionTrigger = item.querySelector(ACCORDION.trigger);
      accordionTrigger.addEventListener('click', () => {
        item.classList.contains(ACCORDION.activeCl) ? removeClassActive(item) : addClassActive(item);
      });
    });
  });
}