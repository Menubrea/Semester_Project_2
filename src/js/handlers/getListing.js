import { getListing } from '../api/listings/read_single.js';
import { renderListingTemplate } from '../templates/listing.js';
import { loader } from '../components/loader.js';

export async function setGetListing() {
  const listing = await getListing();
  const container = document.querySelector('#listingContainer');
  renderListingTemplate(listing, container);
  window.onload = setTimeout(() => {
    loader();
  }, 200);
}
