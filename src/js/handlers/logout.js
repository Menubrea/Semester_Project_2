import { logout } from '../api/auth/logout.js';

/**
 * Handler for logout
 */
export function setLogout() {
  const logoutButton = document.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    logout();
  });
}
