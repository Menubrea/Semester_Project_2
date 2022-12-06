export function popUp(message, parent) {
  const container = document.createElement('div');
  const messageContainer = document.createElement('p');
  const headerContainer = document.createElement('p');

  headerContainer.classList.add(
    'font-lust',
    'text-primary',
    'p-2',
    'pb-1',
    'text-lg',
    'rounded-t',
    'w-full',
    'border-b',
    'border-primary/20',
    'bg-dark/10'
  );
  container.classList.add(
    'fixed',
    'top-16',
    'bg-white',
    'shadow-lg',
    'z-50',
    'rounded',
    'backdrop-blur-lg',
    'inset-x-24'
  );
  messageContainer.classList.add('font-ofelia', 'p-2', 'text-sm', 'text-dark');

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
