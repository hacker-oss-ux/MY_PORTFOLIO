import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function fullJourney() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000');

  console.log('Waiting for scroll lock to release (intro to complete)...');
  const start = Date.now();
  while (true) {
    const isLocked = await page.eval(() => document.body.style.overflow === 'hidden');
    if (!isLocked && Date.now() - start > 2000) {
      console.log(`Scroll unlocked after ${Date.now() - start}ms!`);
      break;
    }
    await sleep(150);
  }

  // Extra settle
  await sleep(500);

  console.log('Wheeling through the site to reach the footer...');
  let currentY = 0;
  let step = 0;
  while (currentY < 10400 && step < 60) {
    step++;
    await page.wheel(300, { step: 60, pauseMs: 15 });
    await sleep(50);
    currentY = await page.eval(() => window.scrollY);
    if (step % 5 === 0) {
      console.log(`Step ${step}, scrollY: ${currentY}`);
    }
  }

  await sleep(1500);

  const footerState = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link-underline]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const r = footer ? footer.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      footerLeft: r ? Math.round(r.left) : null,
      headingOpacity: heading ? getComputedStyle(heading).opacity : null,
      headingAriaHidden: heading ? heading.getAttribute('aria-hidden') : null,
      emailText: email ? email.textContent.trim() : null,
      emailOpacity: email ? getComputedStyle(email).opacity : null
    };
  });

  console.log('Footer State at journey end:', footerState);
  await page.screenshot({ path: '.taste-skill/audit/final/full-journey-footer-end.jpg' });

  await browser.close();
}

fullJourney().catch(console.error);
