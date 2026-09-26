/**
 * QA helper (dev tooling): viewport screenshots at several scroll depths
 * through a section — the only reliable way to judge sticky elements.
 *
 *   node scripts/qa-scroll.mjs <selector> <outDir> [width] [frames]
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const selector = process.argv[2] ?? '#story';
const outDir = process.argv[3] ?? 'qa-shots';
const width = Number(process.argv[4] ?? 1440);
const frames = Number(process.argv[5] ?? 4);
const url = process.env.QA_URL ?? 'http://localhost:4321/';

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'shell',
  args: ['--hide-scrollbars', '--mute-audio'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
    });
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 700;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 30);
        else resolve(undefined);
      };
      step();
    });
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.addEventListener('load', r, { once: true });
              img.addEventListener('error', r, { once: true });
            })
      )
    );
  });

  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  }, selector);

  for (let i = 0; i < frames; i++) {
    const y = box.top + (box.height - 900) * (i / (frames - 1));
    await page.evaluate((to) => window.scrollTo({ top: to, behavior: 'instant' }), y);
    await new Promise((r) => setTimeout(r, 450));
    const file = join(outDir, `scroll-${width}-${i}.png`);
    await page.screenshot({ path: file });
    console.log(`saved ${file} @ y=${Math.round(y)}`);
  }
  await page.close();
} finally {
  await browser.close();
}
