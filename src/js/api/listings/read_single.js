import { API_AUCTION_URL } from '../constants.js';
import { clearLoader } from '../../components/loader.js';
import { displayErrorMessage } from '../../components/errorMessage.js';

const action = '/listings/';
const details = '?_seller=true&_bids=true&sort=created&sortOrder=desc';
/**
 * Function for getting a single listing from the server
 * @returns Gets a single listing from the API using the id value from querystring to fetch the right item.
 */
export async function getListing() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const listingID = params.get('id');
  const listingUrl = `${API_AUCTION_URL}${action}${listingID}${details}`;
  const response = await fetch(listingUrl);

  try {
    if (response.ok) {
      const listing = await response.json();
      window.onload = setTimeout(() => {
        clearLoader();
      }, 200);
      return listing;
    } else {
      displayErrorMessage();
      throw new Error();
    }
  } catch (err) {
    console.log(err);
  }
}
