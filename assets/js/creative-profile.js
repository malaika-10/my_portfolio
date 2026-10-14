(() => {
  const rig = document.querySelector('.artist-rig');
  if (!rig) return;
  const pupils = [...rig.querySelectorAll('.artist-rig__pupil')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, frame = 0;
  const draw = () => {
    currentX += (targetX - currentX) * .18;
    currentY += (targetY - currentY) * .18;
    pupils.forEach(pupil => pupil.setAttribute('transform', `translate(${currentX.toFixed(3)} ${currentY.toFixed(3)})`));
    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > .02) frame = requestAnimationFrame(draw);
    else {
      currentX = targetX; currentY = targetY;
      pupils.forEach(pupil => pupil.setAttribute('transform', `translate(${currentX.toFixed(3)} ${currentY.toFixed(3)})`));
      frame = 0;
    }
  };
  const aim = (x, y) => { targetX = x; targetY = y; if (!frame) frame = requestAnimationFrame(draw); };
  window.addEventListener('pointermove', event => {
    if (paused) return;
    const rect = rig.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const eyeX = rect.left + rect.width * .526;
    const eyeY = rect.top + rect.height * .25;
    const dx = event.clientX - eyeX, dy = event.clientY - eyeY;
    const distance = Math.hypot(dx, dy);
    // Independent pupils move inside fixed eye-opening masks, never over eyelashes.
    const strength = Math.min(distance / 240, 1);
    aim(distance ? dx / distance * 6 * strength : 0, distance ? dy / distance * 3 * strength : 0);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => aim(0, 0));
  window.addEventListener('blur', () => aim(0, 0));
  reduced.addEventListener('change', event => { paused = event.matches; aim(0, 0); });

})();
