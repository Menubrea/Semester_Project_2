import { popUp } from '../../components/popUp.js';
import { API_AUCTION_URL } from '../constants.js';
import { login } from './login.js';

const action = '/auth/register';
const method = 'POST';
const container = document.querySelector('#registerForm');

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

  if (!profile.avatar) {
    delete profile.avatar;
  }

  try {
    const response = await fetch(registerURL, options);
    const result = await response.json();

    switch (response.status) {
      case 201:
        login(profile);
        return result;
      case 400:
        return popUp('Username/email already exist in database', container);
      default:
        throw new Error();
    }
  } catch (err) {
    console.log(err);
    return popUp('An unknown error occured, please try again', container);
  }
}
