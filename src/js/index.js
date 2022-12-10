import { setCreateListings } from './handlers/createListing.js';
import { setGetListing } from './handlers/getListing.js';
import { setGetListings } from './handlers/getListings.js';
import { setGetListingsFiltered } from './handlers/getListingsFiltered.js';
import { setLoginFormListener } from './handlers/login.js';
import { setRegisterFormListener } from './handlers/register.js';
import { setSearchListingsFormListener } from './handlers/searchListings.js';
import { handleAuthModal } from './handlers/setAuthModal.js';
import { createPreviewTemplate } from './templates/preview.js';
import { profileData } from './templates/profileData.js';

const path = location.pathname;

if (path === '/' || path === '/index.html') {
  setGetListings();
  profileData();
  createPreviewTemplate();
  setCreateListings();
  setSearchListingsFormListener();
  setGetListingsFiltered();
  handleAuthModal();
  setLoginFormListener();
  setRegisterFormListener();
} else if (
  path === '/Semester_Project_2/' ||
  path === '/Semester_Project_2/index.html'
) {
  setGetListings();
  profileData();
  createPreviewTemplate();
  setCreateListings();
  setSearchListingsFormListener();
  handleAuthModal();
  setGetListingsFiltered();
  setLoginFormListener();
  setRegisterFormListener();
} else if (path === '/listing/' || path === '/Semester_Project_2/listing/') {
  createPreviewTemplate();
  setCreateListings();
  setGetListing();
  profileData();
  setLoginFormListener();
  setRegisterFormListener();
  handleAuthModal();
} else if (
  path === '/auth/register/' ||
  path === '/Semester_Project_2/auth/register/'
) {
  setRegisterFormListener();
} else if (
  path === '/auth/login/' ||
  path === '/Semester_Project_2/auth/login/'
) {
  setLoginFormListener();
}

console.log(location.pathname);
