/**
 * QA screenshot harness (dev tooling, not shipped).
 *
 * Captures full-page screenshots of the local site at several
 * breakpoints using the system Edge via puppeteer-core.
 *
 *   node scripts/qa-screenshots.mjs [url] [outDir] [--motion]
 *
 * By default `prefers-reduced-motion: reduce` is emulated so all
 * content renders statically (no reveal states hiding sections).
 * Pass --motion to capture with animations enabled instead.
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const url = process.argv[2] ?? 'http://localhost:4321/';
const outDir = process.argv[3] ?? 'qa-shots';
const motion = process.argv.includes('--motion');

const breakpoints = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1680', width: 1680, height: 1050 },
  { name: 'wide-1920', width: 1920, height: 1080 },
];

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'shell',
  args: ['--hide-scrollbars', '--mute-audio'],
});

try {
  for (const bp of breakpoints) {
    const page = await browser.newPage();
    await page.setViewport({ width: bp.width, height: bp.height, deviceScaleFactor: 1 });
    if (!motion) {
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ]);
    }
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    /* Force lazy images to load and settle before capturing. */
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((img) => {
        img.loading = 'eager';
      });
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += 700;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 40);
          else {
            window.scrollTo(0, 0);
            resolve(undefined);
          }
        };
        step();
      });
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete ? Promise.resolve() : new Promise((r) => {
            img.addEventListener('load', r, { once: true });
            img.addEventListener('error', r, { once: true });
          })
        )
      );
    });
    await new Promise((r) => setTimeout(r, motion ? 3000 : 600));
    const file = join(outDir, `${bp.name}${motion ? '-motion' : ''}.png`);
    await page.screenshot({ path: file, fullPage: !motion });
    console.log(`saved ${file}`);
    await page.close();
  }
} finally {
  await browser.close();
}
