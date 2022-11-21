import { getListing } from '../api/listings/read_single.js';
import { renderListingTemplate } from '../templates/listing.js';

export async function setGetListing() {
  const listing = await getListing();
  console.log(listing);
  const container = document.querySelector('#listingContainer');
  renderListingTemplate(listing, container);
}
