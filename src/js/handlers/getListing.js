import { getListing } from '../api/listings/read_single.js';
import { renderListingTemplate } from '../templates/listing.js';
import { renderListingTemplates } from '../templates/listings.js';
import { loader } from '../components/loader.js';
import { getListings } from '../api/listings/read.js';

export async function setGetListing() {
  const listing = await getListing();
  const container = document.querySelector('#listingContainer');
  const name = listing.seller.name;
  const listingID = listing.id;

  const listingsContainer = document.querySelector('#listingsContainer');
  const listings = await getListings();
  const filteredListings = listings.filter((listing) => {
    if (listing.seller.name === name && listing.id !== listingID) {
      return listing;
    }
  });

  renderListingTemplates(filteredListings, listingsContainer);
  renderListingTemplate(listing, container);
  window.onload = setTimeout(() => {
    loader();
  }, 200);
}
