import { API_AUCTION_URL } from '../constants.js';

const action = '/listings';
const details = '?_seller=true&_bids=true&_count=1000';

export async function getListings() {
  const listingsURL = `${API_AUCTION_URL}${action}${details}`;
  const response = await fetch(listingsURL);

  if (response.ok) {
    const listings = await response.json();
    return listings;
  } else {
    throw new Error();
  }
}
