import { load } from '../handlers/storage/load.js';

export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

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
