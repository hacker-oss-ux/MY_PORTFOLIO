import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function measurePanels() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3000 });

  const panels = await page.eval(() => {
    return [...document.querySelectorAll('[data-horizontal-panel]')].map((p, i) => {
      const rect = p.getBoundingClientRect();
      return {
        index: i,
        name: p.getAttribute('data-section') || p.getAttribute('aria-label') || 'panel',
        offsetLeft: p.offsetLeft,
        offsetWidth: p.offsetWidth,
        clientWidth: p.clientWidth
      };
    });
  });

  console.log('Panels:', panels);
  await browser.close();
}

measurePanels().catch(console.error);
