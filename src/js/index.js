import { setCreateListings } from './handlers/createListing.js';
import { setGetListing } from './handlers/getListing.js';
import { setGetListingsFiltered } from './handlers/getListingsFiltered.js';
import { setLoginFormListener } from './handlers/login.js';
import { setRegisterFormListener } from './handlers/register.js';
import { setSearchListingsFormListener } from './handlers/searchListings.js';
import { handleAuthModal } from './handlers/setAuthModal.js';
import { createPreviewTemplate } from './templates/preview.js';
import { profileData } from './templates/profileData.js';
import { hostPath } from './api/constants.js';

const path = location.pathname;

if (path === '/' || path === '/index.html') {
  profileData();
  createPreviewTemplate();
  setCreateListings();
  setSearchListingsFormListener();
  setGetListingsFiltered();
  handleAuthModal();
  setLoginFormListener();
  setRegisterFormListener();
} else if (path === hostPath || path === hostPath + 'index.html') {
  profileData();
  createPreviewTemplate();
  setCreateListings();
  setSearchListingsFormListener();
  handleAuthModal();
  setGetListingsFiltered();
  setLoginFormListener();
  setRegisterFormListener();
} else if (path === '/listing/' || path === hostPath + 'listing/') {
  createPreviewTemplate();
  setCreateListings();
  setGetListing();
  profileData();
  setLoginFormListener();
  setRegisterFormListener();
  handleAuthModal();
}
