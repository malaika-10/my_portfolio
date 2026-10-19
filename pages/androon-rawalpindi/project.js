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
