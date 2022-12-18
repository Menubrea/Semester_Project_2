import * as storage from '../../handlers/storage/index.js';

const path = location.pathname;
/**
 * Function for clearing localstorage for stored data.
 */
export function logout() {
  storage.remove('token');
  storage.remove('profile');
  location.reload();
}
