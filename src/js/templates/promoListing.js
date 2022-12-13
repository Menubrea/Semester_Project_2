import { errorImage, defaultProfile } from '../api/constants.js';
import { expirationTime } from '../components/expirationTime.js';

export function promoListingTemplate(data) {
  const { title, description, endsAt, seller, media, bids, id } = data;
  const card = document.createElement('article');
  const listingImage = document.createElement('img');
  const listingTitle = document.createElement('h1');
  const listingDescription = document.createElement('p');
  const listingContent = document.createElement('div');
  const profileContainer = document.createElement('div');
  const profileImage = document.createElement('img');
  const profileName = document.createElement('p');
  const anchor = document.createElement('a');
  const bidElement = document.createElement('p');
  const remainingTime = document.createElement('p');

  profileContainer.append(profileImage, profileName);

  listingContent.append(listingTitle, profileContainer, listingDescription);
  expirationTime(data, remainingTime, listingContent);

  anchor.append(listingImage, listingContent);
  card.append(anchor, bidElement);

  const latestBid = bids.at(-1);

  if (bids.length === 0) {
    bidElement.innerHTML = 'Be the first to bid';
  } else {
    bidElement.innerHTML = `Current bid: ${latestBid.amount} <i class="fa-solid  fa-coins text-dark text-md ml-1"></i>`;
  }

  bidElement.classList.add(
    'absolute',
    'top-12',
    'left-4',
    'bg-contrast',
    'p-1',
    'font-lust',
    'px-2',
    'text-2xl'
  );

  remainingTime.classList.add(
    'font-ofelia',
    'font-bold',
    'text-white',
    'bg-primary',
    'p-1',
    'px-2',
    'w-fit',
    'mt-5',
    'mx-auto'
  );

  card.classList.add(
    'card',
    'card-promo',
    'bg-white',
    'lg:mt-4',
    'mt-2',
    'rounded-lg',
    'shadow-lg',
    'p-4',
    'relative'
  );

  anchor.classList.add('md:grid', 'md:grid-cols-3', 'gap-4');
  listingImage.classList.add(
    'col-span-2',
    'w-full',
    'h-80',
    'object-cover',
    'rounded-lg'
  );
  listingTitle.classList.add(
    'text-primary',
    'font-lust',
    'lg:text-5xl',
    'text-4xl'
  );
  listingContent.classList.add('relative', 'p-4', 'pb-8');
  listingDescription.classList.add(
    'font-ofelia',
    'lg:text-lg',
    'text-dark',
    'text-md'
  );
  profileContainer.classList.add(
    'flex',
    'items-center',
    'w-full',
    'justify-end',
    'absolute',
    'bottom-0',
    'right-0',
    'gap-1'
  );
  profileImage.classList.add('lg:w-6', 'lg:h-6', 'w-4', 'h-4', 'rounded-full');
  profileName.classList.add(
    'font-ofelia',
    'text-dark',
    'md:text-md',
    'text-sm'
  );

  let count = 0;
  setInterval(() => {
    if (media.length === 1) return;
    count += 1;
    if (count === media.length) {
      count = 0;
    }
    listingImage.src = media[count];
  }, 10000);

  if (media.length === 0 || media === '' || media === null) {
    listingImage.src = defaultProfile;
  } else {
    listingImage.src = media[0];
  }

  if (seller.avatar === '' || seller.avatar === null) {
    profileImage.src = defaultProfile;
  } else {
    profileImage.src = seller.avatar;
  }
  listingImage.setAttribute('onerror', `src="${errorImage}"`);
  profileImage.setAttribute('onerror', `src="${defaultProfile}"`);
  listingTitle.innerHTML = title;
  listingDescription.innerHTML = description;
  profileImage.src = seller.avatar;
  profileName.innerHTML = seller.name;
  anchor.href = `./listing/?id=${id}`;

  return card;
}

export function renderPromoListingTemplate(data, parent) {
  return parent.append(promoListingTemplate(data));
}
