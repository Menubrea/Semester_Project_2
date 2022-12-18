import { hostPath } from '../api/constants.js';

/**
 *
 * @param {object} data object data
 * @param {element} element the element that contains the data
 * @param {element} parent the parent that holds the element
 * @returns
 */
export function expirationTime(data, element, parent) {
  const { endsAt } = data;

  // When listing expires
  const expiration = new Date(endsAt).getTime();

  // Current time
  const now = new Date().getTime();

  // Difference between then and now
  const distance = expiration - now;
  const expired = expiration < now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (expired) {
    element.innerHTML = 'This auction has ended';
  } else if (!days && !hours && !minutes) {
    element.innerHTML = ` ${seconds}s left`;
  } else if (!days && !hours) {
    element.innerHTML = ` ${minutes}m ${seconds}s left`;
  } else if (!days) {
    element.innerHTML = `${hours}h ${minutes}m ${seconds}s left`;
  } else {
    element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }

  parent.append(element);
  return element;
}
