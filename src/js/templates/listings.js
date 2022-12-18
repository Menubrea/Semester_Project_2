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
  mouseOverCountdown(card, remainingTime, data, anchor);
  headerContainer.append(header, profileContainer);
  profileContainer.append(profileImage, profileName);
  anchor.append(image, headerContainer);
  card.append(anchor, infoContainer);

  const { title, media, seller, bids, endsAt, id } = data;
  bids.sort((a, b) => b.amount - a.amount);

  // Since order is reversed, we access the first index for highest entry.
  const lastBid = bids.at(0);
  // Conditional logic for handling media

  // Classes
  headerContainer.classList.add(
    'flex',
    'items-center',
    'gap-3',
    'justify-between',
    'mx-2'
  );
  card.classList.add(
    'relative',
    'w-full',
    'rounded-lg',
    'card',
    'px-2',
    'pt-2',
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
  profileImage.classList.add('w-4', 'h-4', 'mr-2', 'rounded-full');
  profileName.classList.add(
    'font-ofelia',
    'text-white',
    'text-md',
    'items-center'
  );
  profileContainer.classList.add('flex', 'items-center');
  header.classList.add(
    'font-lust',
    'font-extraBold',
    'text-primary',
    'md:text-2xl',
    'text-xl'
  );

  remainingTime.classList.add(
    'text-md',
    'text-white',
    'font-ofelia',
    'countDownOpacity',
    'absolute',
    'left-1/2',
    '-translate-x-1/2',
    'top-1/2',
    '-translate-y-1/2',
    'bg-primary/80',
    'backdrop-blur-lg',
    'px-4',
    'py-1',
    'w-max',
    'rounded-md',
    'border-dark/20',
    'border',
    'shadow-lg'
  );
  bid.classList.add(
    'bg-contrast/90',
    'backdrop-blur-lg',
    'px-4',
    'py-1',
    'font-ofelia',
    'text-sm',
    'rounded-md',
    'border-dark/20',
    'border',
    'shadow-lg',
    'text-dark/80'
  );

  expiringIcon.classList.add(
    'font-ofelia',
    'text-sm',
    'rounded-md',
    'bg-expiring/90',
    'backdrop-blur-lg',
    'px-3',
    'py-1',
    'border-dark/20',
    'border',
    'shadow-lg',
    'text-white/80',
    'w-fit'
  );

  popularIcon.classList.add(
    'font-ofelia',
    'text-sm',
    'rounded-md',
    'bg-popular/90',
    'backdrop-blur-lg',
    'px-3',
    'py-1',
    'border-dark/20',
    'border',
    'shadow-lg',
    'text-white/80',
    'w-fit'
  );

  infoContainer.classList.add(
    'absolute',
    'top-4',
    'left-4',
    'w-fit',
    'flex',
    'gap-1'
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

  if (title.length > 24) {
    header.innerHTML = title.slice(0, 24).concat('..').trim();
  } else {
    header.innerHTML = title;
  }

  if (media.length === 0 || media === '' || media === null) {
    image.src = defaultProfile;
    image.alt = 'Stock image if no image is provided';
  } else {
    image.src = media[0];
    image.alt = title;
  }

  if (document.body.clientWidth < 360) {
    header.innerHTML = title.slice(0, 15).concat('..').trim();
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
