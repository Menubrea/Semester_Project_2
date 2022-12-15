import { displayErrorMessage } from '../../components/errorMessage.js';
import { clearLoader } from '../../components/loader.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/listings/';
const details =
  '?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc';
const container = document.querySelector('#forAllListings');

export async function getListings() {
  const listingsURL = `${API_AUCTION_URL}${action}${details}`;
  try {
    const response = await fetch(listingsURL);

    switch (response.status) {
      case 200: {
        const listings = await response.json();
        window.onload = setTimeout(() => {
          clearLoader();
        }, 200);
        return listings;
      }
      default:
        throw new Error();
    }
  } catch (err) {
    displayErrorMessage();
    console.log(err);
  }
}
