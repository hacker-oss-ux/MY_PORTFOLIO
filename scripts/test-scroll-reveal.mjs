import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testReveal() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { settleMs: 3000 });

  console.log('Checking initial state of Chapter I elements...');
  let state = await page.eval(() => {
    const intro = document.querySelector('[data-about-reveal-intro]');
    const img = document.querySelector('[data-reveal-image]');
    const overlay = document.querySelector('[data-reveal-image-overlay]');
    return {
      introOpacity: intro ? getComputedStyle(intro).opacity : null,
      imgOpacity: img ? getComputedStyle(img).opacity : null,
      overlayClip: overlay ? getComputedStyle(overlay).clipPath : null
    };
  });
  console.log('Initial state:', state);

  // Wheel scroll forward slowly in increments of 300px
  for (let step = 1; step <= 10; step++) {
    console.log(`Wheel step ${step}...`);
    await page.wheel(400, { step: 100, pauseMs: 20 });
    await sleep(400);

    state = await page.eval(() => {
      const intro = document.querySelector('[data-about-reveal-intro]');
      const img = document.querySelector('[data-reveal-image]');
      const overlay = document.querySelector('[data-reveal-image-overlay]');
      const about = document.querySelector('[data-section=\"home-about\"]');
      const r = about ? about.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        aboutLeft: r ? Math.round(r.left) : null,
        aboutRight: r ? Math.round(r.right) : null,
        introOpacity: intro ? getComputedStyle(intro).opacity : null,
        imgOpacity: img ? getComputedStyle(img).opacity : null,
        imgClip: img ? getComputedStyle(img).clipPath : null,
        overlayClip: overlay ? getComputedStyle(overlay).clipPath : null
      };
    });
    console.log(`Step ${step} state:`, state);
    if (state.introOpacity > 0 || state.imgOpacity > 0) {
      console.log('REVEAL TRIGGERED!');
      break;
    }
  }

  await sleep(1000);
  await page.screenshot({ path: '.taste-skill/audit/stations/test-about-reveal.jpg' });

  await browser.close();
}

testReveal().catch(console.error);
