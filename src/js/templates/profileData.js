import { logout } from '../api/auth/logout.js';
import { defaultProfile, hostPath } from '../api/constants.js';
import { updateMedia } from '../api/profile/updateMedia.js';
import { load } from '../handlers/storage/load.js';

export async function profileData() {
  const container = document.querySelector('#topNav');
  const modal = document.querySelector('#listingModal');
  const overlay = document.querySelector('.overlay');
  const dataContainer = document.querySelector('#dataContainer');
  const profile = load('profile');
  const path = location.pathname;

  if (profile) {
    const hero = document.querySelector('.hero');
    const createListing = document.createElement('button');
    const login = document.querySelector('#login');
    const profileButton = document.createElement('button');
    const logoutButton = document.createElement('a');
    const totalCredit = document.createElement('p');
    const profileName = document.createElement('p');
    const profilePicture = document.createElement('img');
    const fullProfile = document.createElement('div');

    createListing.innerHTML = 'Create Listing';
    createListing.addEventListener('click', () => {
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

    if (
      path === '/' ||
      path === '/index.html' ||
      path === hostPath ||
      path === hostPath + 'index.html'
    ) {
      hero.classList.add('hidden');
      hero.classList.remove('grid');
    }

    createListing.classList.add(
      'text-md',
      'font-ofelia',
      'font-bold',
      'text-primary',
      'py-2',
      'block',
      'w-full',
      'mt-2',
      'mx-auto',
      'hover:bg-secondary',
      'hover:text-white'
    );

    logoutButton.classList.add(
      'font-ofelia',
      'text-md',
      'cursor-pointer',
      'text-primary',
      'font-bold',
      'block',
      'py-2',
      'text-center',
      'hover:bg-secondary',
      'hover:text-white'
    );

    fullProfile.classList.add(
      'border-b-4',
      'border-primary',
      'p-2',
      'relative',
      'px-10'
    );

    profileName.classList.add(
      'text-dark',
      'font-ofelia',
      'text-center',
      'font-bold'
    );

    totalCredit.classList.add(
      'font-ofelia',
      'font-bold',
      'text-sm',
      'text-white',
      'text-center',
      'bg-dark',
      'p-2',
      'w-fit',
      'rounded',
      'mx-auto'
    );

    login.classList.add('hidden');

    profilePicture.classList.add(
      'w-24',
      'h-24',
      'mx-auto',
      'rounded-lg',
      'hover:opacity-70',
      'mb-2'
    );
    profileButton.classList.add(
      'font-ofelia',
      'text-primary',
      'text-sm',
      'flex',
      'items-center',
      'font-bold'
    );

    createUpdateForm(profile.name, fullProfile);

    profileButton.addEventListener('click', () => {
      if (dataContainer.classList.contains('hidden')) {
        dataContainer.classList.remove('hidden');
        profileButton.classList.add('active-button');
        return dataContainer;
      } else {
        dataContainer.classList.add('hidden');
        profileButton.classList.remove('active-button');
      }
    });

    window.addEventListener('click', (e) => {
      if (e.target !== profileButton && !e.target.closest('#dataContainer')) {
        dataContainer.classList.add('hidden');
        profileButton.classList.remove('active-button');
      }
    });

    totalCredit.innerHTML = profile.credits + ',-';
    profileName.innerHTML = profile.name;
    if (profile.avatar === '' || profile.avatar === null) {
      profilePicture.src = defaultProfile;
    } else {
      profilePicture.src = profile.avatar;
    }
    profilePicture.setAttribute('onerror', `src="${defaultProfile}"`);
    profileButton.innerHTML = `<i class="fa-solid fa-user text-xs text-center w-full mr-1"></i> ${profile.name}`;
    logoutButton.innerHTML = `Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>`;

    fullProfile.append(profilePicture, profileName, totalCredit);
    dataContainer.append(fullProfile, createListing, logoutButton);

    container.append(profileButton);

    return container;
  }
}

export function createUpdateForm(name, parent) {
  const updateForm = document.createElement('form');
  const updateInput = document.createElement('input');
  const inputSubmit = document.createElement('button');

  updateForm.classList.add('flex', 'w-fit', 'mb-4');
  inputSubmit.innerHTML = 'Update';
  inputSubmit.type = 'submit';
  inputSubmit.classList.add(
    'bg-secondary',
    'p-2',
    'rounded-r-lg',
    'font-ofelia',
    'text-white',
    'font-bold',
    'text-sm'
  );

  updateInput.type = 'url';
  updateInput.name = 'avatar';
  updateInput.placeholder = 'Update Avatar';
  updateInput.setAttribute('required', true);
  updateInput.classList.add(
    'w-full',
    'border-2',
    'border-secondary',
    'p-2',
    'rounded-l-lg',
    'font-ofelia',
    'text-sm'
  );

  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const media = Object.fromEntries(formData.entries());

    updateMedia(media, name);
  });

  updateForm.append(updateInput, inputSubmit);
  parent.append(updateForm);
}
