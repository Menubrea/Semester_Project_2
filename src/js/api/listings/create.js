import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/listings/';
const method = 'POST';

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

  const response = await authFetch(listingURL, headers);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
