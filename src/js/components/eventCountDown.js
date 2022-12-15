import { expirationTime } from '../components/expirationTime.js';

export function mouseOverCountdown(eventHandler, element, data, container) {
  eventHandler.addEventListener('mouseover', () => {
    expirationTime(data, element, container);
    setInterval(expirationTime, 1000, data, element, container);

    return element;
  });
}
