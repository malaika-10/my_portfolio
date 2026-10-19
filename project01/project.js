const reduced = matchMedia('(prefers-reduced-motion: reduce)');
for (const video of document.querySelectorAll('video')) {
  video.muted = true;
  const button = video.parentElement.querySelector('.video-sound-toggle');
  button.addEventListener('click', () => { video.muted = !video.muted; });
  video.addEventListener('volumechange', () => {
    button.textContent = video.muted ? 'Unmute' : 'Mute';
    button.setAttribute('aria-label', `${button.textContent} ${video.getAttribute('aria-label')}`);
  });
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !reduced.matches) video.play().catch(() => {});
    else video.pause();
  }, { threshold: .3 }).observe(video);
  reduced.addEventListener('change', () => { if (reduced.matches) video.pause(); });
}
