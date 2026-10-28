import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function test() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { settleMs: 500 });

  // Get initial start text
  const startText = await page.eval('(() => { const el = document.querySelector("[data-year-start-text]"); return el ? el.textContent.trim() : null; })()');
  console.log('Initial data-year-start-text:', startText);

  // Take screenshot at start
  await page.screenshot({ path: 'scripts/screenshot-odometer-start.png' });
  console.log('Saved scripts/screenshot-odometer-start.png');

  // Wait for odometer animation
  await sleep(3500);

  // Check year strip transform / text
  const endState = await page.eval('(() => { const strip = document.querySelector("[data-year-strip]"); const name = document.querySelector("[data-hero-name]"); return { stripTransform: strip ? strip.style.transform : null, nameOpacity: name ? window.getComputedStyle(name).opacity : null }; })()');
  console.log('End state:', endState);

  await page.screenshot({ path: 'scripts/screenshot-odometer-end.png' });
  console.log('Saved scripts/screenshot-odometer-end.png');

  await browser.close();
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
