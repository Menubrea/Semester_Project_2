export function createPreviewTemplate() {
  const previewtTitle = document.querySelector('#preview-title');
  const previewImg = document.querySelector('#preview-img');
  const previewDescription = document.querySelector('#preview-description');

  const formTitle = document.querySelector('#form-title');
  const formMedia = document.querySelector('#form-media');
  const formDescription = document.querySelector('#form-description');

  formTitle.addEventListener('keyup', () => {
    previewtTitle.innerHTML = formTitle.value;
  });

  formDescription.addEventListener('keyup', () => {
    previewDescription.innerHTML = formDescription.value;
  });

  formMedia.addEventListener('keyup', () => {
    previewImg.src = formMedia.value;
  });

  formMedia.addEventListener('paste', () => {
    previewImg.src = formMedia.value;
  });
}
