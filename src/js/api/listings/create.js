import { popUp } from '../../components/popUp.js';
import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/listings/';
const method = 'POST';
const container = document.querySelector('#listingModal');

/**
 * Function for creating a new listing on server
 * @param {object} data takes in the key values stored in the data object
 * @returns If successful, it creates a new listing on the server with the key / values of data.
 */
export async function createListing(data) {
  const listingURL = `${API_AUCTION_URL}${action}`;

  data.tags = [data.tags];

  if (!data.tags) {
    delete data.tags;
  }

  if (!data.media) {
    delete data.media;
  }

  if (!data.description) {
    delete data.description;
  }

  const headers = {
    method,
    body: JSON.stringify(data),
  };

  try {
    const response = await authFetch(listingURL, headers);

    switch (response.status) {
      case 201:
        const listing = await response.json();
        popUp('Listing created successfully', container);
        setTimeout(() => {
          location.reload();
        }, 500);
        return listing;
      case 400:
        popUp('All media urls need to be filled out.', container);
        break;
      default: {
        throw new Error('An unknown error occured');
      }
    }
  } catch (err) {
    popUp('An unknown error occured');
    console.log(err);
  }
}
