import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';

mkdirSync('.taste-skill/audit', { recursive: true });

async function audit() {
  console.log('Launching Headless Chrome for live audit...');
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  // 1. Hero screen screenshot after intro animation settles
  console.log('Taking screenshot: Hero screen...');
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-01-hero.jpg' });

  // 2. Wheel scroll to Chapter I (About)
  console.log('Scrolling to Chapter I (About)...');
  await page.wheel(1800, { step: 180, pauseMs: 40 });
  await sleep(1500);
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-02-about.jpg' });

  // 3. Wheel scroll to The Work & Chapter II
  console.log('Scrolling to Chapter II (Selected Work)...');
  await page.wheel(2400, { step: 180, pauseMs: 40 });
  await sleep(1500);
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-03-work.jpg' });

  // 4. Wheel scroll to Chapter III (Services / Disciplines)
  console.log('Scrolling to Chapter III (Disciplines)...');
  await page.wheel(2600, { step: 180, pauseMs: 40 });
  await sleep(1500);
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-04-services.jpg' });

  // 5. Wheel scroll to Chapter IV (Clients)
  console.log('Scrolling to Chapter IV (Clients)...');
  await page.wheel(2800, { step: 180, pauseMs: 40 });
  await sleep(1500);
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-05-clients.jpg' });

  // 6. Wheel scroll to Footer
  console.log('Scrolling to Next Chapter & Footer...');
  await page.wheel(3000, { step: 180, pauseMs: 40 });
  await sleep(1500);
  await page.screenshot({ path: '.taste-skill/audit/audit-desktop-06-footer.jpg' });

  // Mobile Audit
  console.log('Setting viewport to Mobile (390x844)...');
  const mobilePage = await browser.newPage({ width: 390, height: 844, mobile: true });
  await mobilePage.goto('http://localhost:3000', { settleMs: 3000 });
  await mobilePage.screenshot({ path: '.taste-skill/audit/audit-mobile-01-hero.jpg' });

  console.log('Scrolling mobile to About...');
  await mobilePage.wheel(1200, { step: 150, pauseMs: 30 });
  await sleep(1000);
  await mobilePage.screenshot({ path: '.taste-skill/audit/audit-mobile-02-about.jpg' });

  console.log('Scrolling mobile to Services & Footer...');
  await mobilePage.wheel(3500, { step: 200, pauseMs: 30 });
  await sleep(1000);
  await mobilePage.screenshot({ path: '.taste-skill/audit/audit-mobile-03-footer.jpg' });

  console.log('--- Checking Runtime Console Errors ---');
  console.log('Desktop Errors:', page.consoleErrors);
  console.log('Mobile Errors:', mobilePage.consoleErrors);

  await browser.close();
  console.log('Live audit finished successfully!');
}

audit().catch(console.error);
