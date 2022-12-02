export function popUp(message, parent) {
  const container = document.createElement('div');
  const messageContainer = document.createElement('p');
  const headerContainer = document.createElement('p');

  headerContainer.classList.add(
    'font-lust',
    'text-primary',
    'bg-white',
    'p-2',
    'border-b',
    'border-dark/10',
    'w-96',
    'pb-1',
    'text-lg',
    'rounded-t',
    'bg-lightGrey'
  );
  container.classList.add(
    'fixed',
    'right-10',
    'bottom-10',
    'bg-white',
    'shadow-lg',
    'z-50',
    'rounded'
  );
  messageContainer.classList.add(
    'font-ofelia',
    'p-2',
    'text-sm',
    'text-dark',
    'w-96'
  );

  function hidePopUp() {
    container.classList.remove('fixed');
    container.classList.add('hidden');

    return container;
  }

  setTimeout(hidePopUp, 3000);

  headerContainer.innerHTML = 'Vender';
  messageContainer.innerHTML = message;
  container.append(headerContainer, messageContainer);

  parent.append(container);

  return container;
}
