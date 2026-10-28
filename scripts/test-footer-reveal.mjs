import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testFooterReveal() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  // Scroll smoothly to footer
  await page.eval(() => window.scrollTo(0, 8500));
  await sleep(500);

  console.log('Wheeling across to the final footer trigger...');
  for (let i = 0; i < 15; i++) {
    await page.wheel(200, { step: 50, pauseMs: 20 });
    await sleep(80);
  }

  await sleep(1500);
  const footerInfo = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link]');
    return {
      scrollY: window.scrollY,
      headingOpacity: heading ? getComputedStyle(heading).opacity : null,
      emailText: email ? email.textContent.trim() : null,
      emailOpacity: email ? getComputedStyle(email).opacity : null
    };
  });

  console.log('Footer state after wheeling:', footerInfo);
  await page.screenshot({ path: '.taste-skill/audit/final/08-footer-revealed.jpg' });

  await browser.close();
}

testFooterReveal().catch(console.error);
