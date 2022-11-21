import { API_AUCTION_URL } from '../constants.js';

const action = '/listings/';
const details = '?_seller=true&_bids=true';

export async function getListing() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const listingID = params.get('id');
  const listingUrl = `${API_AUCTION_URL}${action}${listingID}${details}`;
  const response = await fetch(listingUrl);

  if (response.ok) {
    const listing = await response.json();
    console.log(listing);
    return listing;
  } else {
    throw new Error();
  }
}
