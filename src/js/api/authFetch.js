import { load } from '../handlers/storage/load.js';

export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}
/**
 * Function for authorized fetch requests
 * @param {string} url Takes in an endpoint for fetch
 * @param {object} options Object data, if null, options is an empty object
 * @returns Fetches with JWT to the endpoint url provided
 */
export async function authFetch(url, options = {}) {
  try {
    return fetch(url, {
      ...options,
      headers: headers(),
    });
  } catch (err) {
    console.log(err);
  }
}
