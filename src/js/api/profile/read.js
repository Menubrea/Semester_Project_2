import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/profiles/';

/**
 * Function for getting profile by name key/value
 * @param {key} name key / value
 * @returns If name is Frans, returned the profile data of Frans, assuming its a registered user on the API.
 */
export async function getProfile(name) {
  const profileURL = `${API_AUCTION_URL}${action}${name}`;

  const response = await authFetch(profileURL);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
