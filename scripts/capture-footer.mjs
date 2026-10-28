import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function captureFooter() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  await page.eval(() => window.scrollTo(0, 10464));
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: '.taste-skill/audit/final/08-footer-final.jpg' });
  await browser.close();
}

captureFooter().catch(console.error);
