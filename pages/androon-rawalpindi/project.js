const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('img');
const viewerCaption = viewer.querySelector('.image-viewer__caption');

for (const button of document.querySelectorAll('[data-lightbox]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    viewerImage.src = image.src.replace('.webp', '-hd.webp');
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

const introVideo = document.querySelector('#vr-intro-video');
const soundToggle = document.querySelector('.video-sound-toggle');
introVideo.muted = true;
soundToggle.addEventListener('click', () => { introVideo.muted = !introVideo.muted; });
introVideo.addEventListener('volumechange', () => {
  soundToggle.textContent = introVideo.muted ? 'Unmute' : 'Mute';
  soundToggle.setAttribute('aria-label', introVideo.muted ? 'Unmute introduction video' : 'Mute introduction video');
});
if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { introVideo.play().catch(() => {}); }
    else { introVideo.pause(); }
  }, { threshold: 0.3 });
  videoObserver.observe(introVideo);
}
