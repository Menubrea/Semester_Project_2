import { logout } from '../api/auth/logout.js';

export function setLogout() {
  const logoutButton = document.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    logout();
  });
}
