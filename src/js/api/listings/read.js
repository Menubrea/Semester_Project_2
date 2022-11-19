import { API_AUCTION_URL } from '../constants.js';

const action = '/listings';
const details = '?_seller=true&_bids=true';

export async function getListings() {
  const listingsURL = `${API_AUCTION_URL}${action}${details}`;
  const response = await fetch(listingsURL);

  if (response.ok) {
    const listings = await response.json();
    console.log(listings);
    return listings;
  } else {
    console.log(error);
  }
}
