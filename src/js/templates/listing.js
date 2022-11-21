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

  const { title, description, _count, media, seller, id, bids } = data;

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
    'mt-5',
    'mx-5'
  );

  image.classList.add(
    'md:rounded-lg',
    'md:shadow-md',
    'object-fill',
    'md:h-96',
    'mx-auto'
  );

  body.classList.add('mx-6', 'mt-3');
  remainingTime.classList.add('block');
  profileContainer.classList.add('flex', 'items-center');
  makeBidContainer.classList.add(
    'flex',
    'lg:justify-end',
    'justify-center',
    'my-5',
    'lg:mt-0'
  );
  listingTitle.classList.add('font-lust', 'text-primary', 'text-3xl');
  profileAvatar.classList.add('w-8', 'h-8', 'mr-2', 'rounded-full');
  remainingTime.classList.add(
    'font-bold',
    'text-white',
    'text-lg',
    'absolute',
    'h-8',
    'w-40',
    'flex',
    'rounded-lg',
    'inset-x-1/2',
    '-translate-x-1/2',
    '-top-4',
    'justify-center',
    'items-center'
  );
  biddingContainer.classList.add('lg:col-span-1', 'mx-5');
  listingContainer.classList.add('relative', 'lg:col-span-1');

  renderMakeBid(makeBidContainer);
  expirationTime(data, remainingTime, listing);

  bids.reverse().forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const bidContainer = document.createElement('div');
    const bidValue = document.createElement('p');
    const bidName = document.createElement('p');
    const bidMade = document.createElement('p');

    bidValue.innerHTML = `<i class="fa-solid fa-gavel mr-2"></i>${amount}`;
    bidName.innerHTML = `<i class="fa-solid fa-user mr-2"></i>${bidderName}`;

    const dateCreated = new Date(created);
    bidMade.innerHTML = dateCreated[Symbol.toPrimitive]('string').slice(0, 21);

    bidContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'p-3',
      'text-dark',
      'first:text-white',
      'first:bg-secondary',
      'rounded-lg'
    );

    bidValue.classList.add(
      'bg-secondary',
      'rounded-xl',
      'px-3',
      'py-1',
      'text-white'
    );

    bidContainer.append(bidName, bidMade, bidValue);
    biddingList.append(bidContainer);

    return biddingList;
  });

  profileContainer.append(profileAvatar, profileName);
  headerContainer.append(listingTitle, profileContainer);
  listingContainer.append(image, headerContainer, body, remainingTime);
  biddingContainer.append(makeBidContainer, biddingList);
  listing.append(listingContainer, biddingContainer);

  return listing;
}

export function renderMakeBid(parent) {
  const profile = load('profile');

  if (profile) {
    const bidContainer = document.createElement('form');
    const bidButton = document.createElement('button');
    const input = document.createElement('input');

    bidButton.innerHTML = 'Make Bid';
    input.placeholder = 'Amount';
    input.classList.add('border', 'search', 'p-2', 'text-sm');
    input.type = 'number';
    input.required = 'true';
    bidButton.classList.add('p-2', 'ml-2', 'text-sm', 'text-dark');
    bidButton.type = 'submit';

    bidContainer.append(input, bidButton);
    parent.append(bidContainer);
  }

  return parent;
}

export function renderListingTemplate(dataList, parent) {
  return parent.append(listingTemplate(dataList));
}
