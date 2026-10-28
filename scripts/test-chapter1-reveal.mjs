import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testChapter1() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { settleMs: 3500 });

  console.log('Wheeling continuously across Chapter I...');
  // Lenis needs wheel events over time
  for (let i = 0; i < 20; i++) {
    await page.wheel(250, { step: 50, pauseMs: 20 });
    await sleep(150);
  }

  // Check state
  const state = await page.eval(() => {
    const trigger = document.querySelector('[data-about-reveal-group-trigger]');
    const intro = document.querySelector('[data-about-reveal-intro]');
    const img = document.querySelector('[data-reveal-image]');
    const overlay = document.querySelector('[data-reveal-image-overlay]');
    const about = document.querySelector('[data-section=\"home-about\"]');
    return {
      scrollY: window.scrollY,
      aboutRect: about ? about.getBoundingClientRect() : null,
      triggerRect: trigger ? trigger.getBoundingClientRect() : null,
      introOpacity: intro ? getComputedStyle(intro).opacity : null,
      imgOpacity: img ? getComputedStyle(img).opacity : null,
      imgClip: img ? getComputedStyle(img).clipPath : null,
      overlayClip: overlay ? getComputedStyle(overlay).clipPath : null
    };
  });

  console.log('State at end of wheeling:', JSON.stringify(state, null, 2));
  await page.screenshot({ path: '.taste-skill/audit/stations/chapter1-centered.jpg' });

  await browser.close();
}

testChapter1().catch(console.error);
