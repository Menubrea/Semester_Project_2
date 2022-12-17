import { getListing } from '../api/listings/read_single.js';
import { renderListingTemplate } from '../templates/listing.js';
import { getListings } from '../api/listings/read.js';
import { setPagination } from '../components/pagination.js';

export async function setGetListing() {
  const listing = await getListing();
  const container = document.querySelector('#listingContainer');
  const name = listing.seller.name;
  const listingID = listing.id;

  const listings = await getListings();

  const filteredPopular = listings.filter((listing) => {
    if (listing.bids.length > 2) {
      return listing;
    }
  });

  const filteredListingsProfile = listings.filter((listing) => {
    if (
      listing.seller.name === name &&
      listing.id !== listingID &&
      listing.length !== 0
    ) {
      return listing;
    }
  });

  if (filteredListingsProfile.length !== 0 || listing.id !== listingID) {
    setPagination(filteredListingsProfile);
  } else {
    const header = document.querySelector('#browseHeader');
    header.innerHTML = '';
    header.innerHTML = 'Popular auctions';
    setPagination(filteredPopular);
  }

  renderListingTemplate(listing, container);
}
