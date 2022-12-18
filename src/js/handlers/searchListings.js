import { getListings } from '../api/listings/read.js';
import { renderSearchTemplates } from '../templates/searchResults.js';

/**
 * Handler for Search event
 */
export async function setSearchListingsFormListener() {
  const searchControl = document.querySelector('#searchBar');
  const searchButton = document.querySelector('#searchButton');

  searchControl.addEventListener('search', () => {
    return handleSearchControlInput(searchControl);
  });
  searchButton.addEventListener('click', () => {
    return handleSearchControlInput(searchControl);
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('i')) {
      return;
    } else if (event.target === searchControl) {
      return;
    } else {
      return clearSearchContainer();
    }
  });

  searchControl.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue.length === 0) {
      return clearSearchContainer();
    }
  });

  const closeButton = document.querySelector('#searchClose');
  closeButton.addEventListener('click', () => {
    return clearSearchContainer();
  });
}

/**
 *
 * @param {this} event On interacting with the input
 * @returns Returns an array of items matching event.target.value
 */
export async function handleSearchControlInput(input) {
  const container = document.querySelector('#searchResults');
  const searchContainer = document.querySelector('#searchContainer');
  const searchText = document.querySelector('#searchText');
  const closeButton = document.querySelector('#searchClose');
  const listings = await getListings();
  const inputValue = input.value.toLowerCase();

  if (inputValue.length > 0) {
    searchContainer.classList.remove('md:rounded-l-full');
    searchContainer.classList.add('shadow-xl', 'bg-primary');
    closeButton.classList.remove('hidden');
    container.classList.remove('hidden');
    container.classList.add('grid');
    searchText.classList.remove('hidden');
    searchText.innerHTML = '';
    searchText.innerHTML = `No results for: ${inputValue}`;
  }

  const results = listings.filter((listing) => {
    if (
      listing.title.toLowerCase().startsWith(inputValue) &&
      inputValue.length > 0
    ) {
      searchText.innerHTML = '';
      searchText.innerHTML = `Search results for: ${inputValue}`;

      return true;
    }
  });

  container.innerHTML = '';
  return renderSearchTemplates(results, container);
}

export function clearSearchContainer() {
  const container = document.querySelector('#searchResults');
  const searchInput = document.querySelector('#searchBar');
  const searchContainer = document.querySelector('#searchContainer');
  const closeButton = document.querySelector('#searchClose');
  const searchText = document.querySelector('#searchText');

  searchInput.value = '';
  container.innerHTML = '';
  closeButton.classList.add('hidden');
  searchContainer.classList.add('md:rounded-l-full');
  searchContainer.classList.remove('shadow-xl', 'bg-primary');
  searchText.classList.add('hidden');

  container.classList.add('hidden');
  container.classList.remove('grid');
  return container;
}
