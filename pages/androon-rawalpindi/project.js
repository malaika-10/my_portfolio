const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('img');
const viewerArtwork = document.createElement('div');
viewerArtwork.className = 'image-viewer__artwork';
viewerImage.before(viewerArtwork);
viewerArtwork.append(viewerImage);
const viewerCaption = viewer.querySelector('.image-viewer__caption');

for (const button of document.querySelectorAll('[data-lightbox]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    viewerImage.src = image.src.includes('/hd-layout/') ? image.src.replace('.webp', '-hd.webp') : image.src;
    viewerArtwork.querySelector('.overview-glasses')?.remove();
    const glasses = button.querySelector('.overview-glasses');
    viewerArtwork.classList.toggle('image-viewer__artwork--overview', Boolean(glasses));
    if (glasses) viewerArtwork.append(glasses.cloneNode(true));
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
  viewerArtwork.querySelector('.overview-glasses')?.remove();
  viewerArtwork.classList.remove('image-viewer__artwork--overview');
});


for (const video of document.querySelectorAll('video')) {
  const soundToggle = video.parentElement.querySelector('.video-sound-toggle');
  const label = video.id === 'vr-intro-video' ? 'introduction video' : 'rickshaw video';
  video.muted = true;
  soundToggle.addEventListener('click', () => { video.muted = !video.muted; });
  video.addEventListener('volumechange', () => {
    soundToggle.textContent = video.muted ? 'Unmute' : 'Mute';
    soundToggle.setAttribute('aria-label', `${video.muted ? 'Unmute' : 'Mute'} ${label}`);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { video.play().catch(() => {}); }
      else { video.pause(); }
    }, { threshold: 0.3 });
    observer.observe(video);
  }
}
