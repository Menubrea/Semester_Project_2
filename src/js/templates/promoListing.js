import { errorImage, defaultProfile } from '../api/constants.js';
import { mouseOverCountdown } from '../components/eventCountDown.js';

export function promoListingTemplate(data) {
  const { title, description, seller, media, bids, id } = data;
  const card = document.createElement('article');
  const imageContainer = document.createElement('div');
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
  imageContainer.append(listingImage);
  listingContent.append(listingTitle, profileContainer, listingDescription);

  anchor.append(imageContainer, listingContent);
  card.append(anchor, bidElement);

  bids.sort((a, b) => b.amount - a.amount);
  const latestBid = bids.at(0);

  if (bids.length === 0) {
    bidElement.innerHTML = `<i class="fa-solid fa-certificate mr-1"></i></i>New`;
  } else {
    bidElement.innerHTML = `Current bid: ${latestBid.amount} <i class="fa-solid  fa-coins text-dark text-md ml-1"></i>`;
  }

  bidElement.classList.add(
    'absolute',
    'top-8',
    'left-8',
    'bg-contrast/80',
    'backdrop-blur-lg',
    'py-1',
    'font-ofelia',
    'px-2',
    'text-sm',
    'rounded-md',
    'border-dark/20',
    'border',
    'shadow-lg',
    'text-dark/80'
  );

  remainingTime.classList.add(
    'absolute',
    'font-ofelia',
    'text-white',
    'bg-primary/80',
    'backdrop-blur-lg',
    'p-1',
    'px-4',
    'w-max',
    'bottom-4',
    'right-4',
    'rounded-md',
    'border-dark/20',
    'border',
    'shadow-lg',
    'countDownOpacity'
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
  listingImage.classList.add('w-full', 'h-80', 'object-cover', 'rounded-lg');

  imageContainer.classList.add('col-span-2', 'relative');
  listingTitle.classList.add(
    'text-primary',
    'font-lust',
    'lg:text-4xl',
    'text-3xl'
  );
  listingContent.classList.add(
    'relative',
    'lg:p-4',
    'p-2',
    'pb-8',
    'h-40',
    'md:h-full'
  );
  listingDescription.classList.add(
    'font-ofelia',
    'lg:text-lg',
    'text-dark',
    'md:text-md',
    'lg:mt-2',
    'break-words'
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

  mouseOverCountdown(card, remainingTime, data, imageContainer);

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

  if (description.length > 200 && description !== '') {
    listingDescription.innerHTML = description
      .slice(0, 200)
      .concat('...')
      .trim();
  } else {
    listingDescription.innerHTML = description;
  }

  if (title.length > 45 && title !== '') {
    title.innerHTML = title.slice(0, 45).concat('...').trim();
  } else {
    listingTitle.innerHTML = title;
  }

  listingTitle.innerHTML = title;

  profileImage.src = seller.avatar;
  profileImage.alt = seller.name + ' avatar';
  profileName.innerHTML = seller.name;
  anchor.href = `./listing/?id=${id}`;

  return card;
}

export function renderPromoListingTemplate(data, parent) {
  return parent.append(promoListingTemplate(data));
}
