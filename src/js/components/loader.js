/**
 * A function to hide the loader
 * @returns hides the loader from the user when called
 */
export function clearLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.remove('flex');
  loader.classList.add('hidden');
  return loader;
}
