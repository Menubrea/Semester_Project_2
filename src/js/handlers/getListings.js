import { getListings } from '../api/listings/read.js';
import { renderListingTemplates } from '../templates/listings.js';

export async function setGetListings() {
  const listings = await getListings();
  const filteredListings = listings.filter((listing) => {
    const { endsAt } = listing;
    const expiration = new Date(endsAt);

    const now = new Date();

    if (expiration > now) {
      return listing;
    }
  });
  console.log(filteredListings);
  const container = document.querySelector('#listingsContainer');
  renderListingTemplates(filteredListings, container);
}
