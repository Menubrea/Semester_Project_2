import { logout } from '../api/auth/logout.js';
import { load } from '../handlers/storage/load.js';

export function profileData() {
  const container = document.querySelector('#topNav');
  const profile = load('profile');

  if (profile) {
    console.log(profile);
    const { credits, name, avatar } = profile;
    const dataContainer = document.querySelector('#profileData');
    const profileData = document.createElement('div');

    const logoutButton = document.createElement('a');
    const totalCredit = document.createElement('p');
    const profileName = document.createElement('p');
    const profilePicture = document.createElement('img');
    const profileContainer = document.createElement('div');

    logoutButton.addEventListener('click', () => logout());

    logoutButton.classList.add(
      'items-center',
      'flex',
      'py-2',
      'mr-5',
      'ml-2',
      'font-ofelia',
      'text-primary',
      'text-md',
      'justify-center',
      'border-l',
      'pl-5',
      'border-dark/30'
    );

    profileContainer.classList.add(
      'flex',
      'items-center',
      'border-l',
      'border-dark/30'
    );

    dataContainer.classList.add(
      'flex',
      'justify-end',
      'border-t',
      'border-b',
      'border-dark/20',
      'py-2'
    );

    profileData.classList.add('flex');

    profileName.classList.add(
      'flex',
      'items-center',
      'text-primary',
      'font-ofelia',
      'justify-end'
    );

    totalCredit.classList.add(
      'flex',
      'font-ofelia',
      'font-bold',
      'items-center',
      'text-secondary',
      'px-3'
    );

    profilePicture.classList.add('w-6', 'h-6', 'mr-3', 'rounded-full', 'ml-3');

    totalCredit.innerHTML = credits + ',-';
    profileName.innerHTML = name;
    profilePicture.src = avatar;

    logoutButton.innerHTML = `Logout <i class="ml-2 fa-solid fa-arrow-right-from-bracket"></i>`;

    profileContainer.append(profilePicture, profileName);
    profileData.append(profileContainer, totalCredit);
    dataContainer.append(profileData);
    container.append(logoutButton);

    return container;
  } else {
    const loginAnchor = document.createElement('a');
    const path = location.pathname;

    loginAnchor.classList.add(
      'flex',
      'items-center',
      'py-2',
      'font-ofelia',
      'text-primary',
      'text-md',
      'mx-5'
    );

    if (path === '/' || path === 'index.html') {
      loginAnchor.href = './auth/login/';
    } else if (path === '/listing/') {
      loginAnchor.href = './../auth/login/';
    }

    loginAnchor.innerHTML = ' <i class="fa-solid fa-user mr-2"></i>Login';
    return container.append(loginAnchor);
  }
}
