export function listingTemplate(data) {
  const card = document.createElement('article');
  const header = document.createElement('h3');
  const image = document.createElement('img');
  const profileImage = document.createElement('img');
  const profileName = document.createElement('p');
  const profileContainer = document.createElement('div');
  const bid = document.createElement('p');

  const { title, media, seller, bids } = data;

  // Get last entry in array.
  const lastBid = bids.at(-1);

  console.log(lastBid);

  if (media.length === 0) {
    image.src = '../../../media/images/package.jpg';
  } else {
    image.src = media;
  }

  if (bids.length === 0) {
    bid.innerHTML = 'No bid';
  } else {
    bid.innerHTML = `${lastBid.amount},-`;
  }

  function replaceImage() {
    return (image.src = '../../../media/images/package.jpg');
  }

  image.onerror = replaceImage;
  header.innerHTML = title;
  profileImage.src = seller.avatar;
  profileName.innerHTML = seller.name;

  card.classList.add('relative', 'h-48', 'w-96', 'mb-5');
  image.classList.add('w-96', 'h-48', 'rounded-lg', 'object-cover');
  profileImage.classList.add('w-6', 'h-6', 'mr-2', 'rounded-full');
  profileContainer.classList.add('flex', 'my-2', 'px-2');
  header.classList.add(
    'font-ofelia',
    'font-bold',
    'text-white',
    'bg-dark/75',
    'px-3',
    'py-1',
    'absolute',
    'top-0',
    'left-0'
  );
  bid.classList.add(
    'absolute',
    'bottom-0',
    'right-0',
    'px-3',
    'py-1',
    'font-ofelia',
    'font-bold',
    'text-white',
    'bg-dark/75'
  );

  profileContainer.append(profileImage, profileName);
  card.append(header, image, profileContainer, bid);

  return card;
}

export function renderListingTemplates(dataList, parent) {
  parent.append(...dataList.map(listingTemplate));
}
