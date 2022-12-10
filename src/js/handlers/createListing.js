import { createListing } from '../api/listings/create.js';

export async function setCreateListings() {
  const form = document.querySelector('#createListing');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const listingForm = e.target;
    const formData = new FormData(listingForm);
    const listing = Object.fromEntries(formData.entries());
    listing.media = [listing.media];
    const media = formData.getAll('media');

    Object.assign(listing.media, media);
    createListing(listing);
  });
}
