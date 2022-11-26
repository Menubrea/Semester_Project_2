import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';

const action = '/listings/';
const method = 'POST';

export async function makeBid(data, id) {
  const bidURL = `${API_AUCTION_URL}${action}${id}/bids/`;

  data.amount = Number(data.amount);

  const headers = {
    method,
    body: JSON.stringify(data),
  };

  const response = await authFetch(bidURL, headers);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
