import { getListing } from '../api/listings/read_single.js';
import { renderListingTemplate } from '../templates/listing.js';
import { getListings } from '../api/listings/read.js';
import { setPagination } from '../components/pagination.js';

/**
 * Function for handling html on /listing/
 */

export async function setGetListing() {
  const container = document.querySelector('#listingContainer');

  // Extract the id from the querystring
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const listingID = params.get('id');

  // Gets the listing
  const listings = await getListings();

  // Gets the listing matching the querystring id and the id of the listing to render the main listing
  const idListing = listings.filter((listing) => {
    if (listing.id === listingID) {
      return listing;
    }
  });

  // Gets all listings with greater than 2 total bids
  const filteredPopular = listings.filter((listing) => {
    if (listing.bids.length > 2) {
      return listing;
    }
  });

  // Gets all listing belonging to the user of the listing.
  const filteredListingsProfile = listings.filter((listing) => {
    if (
      idListing[0].seller.name === listing.seller.name &&
      listing.id !== listingID &&
      listing.length !== 0
    ) {
      return listing;
    }
  });

  // Renders other listings by the profile creator of the main listing if there are any. If none, renders popular listings.
  if (filteredListingsProfile.length !== 0 && idListing.id !== listingID) {
    setPagination(filteredListingsProfile);
  } else {
    const header = document.querySelector('#browseHeader');
    header.innerHTML = '';
    header.innerHTML = 'Popular auctions';
    setPagination(filteredPopular);
  }

  // Renders the main listing.
  renderListingTemplate(idListing[0], container);
}
