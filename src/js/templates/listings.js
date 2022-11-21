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

  const { title, media, seller, bids, id } = data;

  // Get last entry in array.
  const lastBid = bids.at(-1);

  // Conditional logic for handling media
  if (media.length === 0) {
    image.src = '../../../media/images/package.jpg';
  } else {
    image.src = media;
  }

  // Conditional logic for handling bids
  if (bids.length === 0) {
    bid.innerHTML = 'No bid';
  } else {
    bid.innerHTML = `${lastBid.amount},-`;
  }

  function replaceImage() {
    return (image.src = '../../../media/images/package.jpg');
  }

  // Classes
  details.classList.add(
    'flex',
    'bg-gradient-to-b',
    'from-dark',
    'absolute',
    'top-0',
    'justify-between',
    'w-full',
    'rounded-t-lg'
  );
  card.classList.add('relative', 'w-full', 'rounded-lg', 'card');
  image.classList.add('w-full', 'h-64', 'rounded-lg', 'object-cover');
  profileImage.classList.add('w-8', 'h-8', 'mr-2', 'rounded-full');
  profileName.classList.add('font-regular', 'font-ofelia', 'text-dark', 'ml-1');
  profileContainer.classList.add(
    'flex',
    'mt-2',
    'px-2',
    'items-center',
    'pb-2'
  );
  header.classList.add(
    'font-ofelia',
    'font-bold',
    'text-white',
    'px-3',
    'py-1'
  );
  remainingTime.classList.add(
    'absolute',
    'bottom-20',
    'left-0',
    'font-bold',
    'text-white',
    'p-1',
    'px-2'
  );
  bid.classList.add('px-3', 'py-1', 'font-ofelia', 'font-bold', 'text-white');

  // Source and innerHTML
  expirationTime(data, remainingTime, card);
  image.onerror = replaceImage;
  header.innerHTML = title;
  profileImage.src = seller.avatar;
  profileName.innerHTML = seller.name;
  anchor.href = `./listing/?id=${id}`;

  // Appending
  details.append(header, bid);
  profileContainer.append(profileImage, profileName);
  anchor.append(remainingTime, image, profileContainer, details);
  card.append(anchor);

  return card;
}

export function renderListingTemplates(dataList, parent) {
  parent.append(...dataList.map(listingsTemplate));
}
