import { logout } from '../api/auth/logout.js';
import { load } from '../handlers/storage/load.js';

export function profileData() {
  const container = document.querySelector('#topNav');
  const modal = document.querySelector('#listingModal');
  const overlay = document.querySelector('.overlay');
  const profile = load('profile');
  const path = location.pathname;

  if (profile) {
    const hero = document.querySelector('.hero');
    const filterNav = document.querySelector('#filterNav');
    const { credits, name, avatar } = profile;
    const dataContainer = document.querySelector('#profileData');
    const profileData = document.createElement('div');
    const createListing = document.createElement('button');

    const logoutButton = document.createElement('a');
    const totalCredit = document.createElement('p');
    const profileName = document.createElement('p');
    const profilePicture = document.createElement('img');
    const profileContainer = document.createElement('div');

    createListing.innerHTML = 'Create Listing';
    createListing.addEventListener('click', (e) => {
      modal.classList.add('active', 'md:grid');
      overlay.classList.add('active');
      window.addEventListener('click', (e) => {
        if (e.target.matches('.overlay')) {
          modal.classList.remove('active', 'md:grid');
          overlay.classList.remove('active');
        }
      });
      window.addEventListener('load', () => {
        if (modal) {
          modal.classList.remove('active', 'md:grid');
          overlay.classList.remove('active');
        }
      });
    });

    logoutButton.addEventListener('click', () => logout());

    // Remove hero section if profile is present
    if (path === '/' || path === '/index.html') {
      filterNav.classList.add('md:top-11');
      filterNav.classList.remove('border-t');
      hero.classList.add('hidden');
      hero.classList.remove('grid');
    }
    createListing.classList.add(
      'py-1',
      'px-2',
      'text-xs',
      'font-josefin',
      'text-primary',
      'mr-4'
    );
    logoutButton.classList.add(
      'items-center',
      'flex',
      'font-josefin',
      'text-md',
      'justify-center',
      'border-l',
      'pl-5',
      'border-white/50',
      'cursor-pointer'
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
      'font-josefin',
      'justify-end'
    );

    totalCredit.classList.add(
      'flex',
      'font-josefin',
      'font-bold',
      'items-center',
      'text-secondary',
      'px-3'
    );

    profilePicture.classList.add('w-6', 'h-6', 'mr-3', 'rounded-full', 'ml-3');

    totalCredit.innerHTML = credits + ',-';
    profileName.innerHTML = name;
    profilePicture.src = avatar;

    logoutButton.innerHTML = `Logout <i class="ml-2 fa-solid fa-arrow-right-from-bracket font-josefin"></i>`;

    profileContainer.append(profilePicture, profileName);
    profileData.append(profileContainer, totalCredit);
    dataContainer.append(createListing, profileData);
    container.append(logoutButton);

    return container;
  } else {
    const loginAnchor = document.createElement('a');

    loginAnchor.classList.add(
      'flex',
      'items-center',
      'font-josefin',
      'text-primary',
      'text-md'
    );

    if (path === '/' || path === '/index.html') {
      loginAnchor.href = './auth/login/';
    } else if (path === '/listing/') {
      loginAnchor.href = './../auth/login/';
    }

    loginAnchor.innerHTML =
      ' <i class="fa-solid fa-user mr-2 font-josefin"></i>Login';
    container.append(loginAnchor);
    return container;
  }
}
