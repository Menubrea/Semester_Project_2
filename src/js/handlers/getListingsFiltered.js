import { getListings } from '../api/listings/read.js';
import { renderListingTemplates } from '../templates/listings.js';

export async function setGetListingsFiltered() {
  const container = document.querySelector('#listingsContainer');
  const trendingButton = document.querySelector('#trendingButton');
  const expirationButton = document.querySelector('#expiringButton');
  const filterButtons = document.querySelectorAll('.filterButton');
  const allButton = document.querySelector('#allButton');
  const listings = await getListings();

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

  allButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    allButton.classList.add('active-button');
    return renderListingTemplates(listings, container);
  });

  trendingButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    trendingButton.classList.add('active-button');
    return renderListingTemplates(filteredTrending, container);
  });

  expirationButton.addEventListener('click', () => {
    container.innerHTML = '';
    filterButtons.forEach((button) => button.classList.remove('active-button'));
    expirationButton.classList.add('active-button');
    return renderListingTemplates(filteredExpiring, container);
  });
}
