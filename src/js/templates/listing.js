import { makeBid } from '../api/listings/bid.js';
import { expirationTime } from '../components/expirationTime.js';
import { load } from '../handlers/storage/load.js';
import { defaultProfile, errorImage } from '../api/constants.js';

export function listingTemplate(data) {
  const listing = document.createElement('article');
  const image = document.createElement('img');
  const body = document.createElement('p');
  const totalBids = document.createElement('div');
  const profileAvatar = document.createElement('img');
  const profileName = document.createElement('p');
  const listingTitle = document.createElement('h1');
  const remainingTime = document.createElement('p');
  const listingContainer = document.createElement('div');
  const biddingContainer = document.createElement('div');
  const headerContainer = document.createElement('div');
  const profileContainer = document.createElement('div');
  const makeBidContainer = document.createElement('div');
  const biddingList = document.createElement('div');
  const metaTitle = document.querySelector('title');
  const metaDesc = document.querySelector('meta[name="description"]');

  const { title, description, _count, media, seller, bids } = data;

  let count = 0;

  // For looping through images on interval
  setInterval(() => {
    if (media.length === 1) return;
    count += 1;
    if (count === media.length) {
      count = 0;
    }
    image.src = media[count];
  }, 10000);

  metaTitle.innerHTML = `Vender | ${title}`;
  metaDesc.content = description;

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
    profileAvatar.src = defaultProfile;
  } else {
    profileAvatar.src = seller.avatar;
  }

  listingTitle.innerHTML = title;
  body.innerHTML = description;
  totalBids.innerHTML = _count;
  profileName.innerHTML = seller.name;
  profileAvatar.setAttribute('onerror', `src="${defaultProfile}"`);
  image.setAttribute('onerror', `src="${errorImage}"`);

  listing.classList.add(
    'lg:grid',
    'gap-8',
    'lg:grid-cols-2',
    'md:pt-16',
    'pb-8',
    'md:px-8',
    'relative'
  );

  headerContainer.classList.add(
    'flex',
    'justify-between',
    'items-center',
    'mt-3',
    'ml-3'
  );

  image.classList.add(
    'object-cover',
    'mx-auto',
    'w-full',
    'relative',
    'h-72',
    'shadow-lg',
    'lg:rounded-lg'
  );

  profileName.classList.add('font-ofelia', 'text-dark/70');

  body.classList.add('mx-3', 'mt-1', 'font-ofelia');
  profileContainer.classList.add('flex', 'items-center', 'mr-3');
  makeBidContainer.classList.add(
    'flex',
    'lg:justify-end',
    'justify-center',
    'my-5',
    'lg:mt-0'
  );
  listingTitle.classList.add(
    'font-lust',
    'font-bold',
    'text-primary',
    'text-4xl'
  );
  profileAvatar.classList.add('w-4', 'h-4', 'mr-2', 'rounded-full');
  remainingTime.classList.add(
    'font-lust',
    'text-xl',
    'font-bold',
    'absolute',
    'top-0',
    'left-0',
    'p-2',
    'px-3',
    'w-fit',
    'bg-dark',
    'text-contrast',
    'text-center'
  );
  biddingContainer.classList.add(
    'lg:col-span-1',
    'md:bg-accent/30',
    'md:p-5',
    'md:rounded-lg',
    'h-fit'
  );
  listingContainer.classList.add('lg:col-span-1');

  renderMakeBid(data, makeBidContainer);

  const filteredBids = bids.reverse().slice(0, 3);
  filteredBids.forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const bidContainer = document.createElement('div');
    const bidValue = document.createElement('p');
    const bidName = document.createElement('p');
    const bidMade = document.createElement('p');

    bidValue.innerHTML = `Amount: ${amount} <i class="fa-solid  fa-coins text-primary ml-1"></i>`;
    bidName.innerHTML = `<i class="fa-solid fa-user mr-2"></i>${bidderName}`;

    const dateCreated = new Date(created);
    const now = new Date();
    const difference = now - dateCreated;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    bidMade.innerHTML = `${days}d ${hours}h ${minutes}m ago`;

    bidName.classList.add('w-full');
    bidMade.classList.add('text-center', 'w-full');
    bidValue.classList.add('text-right', 'w-full');

    bidContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'p-3',
      'text-dark',
      'border-dark/10',
      'first:border',
      'first:bg-contrast',
      'md:rounded-lg',
      'font-ofelia',
      'text-sm',
      'w-full',
      'col-span-3'
    );

    bidContainer.append(bidName, bidMade, bidValue);
    biddingList.append(bidContainer);

    return biddingList;
  });

  setInterval(expirationTime, 1000, data, remainingTime, listing);
  profileContainer.append(profileAvatar, profileName);
  headerContainer.append(listingTitle, profileContainer);
  listingContainer.append(image, headerContainer, body);
  biddingContainer.append(makeBidContainer, biddingList);
  listing.append(listingContainer, biddingContainer);

  return listing;
}

