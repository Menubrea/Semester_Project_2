import { getListings } from '../api/listings/read.js';
import { cycleListings } from '../components/cycleListings.js';
import { renderPromoListingTemplate } from '../templates/promoListing.js';
import { setPagination } from './../components/pagination.js';

export async function setGetListingsFiltered() {
  const container = document.querySelector('#listingsContainer');
  const firstEntryContainer = document.querySelector('#firstEntryContainer');
  const paginationNumbers = document.querySelector('#paginationNumbers');
  const trendingButton = document.querySelector('#trendingButton');
  const expirationButton = document.querySelector('#expiringButton');
  const filterButtons = document.querySelectorAll('.filterButton');
  const prevButton = document.querySelector('#prevButton');
  const nextButton = document.querySelector('#nextButton');
  const allButton = document.querySelector('#allButton');
  const header = document.querySelector('#browseHeader');
  const listings = await getListings();

  const filteredPromo = listings.filter((listing, index) => {
    if (index <= 4) {
      return listing;
    }
  });

  const filteredAll = listings.filter((listing, index) => {
    if (index > 4) {
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

  setPagination(filteredAll);

  allButton.addEventListener('click', () => {
    container.innerHTML = '';
    header.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    allButton.classList.add('active-button');
    header.innerHTML = 'All our auctions';
    paginationNumbers.innerHTML = '';
    return setPagination(listings);
  });

  trendingButton.addEventListener('click', () => {
    container.innerHTML = '';
    header.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    trendingButton.classList.add('active-button');
    paginationNumbers.innerHTML = '';
    header.innerHTML = 'Popular auctions';
    return setPagination(filteredTrending);
  });

  expirationButton.addEventListener('click', () => {
    container.innerHTML = '';
    header.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    expirationButton.classList.add('active-button');
    header.innerHTML = 'Auctions ending soon';
    paginationNumbers.innerHTML = '';
    return setPagination(filteredExpiring);
  });

  cycleListings(prevButton, nextButton, filteredPromo, firstEntryContainer);
  renderPromoListingTemplate(filteredPromo[0], firstEntryContainer);
}
