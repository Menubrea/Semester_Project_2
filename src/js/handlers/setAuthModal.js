import { hostPath } from '../api/constants.js';

const closeButtons = document.querySelectorAll('[data-button="close-modal"]');

export function handleAuthModal() {
  handleLoginModal();
  handleRegisterModal();
}

export function handleLoginModal() {
  const loginButton = document.querySelector('#login');
  const inputEmail = document.querySelector('#emailLogin');
  const loginModal = document.querySelector('#loginModal');
  const loginFromRegister = document.querySelector('#loginFromForm');
  const overlay = document.querySelector('.overlay');

  loginFromRegister.addEventListener('click', (e) => {
    const registerModal = document.querySelector('#registerModal');
    const loginModal = document.querySelector('#loginModal');
    loginModal.classList.add('active');
    registerModal.classList.remove('active');
    overlay.classList.add('active');
    inputEmail.focus();

    return loginModal;
  });

  loginButton.addEventListener('click', (e) => {
    loginModal.classList.add('active');
    overlay.classList.add('active');
    inputEmail.focus();

    return loginModal;
  });

  window.addEventListener('click', (e) => {
    if (e.target.matches('.overlay')) {
      loginModal.classList.remove('active');
      overlay.classList.remove('active');

      return loginModal;
    }
  });

  closeButtons.forEach((button) =>
    button.addEventListener('click', () => {
      loginModal.classList.remove('active');
      overlay.classList.remove('active');
    })
  );
}

export function handleRegisterModal() {
  const registerButton = document.querySelector('.register');
  const registerFromLogin = document.querySelector('#register');
  const inputName = document.querySelector('#nameRegister');
  const registerModal = document.querySelector('#registerModal');
  const overlay = document.querySelector('.overlay');

  registerFromLogin.addEventListener('click', (e) => {
    const loginModal = document.querySelector('#loginModal');
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
    overlay.classList.add('active');
    inputName.focus();

    return registerModal;
  });

  if (
    location.pathname === '/' ||
    location.pathname === '/index.html' ||
    location.pathname === hostPath ||
    location.pathname === hostPath + 'index.html'
  ) {
    registerButton.addEventListener('click', (e) => {
      registerModal.classList.add('active');
      overlay.classList.add('active');
      inputName.focus();

      return registerModal;
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.matches('.overlay')) {
      registerModal.classList.remove('active');
      overlay.classList.remove('active');

      return registerModal;
    }
  });

  closeButtons.forEach((button) =>
    button.addEventListener('click', () => {
      registerModal.classList.remove('active');
      overlay.classList.remove('active');

      return registerModal;
    })
  );
}
