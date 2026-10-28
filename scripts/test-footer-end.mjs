import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testFooterEnd() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  // Scroll in steps to the very end
  console.log('Scrolling incrementally to end...');
  for (let y = 1000; y <= 10464; y += 1500) {
    await page.eval((target) => window.scrollTo(0, target), y);
    await sleep(200);
  }
  await page.eval(() => window.scrollTo(0, 10464));
  await sleep(1500);

  const info = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link-underline]');
    const r = footer ? footer.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      footerLeft: r ? Math.round(r.left) : null,
      headingOpacity: heading ? getComputedStyle(heading).opacity : null,
      headingAriaHidden: heading ? heading.getAttribute('aria-hidden') : null,
      emailOpacity: email ? getComputedStyle(email).opacity : null
    };
  });

  console.log('Footer state at 10464:', info);
  await page.screenshot({ path: '.taste-skill/audit/final/footer-at-max-scroll.jpg' });

  await browser.close();
}

testFooterEnd().catch(console.error);
