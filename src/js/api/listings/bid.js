import { popUp } from '../../components/popUp.js';
import { load } from '../../handlers/storage/load.js';
import { save } from '../../handlers/storage/save.js';
import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';
import { getProfile } from '../profile/read.js';

const action = '/listings/';
const method = 'POST';
const container = document.querySelector('main');

export async function makeBid(data, id) {
  try {
    const { name } = load('profile');
    const bidURL = `${API_AUCTION_URL}${action}${id}/bids/`;

    data.amount = Number(data.amount);

    const headers = {
      method,
      body: JSON.stringify(data),
    };

    const response = await authFetch(bidURL, headers);

    if (response.ok) {
      const result = await response.json();
      const profile = await getProfile(name);
      save('profile', profile);
      popUp('Bid made successfully', container);
      setTimeout(() => {
        location.reload();
      }, 800);
      return result;
    } else {
      throw new Error();
    }
  } catch (err) {
    popUp('Something went wrong while bidding on this item', container);
    console.log(err);
  }
}
