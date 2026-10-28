import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testFooterRevealDirect() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  // Scroll smoothly past 10200
  console.log('Scrolling to 10200...');
  await page.eval(() => {
    window.scrollTo(0, 10200);
  });
  await sleep(1500);

  // Wheel a bit so Lenis & ScrollTrigger update
  await page.wheel(400, { step: 100, pauseMs: 20 });
  await sleep(1500);

  const info = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link-underline]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const r = footer ? footer.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      footerLeft: r ? Math.round(r.left) : null,
      headingOpacity: heading ? getComputedStyle(heading).opacity : null,
      emailText: email ? email.textContent.trim() : null,
      emailOpacity: email ? getComputedStyle(email).opacity : null
    };
  });

  console.log('Footer state at 10200:', info);
  await page.screenshot({ path: '.taste-skill/audit/final/footer-revealed-success.jpg' });

  await browser.close();
}

testFooterRevealDirect().catch(console.error);
