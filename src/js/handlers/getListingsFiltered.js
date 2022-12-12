import { getListings } from '../api/listings/read.js';
import { clearLoader } from '../components/loader.js';
import { renderPromoListingTemplate } from '../templates/promoListing.js';
import { setPagination } from './../components/pagination.js';

export async function setGetListingsFiltered() {
  const container = document.querySelector('#listingsContainer');
  const firstEntryContainer = document.querySelector('#firstEntryContainer');
  const paginationNumbers = document.querySelector('#paginationNumbers');
  const trendingButton = document.querySelector('#trendingButton');
  const expirationButton = document.querySelector('#expiringButton');
  const filterButtons = document.querySelectorAll('.filterButton');
  const allButton = document.querySelector('#allButton');
  const listings = await getListings();

  const filteredFirst = listings.filter((listing, index) => {
    if (index === 0) {
      return listing;
    }
  });

  const filteredAll = listings.filter((listing, index) => {
    if (index > 0) {
      return listing;
    }
  });

  const filteredTrending = listings.filter((listing) => {
    if (listing.bids.length >= 2) {
      return listing;
    }
  });

  const filteredExpiring = listings.filter((listing) => {
    const { endsAt } = listing;

    const expiration = new Date(endsAt).getTime();

    const now = new Date().getTime();
    const distance = expiration - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return listing;
    }
  });

  clearLoader();

  setPagination(filteredAll);

  allButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    allButton.classList.add('active-button');
    paginationNumbers.innerHTML = '';
    return setPagination(listings);
  });

  trendingButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    trendingButton.classList.add('active-button');
    paginationNumbers.innerHTML = '';
    return setPagination(filteredTrending);
  });

  expirationButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    expirationButton.classList.add('active-button');
    paginationNumbers.innerHTML = '';
    return setPagination(filteredExpiring);
  });

  renderPromoListingTemplate(filteredFirst[0], firstEntryContainer);
}
