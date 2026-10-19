const viewer = document.querySelector('.project-viewer');
const content = viewer.querySelector('.project-viewer__content');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function setupVideo(video, observe = true) {
  video.muted = true;
  const button = video.parentElement.querySelector('.video-sound-toggle');
  button.addEventListener('click', () => { video.muted = !video.muted; });
  video.addEventListener('volumechange', () => {
    button.textContent = video.muted ? 'Unmute' : 'Mute';
    button.setAttribute('aria-label', `${button.textContent} ${video.getAttribute('aria-label')}`);
  });
  if (observe) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !viewer.open && !reduced.matches) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .3 }).observe(video);
  }
}
document.querySelectorAll('main video').forEach(video => setupVideo(video));
for (const button of document.querySelectorAll('[data-enlarge]')) {
  button.addEventListener('click', () => {
    document.querySelectorAll('main video').forEach(v => v.pause());
    const panel = button.closest('.pdf-panel').cloneNode(true);
    const background = panel.querySelector('.pdf-panel__zoom img');
    background.src = background.src.replace('.webp', '-hd.webp');
    background.removeAttribute('srcset'); background.removeAttribute('sizes');
    panel.querySelector('.pdf-panel__zoom').replaceWith(background);
    panel.querySelector('.sr-only')?.remove();
    panel.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
    panel.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    content.style.setProperty('--slide-ratio', Number(background.width) / Number(background.height));
    content.replaceChildren(panel); viewer.showModal();
    panel.querySelectorAll('video').forEach(video => { setupVideo(video, false); if (!reduced.matches) video.play().catch(() => {}); });
  });
}
viewer.querySelector('.project-viewer__close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const r = viewer.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) viewer.close();
});
viewer.addEventListener('close', () => {
  content.querySelectorAll('video').forEach(v => v.pause()); content.replaceChildren();
  document.querySelectorAll('main video').forEach(v => {
    const r = v.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight && !reduced.matches) v.play().catch(() => {});
  });
});
