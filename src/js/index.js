import { setCreateListings } from './handlers/createListing.js';
import { setGetListing } from './handlers/getListing.js';
import { setGetListings } from './handlers/getListings.js';
import { setLoginFormListener } from './handlers/login.js';
import { setRegisterFormListener } from './handlers/register.js';
import { createPreviewTemplate } from './templates/preview.js';
import { profileData } from './templates/profileData.js';

const path = location.pathname;

if (path === '/' || path === '/index.html') {
  setGetListings();
  profileData();
  createPreviewTemplate();
  setCreateListings();
} else if (
  path === '/Semester_Project_2/' ||
  path === '/Semester_Project_2/index.html'
) {
  setGetListings();
  profileData();
  createPreviewTemplate();
  setCreateListings();
} else if (path === '/listing/' || '/Semester_Project_2/listing/') {
  createPreviewTemplate();
  setCreateListings();
  setGetListing();
  profileData();
} else if (path === '/auth/register/' || 'Semester_Project_2/auth/register/') {
  setRegisterFormListener();
} else if (path === '/auth/login/' || 'Semester_Project_2/auth/login/') {
  setLoginFormListener();
}

console.log(location.pathname);
