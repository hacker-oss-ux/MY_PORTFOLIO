import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function wheelEntireSite() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  console.log('Wheeling through the whole page...');
  // Total distance is ~10464px.
  // With 300px per wheel step, that's ~35 steps.
  for (let i = 1; i <= 40; i++) {
    await page.wheel(300, { step: 75, pauseMs: 15 });
    await sleep(60);
    if (i % 10 === 0) {
      const y = await page.eval(() => window.scrollY);
      console.log(`Step ${i}, current scrollY: ${y}`);
    }
  }

  await sleep(1500);

  const info = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link-underline]');
    return {
      scrollY: window.scrollY,
      headingOpacity: heading ? getComputedStyle(heading).opacity : null,
      headingAriaHidden: heading ? heading.getAttribute('aria-hidden') : null,
      emailOpacity: email ? getComputedStyle(email).opacity : null,
      emailText: email ? email.textContent.trim() : null
    };
  });

  console.log('Final footer status after full wheeling:', info);
  await page.screenshot({ path: '.taste-skill/audit/final/full-wheel-footer.jpg' });

  await browser.close();
}

wheelEntireSite().catch(console.error);
