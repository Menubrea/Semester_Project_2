import { expirationTime } from '../components/expirationTime.js';

/**
 * A function to count down time till experiation upon mouseover Event
 * @param {element} eventHandler What element should trigger the mouseover event
 * @param {element} element The element that holds the information being displayed
 * @param {object} data object data
 * @param {element} container container to append to
 */
export function mouseOverCountdown(eventHandler, element, data, container) {
  eventHandler.addEventListener('mouseover', () => {
    expirationTime(data, element, container);
    setInterval(expirationTime, 1000, data, element, container);

    return element;
  });
}