export function renderMakeBid(data, parent) {
  const profile = load('profile');
  const { id, bids, seller } = data;

  if (profile) {
    const bidContainer = document.createElement('form');
    const bidButton = document.createElement('button');
    const input = document.createElement('input');

    bidContainer.id = 'bidForm';
    bidContainer.addEventListener('submit', (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      makeBid(post, id);
    });

    bidButton.innerHTML = 'Make Bid';
    bidContainer.classList.add(
      'bg-secondary',
      'text-white',
      'w-full',
      'p-2',
      'md:rounded-lg',
      'grid',
      'grid-cols-3',
      'gap-2',
      'items-center'
    );
    input.placeholder = 'Amount';
    input.name = 'amount';
    input.classList.add(
      'text-sm',
      'text-dark',
      'w-full',
      'h-full',
      'p-2',
      'rounded-sm',
      'col-span-2'
    );
    input.type = 'number';

    if (profile.name === seller.name) {
      input.setAttribute('disabled', true);
      bidButton.setAttribute('disabled', true);
      input.setAttribute('hidden', true);
      bidButton.setAttribute('hidden', true);
      const message = document.createElement('p');
      message.innerHTML = 'Cannot place bid on your own listing';
      message.classList.add('col-span-3', 'text-center', 'font-ofelia');
      bidContainer.append(message);
    }

    if (bids.length >= 1) {
      input.value = bids.at(-1).amount + 1;
      input.min = bids.at(-1).amount + 1;
    } else {
      input.value = 1;
      input.min = 1;
    }

    input.max = profile.credits;
    input.setAttribute('required', true);
    bidButton.classList.add(
      'p-2',
      'border-white',
      'text-sm',
      'bg-white',
      'text-secondary',
      'font-bold',
      'w-full'
    );
    bidButton.type = 'submit';

    bidContainer.append(input, bidButton);
    parent.append(bidContainer);
  } else {
    const promoContainer = document.createElement('div');
    const loginAnchor = document.createElement('button');
    const registerAnchor = document.createElement('button');
    const message = document.createElement('p');
    const anchorContainer = document.createElement('div');

    loginAnchor.innerHTML = 'Sign In';
    registerAnchor.innerHTML = 'Register';
    message.innerHTML = `You must be logged in to bid on this item`;

    promoContainer.classList.add(
      'bg-secondary',
      'text-white',
      'w-full',
      'py-7',
      'px-2',
      'lg:rounded-lg',
      'relative',
      'mb-5'
    );
    message.classList.add('text-lg', 'font-ofelia', 'text-center');
    loginAnchor.classList.add(
      'py-1',
      'px-3',
      'bg-white',
      'text-secondary',
      'font-bold',
      'font-ofelia',
      'border-secondary',
      'border-2',
      'rounded-md',
      'w-max',
      'hover:bg-secondary',
      'hover:text-white'
    );
    registerAnchor.classList.add(
      'py-1',
      'px-3',
      'bg-white',
      'text-secondary',
      'font-bold',
      'font-ofelia',
      'border-secondary',
      'border-2',
      'ml-2',
      'rounded-md',
      'w-max',
      'hover:bg-secondary',
      'hover:text-white',
      'register'
    );
    anchorContainer.classList.add(
      'absolute',
      '-bottom-4',
      'left-1/2',
      '-translate-x-1/2',
      'w-full',
      'text-center',
      'flex',
      'justify-center'
    );

    parent.classList.remove('lg:justify-end');

    anchorContainer.append(loginAnchor, registerAnchor);
    promoContainer.append(message, anchorContainer);
    parent.append(promoContainer);
  }

  return parent;
}

export function renderListingTemplate(data, parent) {
  return parent.append(listingTemplate(data));
}
