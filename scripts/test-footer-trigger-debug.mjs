import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function testFooterTriggerDebug() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  const result = await page.eval(() => {
    // Check if we can find ScrollTrigger instances
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const track = document.querySelector('[data-horizontal-track]');
    
    return {
      headingRect: heading ? heading.getBoundingClientRect() : null,
      footerRect: footer ? footer.getBoundingClientRect() : null,
      trackRect: track ? track.getBoundingClientRect() : null
    };
  });

  console.log('Initial rects:', result);

  // Now scroll track to end
  await page.eval(() => window.scrollTo(0, 10464));
  await new Promise(r => setTimeout(r, 1000));

  const afterScroll = await page.eval(() => {
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    const track = document.querySelector('[data-horizontal-track]');
    return {
      headingRect: heading ? heading.getBoundingClientRect() : null,
      footerRect: footer ? footer.getBoundingClientRect() : null,
      headingComputedOpacity: heading ? getComputedStyle(heading).opacity : null,
      headingStyleOpacity: heading ? heading.style.opacity : null
    };
  });

  console.log('After scroll rects:', afterScroll);
  await browser.close();
}

testFooterTriggerDebug().catch(console.error);
