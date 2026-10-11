(() => {
  const video = document.querySelector('#contact-artist-video');
  const canvas = document.querySelector('.connect__artist-canvas');
  if (!video || !canvas) return;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, frame = 0, lastTime = -1;
  const paint = () => {
    if (video.readyState < 2) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = image.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
      // Key the olive-green backdrop while preserving warm skin and dark hair.
      const green = Math.min((g - r - 1) / 7, (g - b - 8) / 12);
      if (green > 0) {
        pixels[i + 3] = Math.round(255 * (1 - Math.min(green, 1)));
        pixels[i + 1] = Math.min(g, r + 2); // Neutralize green spill on fine hair edges.
      }
    }
    context.putImageData(image, 0, 0);
  };
  const tick = () => {
    frame = 0;
    if (video.currentTime !== lastTime) { paint(); lastTime = video.currentTime; }
    if (visible && !reduced.matches && !video.paused) frame = requestAnimationFrame(tick);
  };
  const update = () => {
    if (visible && !reduced.matches) video.play().catch(() => paint());
    else { video.pause(); if (frame) cancelAnimationFrame(frame); frame = 0; paint(); }
  };
  video.addEventListener('loadeddata', paint);
  video.addEventListener('playing', () => { if (!frame) frame = requestAnimationFrame(tick); });
  video.addEventListener('seeked', paint);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .1 }).observe(canvas);
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else update(); });
})();
