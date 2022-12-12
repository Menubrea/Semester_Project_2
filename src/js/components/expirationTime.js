import { hostPath } from '../api/constants.js';

export function expirationTime(data, element, parent) {
  const { endsAt } = data;

  // When listing expires
  const expiration = new Date(endsAt).getTime();

  // Current time
  const now = new Date().getTime();

  // Difference between then and now
  const distance = expiration - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const path = location.pathname;

  if (
    path === '/' ||
    path === '/index.html' ||
    path === hostPath ||
    path === hostPath + '/index.html'
  ) {
    element.innerHTML = `${days}d ${hours}h ${minutes}m`;
  } else {
    element.innerHTML = `This auction ends in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  parent.append(element);
  return element;
}
