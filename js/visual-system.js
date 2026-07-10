import { isCoarsePointer, reducedMotion } from './config.js';

export function setupVisualSystem() {
  const animated = [...document.querySelectorAll('.depth-scene, .visual-panel, .mini-visual, .final-visual')];
  if (!animated.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
  }, { rootMargin: '-12% 0px -12% 0px', threshold: .12 });
  animated.forEach(element => observer.observe(element));

  if (reducedMotion) return;

  const applyScroll = () => {
    const vh = innerHeight || 1;
    animated.forEach(element => {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (vh * .55 - rect.top) / vh));
      element.style.setProperty('--scroll', progress.toFixed(3));
      element.style.setProperty('--lift', `${(-progress * 12).toFixed(1)}px`);
      element.style.setProperty('--twist', `${(progress * 3).toFixed(2)}deg`);
    });
  };

  let scrollFrame = 0;
  const requestScroll = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      applyScroll();
    });
  };

  addEventListener('scroll', requestScroll, { passive: true });
  addEventListener('resize', requestScroll, { passive: true });
  applyScroll();

  if (isCoarsePointer) return;

  let pointerFrame = 0;
  addEventListener('pointermove', event => {
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      const x = event.clientX / innerWidth - .5;
      const y = event.clientY / innerHeight - .5;
      document.documentElement.style.setProperty('--ry', `${(x * 4).toFixed(2)}deg`);
      document.documentElement.style.setProperty('--rx', `${(-y * 3).toFixed(2)}deg`);
    });
  }, { passive: true });
}
