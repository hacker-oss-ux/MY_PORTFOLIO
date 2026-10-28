import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function captureCenteredChapter4() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');

  // Wait for intro to unlock
  while (true) {
    const isLocked = await page.eval(() => document.body.style.overflow === 'hidden');
    if (!isLocked) break;
    await sleep(150);
  }

  // Scroll to Chapter IV entry
  console.log('Scrolling to 8600...');
  await page.eval(() => window.scrollTo(0, 8600));
  await sleep(1000);

  // Wheel into Chapter IV
  for (let i = 0; i < 4; i++) {
    await page.wheel(100, { step: 50, pauseMs: 15 });
    await sleep(50);
  }

  await sleep(1500);

  const rects = await page.eval(() => {
    const clientSec = document.querySelector('[data-section=\"home-clients\"]');
    const more = document.querySelector('[data-client-more]');
    return {
      scrollY: window.scrollY,
      secLeft: clientSec ? clientSec.getBoundingClientRect().left : null,
      moreRect: more ? more.getBoundingClientRect() : null,
      moreOpacity: more ? getComputedStyle(more).opacity : null
    };
  });

  console.log('Chapter IV state:', JSON.stringify(rects, null, 2));
  await page.screenshot({ path: '.taste-skill/audit/v2/chapter4-perfect-reverse-engineered.jpg' });

  await browser.close();
}

captureCenteredChapter4().catch(console.error);
