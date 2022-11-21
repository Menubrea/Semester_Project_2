import { API_AUCTION_URL } from '../constants.js';

const action = '/auth/register';
const method = 'POST';

export async function register(profile) {
  const registerURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);
  const options = {
    method,
    body,
    headers: {
      'Content-Type': 'application/json;',
    },
  };

  try {
    const response = await fetch(registerURL, options);
    const profile = await response.json();

    switch (response.status) {
      case 201:
        return profile;
    }
  } catch (err) {
    console.log(err);
  }
}
