import { makeBid } from '../api/listings/bid.js';
import { expirationTime } from '../components/expirationTime.js';
import { load } from '../handlers/storage/load.js';

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

  console.log(data);

  const { title, description, _count, media, seller, bids } = data;

  listingTitle.innerHTML = title;
  image.src = media;
  body.innerHTML = description;
  totalBids.innerHTML = _count;
  profileAvatar.src = seller.avatar;
  profileName.innerHTML = seller.name;

  listing.classList.add(
    'lg:grid',
    'gap-10',
    'lg:grid-cols-2',
    'md:py-16',
    'md:mx-16'
  );

  headerContainer.classList.add(
    'flex',
    'justify-between',
    'items-center',
    'mt-3',
    'mx-2'
  );

  image.classList.add(
    'md:rounded-lg',
    'md:shadow-md',
    'object-fill',
    'mx-auto'
  );

  body.classList.add('mx-2', 'mt-2');
  profileContainer.classList.add('flex', 'items-center');
  makeBidContainer.classList.add(
    'flex',
    'lg:justify-end',
    'justify-center',
    'my-5',
    'lg:mt-0'
  );
  listingTitle.classList.add('font-lust', 'text-primary', 'text-3xl');
  profileAvatar.classList.add('w-4', 'h-4', 'mr-2', 'rounded-full');
  remainingTime.classList.add(
    'font-ofelia',
    'text-md',
    'font-bold',
    'absolute',
    'top-0',
    'left-0',
    'p-2',
    'px-3',
    'w-max',
    'bg-secondary',
    'text-white',
    'rounded-tl-lg',
    'rounded-br-lg'
  );
  biddingContainer.classList.add('lg:col-span-1');
  listingContainer.classList.add('relative', 'lg:col-span-1');

  renderMakeBid(data, makeBidContainer);

  const filteredBids = bids.slice(0, 3);
  filteredBids.reverse().forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const bidContainer = document.createElement('div');
    const bidValue = document.createElement('p');
    const bidName = document.createElement('p');
    const bidMade = document.createElement('p');

    bidValue.innerHTML = `Amount: ${amount},-`;
    bidName.innerHTML = `<i class="fa-solid fa-user mr-2"></i>${bidderName}`;

    const dateCreated = new Date(created);
    const now = new Date();
    const difference = now - dateCreated;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0 || days === 0) {
      bidMade.innerHTML = `${minutes}m ago`;
    } else {
      bidMade.innerHTML = `${days}d ${hours}h ${minutes}m ago`;
    }

    bidName.classList.add('w-full');
    bidMade.classList.add('text-right', 'w-full');
    bidValue.classList.add('text-right', 'w-full');

    bidContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'p-3',
      'text-dark',
      'border-dark/10',
      'first:border',
      'first:bg-darkGrey',
      'md:rounded-lg'
    );

    bidContainer.append(bidName, bidMade, bidValue);
    biddingList.append(bidContainer);

    return biddingList;
  });

  setInterval(expirationTime, 1000, data, remainingTime, listingContainer);
  profileContainer.append(profileAvatar, profileName);
  headerContainer.append(listingTitle, profileContainer);
  listingContainer.append(image, headerContainer, body);
  biddingContainer.append(makeBidContainer, biddingList);
  listing.append(listingContainer, biddingContainer);

  return listing;
}

export function renderMakeBid(data, parent) {
  const profile = load('profile');
  const { id } = data;

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

    input.placeholder = 'Amount';
    input.name = 'amount';
    input.classList.add('border', 'search', 'p-2', 'text-sm');
    input.type = 'number';
    input.required = 'true';
    bidButton.classList.add(
      'p-2',
      'ml-2',
      'text-sm',
      'text-primary',
      'font-bold'
    );
    bidButton.type = 'submit';

    bidContainer.append(input, bidButton);
    parent.append(bidContainer);
  } else {
    const promoContainer = document.createElement('div');
    const loginAnchor = document.createElement('a');
    const registerAnchor = document.createElement('a');
    const message = document.createElement('p');
    const anchorContainer = document.createElement('div');

    loginAnchor.innerHTML = 'Sign In';
    registerAnchor.innerHTML = 'Register';
    message.innerHTML = `You must be logged in to bid on this item`;

    loginAnchor.href = './../auth/login/';
    registerAnchor.href = './../auth/register/';

    promoContainer.classList.add(
      'border-primary',
      'border-2',
      'w-full',
      'py-7',
      'px-2',
      'rounded-lg',
      'relative',
      'mb-5'
    );
    message.classList.add('text-lg', 'font-ofelia', 'text-center');
    loginAnchor.classList.add(
      'py-1',
      'px-2',
      'bg-white',
      'border-primary',
      'border-2',
      'rounded-md'
    );
    registerAnchor.classList.add(
      'py-1',
      'px-2',
      'bg-white',
      'border-primary',
      'border-2',
      'ml-2',
      'rounded-md'
    );
    anchorContainer.classList.add(
      'absolute',
      '-bottom-3',
      'left-1/2',
      '-translate-x-1/2'
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
