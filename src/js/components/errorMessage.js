const errorContainer = document.querySelector('#errorContainer');
const loaderContainer = document.querySelector('#loaderContainer');
/**
 * Function for displaying information to the user
 * @returns div with error message
 */

export function displayErrorMessage() {
  loaderContainer.classList.add('hidden');

  const error = document.createElement('div');
  const errorMessage = document.createElement('div');
  const button = document.createElement('button');

  error.classList.add('bg-white', 'p-10', 'rounded-lg', 'shadow-xl', 'w-full');

  button.classList.add(
    'px-4',
    'py-2',
    'font-ofelia',
    'bg-primary',
    'hover:opacity-80',
    'text-white',
    'mt-5',
    'rounded-lg',
    'float-right'
  );

  errorMessage.innerHTML = `<p
          class="logo font-lust text-2xl text-primary items-center flex w-fit mx-auto mb-5"
        >
          <i
            class="fa-brands fa-nfc-symbol text-white bg-primary text-sm p-2 mr-1 rounded-lg"
          ></i>
          Vender
        </p>
        <p class="font-ofelia p-2 bg-contrast/20 max-w-sm rounded-md mb-5"> Uh, oh! Something went wrong. Sometimes it may be resolved by waiting a minute before trying again. Reload page when you're ready to explore! </p>`;

  button.addEventListener('click', () => location.reload());
  button.innerHTML = 'Reload';

  error.append(errorMessage, button);
  errorContainer.append(error);

  return error;
}
