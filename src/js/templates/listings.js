import { expirationTime } from '../components/expirationTime.js';
import { defaultProfile, errorImage } from '../api/constants.js';

export function listingsTemplate(data) {
  const card = document.createElement('article');
  const header = document.createElement('h3');
  const image = document.createElement('img');
  const profileImage = document.createElement('img');
  const profileName = document.createElement('p');
  const profileContainer = document.createElement('div');
  const bid = document.createElement('p');
  const details = document.createElement('div');
  const remainingTime = document.createElement('p');
  const anchor = document.createElement('a');
  const headerContainer = document.createElement('div');
  const bidContainer = document.createElement('div');

  // Appending
  bidContainer.append(bid);
  expirationTime(data, remainingTime, bidContainer);
  headerContainer.append(header, profileContainer);
  details.append(headerContainer);
  profileContainer.append(profileImage, profileName);
  anchor.append(bidContainer, image, details);
  card.append(anchor);

  const { title, media, seller, bids, id } = data;

  // Get last entry in array.
  const lastBid = bids.at(-1);
  // Conditional logic for handling media

  if (media.length === 0 || media === '' || media === null) {
    image.src = defaultProfile;
  } else {
    image.src = media[0];
  }

  if (
    seller.avatar === '' ||
    seller.avatar === null ||
    seller.avatar.length === 0
  ) {
    profileImage.src = defaultProfile;
  } else {
    profileImage.src = seller.avatar;
  }

  // Conditional logic for handling bids
  if (bids.length === 0) {
    bid.innerHTML = 'Be the first to bid';
  } else {
    bid.innerHTML = `Current bid: ${lastBid.amount} <i class="fa-solid  fa-coins text-primary ml-1"></i>`;
    bid.classList.add('font-bold');
  }

  if (title.length > 20) {
    header.innerHTML = title.slice(0, 20).concat('..');
  } else {
    header.innerHTML = title;
  }

  // Classes
  bidContainer.classList.add(
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'relative'
  );
  headerContainer.classList.add(
    'flex',
    'items-center',
    'gap-3',
    'justify-between'
  );
  details.classList.add('w-full', 'rounded-t-lg', 'px-2');
  card.classList.add(
    'relative',
    'w-full',
    'rounded-lg',
    'card',
    'px-4',
    'py-1',
    'h-min',
    'bg-white'
  );
  image.classList.add(
    'w-full',
    'h-64',
    'object-cover',
    'card-image',
    'rounded-lg'
  );
  profileImage.classList.add('w-4', 'h-4', 'mr-1', 'rounded-full');
  profileName.classList.add('font-ofelia', 'text-white', 'text-sm');
  profileContainer.classList.add('flex', 'items-center');
  header.classList.add(
    'font-lust',
    'font-extraBold',
    'text-primary',
    'text-xl'
  );
  remainingTime.classList.add(
    'font-bold',
    'text-sm',
    'text-primary',
    'w-full',
    'rounded-t-lg',
    'text-end',
    'font-ofelia'
  );
  bid.classList.add('font-lust', 'text-primary', 'text-lg', 'w-full');

  // Source and innerHTML
  profileImage.src = seller.avatar;
  profileImage.setAttribute('onerror', `src="${defaultProfile}"`);
  profileName.innerHTML = seller.name;
  image.setAttribute('onerror', `src="${errorImage}"`);

  if (
    location.pathname === '/listing/' ||
    location.pathname === '/Semester_Project_2/listing/'
  ) {
    anchor.href = `?id=${id}`;
  } else {
    anchor.href = `./listing/?id=${id}`;
  }

  return card;
}

export function renderListingTemplates(dataList, parent) {
  parent.append(...dataList.map(listingsTemplate));
}
