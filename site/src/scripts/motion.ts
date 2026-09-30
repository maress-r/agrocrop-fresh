/**
 * ═══════════════════════════════════════════════════════════════════
 *  MOTION SYSTEM
 *  GSAP + ScrollTrigger + SplitText + Lenis, driven by data attributes:
 *
 *    data-hero / data-hero-line   on-load hero choreography
 *    data-reveal                  rise + fade on scroll (once)
 *    data-reveal-delay="0.15"     optional delay for data-reveal
 *    data-reveal-group            stagger direct children
 *    data-split                   masked line-by-line heading reveal
 *    data-parallax="10"           scrubbed vertical drift (yPercent)
 *    data-counter="2500"          count-up number, locale-formatted
 *    data-counter-delay="0.1"     optional delay for data-counter
 *    data-viewport-play           <video> plays only while in viewport
 *    data-inview                  gets `is-inview` once seen; CSS animates
 *                                 (e.g. line drawings, global.css)
 *
 *  Respects prefers-reduced-motion: the module exits early and the
 *  `has-motion` class (set in <head>) is removed, so all content is
 *  fully visible and static.
 * ═══════════════════════════════════════════════════════════════════
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduced) {
  document.documentElement.classList.remove('has-motion');
} else {
  init();
}

function init(): void {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ── Smooth scroll ─────────────────────────────────────────────── */
  const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  if (import.meta.env.DEV) {
    // Dev-only handles for tooling/QA (not shipped in production builds).
    Object.assign(window as never, { __lenis: lenis, __gsap: gsap });
  }

  /* Anchor links scroll smoothly, accounting for the page context. */
  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!anchor) return;
    const url = new URL(anchor.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    history.pushState(null, '', url.hash);
  });

  const EASE = 'power3.out';

  /* ── Hero choreography (on load) ───────────────────────────────── */
  const heroLines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
  const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero]');

  if (heroLines.length || heroItems.length) {
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power4.out' } });
    const zoom = document.querySelector('[data-hero-zoom]');
    if (zoom) {
      tl.fromTo(zoom, { scale: 1.07 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
    }
    if (heroLines.length) {
      /* CSS pre-sets translateY(112%); animating y→0 resolves it exactly. */
      tl.to(heroLines, { y: 0, duration: 1.25, stagger: 0.13 }, 0.1);
    }
    if (heroItems.length) {
      tl.fromTo(
        heroItems,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.11, ease: EASE },
        heroLines.length ? '-=0.75' : 0
      );
    }
  }

  /* ── Scroll reveals ────────────────────────────────────────────── */
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: parseFloat(el.dataset.revealDelay ?? '0'),
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.fromTo(
      Array.from(group.children),
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });

  /* ── Masked line reveals (after fonts settle) ──────────────────── */
  document.fonts.ready.then(() => {
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      const split = new SplitText(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
      });
      gsap.set(el, { visibility: 'visible' });
      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    });
    ScrollTrigger.refresh();
  });

  /* ── Parallax drift ────────────────────────────────────────────── */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amp = parseFloat(el.dataset.parallax || '10');
    gsap.fromTo(
      el,
      { yPercent: -amp },
      {
        yPercent: amp,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  /* ── Counters ──────────────────────────────────────────────────── */
  const numberLocale = document.documentElement.lang.startsWith('sr') ? 'sr-RS' : 'en-US';
  const formatter = new Intl.NumberFormat(numberLocale);

  /*
   * One long, steep ease-out for every counter: most of the distance is
   * covered early, then the last digits tick ever more slowly into place,
   * so each number settles on its value instead of stopping short. Small
   * and large numbers decelerate the same way; they start from zero only
   * once seen (the markup holds the final value until then).
   */
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter ?? '0');
    const state = { value: 0 };
    let shown = '';
    const render = () => {
      const text = formatter.format(Math.round(state.value));
      if (text !== shown) el.textContent = shown = text;
    };
    gsap.to(state, {
      value: target,
      duration: 2.8,
      delay: parseFloat(el.dataset.counterDelay ?? '0'),
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onStart: render,
      onUpdate: render,
    });
    render();
  });

  /* ── In-view state (CSS does the animating) ────────────────────── */
  gsap.utils.toArray<HTMLElement>('[data-inview]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => el.classList.add('is-inview'),
    });
  });

  /* ── Viewport-gated video playback ─────────────────────────────── */
  gsap.utils.toArray<HTMLVideoElement>('video[data-viewport-play]').forEach((video) => {
    const play = () => video.play().catch(() => {});
    const pause = () => video.pause();
    ScrollTrigger.create({
      trigger: video,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    });
  });
}
