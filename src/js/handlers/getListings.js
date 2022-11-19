import { getListings } from '../api/listings/read.js';
import { renderListingTemplates } from '../templates/listings.js';

export async function setGetListings() {
  const listings = await getListings();
  console.log(listings);
  const container = document.querySelector('#listingsContainer');
  renderListingTemplates(listings, container);
}
