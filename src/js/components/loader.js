export function clearLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.remove('flex');
  loader.classList.add('hidden');
  return loader;
}
