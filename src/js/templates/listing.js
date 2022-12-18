import { makeBid } from '../api/listings/bid.js';
import { expirationTime } from '../components/expirationTime.js';
import { load } from '../handlers/storage/load.js';
import { defaultProfile, errorImage } from '../api/constants.js';

/**
 *
 * @param {object} data The returned object from listings
 * @returns Renders the returned object to html
 */
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
  const metaKeys = document.querySelector('meta[name="keywords"]');
  const locationHere = document.querySelector('#locationHere');
  const imageCounter = document.createElement('div');

  const { title, description, _count, media, seller, bids } = data;

  // For looping through images on click
  let count = 0;

  image.addEventListener('click', () => {
    if (media.length === 1 || media.length === 0) return;
    count += 1;
    if (count === media.length) {
      count = 0;
    }
    imageCounter.innerHTML = `<div>Click image </div> ${count + 1} / ${
      media.length
    }`;
    return (image.src = media[count]);
  });

  metaTitle.innerHTML = `Vender | ${title}`;
  metaDesc.content = title + ' | ' + description;
  metaKeys.content = `${title}, Vender, auction, buy, sell`;

  if (media.length === 0 || media === '' || media === null) {
    image.src = defaultProfile;
    image.alt = 'Stock Image when no image is provided';
    imageCounter.innerHTML = `${count + 1} / ${media.length + 1}`;
  } else if (media.length === 1) {
    image.src = media[0];
    image.alt = `${description}`;
    imageCounter.innerHTML = `${count + 1} / ${media.length}`;
  } else {
    image.src = media[0];
    image.alt = `${description}`;
    imageCounter.innerHTML = `<div class="w-max">Click image</div> ${
      count + 1
    } / ${media.length}`;
  }

  if (
    seller.avatar === '' ||
    seller.avatar === null ||
    seller.avatar.length === 0
  ) {
    profileAvatar.src = defaultProfile;
    profileAvatar.alt = 'default avatar';
  } else {
    profileAvatar.src = seller.avatar;
    profileAvatar.alt = `${seller.name} Avatar`;
  }

  locationHere.innerHTML = `${title}`;
  listingTitle.innerHTML = title;
  body.innerHTML = description;
  totalBids.innerHTML = _count;
  profileName.innerHTML = seller.name;
  profileAvatar.setAttribute('onerror', `src="${defaultProfile}"`);
  image.setAttribute('onerror', `src="${errorImage}"`);
  image.setAttribute('tabindex', '0');

  listing.classList.add(
    'md:grid',
    'md:p-4',
    'p-2',
    'gap-4',
    'lg:grid-cols-5',
    'md:grid-cols-2',
    'relative',
    'bg-white',
    'listing',
    'rounded-lg'
  );

  imageCounter.classList.add(
    'absolute',
    'top-2',
    'right-2',
    'bg-dark',
    'text-white',
    'font-ofelia',
    'px-2',
    'py-1',
    'rounded-lg',
    'text-center'
  );

  headerContainer.classList.add(
    'flex',
    'justify-between',
    'mt-1',
    'mx-3',
    'gap-2',
    'items-start'
  );

  image.classList.add(
    'object-cover',
    'mx-auto',
    'w-full',
    'relative',
    'h-96',
    'rounded-lg',
    'hover:cursor-pointer'
  );

  profileName.classList.add('font-ofelia', 'text-dark/70');
  body.classList.add('mx-3', 'mt-1', 'font-ofelia', 'break-words');
  profileContainer.classList.add(
    'flex',
    'items-center',
    'w-fit',
    'mt-2',
    'mr-3'
  );
  makeBidContainer.classList.add(
    'flex',
    'lg:justify-end',
    'justify-center',
    'lg:my-5',
    'my-2',
    'lg:mt-0'
  );
  listingTitle.classList.add(
    'font-lust',
    'font-bold',
    'text-primary',
    'text-4xl',
    'break-words',
    'w-full'
  );
  profileAvatar.classList.add('w-4', 'h-4', 'mr-2', 'rounded-full');
  remainingTime.classList.add(
    'absolute',
    'top-2',
    'left-2',
    'bg-contrast/80',
    'backdrop-blur-lg',
    'py-1',
    'font-ofelia',
    'px-2',
    'text-md',
    'rounded-md',
    'border-dark/20',
    'border',
    'shadow-lg',
    'text-dark/80',
    'text-bold'
  );
  biddingContainer.classList.add(
    'lg:col-span-2',
    'md:col-span-1',
    'md:bg-accent/30',
    'md:p-5',
    'rounded-lg',
    'h-fit'
  );
  listingContainer.classList.add(
    'lg:col-span-3',
    'md:col-span-1',
    'relative',
    'bg-white'
  );

  renderMakeBid(data, makeBidContainer);

  bids.sort((a, b) => b.amount - a.amount);
  const shortenedBids = bids.slice(0, 3);
  shortenedBids.forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const bidContainer = document.createElement('div');
    const bidValue = document.createElement('p');
    const bidName = document.createElement('p');
    const bidMade = document.createElement('p');

    bidValue.innerHTML = `${amount} <i class="fa-solid  fa-coins text-dark ml-1"></i>`;
    bidName.innerHTML = `${bidderName}`;

    const dateCreated = new Date(created);
    const now = new Date();
    const difference = now - dateCreated;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (!days && !hours) {
      bidMade.innerHTML = `${minutes}m ago`;
    } else if (!days) {
      bidMade.innerHTML = `${hours}h ${minutes}m ago`;
    } else {
      bidMade.innerHTML = `${days}d ${hours}h ${minutes}m ago`;
    }

    bidName.classList.add('w-full');
    bidMade.classList.add('text-center', 'w-full');
    bidValue.classList.add('text-right', 'w-full');

    bidContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'px-5',
      'py-2',
      'text-dark',
      'border-dark/20',
      'border',
      'first:bg-contrast',
      'first:shadow-lg',
      'font-ofelia',
      'text-sm',
      'w-full',
      'col-span-3',
      'rounded-full',
      'mb-2',
      'bg-white'
    );

    bidContainer.append(bidName, bidMade, bidValue);
    biddingList.append(bidContainer);

    return biddingList;
  });

  setInterval(expirationTime, 1000, data, remainingTime, listingContainer);
  profileContainer.append(profileAvatar, profileName);
  headerContainer.append(listingTitle, profileContainer);
  listingContainer.append(image, headerContainer, body, imageCounter);
  biddingContainer.append(makeBidContainer, biddingList);
  listing.append(listingContainer, biddingContainer);

  return listing;
}
/**
 *
 * @param {object} data takes in data from the returned listings object
 * @param {element} parent What element to append to
 * @returns Renders html
 */
