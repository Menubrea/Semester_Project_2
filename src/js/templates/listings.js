import { defaultProfile, errorImage } from '../api/constants.js';
import { mouseOverCountdown } from '../components/eventCountDown.js';

/**
 *
 * @param {data} data the returned listing object from fetch request
 * @returns renders the object data as html with styling
 */
export function listingsTemplate(data) {
  const card = document.createElement('article');
  const header = document.createElement('h3');
  const image = document.createElement('img');
  const imageContainer = document.createElement('div');
  const profileImage = document.createElement('img');
  const profileName = document.createElement('p');
  const profileContainer = document.createElement('div');
  const bid = document.createElement('div');
  const remainingTime = document.createElement('p');
  const anchor = document.createElement('a');
  const headerContainer = document.createElement('div');
  const infoContainer = document.createElement('div');
  const expiringIcon = document.createElement('div');
  const popularIcon = document.createElement('div');

  // Appending
  infoContainer.append(bid);
  imageContainer.append(image, profileContainer);
  mouseOverCountdown(card, remainingTime, data, imageContainer);
  headerContainer.append(header);
  profileContainer.append(profileImage, profileName);
  anchor.append(imageContainer, headerContainer);
  card.append(anchor, infoContainer);

  const { title, media, seller, bids, endsAt, id } = data;
  bids.sort((a, b) => b.amount - a.amount);

  // Since order is reversed, we access the first index for highest entry.
  const lastBid = bids.at(0);
  // Conditional logic for handling media

  // Classes
  imageContainer.classList.add('relative');
  headerContainer.classList.add(
    'mb-2',
    'text-center',
    'bg-white',
    'rounded-b-lg',
    'border-b',
    'border-x',
    'border-dark/20',
    'backdrop-blur-lg'
  );
  card.classList.add(
    'relative',
    'w-full',
    'card',
    'px-2',
    'pt-2',
    'h-min',
    'rounded-lg',
    'bg-white',
    'backdrop-blur-lg',
    'border'
  );
  image.classList.add(
    'w-full',
    'h-64',
    'object-cover',
    'card-image',
    'rounded-t-lg'
  );
  profileImage.classList.add('w-3', 'h-3', 'mr-1', 'rounded-full');
  profileName.classList.add(
    'font-ofelia',
    'text-dark',
    'text-sm',
    'items-center'
  );
  profileContainer.classList.add(
    'flex',
    'items-center',
    'w-fit',
    'float-right',
    'bg-white',
    'p-1',
    'px-3',
    'rounded-t-md',
    'absolute',
    'bottom-0',
    'right-2',
    'border-b',
    'border-dark/10'
  );
  header.classList.add(
    'font-lust',
    'font-extraBold',
    'text-dark',
    'md:text-2xl',
    'text-xl'
  );

  remainingTime.classList.add(
    'text-sm',
    'text-white',
    'font-ofelia',
    'countDownOpacity',
    'absolute',
    'bottom-0',
    'left-2',
    'bg-primary',
    'backdrop-blur-lg',
    'px-4',
    'py-1',
    'w-max',
    'rounded-t-md',
    'border-dark/20',
    'border',
    'shadow-lg'
  );
  bid.classList.add(
    'bg-contrast',
    'px-4',
    'py-1',
    'font-ofelia',
    'text-sm',
    'border-dark/20',
    'border',
    'text-dark',
    'rounded-tl-md'
  );

  expiringIcon.classList.add(
    'font-ofelia',
    'text-sm',
    'bg-expiring',
    'px-3',
    'py-1',
    'border-dark/20',
    'border',
    'text-white',
    'w-fit'
  );

  popularIcon.classList.add(
    'font-ofelia',
    'text-sm',
    'bg-popular',
    'px-3',
    'py-1',
    'border-dark/20',
    'border',
    'text-white',
    'w-fit'
  );

  infoContainer.classList.add(
    'absolute',
    'top-2',
    'left-2',
    'w-fit',
    'flex',
    'gap-1',
    'pr-1',
    'pb-1',
    'bg-white'
  );

  // Source and innerHTML
  profileImage.src = seller.avatar;
  profileImage.setAttribute('onerror', `src="${defaultProfile}"`);
  profileName.innerHTML = seller.name;
  image.setAttribute('onerror', `src="${errorImage}"`);
  expiringIcon.innerHTML = `<i class="fa-solid fa-clock mr-1"></i> > 24h`;
  popularIcon.innerHTML = `<i class="fa-solid fa-fire-flame-curved mr-1"></i>${bids.length}`;

  // Conditional logic

  if (bids.length >= 2) {
    infoContainer.append(popularIcon);
  }

  const expiration = new Date(endsAt).getTime();
  const now = new Date().getTime();
  const distance = expiration - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (!days) {
    infoContainer.append(expiringIcon);
  }

  if (!days && !hours) {
    expiringIcon.innerHTML =
      '<i class="fa-solid fa-clock mr-1"></i> Ending Soon!';
  }

  if (bids.length === 0) {
    bid.innerHTML = 'No bids yet';
  } else {
    bid.innerHTML = ` ${lastBid.amount} <i class="fa-solid  fa-coins text-dark ml-1"></i>`;
  }

  if (title.length > 50) {
    header.innerHTML = title.slice(0, 50).concat('..').trim();
  } else {
    header.innerHTML = title;
  }

  if (media.length === 0 || media === '' || media === null) {
    image.src = defaultProfile;
    image.classList.add('grayscale');
    image.alt = 'Stock image if no image is provided';
  } else {
    image.src = media[0];
    image.alt = title;
  }

  if (
    seller.avatar === '' ||
    seller.avatar === null ||
    seller.avatar.length === 0
  ) {
    profileImage.src = defaultProfile;
    profileImage.alt = `stock avatar if no avatar is provided`;
  } else {
    profileImage.src = seller.avatar;
    profileImage.alt = `${seller.name}'s avatar`;
  }

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
