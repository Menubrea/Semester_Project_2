import { expirationTime } from '../components/expirationTime.js';

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
  expirationTime(data, remainingTime, bidContainer);
  setInterval(expirationTime, 1000, data, remainingTime, bidContainer);
  bidContainer.append(bid, remainingTime);
  headerContainer.append(header, profileContainer);
  details.append(headerContainer);
  profileContainer.append(profileImage, profileName);
  anchor.append(bidContainer, image, details);
  card.append(anchor);

  const { title, media, seller, bids, id } = data;

  // Get last entry in array.
  const lastBid = bids.at(-1);
  // Conditional logic for handling media
  if (media.length === 0) {
    image.src = '../../../media/images/package.jpg';
  } else {
    image.src = media[0];
  }

  if (seller.avatar === null) {
    profileImage.src = '../../../media/images/christmas_background.webp';
  } else {
    profileImage.src = seller.avatar;
  }

  // Conditional logic for handling bids
  if (bids.length === 0) {
    bid.innerHTML = '';
  } else {
    bid.innerHTML = `${lastBid.amount},-`;
  }

  if (title.length > 12) {
    header.innerHTML = title.slice(0, 12).concat('...');
  } else {
    header.innerHTML = title;
  }

  function replaceImage(element) {
    if ((element = onerror)) {
      return (element.src = '../../../media/images/package.jpg');
    }
  }
  // Classes
  bidContainer.classList.add(
    'flex',
    'flex-row-reverse',
    'justify-between',
    'items-center'
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
    'bg-white',
    'card',
    'px-4',
    'py-2'
  );
  image.classList.add(
    'w-full',
    'h-64',
    'object-cover',
    'card-image',
    'rounded-lg'
  );
  profileImage.classList.add('w-3', 'h-3', 'mr-1', 'rounded-full');
  profileName.classList.add('font-ofelia', 'text-dark/70');
  profileContainer.classList.add('flex', 'items-center');
  header.classList.add('font-ofelia', 'font-extraBold', 'text-primary');
  remainingTime.classList.add(
    'font-bold',
    'text-sm',
    'text-dark',
    'w-full',
    'rounded-t-lg'
  );
  bid.classList.add('font-ofelia', 'font-bold', 'text-primary', 'text-sm');

  // Source and innerHTML
  profileImage.src = seller.avatar;
  profileImage.onerror = replaceImage(profileImage);
  image.onerror = replaceImage(image);

  profileName.innerHTML = seller.name;
  anchor.href = `./listing/?id=${id}`;

  return card;
}

export function renderListingTemplates(dataList, parent) {
  parent.append(...dataList.map(listingsTemplate));
}
