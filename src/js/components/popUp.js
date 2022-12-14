/**
 * A function to display a popup message when called
 * @param {string} message The message you want to be displayed
 * @param {element} parent The parent element you want the message to be contained to.
 * @returns Expect to see a popup with the content of message.
 */

export function popUp(message, parent) {
  const container = document.createElement('div');
  const messageContainer = document.createElement('p');
  const headerContainer = document.createElement('p');

  headerContainer.classList.add(
    'font-lust',
    'text-dark',
    'p-2',
    'pb-1',
    'text-2xl',
    'w-full',
    'border-b',
    'border-primary/20',
    'bg-contrast',
    'flex',
    'items-center',
    'justify-center',
    'px-10'
  );
  container.classList.add(
    'fixed',
    'bg-white',
    'shadow-lg',
    'backdrop-blur-lg',
    'w-max',
    'popUp',
    'left-1/2',
    '-translate-x-1/2',
    'top-1/2',
    '-translate-y-1/2',
    'max-w-lg',
    'border-2',
    'border-contrast'
  );
  messageContainer.classList.add(
    'font-ofelia',
    'p-2',
    'text-md',
    'text-dark',
    'text-bold',
    'px-10'
  );

  function hidePopUp() {
    container.classList.remove('fixed');
    container.classList.add('hidden');

    return container;
  }

  setTimeout(hidePopUp, 3000);

  headerContainer.innerHTML = `<i
            class="fa-brands fa-nfc-symbol text-white bg-dark text-sm p-2 mr-2 rounded-lg grid items-center justify-center "
          ></i>Vender`;
  messageContainer.innerHTML = message;
  container.append(headerContainer, messageContainer);

  parent.append(container);

  return container;
}
