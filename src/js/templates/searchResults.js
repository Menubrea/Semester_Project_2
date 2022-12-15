import { defaultProfile } from '../api/constants.js';

export function searchTemplate(data) {
  const card = document.createElement('article');
  const anchor = document.createElement('a');
  const body = document.createElement('div');
  const profileContainer = document.createElement('div');
  const header = document.createElement('p');
  const userName = document.createElement('p');
  const userAvatar = document.createElement('img');
  const image = document.createElement('img');

  const { title, media, seller, id } = data;

  if (title.length > 15) {
    header.innerHTML = title.slice(0, 15).concat('...').trim();
  } else {
    header.innerHTML = title;
  }

  if (userName.length > 15) {
    header.innerHTML = title.slice(0, 15).concat('...').trim();
  } else {
    header.innerHTML = title;
  }

  if (media.length === 0) {
    image.src = defaultProfile;
    image.alt = 'stock image when no image is provided';
  } else {
    image.src = media[0];
    image.alt = `Image for ${title}`;
  }

  if (seller.avatar === '') {
    userAvatar.src = defaultProfile;
    userAvatar.alt = 'stock profile when no profile is set';
  } else {
    userAvatar.src = seller.avatar;
    userAvatar.alt = `${seller.name}'s avatar`;
  }

  userName.innerHTML = seller.name;
  userAvatar.src = seller.avatar;
  anchor.href = `./listing/?id=${id}`;
  userAvatar.setAttribute('onerror', `src="${defaultProfile}"`);
  image.setAttribute('onerror', `src="${defaultProfile}"`);
  anchor.classList.add('flex', 'gap-2');
  profileContainer.classList.add('flex', 'gap-2', 'items-center');
  image.classList.add('rounded-lg', 'w-16', 'h-12');
  header.classList.add('font-ofelia', 'text-primary', 'font-bold');
  userAvatar.classList.add('w-4', 'h-4', 'rounded-full');
  card.classList.add(
    'bg-dark/10',
    'backdrop-blur-lg',
    'p-2',
    'rounded-lg',
    'h-16',
    'hover:bg-white/70'
  );
  userName.classList.add('text-dark/70', 'font-ofelia');

  profileContainer.append(userAvatar, userName);
  body.append(header, profileContainer);
  anchor.append(image, body);
  card.append(anchor);

  return card;
}

export function renderSearchTemplates(dataList, parent) {
  parent.append(...dataList.map(searchTemplate));
}
