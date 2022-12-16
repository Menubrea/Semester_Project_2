import { getListings } from '../api/listings/read.js';
import { renderSearchTemplates } from '../templates/searchResults.js';

export async function setSearchListingsFormListener() {
  const searchControl = document.querySelector('#searchBar');
  searchControl.addEventListener('input', handleSearchControlInput);

  document.addEventListener('click', (event) => {
    if (event !== searchControl) {
      return clearSearchContainer();
    }
  });
}

export async function handleSearchControlInput(event) {
  const container = document.querySelector('#searchResults');
  const searchContainer = document.querySelector('#searchContainer');
  const listings = await getListings();
  const inputValue = event.target.value.toLowerCase();

  const results = listings.filter((listing) => {
    if (
      listing.title.toLowerCase().startsWith(inputValue) &&
      inputValue.length > 0
    ) {
      searchContainer.classList.remove('md:rounded-l-full');
      searchContainer.classList.add('shadow-xl', 'bg-primary');
      container.classList.remove('hidden');
      container.classList.add('grid');

      return true;
    } else if (inputValue.length === 0) {
      return clearSearchContainer();
    }
  });

  container.innerHTML = '';
  return renderSearchTemplates(results, container);
}

export function clearSearchContainer() {
  const container = document.querySelector('#searchResults');
  const searchInput = document.querySelector('#searchBar');
  const searchContainer = document.querySelector('#searchContainer');
  searchInput.value = '';
  container.innerHTML = '';
  searchContainer.classList.add('md:rounded-l-full');
  searchContainer.classList.remove('shadow-xl', 'bg-primary');

  container.classList.add('hidden');
  container.classList.remove('grid');
  return container;
}
