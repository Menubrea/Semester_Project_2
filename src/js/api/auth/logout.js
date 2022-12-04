import * as storage from '../../handlers/storage/index.js';

const path = location.pathname;

export function logout() {
  storage.remove('token');
  storage.remove('profile');
  if (
    path === '/' ||
    path === 'index.html' ||
    path === '/Semester_Project_2/' ||
    path === '/Semester_Project_2/index.html/'
  ) {
    location.replace('./');
  } else if (path === '/listing/' || path === '/Semester_Project_2/listing/') {
    location.replace('./../');
  }
}
