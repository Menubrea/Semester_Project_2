import { getListings } from '../api/listings/read.js';
import { loader } from '../components/loader.js';
import { listingsTemplate } from '../templates/listings.js';

export async function setGetListings() {
  const listings = await getListings();
  // const filteredListings = listings.filter((listing) => {
  //   const { endsAt } = listing;
  //   const expiration = new Date(endsAt).getTime();
  //   const now = new Date().getTime();

  //   if (expiration > now) {
  //     return listing;
  //   }
  // });
  const paginationNumbers = document.querySelector('#paginationNumbers');
  const container = document.querySelector('#listingsContainer');
  const paginationLimit = 24;
  const pageCount = Math.ceil(listings.length / paginationLimit);

  const appendPageNumber = (index, parent) => {
    const pageNumber = document.createElement('button');
    pageNumber.classList.add(
      'pagination-num',
      'px-2',
      'bg-primary',
      'text-white'
    );
    pageNumber.innerHTML = index;
    pageNumber.setAttribute('page-index', index);
    pageNumber.setAttribute('aria-label', 'Page ' + index);

    parent.append(pageNumber);
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

    listings.map((items, index) => {
      if (index >= prevRange && index < currRange) {
        container.append(listingsTemplate(items));
      }
    });
  };

  document.querySelectorAll('.pagination-num').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex) {
      button.addEventListener('click', () => {
        document
          .querySelector('#filterNav')
          .scrollIntoView({ behavior: 'smooth' });
        container.innerHTML = '';
        setCurrentPage(pageIndex);
      });
    }
  });

  window.onload = setCurrentPage(1);
  window.onload = setTimeout(() => {
    loader();
  }, 200);
}
