const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('img');
const viewerCaption = viewer.querySelector('.image-viewer__caption');

for (const button of document.querySelectorAll('[data-lightbox]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    viewerImage.src = image.src.includes('/hd-layout/') ? image.src.replace('.webp', '-hd.webp') : image.src;
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
