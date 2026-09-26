/**
 * ═══════════════════════════════════════════════════════════════════
 *  SCROLL CAMERA
 *  Pins a "stage" and moves a camera across a taller "world" behind it.
 *  Vertical scroll drives the camera through a sequence of shots: it
 *  eases onto each one, lingers while that block is read (drifting
 *  slowly down it, so long copy stays readable), then glides diagonally
 *  to the next — horizontal travel with no horizontal scrollbar.
 *
 *  Markup contract, inside [data-scroll-camera]:
 *    [data-camera-stage]          pinned element; its box is the camera frame
 *    [data-camera-world]          taller content the camera travels over
 *    [data-camera-shot]           focal blocks, data-side="left" | "right"
 *    [data-camera-depth="0.3"]    background layer that moves at a fraction
 *                                 of the camera's horizontal travel (parallax)
 *    [data-camera-draw]           revealed top-down as the camera descends
 *    [data-camera-grow]           grows in via --p (0 → 1) as the camera nears
 *
 *  Tuning, as a CSS custom property on [data-scroll-camera]:
 *    --camera-pan   horizontal swing, as a fraction of the stage width
 *
 *  The script only takes over when motion is allowed, and marks that by
 *  adding `is-camera` to the root. Without the class the markup is an
 *  ordinary static layout, so reduced motion or a failed load still reads.
 * ═══════════════════════════════════════════════════════════════════
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Growth line, as a fraction of stage height: the frame's bottom edge, so the
 *  stem is always drawn full-length and parts unfurl as they rise into view. */
const REVEAL_LINE = 1;
/** Stage height a growing part needs to reach full size. */
const GROW_BAND = 0.26;
/** Opacity of shots the camera is not looking at. */
const DIM = 0.22;
/**
 * Share of the first swing already taken before the pin: the opening frame
 * sits near the plant, with the first chapter waiting just inside the edge.
 */
const INTRO_LEAD = 0.25;

interface Segment {
  s0: number;
  s1: number;
  x0: number;
  x1: number;
}

interface Focus {
  in0: number;
  in1: number;
  out0: number;
  out1: number;
}

interface Plan {
  H: number;
  total: number;
  shotX: number[];
  xSegs: Segment[];
  y: (s: number) => number;
  focus: Focus[];
  drawTop: number;
  drawH: number;
  growY: number[];
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (u: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(u, 0, 1));

/** Distance from `ancestor` down to `el`, ignoring transforms (offset chain). */
function offsetTopWithin(el: HTMLElement, ancestor: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson). Gives the camera a
 * continuous velocity through every shot, so there is no jolt where a slow
 * dwell hands over to a fast glide. End slopes are imposed so the pin starts
 * and ends at the same speed as the page scrolling around it.
 */
function monotone(xs: number[], ys: number[], startSlope: number, endSlope: number) {
  const n = xs.length;
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x || 1));
  const m = xs.map((_, i) =>
    i === 0 ? startSlope : i === n - 1 ? endSlope : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2
  );
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const h = a * a + b * b;
    if (h > 9) {
      const k = 3 / Math.sqrt(h);
      m[i] = k * a * d[i];
      m[i + 1] = k * b * d[i];
    }
  }
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i];
    const t = (x - xs[i]) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * ys[i] +
      (t3 - 2 * t2 + t) * h * m[i] +
      (-2 * t3 + 3 * t2) * ys[i + 1] +
      (t3 - t2) * h * m[i + 1]
    );
  };
}

