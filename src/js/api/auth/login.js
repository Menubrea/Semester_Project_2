import { API_AUCTION_URL } from '../constants.js';
import * as storage from '../../handlers/storage/index.js';

const action = '/auth/login';
const method = 'POST';

export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);
  const options = {
    method,
    body,
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
    }
  } catch (err) {
    console.log(err);
  }
}
