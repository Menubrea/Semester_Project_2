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
    'rounded-t',
    'w-full',
    'border-b',
    'border-primary/20',
    'bg-contrast',
    'flex',
    'items-center',
    'justify-center'
  );
  container.classList.add(
    'fixed',
    'top-0',
    'bg-white',
    'shadow-lg',
    'backdrop-blur-lg',
    'inset-x-0',
    'w-full',
    'popUp'
  );
  messageContainer.classList.add('font-ofelia', 'p-2', 'text-sm', 'text-dark');

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