export function renderMakeBid(data, parent) {
  const profile = load('profile');
  const { id, bids, seller } = data;
  bids.sort((a, b) => b.amount - a.amount);

  if (profile) {
    const bidwrapper = document.createElement('div');
    const totalBids = document.createElement('p');
    const totalCredits = document.createElement('p');
    const dataContainer = document.createElement('div');
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

    bidwrapper.classList.add('bg-primary', 'p-2', 'text-white', 'rounded-lg');

    totalBids.innerHTML = 'Total: ' + bids.length + ' bids';

    totalBids.classList.add(
      'bg-white/10',
      'p-1',
      'px-3',
      'rounded-full',
      'text-center',
      'w-fit'
    );
    totalCredits.classList.add(
      'bg-white/10',
      'p-1',
      'px-3',
      'rounded-full',
      'text-center',
      'w-fit',
      'ml-auto',
      'mr-0'
    );
    totalCredits.innerHTML = `You have: ${profile.credits} <i class="fa-solid  fa-coins text-white ml-1"></i>`;
    dataContainer.classList.add(
      'grid',
      'grid-cols-2',
      'justify-between',
      'text-sm',
      'font-ofelia',
      'mb-2'
    );
    bidwrapper.classList.add('w-full');
    bidButton.innerHTML = 'Make Bid';
    bidContainer.classList.add(
      'w-full',
      'rounded-md',
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
      'px-3',
      'rounded-md',
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
      input.value = bids.at(0).amount + 1;
      input.min = bids.at(0).amount + 1;
    } else {
      input.value = 1;
      input.min = 1;
    }

    input.max = profile.credits;
    input.setAttribute('required', true);
    bidButton.classList.add(
      'p-1',
      'border-white',
      'border-2',
      'text-sm',
      'bg-dark/80',
      'text-white',
      'font-bold',
      'w-full',
      'rounded-md',
      'hover:bg-primary',
      'hover:text-white'
    );
    bidButton.type = 'submit';

    dataContainer.append(totalBids, totalCredits);
    bidContainer.append(input, bidButton);
    bidwrapper.append(dataContainer, bidContainer);
    parent.append(bidwrapper);
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
      'px-4',
      'rounded-lg',
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

    const inputEmail = document.querySelector('#emailLogin');
    const loginModal = document.querySelector('#loginModal');
    const overlay = document.querySelector('.overlay');
    const registerModal = document.querySelector('#registerModal');
    const inputName = document.querySelector('#nameRegister');

    loginAnchor.addEventListener('click', () => {
      loginModal.classList.add('active');
      overlay.classList.add('active');
      inputEmail.focus();

      return loginModal;
    });

    registerAnchor.addEventListener('click', () => {
      registerModal.classList.add('active');
      overlay.classList.add('active');
      inputName.focus();

      return registerModal;
    });

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
