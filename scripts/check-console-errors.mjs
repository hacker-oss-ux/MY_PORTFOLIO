import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function main() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  
  const consoleLogs = [];
  const errors = [];
  
  // Listen for console and errors
  page.on('Console.messageAdded', (params) => {
    consoleLogs.push(params.message);
  });
  
  page.on('Runtime.exceptionThrown', (params) => {
    errors.push(params.exceptionDetails);
  });

  console.log('Navigating to http://localhost:3000...');
  await page.navigate('http://localhost:3000');
  
  // Wait for initial load
  await sleep(3000);
  
  console.log('--- Console Messages ---');
  for (const msg of consoleLogs) {
    console.log(`[${msg.level}] ${msg.text}`);
  }
  
  console.log('--- Errors ---');
  for (const err of errors) {
    console.log(`[Exception] ${err.text || ''} ${err.exception?.description || ''}`);
  }
  
  // Check horizontal story elements
  const info = await page.evaluate(`(() => {
    const track = document.querySelector('[data-horizontal-track]');
    const panels = document.querySelectorAll('[data-horizontal-panel]');
    const scrollContainer = document.querySelector('[data-horizontal-story]');
    const rect = track ? track.getBoundingClientRect() : null;
    return {
      hasTrack: !!track,
      panelCount: panels.length,
      trackWidth: track ? track.scrollWidth : 0,
      trackRect: rect,
      bodyHeight: document.body.scrollHeight,
      windowScrollY: window.scrollY
    };
  })()`);
  
  console.log('--- Horizontal Track Info ---', JSON.stringify(info, null, 2));

  // Now test scrolling down incrementally
  console.log('Testing scrolling...');
  for (let s = 1000; s <= 8000; s += 2000) {
    await page.evaluate(`window.scrollTo(0, ${s})`);
    await sleep(600);
    const scrollInfo = await page.evaluate(`(() => {
      const track = document.querySelector('[data-horizontal-track]');
      const activePanel = [...document.querySelectorAll('[data-horizontal-panel]')].map(p => {
        const r = p.getBoundingClientRect();
        return {
          id: p.getAttribute('data-section') || p.getAttribute('aria-label'),
          left: Math.round(r.left),
          right: Math.round(r.right),
          visible: r.right > 0 && r.left < window.innerWidth
        };
      });
      return {
        scrollY: window.scrollY,
        trackTransform: track ? track.style.transform : 'none',
        panels: activePanel.filter(p => p.visible)
      };
    })()`);
    console.log(`At scroll ${s}:`, JSON.stringify(scrollInfo));
  }

  await browser.close();
}

main().catch(console.error);
