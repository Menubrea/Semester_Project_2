import { register } from '../api/auth/register.js';
/**
 * Handler for register form
 */
export function setRegisterFormListener() {
  const form = document.querySelector('#registerForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    if (!profile.avatar) {
      delete profile.avatar;
    }

    register(profile);
  });
}
