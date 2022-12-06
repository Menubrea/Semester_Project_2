import { getListings } from '../api/listings/read.js';
import { renderSearchTemplates } from '../templates/searchResults.js';

export async function setSearchListingsFormListener() {
  const searchControl = document.querySelector('#searchBar');
  searchControl.addEventListener('keyup', handleSearchControlInput);

  document.addEventListener('click', (event) => {
    if (event !== searchControl) {
      return clearSearchContainer();
    }
  });
}

export async function handleSearchControlInput(event) {
  const container = document.querySelector('#searchResults');
  const filterNav = document.querySelector('#filterNav');
  const listings = await getListings();
  const inputValue = event.target.value.toLowerCase();

  const results = listings.filter((listing) => {
    if (
      listing.title.toLowerCase().startsWith(inputValue) &&
      inputValue.length > 0
    ) {
      filterNav.classList.remove('rounded-lg');
      filterNav.classList.add('rounded-t-lg');
      container.classList.add('grid');
      container.classList.remove('hidden');
      return listing;
    } else if (inputValue.length === 0) {
      return clearSearchContainer();
    }
  });

  container.innerHTML = '';
  return renderSearchTemplates(results, container);
}

export function clearSearchContainer() {
  const container = document.querySelector('#searchResults');
  const searchName = document.querySelector('#searchBar');
  const filterNav = document.querySelector('#filterNav');
  searchName.value = '';
  container.innerHTML = '';
  filterNav.classList.add('rounded-lg');
  filterNav.classList.remove('rounded-t-lg');
  container.classList.add('hidden');
  container.classList.remove('grid');
  return container;
}
