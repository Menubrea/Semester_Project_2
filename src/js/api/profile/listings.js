import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/profiles/';

/**
 * Function for getting listings based on user
 * @param {key} name The value determines the username's listing we're getting
 * @returns if name is Frans, returns all listings to the username Frans.
 */
export async function getProfileListings(name) {
  const profileURL = `${API_AUCTION_URL}${action}${name}/listings`;

  const response = await authFetch(profileURL);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
