import { authFetch } from '../authFetch.js';
import { API_AUCTION_URL } from '../constants.js';
import { popUp } from '../../components/popUp.js';
import { getProfile } from './read.js';
import { save } from '../../handlers/storage/save.js';

const action = '/profiles/';
const method = 'PUT';
const container = document.querySelector('body');

export async function updateMedia(data, name) {
  const mediaURL = `${API_AUCTION_URL}${action}${name}/media `;

  const headers = {
    method,
    body: JSON.stringify(data),
  };

  try {
    const response = await authFetch(mediaURL, headers);

    switch (response.status) {
      case 200:
        const result = await response.json();
        const profile = await getProfile(name);
        save('profile', profile);
        popUp('Avatar updated successfully', container);
        setTimeout(() => {
          location.reload();
        }, 800);
        return result;
      case 400:
        popUp('Please provide a valid image url', container);
        break;
      default:
        throw new Error();
    }
  } catch (err) {
    popUp('An unknown error occured', container);
    console.log(err);
  }
}
