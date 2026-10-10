const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('img');
const viewerCaption = viewer.querySelector('.image-viewer__caption');

for (const button of document.querySelectorAll('[data-lightbox]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    viewerImage.src = image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = image.alt;
    viewer.showModal();
  });
}

viewer.querySelector('.image-viewer__close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  // Only a click outside the dialog's rectangle dismisses the backdrop.
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) {
    viewer.close();
  }
});
viewer.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
});
