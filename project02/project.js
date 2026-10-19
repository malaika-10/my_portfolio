const viewer = document.querySelector('.project-viewer');
const content = viewer.querySelector('.project-viewer__content');
for (const button of document.querySelectorAll('[data-enlarge]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img').cloneNode(true);
    image.src = image.src.replace('.webp', '-hd.webp');
    image.removeAttribute('srcset'); image.removeAttribute('sizes'); image.loading = 'eager';
    content.style.setProperty('--slide-ratio', Number(image.width) / Number(image.height));
    image.style.cssText = 'display:block;width:100%;height:auto';
    content.replaceChildren(image); viewer.showModal();
  });
}
viewer.querySelector('.project-viewer__close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const r = viewer.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) viewer.close();
});
viewer.addEventListener('close', () => content.replaceChildren());
