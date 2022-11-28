import * as storage from '../../handlers/storage/index.js';

const path = location.pathname;

export function logout() {
  storage.remove('token');
  storage.remove('profile');
  if (path === '/' || path === 'index.html') {
    location.replace('./');
  } else if (path === '/listing/') {
    location.replace('./../');
  }
}