function setup(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-camera-stage]');
  const world = root.querySelector<HTMLElement>('[data-camera-world]');
  const shots = [...root.querySelectorAll<HTMLElement>('[data-camera-shot]')];
  if (!stage || !world || !shots.length) return;

  const depth = [...root.querySelectorAll<HTMLElement>('[data-camera-depth]')].map((el) => ({
    el,
    k: parseFloat(el.dataset.cameraDepth ?? '0') || 0,
  }));
  const draw = root.querySelector<HTMLElement>('[data-camera-draw]');
  const grows = [...root.querySelectorAll<HTMLElement>('[data-camera-grow]')];

  function buildPlan(): Plan {
    const W = stage!.clientWidth;
    const H = stage!.clientHeight;
    const pan = W * (parseFloat(getComputedStyle(root).getPropertyValue('--camera-pan')) || 0);

    // Reading zone: clear of the fixed header, with breathing room below.
    const headerH = document.getElementById('site-header')?.offsetHeight ?? 0;
    const safeTop = headerH + H * 0.04;
    const safeBottom = H * 0.07;
    const zone = H - safeTop - safeBottom;
    const yMax = Math.max(0, world!.offsetHeight - H);
    const minDrift = H * 0.1;

    // Each shot: where the camera looks horizontally, and the vertical
    // stretch it covers while lingering. Short blocks are centred in the
    // zone with a small drift; tall ones are scanned top to bottom.
    const shotsInfo = shots.map((el) => {
      const top = offsetTopWithin(el, world!);
      const h = el.offsetHeight;
      let ys: number;
      let ye: number;
      if (h + minDrift <= zone) {
        const mid = top + h / 2 - (safeTop + zone / 2);
        ys = mid - minDrift / 2;
        ye = mid + minDrift / 2;
      } else {
        ys = top - safeTop;
        ye = top + h - (H - safeBottom);
      }
      return {
        x: (el.dataset.side === 'right' ? 1 : -1) * pan,
        ys: clamp(ys, 0, yMax),
        ye: clamp(ye, 0, yMax),
      };
    });

    // Lay the path out along scroll distance, in pixels.
    const ks = [0];
    const ky = [0];
    const xSegs: Segment[] = [];
    const focus: Focus[] = [];
    let s = 0;
    let x = shotsInfo[0].x * INTRO_LEAD;
    let y = 0;
    const step = (len: number, toX: number, toY: number) => {
      xSegs.push({ s0: s, s1: s + len, x0: x, x1: toX });
      s += len;
      x = toX;
      y = toY;
      ks.push(s);
      ky.push(toY);
    };

    shotsInfo.forEach((shot, i) => {
      const in0 = s;
      // Glide in. The first glide is sized so the camera leaves the pin at
      // roughly page speed; later ones are a steady, unhurried diagonal.
      step(i === 0 ? Math.max(H * 0.5, (shot.ys - y) * 1.15) : H * 0.95, shot.x, shot.ys);
      const in1 = s;
      if (i > 0) focus[i - 1].out1 = in1;
      // Linger: slower than scroll, long enough that a flick of the wheel
      // doesn't swing the block away mid-sentence.
      step(Math.max(H * 0.6, (shot.ye - shot.ys) * 1.4 + H * 0.4), shot.x, shot.ye);
      focus.push({ in0, in1, out0: s, out1: s });
    });

    // Outro: hold the last framing and carry on down to the fruit.
    const outroLen = Math.max(H * 0.4, (yMax - y) * 1.15);
    step(outroLen, x, yMax);
    // The last chapter only recedes halfway, it is still leaving the frame.
    focus[focus.length - 1].out1 = s + outroLen;

    const drawTop = draw ? offsetTopWithin(draw, world!) : 0;
    const drawH = draw?.offsetHeight ?? 0;
    const growY = grows.map((el) => offsetTopWithin(el, world!) + el.offsetHeight / 2);

    return {
      H,
      total: s,
      shotX: shotsInfo.map((sh) => sh.x),
      xSegs,
      y: monotone(ks, ky, 1, 1),
      focus,
      drawTop,
      drawH,
      growY,
    };
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    root.classList.add('is-camera');

    let plan = buildPlan();
    const lastGrow: number[] = [];
    const dpr = window.devicePixelRatio || 1;

    const xAt = (s: number) => {
      for (const seg of plan.xSegs) {
        if (s <= seg.s1) return seg.x0 + (seg.x1 - seg.x0) * ease((s - seg.s0) / (seg.s1 - seg.s0 || 1));
      }
      return plan.xSegs[plan.xSegs.length - 1]?.x1 ?? 0;
    };

    const focusAt = (f: Focus, s: number) => {
      if (s < f.in0) return 0;
      if (s < f.in1) return ease((s - f.in0) / (f.in1 - f.in0 || 1));
      if (s <= f.out0) return 1;
      return 1 - ease((s - f.out0) / (f.out1 - f.out0 || 1));
    };

    const render = (raw: number) => {
      const s = clamp(raw, 0, plan.total);
      const camX = xAt(s);
      // Whole device pixels keep text sharp while the world is still.
      const camY = Math.round(plan.y(s) * dpr) / dpr;

      world.style.transform = `translate3d(0, ${-camY}px, 0)`;

      for (const { el, k } of depth) {
        el.style.transform = `translate3d(${(-k * camX).toFixed(2)}px, 0, 0)`;
      }

      shots.forEach((el, i) => {
        const f = focusAt(plan.focus[i], s);
        el.style.opacity = (DIM + (1 - DIM) * f).toFixed(3);
        el.style.transform = `translate3d(${(plan.shotX[i] - camX).toFixed(2)}px, 0, 0) scale(${(0.97 + 0.03 * f).toFixed(4)})`;
      });

      const reveal = camY + plan.H * REVEAL_LINE;
      if (draw) {
        const hidden = clamp(plan.drawTop + plan.drawH - reveal, 0, plan.drawH);
        draw.style.clipPath = `inset(0 0 ${hidden.toFixed(1)}px 0)`;
      }
      grows.forEach((el, i) => {
        const v = Math.round(clamp((reveal - plan.growY[i]) / (plan.H * GROW_BAND), 0, 1) * 1000) / 1000;
        if (v !== lastGrow[i]) {
          el.style.setProperty('--p', String(v));
          lastGrow[i] = v;
        }
      });
    };

    render(0);

    ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      // Re-measured on every refresh (resize, font load), before positions settle.
      end: () => {
        plan = buildPlan();
        return `+=${plan.total}`;
      },
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress * plan.total),
      onRefresh: (self) => render(self.progress * plan.total),
    });

    return () => {
      root.classList.remove('is-camera');
      for (const el of [world, ...shots, ...depth.map((d) => d.el)]) {
        el.style.transform = '';
        el.style.opacity = '';
      }
      if (draw) draw.style.clipPath = '';
      for (const el of grows) el.style.removeProperty('--p');
    };
  });
}

document.querySelectorAll<HTMLElement>('[data-scroll-camera]').forEach(setup);
