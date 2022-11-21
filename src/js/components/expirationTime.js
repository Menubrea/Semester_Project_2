export function expirationTime(data, element, parent) {
  const { endsAt } = data;

  // When listing expires
  const expiration = new Date(endsAt).getTime();

  // Current time
  const now = new Date().getTime();

  // Difference between then and now
  const distance = expiration - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const expired = expiration < now;

  if (expired) {
    element.innerHTML = 'Expired';
    element.classList.add('bg-primary');
    parent.classList.add('hidden');
    return element;
  }

  element.innerHTML = `${days}d ${hours}h ${minutes}m`;
  element.classList.add('bg-secondary');
  return element;
}