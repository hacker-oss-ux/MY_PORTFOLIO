import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';

mkdirSync('.taste-skill/audit/final', { recursive: true });

async function run() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  // 1. Hero
  console.log('1. Capturing Hero panel...');
  await page.screenshot({ path: '.taste-skill/audit/final/01-hero-ajay-girish.jpg' });

  // Helper to wheel scroll and wait
  async function scrollAndCapture(name, totalDeltaY, waitMs = 1200) {
    console.log(`Scrolling ${totalDeltaY}px for ${name}...`);
    const steps = Math.ceil(totalDeltaY / 200);
    for (let i = 0; i < steps; i++) {
      await page.wheel(200, { step: 50, pauseMs: 15 });
      await sleep(40);
    }
    await sleep(waitMs);
    const info = await page.eval(() => {
      const track = document.querySelector('[data-horizontal-track]');
      return {
        scrollY: window.scrollY,
        transform: track ? track.style.transform : 'none'
      };
    });
    console.log(`Captured ${name} at scrollY:`, info.scrollY, 'transform:', info.transform);
    await page.screenshot({ path: `.taste-skill/audit/final/${name}.jpg` });
  }

  // 2. Chapter I - About Ajay Girish
  await scrollAndCapture('02-chapter-I-about-ajay', 1500, 1500);

  // 3. More Work (Cinematic video expand)
  await scrollAndCapture('03-more-work-video-expand', 1200, 1500);

  // 4. Chapter II - Selected Work
  await scrollAndCapture('04-chapter-II-selected-work', 1800, 1500);

  // 5. Chapter III - Services / Disciplines (No graph)
  await scrollAndCapture('05-chapter-III-services-disciplines', 2200, 1500);

  // 6. Chapter IV - Clients & Experience
  await scrollAndCapture('06-chapter-IV-clients', 2200, 1500);

  // 7. Footer - Contact & Ajay Girish
  await scrollAndCapture('07-chapter-V-footer-contact', 2200, 1500);

  // Mobile test
  console.log('Setting viewport for Mobile (390x844)...');
  const mobile = await browser.newPage({ width: 390, height: 844, mobile: true });
  await mobile.goto('http://localhost:3000', { settleMs: 3000 });
  await mobile.screenshot({ path: '.taste-skill/audit/final/mobile-01-hero.jpg' });

  console.log('Scrolling mobile to About...');
  await mobile.wheel(1000, { step: 100, pauseMs: 20 });
  await sleep(1000);
  await mobile.screenshot({ path: '.taste-skill/audit/final/mobile-02-about.jpg' });

  console.log('Scrolling mobile to Services & Footer...');
  await mobile.wheel(3000, { step: 150, pauseMs: 20 });
  await sleep(1000);
  await mobile.screenshot({ path: '.taste-skill/audit/final/mobile-03-footer.jpg' });

  console.log('All final audit captures complete!');
  await browser.close();
}

run().catch(console.error);
