import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/profiles/';

export async function getProfileListings(name) {
  const profileURL = `${API_AUCTION_URL}${action}${name}/listings`;

  const response = await authFetch(profileURL);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
