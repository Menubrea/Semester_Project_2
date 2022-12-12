import { setExpiration } from '../components/setExpiration.js';

export function createPreviewTemplate() {
  const previewtTitle = document.querySelector('#preview-title');
  const previewImg = document.querySelector('#preview-img');
  const previewDescription = document.querySelector('#preview-description');
  const listingModal = document.querySelector('#listingModal');
  const modalOverlay = document.querySelector('.overlay');
  const closeButton = document.querySelector('[data-button="close-modal"]');

  setExpiration();

  closeButton.addEventListener('click', () => {
    listingModal.classList.remove('active', 'md:grid');
    modalOverlay.classList.remove('active');
  });

  const inputMediaContainer = document.querySelector('#inputMediaContainer');
  const addImageButton = document.querySelector('#addImage');

  addImageButton.addEventListener('click', () =>
    createMediaInput(inputMediaContainer)
  );

  const formTitle = document.querySelector('#form-title');
  const formMedia = document.querySelector('#form-media');
  const formDescription = document.querySelector('#form-description');

  formTitle.addEventListener('input', () => {
    previewtTitle.innerHTML = formTitle.value;
  });

  formDescription.addEventListener('input', () => {
    previewDescription.innerHTML = formDescription.value;
  });

  formMedia.addEventListener('input', () => {
    previewImg.src = formMedia.value;
  });

  formMedia.addEventListener('paste', () => {
    previewImg.src = formMedia.value;
  });
}

export function createMediaInput(parent) {
  const form = document.querySelector('#createListing');
  const inputContainer = document.createElement('div');
  const inputElement = document.createElement('input');
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML =
    '<i class="fa-solid fa-circle-xmark bg-white text-dark rounded-full text-lg"></i>';

  inputContainer.classList.add('relative');
  deleteButton.classList.add(
    'absolute',
    'top-1/2',
    'right-2',
    '-translate-y-1/2'
  );
  deleteButton.type = 'button';

  deleteButton.addEventListener('click', () => inputContainer.remove());
  form.addEventListener('submit', () => {
    if (inputElement.value === '') {
      inputContainer.remove();
    }
  });

  inputElement.type = 'url';
  inputElement.name = 'media';
  inputElement.classList.add(
    'p-2',
    'pl-4',
    'w-full',
    'rounded-full',
    'mt-1',
    'lg:mt-0'
  );
  inputElement.title = 'Must be a fully formed and publicly accessible URL';
  inputElement.placeholder = 'Add an image';

  inputContainer.append(inputElement, deleteButton);
  parent.append(inputContainer);

  return inputElement;
}
