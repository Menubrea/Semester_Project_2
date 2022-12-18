import { listingsTemplate } from '../templates/listings.js';

/**
 * A function to create pagination for an array of objects with buttons and interaction
 * @param {array} array An array of objects, in this case listings.
 */
export function setPagination(array) {
  const paginationLimit = 18;
  const pageCount = Math.ceil(array.length / paginationLimit);
  const paginationNumbers = document.querySelector('#paginationNumbers');
  const container = document.querySelector('#listingsContainer');
  const pageCountContainer = document.querySelector('#pageCount');
  pageCountContainer.innerHTML = `Page 1 / ${pageCount}`;
  container.innerHTML = '';

  const appendPageNumber = (index, parent) => {
    const pageNumber = document.createElement('button');
    pageNumber.classList.add(
      'pagination-num',
      'p-2',
      'bg-white',
      'text-primary',
      'rounded-full',
      'w-10',
      'h-10',
      'hover:bg-primary',
      'hover:text-white',
      'hover:border-white',
      'border-2',
      'border-primary',
      'flex',
      'items-center',
      'justify-center'
    );
    pageNumber.innerHTML = index;
    pageNumber.setAttribute('page-index', index);
    pageNumber.setAttribute('aria-label', 'Page ' + index);

    return parent.append(pageNumber);
  };

  const getPaginationNumbers = () => {
    for (let i = 0; i < pageCount; i++) {
      appendPageNumber(i + 1, paginationNumbers);
    }
  };

  getPaginationNumbers();

  const setCurrentPage = (pageNum) => {
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    const handleActivePageNumber = () => {
      document.querySelectorAll('.pagination-num').forEach((button) => {
        button.classList.remove('active-pagination');
        const pageIndex = Number(button.getAttribute('page-index'));
        if (pageIndex === pageNum) {
          button.classList.add('active-pagination');
        }
      });
    };

    handleActivePageNumber();

    array.map((items, index) => {
      if (index >= prevRange && index < currRange) {
        container.append(listingsTemplate(items));
      }
    });
  };

  document.querySelectorAll('.pagination-num').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex) {
      button.addEventListener('click', () => {
        document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
        container.innerHTML = '';
        pageCountContainer.innerHTML = '';
        pageCountContainer.innerHTML = `Page ${pageIndex} / ${pageCount}`;
        setCurrentPage(pageIndex);
      });
    }
  });

  setCurrentPage(1);
}
