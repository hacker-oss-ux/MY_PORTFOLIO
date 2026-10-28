import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';

mkdirSync('.taste-skill/audit/v2', { recursive: true });

async function verify() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000');

  // Wait for intro to unlock
  while (true) {
    const isLocked = await page.eval(() => document.body.style.overflow === 'hidden');
    if (!isLocked) break;
    await sleep(150);
  }
  await sleep(1000);

  // 1. Capture Chapter IV (Selected Experiences)
  console.log('Scrolling to Chapter IV (Selected Experiences)...');
  await page.eval(() => window.scrollTo(0, 8124));
  await sleep(1200);

  // Wheel a bit so GSAP ticker syncs
  await page.wheel(400, { step: 100, pauseMs: 20 });
  await sleep(1000);

  const clientText = await page.eval(() => {
    const list = document.querySelector('[data-clients-list]');
    const rows = [...document.querySelectorAll('[data-client-row] [data-line]')].map(e => e.textContent.trim());
    return rows;
  });
  console.log('Captured Chapter IV rows:', clientText);
  await page.screenshot({ path: '.taste-skill/audit/v2/chapter4-experiences.jpg' });

  // 2. Hover over first client row (Espressif Labs) to test clip-path reveal
  console.log('Hovering over Espressif Labs...');
  await page.eval(() => {
    const row = document.querySelector('[data-clients-list] [data-client-row]');
    if (row) {
      row.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      const imgShell = row.querySelector('div');
      if (imgShell) imgShell.style.clipPath = 'inset(0 0 0 0)';
    }
  });
  await sleep(600);
  await page.screenshot({ path: '.taste-skill/audit/v2/chapter4-hover-espressif.jpg' });

  // 3. Capture Chapter II (Selected Work)
  console.log('Scrolling to Chapter II (Selected Work)...');
  await page.eval(() => window.scrollTo(0, 4320));
  await sleep(1200);
  await page.wheel(300, { step: 100, pauseMs: 20 });
  await sleep(1000);

  const workItems = await page.eval(() => {
    return [...document.querySelectorAll('[data-work-item-text]')].map(e => e.textContent.trim());
  });
  console.log('Captured Chapter II work items:', workItems);
  await page.screenshot({ path: '.taste-skill/audit/v2/chapter2-selected-work.jpg' });

  // 4. Capture Chapter III (Services / Disciplines)
  console.log('Scrolling to Chapter III (Disciplines)...');
  await page.eval(() => window.scrollTo(0, 6400));
  await sleep(1200);
  await page.wheel(300, { step: 100, pauseMs: 20 });
  await sleep(1000);
  await page.screenshot({ path: '.taste-skill/audit/v2/chapter3-disciplines.jpg' });

  // 5. Check console errors
  console.log('Console Errors:', page.consoleErrors);

  await browser.close();
  console.log('Audit complete!');
}

verify().catch(console.error);
