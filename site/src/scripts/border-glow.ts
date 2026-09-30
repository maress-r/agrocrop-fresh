/**
 * Pointer tracking for [data-border-glow] cards (components/ui/GlowCard.astro).
 *
 * --glow-angle points from the card's centre towards the pointer and
 * --glow-edge (0–1) says how close to the border it is. A mouse lights the
 * card while it's over it; touch and pen light it where they land and let
 * it fade shortly after lifting. Where there's no hover at all, each card
 * sweeps once when first seen, so it's clear it responds.
 */
const cards = document.querySelectorAll<HTMLElement>('[data-border-glow]');
const touchOnly = window.matchMedia('(hover: none)');
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

cards.forEach((card) => {
  let frame = 0;
  let x = 0;
  let y = 0;
  let fade = 0;

  const paint = () => {
    frame = 0;
    const r = card.getBoundingClientRect();
    const dx = x - (r.left + r.width / 2);
    const dy = y - (r.top + r.height / 2);
    const edge = Math.min(1, Math.max(Math.abs(dx) / (r.width / 2), Math.abs(dy) / (r.height / 2)));
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    card.style.setProperty('--glow-edge', edge.toFixed(3));
    card.style.setProperty('--glow-angle', `${angle.toFixed(1)}deg`);
  };

  const track = (e: PointerEvent) => {
    x = e.clientX;
    y = e.clientY;
    frame ||= requestAnimationFrame(paint);
  };

  const light = (e: PointerEvent) => {
    track(e);
    clearTimeout(fade);
    card.classList.remove('is-sweeping');
    card.classList.add('is-lit');
  };

  const dim = (e: PointerEvent) => {
    clearTimeout(fade);
    if (e.pointerType === 'mouse') card.classList.remove('is-lit');
    else fade = window.setTimeout(() => card.classList.remove('is-lit'), 1400);
  };

  card.addEventListener('pointerenter', light);
  card.addEventListener('pointerdown', light);
  card.addEventListener('pointermove', track);
  card.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') dim(e);
  });
  card.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse') dim(e);
  });
  card.addEventListener('pointercancel', dim);
  card.addEventListener('animationend', (e) => {
    if (e.target === card) card.classList.remove('is-sweeping');
  });
});

if (touchOnly.matches && !still.matches) {
  const seen = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        seen.unobserve(entry.target);
        entry.target.classList.add('is-sweeping');
      });
    },
    { threshold: 0.6 }
  );
  cards.forEach((card) => seen.observe(card));
}
