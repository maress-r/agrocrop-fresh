/**
 * QA helper (dev tooling): screenshot a single section by id.
 *
 *   node scripts/qa-section.mjs <selector> <outDir> [width] [--motion]
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const selector = process.argv[2] ?? '#story';
const outDir = process.argv[3] ?? 'qa-shots';
const widths = (process.argv[4] ?? '1440,768,375').split(',').map(Number);
const motion = process.argv.includes('--motion');
const url = process.env.QA_URL ?? 'http://localhost:4321/';

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'shell',
  args: ['--hide-scrollbars', '--mute-audio'],
});

try {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    if (!motion) {
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    }
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
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.addEventListener('load', r, { once: true });
                img.addEventListener('error', r, { once: true });
              })
        )
      );
    });
    await new Promise((r) => setTimeout(r, 500));

    const el = await page.$(selector);
    if (!el) throw new Error(`selector not found: ${selector}`);
    const file = join(outDir, `section-${width}.png`);
    await el.screenshot({ path: file });
    console.log(`saved ${file}`);
    await page.close();
  }
} finally {
  await browser.close();
}
