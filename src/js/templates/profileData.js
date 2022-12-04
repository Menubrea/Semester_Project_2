import { logout } from '../api/auth/logout.js';
import { getProfileListings } from '../api/profile/listings.js';
import { getProfile } from '../api/profile/read.js';
import { load } from '../handlers/storage/load.js';

export async function profileData() {
  const container = document.querySelector('#topNav');
  const modal = document.querySelector('#listingModal');
  const overlay = document.querySelector('.overlay');
  const profileContainer = document.querySelector('#profileContainer');
  const profile = load('profile');
  const path = location.pathname;

  if (profile) {
    const { name } = profile;
    const fullProfile = await getProfile(name);
    // const profileListings = await getProfileListings(name);

    const hero = document.querySelector('.hero');
    const filterNav = document.querySelector('#filterNav');
    const profileData = document.querySelector('#profileData');
    const createListing = document.createElement('button');
    const login = document.querySelector('#login');
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
    if (
      path === '/' ||
      path === '/index.html' ||
      path === '/Semester_Project_2/' ||
      path === '/Semester_Project_2/index.html'
    ) {
      filterNav.classList.add('md:top-11');
      filterNav.classList.remove('border-t');
      hero.classList.add('hidden');
      hero.classList.remove('grid');
    }
    createListing.classList.add(
      'text-lg',
      'font-ofelia',
      'text-primary',
      'border',
      'p-2'
    );
    logoutButton.classList.add(
      'font-ofelia',
      'text-sm',
      'cursor-pointer',
      'text-primary',
      'font-bold'
    );

    profileContainer.classList.add('p-4', 'w-max', 'h-max');

    profileData.classList.add('flex');

    profileName.classList.add('text-primary', 'font-ofelia', 'text-center');

    totalCredit.classList.add(
      'flex',
      'font-ofelia',
      'font-bold',
      'text-sm',
      'items-center',
      'text-secondary',
      'pr-2'
    );

    login.classList.add('hidden');

    profilePicture.classList.add('w-16', 'h-16', 'rounded-full', 'mx-auto');

    totalCredit.innerHTML = fullProfile.credits + ',-';
    profileName.innerHTML = fullProfile.name;
    profilePicture.src = fullProfile.avatar;

    logoutButton.innerHTML = `Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>`;

    profileData.append(createListing, totalCredit, profileContainer);
    profileContainer.append(profilePicture, profileName);

    container.append(logoutButton);

    return container;
  } else {
    profileContainer.classList.add('hidden');
  }
}
