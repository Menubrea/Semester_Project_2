import { API_AUCTION_URL } from '../constants.js';
import * as storage from '../../handlers/storage/index.js';
import { popUp } from '../../components/popUp.js';

const action = '/auth/login';
const method = 'POST';
const container = document.querySelector('body');

export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);
  const options = {
    method: method,
    body: body,
    headers: {
      'Content-Type': 'application/json;',
    },
  };

  try {
    const response = await fetch(loginURL, options);
    const { accessToken, ...profile } = await response.json();

    switch (response.status) {
      case 200:
        storage.save('token', accessToken);
        storage.save('profile', profile);
        location.replace('./../../../../');
        break;
      case 401:
        const container = document.querySelector('body');
        popUp('Wrong username/password', container);
        break;
      default:
        throw new Error();
    }
  } catch (err) {
    popUp('Unknown error occured, please try again', container);
    console.log(err);
  }
}
