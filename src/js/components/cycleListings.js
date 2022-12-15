import { renderPromoListingTemplate } from '../templates/promoListing.js';

const countContainer = document.querySelector('#count');

export function cycleListings(previous, next, array, container) {
  let count = 0;

  if (count === 0) {
    previous.classList.add('opacity-20');
  }

  countContainer.innerHTML = `${count + 1} / ${array.length}`;

  previous.addEventListener('click', () => {
    if (count > 0) {
      count--;
    }

    if (count === 0) {
      previous.classList.add('opacity-20');
    }
    if (count < array.length) {
      next.classList.remove('opacity-20');
    }

    countContainer.innerHTML = `${count + 1} / ${array.length}`;
    container.innerHTML = '';
    return renderPromoListingTemplate(array[count], container);
  });

  next.addEventListener('click', () => {
    if (array.length - 1 === count) return;

    if (array.length - 2 === count) {
      next.classList.add('opacity-20');
    }

    if (count < array.length) {
      count++;
    }

    if (count > 0) {
      previous.classList.remove('opacity-20');
    }

    countContainer.innerHTML = `${count + 1} / ${array.length}`;
    container.innerHTML = '';
    return renderPromoListingTemplate(array[count], container);
  });
}
